const db = require('../db');
const builderUpdateQuery3 = require('../utils/builderUpdateQuery3');

async function createPayment(payment_id, user_id, order_id, method, amount, status) {
  return await db.execute(
    'INSERT INTO payments (payment_id, user_id, order_id, method, amount, status) VALUES (?, ?, ?, ?, ?, ?)',
    [payment_id, user_id, order_id, method, amount, status]
  );
}

async function getPaymentByPaymentId(payment_id) {
  return await db.execute(
    'SELECT * FROM payments WHERE payment_id = ?',
    [payment_id]
  );
}

async function updatePayment(body) {
  const updateQuery = builderUpdateQuery3(
    "payments",
    body,
    "payment_id = ? AND user_id = ?",
    [body.payment_id, body.user_id],
    ["payment_id", "user_id", "order_id"]
  );
  return await db.execute(updateQuery);
}

async function deletePayment(payment_id, user_id) {
  return await db.execute(
    'DELETE FROM payments WHERE payment_id = ? AND user_id = ?',
    [payment_id, user_id]
  );
}

module.exports = {
  createPayment,
  getPaymentById,
  updatePayment,
  deletePayment
};
