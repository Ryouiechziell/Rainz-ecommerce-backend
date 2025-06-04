const db = require('./db');
const logger = require('../utils/logger');
const builderUpdateQuery3 = require("../utils/builderUpdateQuery3.js")

async function addToCart(user_id, item_id, quantity) {
  try {
    const [rows] = await db.execute(
      'SELECT quantity FROM carts WHERE user_id = ? AND item_id = ?',
      [user_id, item_id]
    );

    if (rows.length > 0) {
      const currentQty = rows[0].quantity;
      const newQty = currentQty + quantity;

      const [updateResult] = await db.execute(
        'UPDATE carts SET quantity = ? WHERE user_id = ? AND item_id = ?',
        [newQty, user_id, item_id]
      );

      return updateResult.affectedRows > 0;
    } else {
      const [insertResult] = await db.execute(
        'INSERT INTO carts (user_id, item_id, quantity) VALUES (?, ?, ?)',
        [user_id, item_id, quantity]
      );

      return insertResult.affectedRows === 1;
    }
  } catch (err) {
    logger.error(`AddToCart Error: ${err.message}`);
    return false;
  }
}

async function getCartById(user_id) {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM carts WHERE user_id = ?',
      [user_id]
    );
    return rows;
  } catch (err) {
    logger.error(`GetCart Error: ${err.message}`);
    return null;
  }
}

async function updateCart(body) {
  try {
    const updateQuery = builderUpdateQuery3('carts',body,'user_id = ? AND item_id = ?',[body.user_id, body.item_id],["user_id","item_id"])
    const [result] = await db.execute(updateQuery);
    return result.affectedRows > 0;
  } catch (err) {
    logger.error(`UpdateUser Error: ${err.message}`);
    return false;
  }
}

async function removeFromCart(user_id, item_id) {
  try {
    const [result] = await db.execute('DELETE FROM carts WHERE user_id = ? AND item_id = ?', [user_id, item_id]);
    return result.affectedRows > 0;
  } catch (err) {
    logger.error(`RemoveFromCart Error: ${err.message}`);
    return false;
  }
}

module.exports = { addToCart, updateCart, getCartByUser, removeFromCart };
