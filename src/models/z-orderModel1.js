const db = require('./db');
const logger = require('../utils/logger');
const builderUpdateQuery3 = require("../utils/builderQueryUpdate3")

async function createOrder(user_id, order_id, total_price, status) {
  try {
    const [result] = await db.execute(
      'INSERT INTO orders (user_id, order_id, total_price, status) VALUES (?, ?, ?, ?)',
      [user_id, order_id, total_price, status]
    );
    return result.affectedRows === 1;
  } catch (err) {
    logger.error(`CreateOrder Error: ${err.message}`);
    return false;
  }
}

async function getOrderById(order_id) {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM orders WHERE order_id = ?', [order_id]);
    return rows[0] || null;
  } catch (err) {
    logger.error(`GetOrder Error: ${err.message}`);
    return null;
  }
}

async function updateOrder(body) {
  try {
    const updateQuery = builderUpdateQuery3(
      "orders", body, "user_id = ? AND order_id = ?",
      [body.user_id, body.order_id],["user_id","order_id"]
    )
    const [result] = await db.execute(updateQuery);
    return result.affectedRows > 0;
  } catch (err) {
    logger.error(`UpdateUser Error: ${err.message}`);
    return false;
  }
}

async function removeOrder(user_id, order_id) {
  try {
    const [result] = await db.execute('DELETE FROM carts WHERE user_id = ? AND order_id = ?', [user_id, order_id]);
    return result.affectedRows > 0;
  } catch (err) {
    logger.error(`RemoveFromCart Error: ${err.message}`);
    return false;
  }
}

module.exports = { createOrder, getOrderById, updateOrders };
