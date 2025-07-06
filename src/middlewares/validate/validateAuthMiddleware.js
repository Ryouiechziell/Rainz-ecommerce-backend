const createValidationMiddleware = require("../../utils/createValidationMiddleware.js")
const {
  validateUserRegister,
  validateUserLogin
} = require("../../utils/validate/validateAuth/validateAuth.js")

module.exports = {
  validateUserRegisterMiddleware: createValidationMiddleware(validateUserRegister),
  validateUserLoginMiddleware: createValidationMiddleware(validateUserLogin)
}
