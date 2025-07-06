const Joi = require('joi');
const {
  cartQuantityUpdateSchema,
  cartUserIdUpdateSchema,
  cartItemIdUpdateSchema } = require("./cartUpdateSchema.js")

const getCartSchema = Joi.object({
  user_id: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi'
    })
})


const addCartSchema = Joi.object({
  user_id: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi'
    }),
  item_id: Joi.string()
    .required()
    .messages({
      'any.required': 'Item ID wajib diisi'
    }),
  item_quantity: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'any.required': 'Jumlah barang (quantity) wajib diisi',
      'number.base': 'Quantity harus berupa angka',
      'number.integer': 'Quantity harus bilangan bulat',
      'number.min': 'Quantity minimal 1'
    })
});

const updateCartItemQuantitySchema = Joi.object({
  user_id: cartUserIdUpdateSchema,
  item_id: cartItemIdUpdateSchema,
  item_quantity: cartQuantityUpdateSchema.required()})

const deleteCartSchema = Joi.object({
  user_id: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi untuk penghapusan',
    }),
  item_id: Joi.string()
    .required()
    .messages({
      'any.required': 'Item ID wajib diisi untuk penghapusan'
    })
});

function validateGetCart(body){
   console.log(body)
  return getCartSchema.validate(body, {abortEarly: false})
}

function validateAddCart(body){
  return addCartSchema.validate(body, {abortEarly: false})
}

function validateUpdateCartItemQuantity(body){
  return updateCartItemQuantitySchema.validate(body, { abortEarly: false })
}

function validateDeleteCart(body){
  return deleteCartSchema.validate(body, { abortEarly: false})
}

module.exports = {
  validateGetCart,
  validateAddCart,
  validateUpdateCartItemQuantity,
  validateDeleteCart
};
