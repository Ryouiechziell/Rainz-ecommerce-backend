const Joi = require('joi');
const {
  userIdUpdateSchema,
  userUsernameUpdateSchema,
  userEmailUpdateSchema,
  userPasswordUpdateSchema,
  userRoleUpdateSchema,
  userImageUrlUpdateSchema } = require("./userUpdateSchema.js")

const getUserSchema = Joi.object({
  user_id: Joi.string()
    .uuid()
    .optional()
    .messages({
      'string.uuid': 'User ID harus berupa UUID yang valid'
    }),
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


const updateUserSchema = (options) => {
  Joi.object({
  user_id: UserUserIdUpdateSchema,
  username: options?.username ?
    userUsernameUpdateSchema.required() : userUsernameUpdateSchema.optional(),

  email: options?.email ?
    userEmailUpdateSchema.required() : userEmailUpdateSchema.optional(),

  password: options?.password ?
    userPasswordUpdateSchema.required() : userPasswordUpdateSchema.optional(),

  role: options?.role ?
    userRoleUpdateSchema.required() : userRoleUpdateSchema.optional(),

  user_image_url: options?.user_image_url ?
    userImageUrlUpdateSchema.required() : userImageUrlUpdateSchema.optional(),

  }).or('username', 'email', 'password', 'role', 'user_image_url');
}

const deleteUserSchema = Joi.object({
  user_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'User ID wajib untuk menghapus user',
      'string.uuid': 'User ID harus berupa UUID yang valid'
    })
});

function validateGetUser(body){
  return getUserSchema.validate(body, { abortEarly: false })
}

/*function validateGetAllUser(body){
  return getAllUserSchema.validate(body, { abortEarly: false })
}*/

function validateUpdateUser(body, options = {}){
  return getUpdateUserSchema(options).validate(body, { abortEarly: false })
}

/*function validateUpdateAllUser(body, options = {}){
  return deleteAllUserSchema(options).validate(body, { abortEarly: false })
}*/

function validateDeleteUser(body){
  return deleteUserSchema.validate(body, { abortEarly: false })
}

/*function validateDeleteAllUser(body){
  return deleteAllUserSchema.validate(body, { abortEarly: false })
}*/

module.exports = {
  validateGetUser,
  /*validateGetAllUser,*/
  validateUpdateUser,
  /*valodateUpdateAllUser,*/
  validateDeleteUser
  /*validateDeleteAlluser*/
};
