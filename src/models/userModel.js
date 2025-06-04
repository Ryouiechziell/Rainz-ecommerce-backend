const db = require('./db');
const builderUpdateQuery3 = require('../utils/builderUpdateQuery3');

async function createUser(user_id, username, email, password, role) {
  return await db.execute(
    'INSERT INTO users (user_id, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
    [user_id, username, email, password, role]
  );
}

async function getUserById(user_id) {
  return await db.execute(
    'SELECT * FROM users WHERE user_id = ?',
    [user_id]
  );
}

async function getUserByEmail(email) {
  return await db.execute(
    'SELECT email FROM users WHERE email = ?',
    [email]
  );
}

async function getUserByEmailAndPassword(email, password) {
  return await db.execute(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password]
  );
}

async function updateUser(body) {
  const updateQuery = builderUpdateQuery3(
    'users',
    body,
    'user_id = ?',
    [body.user_id],
    ['user_id']
  );
  return await db.execute(updateQuery);
}

async function deleteUser(user_id) {
  return await db.execute(
    'DELETE FROM users WHERE user_id = ?',
    [user_id]
  );
}

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByEmailAndPassword,
  updateUser,
  deleteUser
};
