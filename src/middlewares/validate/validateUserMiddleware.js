const createError = require("../../utils/createError.js")
const { validateGetUser, validateUpdateUser, validateDeleteUser } = require("../../utils/validate/validate/validateUser/validateUser.js")

const validateGetUserMiddleware = async (err,req,res,next) => {
  const { error } = validateGetUser(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

const validateUpdateUserMiddleware = async (err,req,res,next) => {
  const { error } = validateUpdateUser(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

const validateDeleteUserMiddleware = async (err,req,res,next) => {
  const { error } = validateDeleteUser(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

module.exports = {
  validateGetUserMiddleware,
  validateUpdateUserMiddleware,
  validateDeleteUserMiddleware
}
