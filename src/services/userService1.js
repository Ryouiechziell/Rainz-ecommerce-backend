const logger = require("../utils/logger.js");
const { performance } = require("perf_hooks");
const { checkDbLatency, checkRuntimeLatency } = require("../utils/checkLatency")
const bcrypt = require("bcryptjs");
const {
  isInsertSuccess,
  isUpdateSuccess,
  isDeleteSuccess
} = require("../utils/isQuerySuccess");
const {
  getUserById,
  getUserByEmail,
  updateUserUsername,
  updateUserEmail,
  updateUserPassword,
  updateUserRole,
  updateUserProfilePicture,
  deleteUser
} = require("../models/userModel.js");
const {
  InternalServerError,
  NotFoundError
} = require("../utils/customErrors");

async function getUserByIdService({ user_id }) {
  const processStart = performance.now();
  const hinter = "[GET USER]"
  logger.debug(`${hinter} USER ID: ${user_id}`)

try {
  let user;
  try {
    const dbStart = performance.now();

    [user] = await getUserById(user_id);
    checkDbLatency(dbStart, 400)

  } catch (err) {
    logger.error(`${hinter} DB ERROR err: ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data user");
  }

  if (!user.length) {
    logger.warn(`${hinter} FAILED USER NOT FOUND`);
    throw new NotFoundError("User tidak ditemukan");
  }

  checkRuntimeLatency(processStart, hinter)
  return user;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data user");
  }
}

async function getUserByEmailService({ email }) {
  const processStart = performance.now();
  const hinter = "[GET USER BY EMAIL]"
  logger.debug(`${hinter} EMAIL: ${email}`)

try {
  let user;
  try {
    const dbStart = performance.now();

    [user] = await getUserByEmail(email);

    const dbLatency = (performance.now() - dbStart).toFixed(2);
    checkDbLatency(dbStart, 400);

  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data pengguna");
  }

  if (!user.length) {
    logger.warn(`${hinter} FAILED USER NOT FOUND`);
    throw new NotFoundError("Pengguna tidak ditemukan");
  }

  checkRuntimeLatency(processStart, hinter)
  return user;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data user");
  }
}

async function updateUserUsernameService({ username, user_id }) {
  const processStart = performance.now();
  const hinter = "[UPDATE USER USERNAME]"
  logger.debug(`${hinter} USERNAME: ${username}, USER_ID: ${user_id}`)

try {
  let isUpdated;
  try {
    const dbStart = performance.now();

    [isUpdated] = await updateUserUsername(username, user_id);
    checkDbLatency(dbStart, 400);

  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui username pengguna");
  }

  if (!isUpdateSuccess(isUpdated)) {
    logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
    throw new InternalServerError("Gagal memperbarui username pengguna");
  }

  checkRuntimeLatency(processStart, hinter)
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui username");
  }
}

async function updateUserEmailService({ email, user_id }) {
  const processStart = performance.now();
  const hinter = "[UPDATE USER EMAIL]"
  logger.debug(`${hinter} EMAIL: ${email}, USER ID: ${user_id}`)

try {
  let isUpdated;
  try {
    const dbStart = performance.now()

    [isUpdated] = await updateUserEmail(email, user_id);
    checkDbLatency(dbStart, 400);

  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui email pengguna");
  }

  if (!isUpdateSuccess(isUpdated)) {
    logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
    throw new InternalServerError("Gagal memperbarui email pengguna");
  }

  checkRuntimeLatency(processStart, hinter)
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui email ");
  }
}

async function updateUserPasswordService({ password, user_id }) {
  const processStart = performance.now();
  const hinter = "[UPDATE USER PASSWORD]"
  logger.debug(`${hinter} PASSWORD: ${password}, USER ID: ${user_id}`)

try {
  let hashed;
  try {
    hashed = await bcrypt.hash(password, 10);
  } catch (err) {
    logger.error(`${hinter} HASH ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat menghashing password");
  }

  let isUpdated;
  try {
    const dbStart = performance.now();

    [isUpdated] = await updateUserPassword(hashed, user_id);
    checkDbLatency(dbStart, 400);

  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui password pengguna");
  }

  if (!isUpdateSuccess(isUpdated)) {
    logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
    throw new InternalServerError("Gagal memperbarui password pengguna");
  }

  checkRuntimeLatency(processStart, hinter)
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui password");
  }
}

async function updateUserRoleService({ role, user_id }) {
  const processStart = performance.now();
  const hinter = "[UPDATE USER ROLE]"
  logger.debug(`${hinter} USERNAME: ${role}, USER_ID: ${user_id}`)

try {
  let isUpdated;
  try {
    const dbStart = performance.now();

    [isUpdated] = await updateUserRole(role, user_id);
    checkDbLatency(dbStart, 400);

  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui role pengguna");
  }

  if (!isUpdateSuccess(isUpdated)) {
    logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
    throw new InternalServerError("Gagal memperbarui role pengguna");
  }

  checkRuntimeLatency(processStart, hinter);
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui role");
  }
}

async function updateUserProfilePictureService({ profile_picture, user_id }) {
  const processStart = performance.now();
  const hinter = "[UPDATE USER PROFILE PICTURE]"
  logger.debug(`${hinter} PROFILE PICTURE: ${profile_picture}, USER_ID: ${user_id}`)

try {
  let isUpdated;
  try {
    const dbStart = performance.now();

    [isUpdated] = await updateUserProfilePicture(profile_picture, user_id);
    checkDbLatency(dbStart, 400);

  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui foto profil pengguna");
  }

  if (!isUpdateSuccess(isUpdated)) {
    logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
    throw new InternalServerError("Gagal memperbarui foto profile pengguna");
  }

  checkRuntimeLatency(processStart, hinter)
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui profile picture");
  }
}

async function deleteUserService({ user_id }) {
  const processStart = performance.now();
  const hinter = "[DELETE USER]"
  logger.debug(`${hinter} USER_ID: ${user_id}`)

try {
  let isDeleted;
  try {
    const dbStart = performance.now();

    [isDeleted] = await deleteUser(user_id);
    checkDbLatency(dbStart, 400);

  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat menghapus pengguna");
  }

  if (!isDeleteSuccess(isDeleted)) {
    logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
    throw new InternalServerError("Gagal menghapus pengguna");
  }

  checkRuntimeLatency(processStart, hinter)
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat menghapus pengguna");
  }
}

module.exports = {
  getUserByIdService,
  getUserByEmailService,
  updateUserUsernameService,
  updateUserEmailService,
  updateUserPasswordService,
  updateUserRoleService,
  updateUserProfilePictureService,
  deleteUserService
};
