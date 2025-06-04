const db = require('./db');
const builderUpdateQuery3 = require("../utils/builderUpdateQuery3");

async function addProduct(item_id, item_title, item_price, item_stock, item_description, item_category, item_cover) {
  return await db.execute(
    'INSERT INTO products (item_id, item_title, item_price, item_stock, item_description, item_cover) VALUES (?, ?, ?, ?, ?, ?)',
    [item_id, item_title, item_price, item_stock, item_description, item_cover]
  );
}

async function getProductByItemId(item_id) {
  return await db.execute('SELECT * FROM products WHERE item_id = ?', [item_id]);
}

async function updateProduct(body) {
  const updateQuery = builderUpdateQuery3("products", body, "item_id = ?", [body.item_id], ["item_id"]);
  return await db.execute(updateQuery);
}

async function deleteProduct(item_id) {
  return await db.execute('DELETE FROM products WHERE item_id = ?', [item_id]);
}

module.exports = { addProduct, getProductByItemId, updateProduct, deleteProduct };
