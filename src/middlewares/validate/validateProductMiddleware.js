const createError = require("../../utils/createError.js")
const { validateGetProduct, validateAddProduct,validateUpdateProduct, validateDeleteProduct } = require("../../utils/validate/validate/validateProduct/validateProduct.js")

const validateGetProductMiddleware = async (err,req,res,next) => {
  const { error } = validateGetProduct(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

const validateAddProductMiddleware = async (err,req,res,next) => {
  const { error } = validateAddProduct(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

const validateUpdateProductMiddleware = async (err,req,res,next) => {
  const { error } = validateUpdateProduct(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

const validateDeleteProductMiddleware = async (err,req,res,next) => {
  const { error } = validateDeleteProduct(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return next(createError(402,messages))
  }
  next()
}

module.exports = {
  validateGetProductMiddleware,
  validateAddProductMiddleware,
  validateUpdateProductMiddleware,
  validateDeleteProductMiddleware
}

