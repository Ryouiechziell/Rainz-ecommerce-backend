const Joi = require("joi")

const userIdUpdateSchema =  Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi untuk update',
      'string.uuid': 'User ID harus berupa UUID yang valid'
    })

 const itemIdUpdateSchema = Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'Item ID wajib diisi untuk update',
      'string.uuid': 'Item ID harus berupa UUID yang valid'
    })

 const cartQuantityUpdateSchema = Joi.number()
    .integer()
    .min(1)
    .messages({
      'number.base': 'Quantity harus berupa angka',
      'number.integer': 'Quantity harus bilangan bulat',
      'number.min': 'Quantity minimal 1'
    })

module.exports = {
  userIdUpdateSchema,
  itemIdUpdateSchema,
  cartQuantityUpdateSchema
}
