const bcrypt = require("bcryptjs");
const logger = require("../utils/logger.js");
const { v4: uuidv4 } = require("uuid");
const { isInsertSuccess } = require("../utils/isQuerySuccess")

const {
  getUserByEmail,
  getUserByEmailAndPassword,
  createUser,
} = require("../models/userModel.js");

const { generateToken } = require("../utils/jwt.js");

async function authRegisterService(body) {
  const { username, password, email, role } = body;

  // Validasi email sudah ada
  const [[userExisted]] = await getUserByEmail(email);
  if (userExisted) {
    logger.info(`Email ${userExisted.email} sudah terdaftar di database`);
    throw new Error("Email ini sudah terdaftar");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Buat user baru
  const user_id = "USR-" + uuidv4();
  const [result] = await createUser(user_id, username, email, hashedPassword, role);
  if (!isInsertSuccess(result)) {
    throw new Error("Gagal mendaftarkan akun");
  }

  logger.info(`REGISTER SUCCESS username: ${username}, email: ${email}, role: ${role}`);
  return { user_id, username, email, role };
}

async function authLoginService(body) {
  const { email, password } = body;

  // Cari user by email
  const [[userEmail]] = await getUserByEmail(email);
  if (!userEmail) {
    throw new Error("Email atau password salah");
  }

  // Bandingkan password hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Email atau password salah");
  }

  logger.info(`LOGIN SUCCESS email: ${user.email}, user_id: ${user.user_id}, role: ${user.role}`);

  // Generate token
  const token = generateToken({ user_id: user.user_id, email: user.email, role: user.role });
  return { token };
}

module.exports = {
  authRegisterService,
  authLoginService,
};
