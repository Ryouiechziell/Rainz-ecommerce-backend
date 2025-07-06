const db = require('./db');

async function createUser(user_id, username, email, password, role, pircture) {
  return await db.execute(
    'INSERT INTO users (user_id, username, email, password, role, profile_picture) VALUES (?, ?, ?, ?, ?, ?)',
    [user_id, username, email, password, role, picture]
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
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
}

async function getUserByEmailAndPassword(email, password) {
  return await db.execute(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password]
  );
}

async function updateUserUsername(username, user_id) {
  return await db.execute("UPDATE users SET username = ? WHERE user_id = ?",[username, user_id]);
}

async function updateUserEmail(email, user_id) {
  return await db.execute("UPDATE users SET email = ? WHERE user_id = ?",[email, user_id]);
}

async function updateUserPassword(password, user_id) {
  return await db.execute("UPDATE users SET password = ? WHERE user_id = ?",[password, user_id]);
}

async function updateUserRole(role, user_id) {
  return await db.execute("UPDATE users SET role = ? WHERE user_id = ?",[role, user_id]);
}

async function updateUserProfilePicture(profile_picture, user_id) {
  return await db.execute("UPDATE users SET profile_picture = ? WHERE user_id = ?",[profile_picture, user_id]);
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
  updateUserUsername,
  updateUserEmail,
  updateUserPassword,
  updateUserRole,
  updateUserProfilePicture,
  deleteUser
};
