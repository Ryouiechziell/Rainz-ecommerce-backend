const db = require('./db');

async function createOrder(user_id, order_id, order_total_price, order_status) {
  return await db.execute(
    'INSERT INTO orders (user_id, order_id, order_total_price, order_status) VALUES (?, ?, ?, ?)',
    [user_id, order_id, order_total_price, order_status]
  );
}

async function getOrderByOrderId(order_id) {
  return await db.execute('SELECT * FROM orders WHERE order_id = ?',[order_id]);
}

async function getOrderByUserId(user_id) {
  return await db.execute("SELECT *  FROM orders WHERE user_id = ?",[user_id]);
}

async function updateOrderStatus(order_status,order_id) {
  return await db.execute("UPDATE orders SET order_status = ? WHERE order_id = ?",[order_status,order_id]);
}

async function updateOrderTotalPrice(order_total_price,order_id) {
  return await db.execute("UPDATE orders SET order_total_price = ? WHERE order_id = ?",[order_total_price,order_id]);
}

async function deleteOrder(user_id, order_id) {
  return await db.execute(
    'DELETE FROM orders WHERE user_id = ? AND order_id = ?',
    [user_id, order_id]
  );
}

async function addOrderItem(order_id, orderItems) {

  const values = []
  const placeholders = []

  for (const item of orderItems) {
    const item_total_price = item.item_price * item.item_quantity
    placeholders.push('(?, ?, ?, ?)');
    values.push(order_id, item.item_id, item.item_price, item.item_quantity);
  }

  const sql = `
    INSERT INTO order_items (order_id, item_id, item_price, item_quantity)
    VALUES ${placeholders.join(', ')}
  `;

  return await db.execute(sql, values);
}

module.exports = {
  createOrder,
  getOrderByOrderId,
  getOrderByUserId,
  updateOrderStatus,
  updateOrderTotalPrice,
  deleteOrder,
  addOrderItem
};
