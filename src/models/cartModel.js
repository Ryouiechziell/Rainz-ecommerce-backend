const db = require('./db');
const builderUpdateQuery3 = require("../utils/builderUpdateQuery3");

async function findCartItem(user_id, item_id) {
  return await db.execute(
    'SELECT * FROM carts WHERE user_id = ? AND item_id = ?',
    [user_id, item_id]
  );
}

async function insertCartItem(user_id, item_id, quantity) {
  return await db.execute(
    'INSERT INTO carts (user_id, item_id, quantity) VALUES (?, ?, ?)',
    [user_id, item_id, quantity]
  );
}

async function updateCartItemQuantity(user_id, item_id, quantity) {
  return await db.execute(
    'UPDATE carts SET quantity = ? WHERE user_id = ? AND item_id = ?',
    [quantity, user_id, item_id]
  );
}

async function getCartByUserId(user_id) {
  return await db.execute(
    'SELECT * FROM carts WHERE user_id = ?',
    [user_id]
  );
}

async function updateCartItem(body) {
  const updateQuery = builderUpdateQuery3(
    'carts',
    body,
    'user_id = ? AND item_id = ?',
    [body.user_id, body.item_id],
    ['user_id', 'item_id']
  );
  return await db.execute(updateQuery);
}

async function deleteCartItem(user_id, item_id) {
  return await db.execute(
    'DELETE FROM carts WHERE user_id = ? AND item_id = ?',
    [user_id, item_id]
  );
}

module.exports = {
  findCartItem,
  insertCartItem,
  updateCartItemQuantity,
  getCartByUserId,
  updateCartItem,
  deleteCartItem,
};
