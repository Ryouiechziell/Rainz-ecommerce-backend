const db = require('./db.js');

async function findCartItem(user_id, item_id) {
  return await db.execute(
    'SELECT * FROM carts WHERE user_id = ? AND item_id = ?',
    [user_id, item_id]
  );
}

async function addCartItem(cart_id, user_id, item_id, item_quantity) {
  return await db.execute(
    'INSERT INTO carts (cart_id, user_id, item_id, item_quantity) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE item_quantity = item_quantity + VALUES(item_quantity);',
    [cart_id, user_id, item_id, item_quantity]
  );
}

async function updateCartItemQuantity(user_id, item_id, item_quantity) {
  return await db.execute(
    'UPDATE carts SET item_quantity = ? WHERE user_id = ? AND item_id = ?',
    [item_quantity, user_id, item_id]
  );
}

async function getCartByUserId(user_id) {
  return await db.execute(
    'SELECT * FROM carts WHERE user_id = ?',
    [user_id]
  );
}

async function deleteCartItem(user_id, item_id) {
  return await db.execute(
    'DELETE FROM carts WHERE user_id = ? AND item_id = ?',
    [user_id, item_id]
  );
}

module.exports = {
  findCartItem,
  getCartByUserId,
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem,
};
