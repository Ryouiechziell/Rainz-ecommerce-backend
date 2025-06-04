const logger = require("../utils/logger.js");
const {
  getOrderById,
  createOrder,
  updateOrder,
  removeOrder
} = require("../models/orderModel.js");

async function getOrderService(order_id) {
  const row = await getOrderById(order_id);
  if (!row) {
    logger.info(`[orders] SELECT FAILED order_id: ${order_id}`);
    throw new Error("Pesanan tidak ditemukan");
  }
  return row;
}

async function addOrderService(body) {
  const order_id = path.join("ORD-", uuidv4())
  const { user_id, total_price, status } = body
  const result = await createOrder(user_id, order_id, total_price, status);
  if (!result) {
    logger.info(`[orders] INSERT FAILED order_id: ${order_id}`);
    throw new Error("Gagal membuat pesanan");
  }
  return result;
}

async function updateOrderService(body) {
  const result = await updateOrder(body);
  if (!result) {
    logger.info(`[orders] UPDATE FAILED order_id: ${body.order_id}`);
    throw new Error("Gagal memperbarui pesanan");
  }
  return result;
}

async function deleteOrderService(body) {
  const { user_id, order_id }
  const result = await deleteOrder(user_id, order_id);
  if (!result) {
    logger.info(`[orders] DELETE FAILED order_id: ${order_id}`);
    throw new Error("Gagal menghapus pesanan");
  }
  return result;
}

module.exports = {
  getOrderService,
  addOrderService,
  updateOrderService,
  deleteOrdeServicer
};
