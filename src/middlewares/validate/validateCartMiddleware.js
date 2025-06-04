const {
  validateGetCart,
  validateAddCart,
  validateUpdateCart,
  validateDeleteCart } = require("../../utils/validate/validateCart/validateCart.js")

const createError = require("../../utils/createError.js")

const validateGetCartMiddleware = async (err,req,res,next) => {
  const { error } = validateGetCart(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

const validateAddCartMiddleware = async (err,req,res,next) => {
  const { error } = validateAddCart(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

const validateUpdateCartMiddleware = async (err,req,res,next) => {
  const { error } = validateUpdateCart(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

const validateDeleteCartMiddleware = async (err,req,res,next) => {
  const { error } = validateDeleteCart(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

module.exports = {
  validateGetCartMiddleware,
  validateAddCartMiddleware,
  validateUpdateCardMiddleware,
  validateDeleteCardMiddleware
}
