const db = require("./db.js")


async function getAllOrder(){
  return await db.execute("SELECT * FROM orders")
}
async function getAllUser(){
  return await db.execute("SELECT * FROM users")
}

async function getAllPayment(){
  return await db.execute("SELECT * FROM payments")
}

async function getAllProduct(){
  return await db.execute("SELECT * FROM products")
}

async function getAllStats() {
  return await db.execute(`
  SELECT
    (SELECT COUNT(*) FROM users) AS total_users,
    (SELECT COUNT(*) FROM products) AS total_product,
    (SELECT COUNT(*) FROM orders) AS total_order
  `);
}

async function getUserStats() {
  return await db.execute(`
  SELECT
    (SELECT COUNT(*) FROM users WHERE role = "user") AS total_user,
    (SELECT COUNT(*) FROM users WHERE role = "admin") AS total_admin
  `)
}

async function getOrderStats() {
  return await db.execute(`
  SELECT
    (SELECT COUNT(*) FROM orders WHERE order_status = "pending") AS total_pending_order,
    (SELECT COUNT(*) FROM orders WHERE order_status = "paid") AS total_paid_order,
    (SELECT COUNT(*) FROM orders WHERE order_status = "cancelled") AS total_cancelled_order,
    (SELECT COUNT(*) FROM orders WHERE order_status = "failed") AS total_failed_order,
    (SELECT COUNT(*) FROM orders WHERE order_status = "expired") AS total_expired_order

  `)
}

async function getProductStats() {
  return await db.execute(`
  SELECT
    (SELECT COUNT(*) FROM products WHERE item_category = "food") AS total_food_product,
    (SELECT COUNT(*) FROM products WHERE item_category = "drink") AS total_drink_product,
    (SELECT COUNT(*) FROM products WHERE item_category = "accessory") AS  total_accessory_product,
    (SELECT COUNT(*) FROM products WHERE item_category = "electronic") AS total_electronic_product,
    (SELECT COUNT(*) FROM products WHERE item_category = "clothing") AS total_clothing_product,
    (SELECT COUNT(*) FROM products WHERE item_category = "furniture") AS total_furniture_product,
    (SELECT COUNT(*) FROM products WHERE item_category = "beauty") AS total_beauty_product,
    (SELECT COUNT(*) FROM products WHERE item_category = "healty") AS total_healty_product,
    (SELECT COUNT(*) FROM products WHERE item_category = "toy") AS total_toy_product,
    (SELECT COUNT(*) FROM products WHERE item_category = "sport") AS total_sport_product,
    (SELECT COUNT(*) FROM products WHERE item_category = "automotive") AS total_automotive_product,
    (SELECT COUNT(*) FROM products WHERE item_category = "other") AS total_other_product,

    (SELECT COUNT(*) FROM products WHERE item_price <= 100000) AS total_lowprice_product,
    (SELECT COUNT(*) FROM products WHERE item_price >= 100000 AND item_price <= 500000) AS total_midprice_product,
    (SELECT COUNT(*) FROM products WHERE item_price >= 500000) AS total_highprice_product
  `)
}

module.exports = {
  getAllStats,
  getOrderStats,
  getUserStats,
  getProductStats
}
