const logger = require("../utils/logger");
const redis = require("../boot/redisClient")
const { performance } = require("perf_hooks");
const { checkDbLatency, checkRuntimeLatency } = require("../utils/checkLatency");
const bcrypt = require("bcryptjs");

const {
  isInsertSuccess,
  isUpdateSuccess,
  isDeleteSuccess,
} = require("../utils/checkQuery");

const {
  getUserById,
  getUserByEmail,
  updateUserUsername,
  updateUserEmail,
  updateUserPassword,
  updateUserRole,
  updateUserProfilePicture,
  deleteUser,
} = require("../models/userModel");

const {
  InternalServerError,
  NotFoundError,
} = require("../utils/customError");

async function getUserByIdService(payload) {
  const processStart = performance.now();
  const hinter = "[GET USER]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

		const { user_id } = payload;

		const cached = await redis().get(`userid:${user_id}`)
    if(cached) { checkRuntimeLatency(performance.now(),hinter); return JSON.parse(cached); }

    let user;

    try {
      const dbStart = performance.now();
      [user] = await getUserById(user_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR err: ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat mengambil data user");
    }

    if (!user.length) {
      logger.warn(`${hinter} FAILED USER NOT FOUND`);
      throw new NotFoundError("User tidak ditemukan");
    }

		await redis().set(`userid:${user_id}`, JSON.stringify(user), "EX", 3600)
    checkRuntimeLatency(processStart, hinter);
    return user;
}

async function getUserByEmailService(payload) {
  const processStart = performance.now();
  const hinter = "[GET USER BY EMAIL]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

		const { email } = payload;

		const cached = await redis().get(`useremail:${email}`)
    if(cached) { checkRuntimeLatency(performance.now(),hinter); return JSON.parse(cached); }

    let user;

    try {
      const dbStart = performance.now();
      [user] = await getUserByEmail(email);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat mengambil data pengguna");
    }

    if (!user.length) {
      logger.warn(`${hinter} FAILED USER NOT FOUND`);
      throw new NotFoundError("Pengguna tidak ditemukan");
    }

		await redis().set(`useremail:${email}`, JSON.stringify(user), "EX", 3600)
    checkRuntimeLatency(processStart, hinter);
    return user;
}

async function updateUserUsernameService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE USER USERNAME]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

		const { username, user_id } = payload;
    let isUpdated;

    try {
      const dbStart = performance.now();
      [isUpdated] = await updateUserUsername(username, user_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat memperbarui username pengguna");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal memperbarui username pengguna");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
}

async function updateUserEmailService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE USER EMAIL]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

		const { email, user_id } = payload
    let isUpdated;

    try {
      const dbStart = performance.now();
      [isUpdated] = await updateUserEmail(email, user_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat memperbarui email pengguna");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal memperbarui email pengguna");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
}

async function updateUserPasswordService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE USER PASSWORD]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

		const { password, user_id } = payload
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
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat memperbarui password pengguna");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal memperbarui password pengguna");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
}

async function updateUserRoleService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE USER ROLE]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

		const { role, user_id } = payload;
    let isUpdated;

    try {
      const dbStart = performance.now();
      [isUpdated] = await updateUserRole(role, user_id);
      checkDbLatency(dbStart, 400, hinter);
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
}

async function updateUserProfilePictureService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE USER PROFILE PICTURE]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

		const { profile_picture, user_id } = payload
    let isUpdated;
    try {
      const dbStart = performance.now();
      [isUpdated] = await updateUserProfilePicture(profile_picture, user_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat memperbarui foto profil pengguna");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal memperbarui foto profil pengguna");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
}

async function deleteUserService(payload) {
  const processStart = performance.now();
  const hinter = "[DELETE USER]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

		const { user_id } = payload
    let isDeleted;

    try {
      const dbStart = performance.now();
      [isDeleted] = await deleteUser(user_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat menghapus pengguna");
    }

    if (!isDeleteSuccess(isDeleted)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal menghapus pengguna");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
}

module.exports = {
  getUserByIdService,
  getUserByEmailService,
  updateUserUsernameService,
  updateUserEmailService,
  updateUserPasswordService,
  updateUserRoleService,
  updateUserProfilePictureService,
  deleteUserService,
};
