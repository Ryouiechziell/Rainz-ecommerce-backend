const createValidationMiddleware = require("../../utils/createValidationMiddleware.js")
const {
  validateGetOrder,
  validateAddOrder,
  validateUpdateOrderStatus,
  validateUpdateOrderTotalPrice,
  validateDeleteOrder
} = require("../../utils/validate/validateOrder/validateOrder.js")

module.exports = {
  validateGetOrderMiddleware: createValidationMiddleware(validateGetOrder),
  validateAddOrderMiddleware: createValidationMiddleware(validateAddOrder),
  validateUpdateOrderStatusMiddleware: createValidationMiddleware(validateUpdateOrderStatus),
  validateUpdateOrderTotalPriceMiddleware: createValidationMiddleware(validateUpdateOrderTotalPrice),
  validateDeleteOrderMiddleware: createValidationMiddleware(validateDeleteOrder)
}
