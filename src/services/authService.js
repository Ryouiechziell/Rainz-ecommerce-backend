require("dotenv").config();
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");
const { google } = require("googleapis");
const { performance } = require("perf_hooks");
const { v4: uuidv4 } = require("uuid");
const { isInsertSuccess } = require("../utils/isQuerySuccess");
const { checkDbLatency, checkRuntimeLatency } = require("../utils/checkLatency");
const { begin, rollback, commit } = require("../models/utilsModel");
const {
  getUserByEmail,
  getUserByEmailAndPassword,
  createUser
} = require("../models/userModel.js");
const {
  InternalServerError,
  NotFoundError,
  BadRequestError
} = require("../utils/customErrors");
const { generateToken } = require("../utils/jwt.js");

async function authRegisterService(payload) {
  const processStart = performance.now();
  const user_id = "USR-" + uuidv4();
  const hinter = "[AUTH REGISTER]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

  try {
    const { username, password, email, role, profile_picture } = payload
    let userExisted;

    try {
      const dbStart = performance.now();
      [userExisted] = await getUserByEmail(email);
      checkDbLatency(dbStart, 400, hinter);
    } catch (error) {
      logger.error(`${hinter} THE FIRST DB ERROR ${error.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat mendaftarkan user");
    }

    if (userExisted.length) {
      logger.warn(`${hinter} EMAIL ${userExisted[0].email} HAS BEEN REGISTERED`);
      throw new BadRequestError("Email ini sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let isInserted;
    try {
      await begin();

      const dbStart = performance.now();
      [isInserted] = await createUser(user_id, username, email, hashedPassword, role, profile_picture || null);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
			rollback();

      logger.error(`${hinter} THE SECONDARY DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat mendaftarkan akun");
    }

    if (!isInsertSuccess(isInserted)) {
			rollback();

      logger.info(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal mendaftarkan akun");
    }
		await commit();

    checkRuntimeLatency(processStart, hinter);
    return { user_id, username, email, password, role };

  }catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mendaftarkan akun");
  }
}

async function authLoginService(payload) {
  const processStart = performance.now();
  const hinter = "[AUTH LOGIN]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

  try {
  const { email, password } = payload
  let user;

	  try {
	    const dbStart = performance.now();
  	  [user] = await getUserByEmail(email);
	    checkDbLatency(dbStart, 400, hinter);
	  } catch (err) {
  	  logger.error(`${hinter} DB ERROR ${err.stack}`);
	    throw InternalServerError("Terjadi kesalahan saat login ke akun");
	  }

  	if (!user.length) {
    	logger.info(`${hinter} EMAIL IS NOT REGISTERED`);
	    throw new BadRequestError("Email atau password salah");
  	}

	  const isMatch = await bcrypt.compare(password, user[0].password);
	  if (!isMatch) {
  	  logger.info(`${hinter} PASSWORD DOES NOT MATCH`);
    	throw new BadRequestError("Email atau password salah");
	  }

  	const token = generateToken({ user_id: user[0].user_id, email: user[0].email, role: user[0].role });

	  checkRuntimeLatency(processStart, hinter);
  	return { token };

  }catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat login ke akun");
  }
}

async function authLoginGoogleService() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ],
    redirect_uri: process.env.GOOGLE_REDIRECT_URI
  });

  logger.debug(`[AUTH LOGIN GOOGLE] GENERATED GOOGLE REDIRECT URL: ${url}`);
  return url;
}

async function authLoginGoogleCallbackService(payload) {
  const processStart = performance.now();
  const hinter = "[AUTH LOGIN GOOGLE CALLBACK]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

  try {
    const{ code } = payload

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const { tokens } = await oauth2Client.getToken(code);
    logger.debug(`${hinter} TOKENS: ${JSON.stringify(tokens,null,2)}`)

    if (!tokens) {
      logger.warn(`${hinter} FAILED TO GET TOKENS FROM GOOGLE`);
      throw new InternalServerError("Gagal mendapatkan tokens dari google");
    }

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data: profile } = await oauth2.userinfo.get();
    const { email, name: username, picture: profile_picture } = profile || null;

    if (!email) {
      logger.warn(`${hinter} FAILED TO GET EMAIL INFO FROM GOOGLE`);
      throw new InternalServerError("Gagal mendapatkan info email dari google");
    }

    let isUserExisted;
    try {
      const dbStart = performance.now();

      [isUserExisted] = await getUserByEmail(email);

      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR WHEN GET USER ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat memeriksa email user");
    }

    if (!isUserExisted.length) {
      logger.warn(`${hinter} USER EMAIL FROM GOOGLE IS NOT EXISTED`);

      const user_id = "USR-" + uuidv4();
      let isInserted;

      try {
        const dbStart = performance.now();
        await begin();

        [isInserted] = await createUser(user_id, username, email, null, "user", profile_picture);
        checkDbLatency(dbStart, 400, hinter);
      } catch (err) {
        await rollback();
        logger.error(`${hinter} DB ERROR WHILE REGISTERING NEW USER ${err.stack}`);
        throw new InternalServerError("Terjadi kesalahan saat mendaftarkan user baru");
      }
      if (isInserted?.affectedRows === 0) {
        await rollback();
        logger.error(`${hinter} FAILED TO CREATE NEW USER`);
        throw new InternalServerError("Gagal membuat user baru");
      }
    }

    await commit();

    const jwtToken = generateToken({ email, username }, process.env.JWT_KEY, process.env.JWT_EXPIRED);
    checkRuntimeLatency(processStart, hinter);
    return `http://localhost:3001/auth/login/google?token=${jwtToken}`;

  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat login");
  }
}

module.exports = {
  authRegisterService,
  authLoginService,
  authLoginGoogleService,
  authLoginGoogleCallbackService
};
