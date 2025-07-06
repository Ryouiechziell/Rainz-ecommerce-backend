const Joi = require('joi');
const {
  userIdUpdateSchema,
  userUsernameUpdateSchema,
  userEmailUpdateSchema,
  userPasswordUpdateSchema,
  userRoleUpdateSchema,
  userProfilePictureUpdateSchema } = require("./userUpdateSchema.js")

const getUserSchema = Joi.object({
  user_id: Joi.string()
    .optional(),
  email: Joi.string()
    .email()
    .optional()
    .messages({
      'string.email': 'Format email tidak valid'
    })
}).or('user_id', 'email').messages({
  'object.missing': 'Harus menyertakan user_id atau email'
});

/*const getAllUserSchema = Joi.object({
  role: Joi.string()
    .required()
    .valid("user","admin")
    .messages({
      'any.required': 'Harus menyertakan role',
      'any.only': 'Role hanya boleh admin atau user'
    })
})*/

const updateUsernameSchema = Joi.object({
  user_id: userIdUpdateSchema,
  username: userUsernameUpdateSchema.required()})

const updateEmailSchema = Joi.object({
  user_id: userIdUpdateSchema,
  email: userEmailUpdateSchema.required()})

const updatePasswordSchema = Joi.object({
  user_id: userIdUpdateSchema,
  password: userPasswordUpdateSchema.required()})

const updateRoleSchema = Joi.object({
  user_id: userIdUpdateSchema,
  role: userRoleUpdateSchema.required()})

const updateProfilePictureSchema = Joi.object({
  user_id: userIdUpdateSchema,
  profile_picture: userProfilePictureUpdateSchema.required()})

const deleteUserSchema = Joi.object({
  user_id: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib untuk menghapus user'
    })
});

function validateGetUser(body){
  return getUserSchema.validate(body, { abortEarly: false })
}

/*function validateGetAllUser(body){
  return getAllUserSchema.validate(body, { abortEarly: false })
}*/

function validateUpdateUserUsername(body){
  return updateUsernameSchema.validate(body, { abortEarly: false })
}

function validateUpdateUserEmail(data){
  return updateEmailSchema.validate(data, {abortEarly: false})
}

function  validateUpdateUserPassword(data){
  return updatePasswordSchema.validate(data, {abortEarly: false})
}

function validateUpdateUserRole(data) {
  return updateRoleSchema.validate(data, {abortEarly: false})
}

function validateUpdateUserProfilePicture(data){
  return updateProfilePictureSchema.validate(data, {abortEarly: false})
}

function validateDeleteUser(body){
  return deleteUserSchema.validate(body, { abortEarly: false })
}

module.exports = {
  validateGetUser,
  validateUpdateUserUsername,
  validateUpdateUserEmail,
  validateUpdateUserPassword,
  validateUpdateUserRole,
  validateUpdateUserProfilePicture,
  validateDeleteUser
};
