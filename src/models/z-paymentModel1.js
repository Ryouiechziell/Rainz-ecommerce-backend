const db = require('../db');
const logger = require('../utils/logger');

async function createPayment(payment_id, user_id, order_id, method, amount, status) {
  try {
    const [result] = await db.execute(
      'INSERT INTO payments (payment_id, user_id, order_id, method, amount) VALUES (?, ?, ?, ?, ?)',
      [payment_id, user_id, order_id, method, amount, status]
    );
    return result.affectedRows === 1;
  } catch (err) {
    logger.error(`CreatePayment Error: ${err.message}`);
    return false;
  }
}

async function getPaymentById(payment_id) {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM payments WHERE payment_id = ?', [payment_id]);
    return rows[0] || null;
  } catch (err) {
    logger.error(`GetPayment Error: ${err.message}`);
    return null;
  }
}

async function updateUser(body) {
  try {
    const builderUpdateQuery3(
      "payments", body, "payment_id = ? AND user_id = ?",
      [body.payment_id, body.user_id],
      ["payment_id", "user_id", "order_id"]
    )
    const [result] = await db.execute()
    return result.affectedRows > 0;
  } catch (err) {
    logger.error(`UpdateUser Error: ${err.message}`);
    return false;
  }
}

async function removePayment(payment_id, user_id) {
  try {
    const [result] = await db.execute('DELETE FROM carts WHERE payment_id = ? AND user_id = ?', [payment_id, user_id]);
    return result.affectedRows > 0;
  } catch (err) {
    logger.error(`RemoveFromCart Error: ${err.message}`);
    return false;
  }
}

module.exports = { createPayment, getPaymentByOrder, updatePayment, removePayment};
