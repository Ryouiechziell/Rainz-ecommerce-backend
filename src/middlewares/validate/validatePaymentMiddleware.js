const createValidationMiddleware = require("../../utils/createValidationMiddleware.js")
const {
  validateGetPayment,
  validateAddPayment,
  validateUpdatePaymentStatus,
  validateUpdatePaymentAmount,
  validateUpdatePaymentMethod,
  validateDeletePayment
} = require("../../utils/validate/validatePayment/validatePayment")

module.exports = {
  validateGetPaymentMiddleware: createValidationMiddleware(validateGetPayment),
  validateAddPaymentMiddleware: createValidationMiddleware(validateAddPayment),
  validateUpdatePaymentStatusMiddleware: createValidationMiddleware(validateUpdatePaymentStatus),
  validateUpdatePaymentAmountMiddleware: createValidationMiddleware(validateUpdatePaymentAmount),
  validateUpdatePaymentMethodMiddleware: createValidationMiddleware(validateUpdatePaymentMethod),
  validateDeletePaymentMiddleware: createValidationMiddleware(validateDeletePayment)
}
