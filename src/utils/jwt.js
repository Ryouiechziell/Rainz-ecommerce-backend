const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "30d" });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
