const Joi = require("joi")

const cartUserIdUpdateSchema =  Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi untuk update'
    })

 const cartItemIdUpdateSchema = Joi.string()
    .required()
    .messages({
      'any.required': 'Item ID wajib diisi untuk update'
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
  cartUserIdUpdateSchema,
  cartItemIdUpdateSchema,
  cartQuantityUpdateSchema
}
