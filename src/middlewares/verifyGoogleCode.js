const createError = require("../utils/createError")
const logger = require("../utils/logger")

module.exports = (req, res, next) => {

  if(!req?.query?.code) {
    logger.warn("[VERIFY GOOGLE CODE QUERY] CODE DOES NOT EXIST")
    next(createError(400, "Query code dari google tidak ditemukan"))
  }

  logger.info("[VERIFY GOOGLE CODE QUERY] GOOGLE QUERY CODE EXIST")
  next()
}
