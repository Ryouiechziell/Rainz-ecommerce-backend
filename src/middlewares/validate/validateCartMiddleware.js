const createValidationMiddleware = require("../../utils/createValidationMiddleware.js")
const {
  validateGetCart,
  validateAddCart,
  validateUpdateCartItemQuantity,
  validateDeleteCart
} = require("../../utils/validate/validateCart/validateCart.js")

module.exports = {
  validateGetCartMiddleware: createValidationMiddleware(validateGetCart),
  validateAddCartMiddleware: createValidationMiddleware(validateAddCart),
  validateUpdateCartItemQuantityMiddleware: createValidationMiddleware(validateUpdateCartItemQuantity),
  validateDeleteCartMiddleware: createValidationMiddleware(validateDeleteCart)
}
