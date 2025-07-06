const createError = require("../utils/createError")
const logger = require("../utils/logger")

const verifyAdmin = async (req, res, next) => {
  console.log(req.role)
  if(req.role === "admin") {
    logger.info("[VERIFY ADMIN MIDDLEWARE] ACCESS GRANTED CAUSE ROLE IS ADMIN")
    return next()
  }else{
    logger.info("[VERIFY ADMIN MIDDLEWARE] ACCESS DENIED CAUSE ROLE IS NOT ADMIN")
    next(createError(400,"Hanya admin yang boleh menggunakan fitur ini"))
  }
}

module.exports = verifyAdmin
