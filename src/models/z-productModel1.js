const db = require('./db');
const logger = require('../utils/logger');
const builderUpdateQuery3 = require("../utils/builderUpdateQuery3")

async function createProduct(item_id, item_title, item_price, item_stock, item_cover) {
  try {
    const [result] = await db.execute(
      'INSERT INTO products (item_id, item_title, item_price, item_stock, item_cover) VALUES (?, ?, ?, ?, ?)',
      [item_id, item_title, item_price, item_stock, item_cover]
    );
    return result.affectedRows === 1;
  } catch (err) {
    logger.error(`CreateProduct Error: ${err.message}`);
    return false;
  }
}

async function getProductById(item_id) {
  try {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [item_id]);
    return rows[0] || null;
  } catch (err) {
    logger.error(`GetProduct Error: ${err.message}`);
    return null;
  }
}

async function updateProduct(body) {
  try {
    const updateQuery = builderUpdateQuery3("products",body,"item_id = ?",[body.item_id],["item_id"])
    const [result] = await db.execute(updateQuery);
    return result.affectedRows > 0;
  } catch (err) {
    logger.error(`UpdateProduct Error: ${err.message}`);
    return false;
  }
}

async function deleteProduct(item_id) {
  try {
    const [result] = await db.execute('DELETE FROM products WHERE item_id = ?', [item_id]);
    return result.affectedRows > 0;
  } catch (err) {
    logger.error(`DeleteProduct Error: ${err.message}`);
    return false;
  }
}

module.exports = { createProduct, getProductById, updateProduct, deleteProduct };
