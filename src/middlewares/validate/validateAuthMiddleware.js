const { validateUserRegister, validateUserLogin } = require("../../utils/validate/validateAuth/validateAuth.js")
const createError = require("../../utils/createError.js")

const validateUserRegisterMiddleware = async (err,req,res,next) => {
  const { error } = validateUserRegister(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

const validateUserLoginMiddleware = async (err,req,res,next) => {
  const { error } = validateUserLogin(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

console.log(validateUserRegisterMiddleware)
module.exports = {
  validateUserRegisterMiddleware,
  validateUserLoginMiddleware
}
