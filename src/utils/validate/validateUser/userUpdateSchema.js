const Joi = require("joi")

const userIdUpdateSchema = Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi'
    })

const userUsernameUpdateSchema = Joi.string()
    .min(3)
    .max(30)
    .messages({
      'string.min': 'Username minimal 3 karakter',
      'string.max': 'Username maksimal 30 karakter'
    })

const userEmailUpdateSchema = Joi.string()
    .email()
    .messages({
      'string.email': 'Format email tidak valid'
    })

const userPasswordUpdateSchema = Joi.string()
    .min(6)
    .messages({
      'string.min': 'Password minimal 6 karakter'
    })

const userRoleUpdateSchema  = Joi.string()
    .valid('user', 'admin')
    .messages({
      'any.only': 'Role hanya boleh "user" atau "admin"'
    })

const userProfilePictureUpdateSchema = Joi.string()
    .uri()
    .allow('')
    .messages({
      'string.uri': 'URL gambar tidak valid'
    })

module.exports = {
  userIdUpdateSchema,
  userUsernameUpdateSchema,
  userEmailUpdateSchema,
  userPasswordUpdateSchema,
  userRoleUpdateSchema,
  userProfilePictureUpdateSchema
}
