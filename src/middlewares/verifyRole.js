const createError = require("../utils/createError")
const logger = require("../utils/logger")

module.exports = (req, res, next) => {
  if(req.role === "admin") {
    logger.info("[VERIFY ADMIN MIDDLEWARE] ACCESS GRANTED")
    return next()
  }else{
    logger.info("[VERIFY ADMIN MIDDLEWARE] ACCESS DENIED")
    next(createError(400,"Hanya admin yang boleh menggunakan fitur ini"))
  }
}
