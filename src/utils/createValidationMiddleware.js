const  createError  = require("./createError")
const logger = require("./logger")

const createValidationMiddleware = (validateFunction) => {
  return async (req, res, next) => {
    console.log(req.body)
    logger.debug(`[VALIDATION MIDDLEWARE] REQUEST BODY: ${req.body}`)

    try{
      const { error } = validateFunction(req.body)
      if (error) {
        const messages = error.details.map(e => e.message)
        logger.info(`[VALIDATION MIDDLEWARE] REQUEST BODY IS NOT VALID message: ${messages}`)
        return next(createError(400, messages))
      }
       logger.info("[VALIDATION MIDDLEWARE] SUCCESS VALIDATE REQUEST BODY")
      next()
    }catch(err){
      return next(createError(500))
    }
  }
}

module.exports = createValidationMiddleware
