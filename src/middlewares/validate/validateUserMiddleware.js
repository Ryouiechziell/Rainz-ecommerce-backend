const createValidationMiddleware = require("../../utils/createValidationMiddleware.js")
const {
  validateGetUser,
  validateUpdateUserUsername,
  validateUpdateUserEmail,
  validateUpdateUserPassword,
  validateUpdateUserRole,
  validateUpdateUserProfilePicture,
  validateDeleteUser
} = require("../../utils/validate/validateUser/validateUser.js")

module.exports = {
  validateGetUserMiddleware: createValidationMiddleware(validateGetUser),
  validateUpdateUserUsernameMiddleware: createValidationMiddleware(validateUpdateUserUsername),
  validateUpdateUserEmailMiddleware: createValidationMiddleware(validateUpdateUserEmail),
  validateUpdateUserPasswordMiddleware: createValidationMiddleware(validateUpdateUserPassword),
  validateUpdateUserRoleMiddleware: createValidationMiddleware(validateUpdateUserRole),
  validateUpdateUserProfilePictureMiddleware: createValidationMiddleware(validateUpdateUserProfilePicture),
  validateDeleteUserMiddleware: createValidationMiddleware(validateDeleteUser),
}
