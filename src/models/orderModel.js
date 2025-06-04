const db = require('./db');
const builderUpdateQuery3 = require('../utils/builderQueryUpdate3');

async function createOrder(user_id, order_id, total_price, status) {
  return await db.execute(
    'INSERT INTO orders (user_id, order_id, total_price, status) VALUES (?, ?, ?, ?)',
    [user_id, order_id, total_price, status]
  );
}

async function getOrderById(order_id) {
  return await db.execute(
    'SELECT * FROM orders WHERE order_id = ?',
    [order_id]
  );
}

async function updateOrder(body) {
  const updateQuery = builderUpdateQuery3(
    'orders',
    body,
    'user_id = ? AND order_id = ?',
    [body.user_id, body.order_id],
    ['user_id', 'order_id']
  );
  return await db.execute(updateQuery);
}

async function removeOrder(user_id, order_id) {
  return await db.execute(
    'DELETE FROM carts WHERE user_id = ? AND order_id = ?',
    [user_id, order_id]
  );
}

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  removeOrder
};
