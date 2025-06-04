const logger = require("../utils/logger.js");
const { isInsertSuccess,isUpdateSuccess,isDeleteSuccess } = require("../utils/isQuerySuccess")
const {
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
} = require("../models/userModel.js");

async function getUserByIdService(body) {
  const [[user]] = await getUserById(body.user_id);
  if (!user) {
    logger.info(`[users] SELECT FAILED user_id: ${user_id}`);
    throw new Error("User tidak ditemukan dengan user_id ini");
  }
  return user;
}

async function getUserByEmailService(body) {
  const [[user]] = await getUserByEmail(body.email);
  if (!user) {
    logger.info(`[users] SELECT FAILED email: ${email}`);
    throw new Error("User tidak ditemukan dengan email ini");
  }
  return user;
}

async function updateUserService(body) {
  const [isUpdated] = await updateUser(body);
  if (!isUpdateSuccess(isUpdated)) {
    logger.info(`[users] UPDATE FAILED user_id: ${body.user_id}`);
    throw new Error("Gagal memperbarui data user");
  }
  return isUpdateSuccess(isUpdated);
}

async function deleteUserService(body) {
  const [isDeleted] = await deleteUser(body.user_id);
  if (!isDeleteSuccess(isDeleted)) {
    logger.info(`[users] DELETE FAILED user_id: ${user_id}`);
    throw new Error("Gagal menghapus user");
  }
  return isDeleteSuccess(IsDeleted);
}

module.exports = {
  getUserByIdService,
  getUserByEmailService,
  addUserService,
  updateUserService,
  deleteUserService
};
