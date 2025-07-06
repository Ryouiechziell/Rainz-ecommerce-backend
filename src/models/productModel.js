const db = require('./db');

async function getAllProductStock() {
  return await db.execute('SELECT item_id,item_stock FROM products');
}

async function addProduct(item_id, item_title, item_price, item_stock, item_description, item_category, item_cover) {
  return await db.execute(
    'INSERT INTO products (item_id, item_title, item_price, item_stock, item_description, item_category, item_cover) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [item_id, item_title, item_price, item_stock, item_description, item_category, item_cover]
  );
}

async function getProductByItemId(item_id) {
  return await db.execute('SELECT * FROM products WHERE item_id = ?', [item_id]);
}

async function updateProductTitle(item_title, item_id) {
  return await db.execute("UPDATE products SET item_title= ? WHERE item_id = ?",[item_title, item_id]);
}

async function updateProductPrice(item_price, item_id) {
  return await db.execute("UPDATE products SET item_price = ? WHERE item_id = ?",[item_price, item_id]);
}

async function updateProductStock(item_stock, item_id) {
  return await db.execute("UPDATE products SET item_stock = ? WHERE item_id = ?",[item_stock, item_id]);
}

async function updateProductDescription(item_description, item_id) {
  return await db.execute("UPDATE products SET item_description = ? WHERE item_id = ?",[item_description, item_id]);
}

async function updateProductCategory(item_category, item_id) {
  return await db.execute("UPDATE products SET item_category = ? WHERE item_id = ?",[item_category, item_id]);
}

async function updateProductCover(item_cover, item_id) {
  return await db.execute("UPDATE products SET item_cover = ? WHERE item_id = ?", [item_cover,item_id]);
}

async function deleteProduct(item_id) {
  return await db.execute('DELETE FROM products WHERE item_id = ?', [item_id]);
}

module.exports = {
  addProduct,
  getAllProductStock,
  getProductByItemId,
  updateProductTitle,
  updateProductPrice,
  updateProductStock,
  updateProductDescription,
  updateProductCategory,
  updateProductCover,
  deleteProduct };
