
class CustomError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    if (details) {
      this.details = details;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

function createError(statusCode, message, details = null) {
  return new CustomError(statusCode, message, details);
}

module.exports = createError;
