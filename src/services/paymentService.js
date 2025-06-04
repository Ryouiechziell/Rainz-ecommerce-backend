const logger = require("../utils/logger.js");
const { isInsertSuccess,isUpdateSuccess,isDeleteSuccess } = require("../utils/isQuerySuccess")
const path = require("path");
const {v4: uuidv4} = require("uuid")
const {
  createPayment,
  getPaymentByPaymentId,
  updatePayment,
  deletePayment,
} = require("../models/paymentModel");

async function addPaymentService(body) {
  const { user_id, order_id, method, amount, status } = body;
  const payment_id = path.join("PAY-",uuidv4())
  const [isInserted] = await createPayment(payment_id, user_id, order_id, method, amount, status);
  if (!isInsertSuccess(isInserted)) {
    logger.info(`[payments] INSERT FAILED user_id: ${user_id}, order_id: ${order_id}`);
    throw new Error("Gagal membuat pembayaran");
  }
  return isInsertSuccess(isInserted);
}

async function getPaymentService(body) {
  const { payment_id, user_id } = body;

  const [[payment]] = await getPaymentByPaymentId(payment_id, user_id);
  if (!payment) {
    logger.info(`[payments] GET FAILED payment_id: ${payment_id}, user_id: ${user_id}`);
    throw new Error("Pembayaran tidak ditemukan");
  }
  return payment;
}

async function updatePaymentService(body) {
  const [isUpdated] = await updatePayment(body);
  if (!isUpdateSuccess(isUpdated)) {
    logger.info(`[payments] UPDATE FAILED payment_id: ${body.payment_id}, user_id: ${body.user_id}`);
    throw new Error("Gagal memperbarui data pembayaran");
  }
  return isUpdateSucces(isUpdated);
}

async function deletePaymentService(body) {
  const { payment_id, user_id } = body;

  const [isDeleted] = await deletePayment(payment_id, user_id);
  if (!isDeleteSuccess(isDeleted)) {
    logger.info(`[payments] REMOVE FAILED payment_id: ${payment_id}, user_id: ${user_id}`);
    throw new Error("Gagal menghapus data pembayaran");
  }
  return isDeleteSuccess(isDeleted);
}

module.exports = {
  addPaymentService,
  getPaymentService,
  updatePaymentService,
  deletePaymentService,
};
