const  createError  = require("./createError")
const logger = require("./logger")

module.exports = (validateFunction) => {
  return async (req, res, next) => {
    logger.debug(`[VALIDATION MIDDLEWARE] REQUEST BODY: ${JSON.stringify(req.body,null,2)}`)

    try{
      const { error } = validateFunction(req.body)
      if (error) {
        const messages = error.details.map(e => e.message)
        logger.info(`[VALIDATION MIDDLEWARE] BAD REQUEST message: ${messages}`)
        return next(createError(400, messages))
      }
       logger.info("[VALIDATION MIDDLEWARE] SUCCESS VALIDATE  BODY")
      next()
    }catch(err){
      return next(createError(500))
    }
  }
}
