const Joi = require('joi');

const getCartSchema = Joi.object({
  user_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi',
      'string.uuid': 'User ID harus berupa UUID yang valid'
    })
});

const addCartSchema = Joi.object({
  user_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi',
      'string.uuid': 'User ID harus berupa UUID yang valid'
    }),
  item_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'Item ID wajib diisi',
      'string.uuid': 'Item ID harus berupa UUID yang valid'
    }),
  quantity: Joi.number()
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

const updateCartSchema = (options) => {
  Joi.object({
  user_id: userIdUpdateSchema,
  item_id: itemIdUpdateSchema,
  quantity: options?.quantity ?
    cartQuantityUpdateSchema.required() : cartQuantityUpdateSchema.optional(),
  }).or('quantity')
}

const deleteCartSchema = Joi.object({
  user_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi untuk penghapusan',
      'string.uuid': 'User ID harus berupa UUID yang valid'
    }),
  item_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'Item ID wajib diisi untuk penghapusan',
      'string.uuid': 'Item ID harus berupa UUID yang valid'
    })
});

function validateGetCart(body){
  getCartSchema.validate(body, abotEarly: false)
}

function validateAddCart(body){
  addCartSchema.validate(body, abortEarly: false)
}

function validateUpdateCart(body){
  updateCartSchema.validate(body, abortEarly: false)
}

function validateDeleteCart(body){
  deleteCartSchema.validate(body, abortEarly: false)
}

module.exports = {
  validateGetCart,
  validateAddCart,
  validateUpdateCart,
  validateDeleteCart
};
