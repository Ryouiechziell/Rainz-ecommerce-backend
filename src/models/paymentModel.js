const db = require('./db.js');

async function createPayment(payment_id, user_id, order_id, payment_method, payment_amount, payment_status) {
  return await db.execute(
    'INSERT INTO payments (payment_id, user_id, order_id, payment_method, payment_amount, payment_status) VALUES (?, ?, ?, ?, ?, ?)',
    [payment_id, user_id, order_id, payment_method, payment_amount, payment_status]
  );
}

async function getPaymentByPaymentId(payment_id) {
  return await db.execute(
    'SELECT * FROM payments WHERE payment_id = ?',
    [payment_id]
  );
}

async function getPaymentByUserId(user_id) {
  return await db.execute(
    'SELECT * FROM payments WHERE user_id = ?',
    [user_id]
  );
}

async function getPaymentByOrderId(order_id) {
  return await db.execute(
    'SELECT * FROM payments WHERE order_id = ?',
    [order_id]
  );
}

async function updatePaymentStatus(payment_status,payment_id) {
  return await db.execute("UPDATE payments SET payment_status = ? WHERE payment_id = ?",[payment_status,payment_id]);
}

async function updatePaymentAmount(payment_amount,payment_id) {
  return await db.execute("UPDATE payments SET payment_amount = ? WHERE payment_id = ?",[payment_amount,payment_id]);
}

async function updatePaymentMethod(payment_method,payment_id) {
  return await db.execute("UPDATE payments SET payment_method = ? WHERE payment_id  = ?",[payment_method,payment_id]);
}

async function deletePayment(payment_id, user_id) {
  return await db.execute(
    'DELETE FROM payments WHERE payment_id = ? AND user_id = ?',
    [payment_id, user_id]
  );
}

module.exports = {
  createPayment,
  getPaymentByPaymentId,
  getPaymentByUserId,
  getPaymentByOrderId,
  updatePaymentStatus,
  updatePaymentAmount,
  updatePaymentMethod,
  deletePayment
};
