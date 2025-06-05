const logger = require("../utils/logger.js");
const { isUpdateSuccess, isInsertSuccess, isDeleteSucces } = require("../utils/isQuerySuccess.js")
const {
  getOrderById,
  createOrder,
  updateOrder,
  removeOrder
} = require("../models/orderModel.js");

async function getOrderService(order_id) {
  const [[row]] = await getOrderById(order_id);
  if (!row) {
    logger.info(`[orders] SELECT FAILED order_id: ${order_id}`);
    throw new Error("Pesanan tidak ditemukan");
  }
  return row;
}

async function addOrderService(body) {
  const order_id = path.join("ORD-", uuidv4())
  const { user_id, total_price, status } = body
  const [isInserted] = await createOrder(user_id, order_id, total_price, status);
  if (!isInsertSuccess(isInserted)) {
    logger.info(`[orders] INSERT FAILED order_id: ${order_id}`);
    throw new Error("Gagal membuat pesanan");
  }
  return isInsertSuccess(isInserted);
}

async function updateOrderService(body) {
  const [isUpdated] = await updateOrder(body);
  if (!isUpdateSuccess(isUpdated)) {
    logger.info(`[orders] UPDATE FAILED order_id: ${body.order_id}`);
    throw new Error("Gagal memperbarui pesanan");
  }
  return isUpdateSuccess(isUpdated)
}

async function deleteOrderService(body) {
  const { user_id, order_id } = body
  const [isDeleted] = await deleteOrder(user_id, order_id);
  if (!isDeleteSuccess(isDeleted)) {
    logger.info(`[orders] DELETE FAILED order_id: ${order_id}`);
    throw new Error("Gagal menghapus pesanan");
  }
  return isDeleteSuccess(isDeleted)
}

module.exports = {
  getOrderService,
  addOrderService,
  updateOrderService,
  deleteOrdeServicer
};
