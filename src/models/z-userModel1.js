const db = require('./db');
const logger = require('../utils/logger');
const builderUpdateQuery3 = require("../utils/builderUpdateQuery3"

async function createUser(user_id, username, email, password, role) {
  try {
    const [result] = await db.execute(
      'INSERT INTO users (user_id, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [user_id, username, email, password, role]
    );
    return result.affectedRows === 1;
  } catch (err) {
    logger.error(`CreateUser Error: ${err.message}`);
    return false;
  }
}

async function getUserById(user_id) {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ?', [user_id]);
    return rows[0] || null;
  } catch (err) {
    logger.error(`GetUser Error: ${err.message}`);
    return null;
  }
}

async function getUserByEmail(email) {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  } catch (err) {
    logger.error(`GetUser Error: ${err.message}`);
    return null;
  }
}

async function getUserByEmailAndPassword(email, password) {
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    return rows[0] || null;
  } catch (err) {
    logger.error(`GetUser Error: ${err.message}`);
    return null;
  }
}

async function updateUser(body) {
  try {
    const updateQuery = builderUpdateQuery3("users", body, "user_id = ?", [body.user_id],["user_id"])
    const [result] = await db.execute(updateQuery);
    return result.affectedRows > 0;
  } catch (err) {
    logger.error(`UpdateUser Error: ${err.message}`);
    return false;
  }
}

async function deleteUser(user_id) {
  try {
    const [result] = await db.execute('DELETE FROM users WHERE user_id = ?', [user_id]);
    return result.affectedRows > 0;
  } catch (err) {
    logger.error(`DeleteUser Error: ${err.message}`);
    return false;
  }
}

module.exports = { createUser, getUserById, getUserByEmail, getUserByEmailAndPassword, updateUser, deleteUser };
