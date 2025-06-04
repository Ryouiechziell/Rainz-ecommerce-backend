require("dotenv").config()
const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');

const JWT_KEY = process.env.JWT_KEY;

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createError(401, 'Token tidak ditemukan atau format salah'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.userToken = decoded
    next();
  } catch (err) {
    return next(createError(403, 'Token tidak valid atau kadaluarsa'));
  }
}

module.exports = verifyToken;
