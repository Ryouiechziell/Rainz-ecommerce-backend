require("dotenv").config()
const logger = require("../utils/logger")
const jwt = require('jsonwebtoken');
const createError = require('../utils/createError');

const JWT_KEY = process.env.JWT_KEY;

function verifyToken(req, res, next) {
  const hinter = "[VERIFY TOKEN MIDDLEWARE]"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn(`${hinter} TOKEN DOES NOT EXIST`)
    return next(createError(400, 'Token tidak ditemukan atau format salah'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.role = decoded.role
    next();
  } catch (err) {
    logger.warn(`${hinter} TOKEN IS NOT VALID`)
    return next(createError(400, 'Token tidak valid atau kadaluarsa'));
  }
}

module.exports = verifyToken;
