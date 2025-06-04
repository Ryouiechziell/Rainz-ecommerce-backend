const Joi = require('joi');
const {
  orderIdUpdateSchema,
  orderStatusUpdateSchema,
  orderTotalPriceUpdateSchema,
} = require("./orderUpdateSchema.js")

const getOrderSchema = Joi.object({
  user_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi',
      'string.uuid': 'User ID harus berupa UUID yang valid'
    }),
  order_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'Order ID wajib diisi',
      'string.uuid': 'Order ID harus berupa UUID yang valid'
    })
});

const insertOrderSchema = Joi.object({
  order_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'Order ID wajib diisi',
      'string.uuid': 'Order ID harus berupa UUID yang valid'
    }),
  user_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi',
      'string.uuid': 'User ID harus berupa UUID yang valid'
    }),
  status: Joi.string()
    .valid('pending', 'paid', 'shipped', 'completed', 'cancelled')
    .required()
    .default('pending')
    .messages({
      'any.required': 'Status pesanan wajib diisi',
      'any.only': 'Status pesanan tidak valid. Pilih antara: pending, paid, shipped, completed, cancelled'
    }),
  total_price: Joi.number()
    .precision(2)
    .min(0)
    .required()
    .messages({
      'any.required': 'Total harga wajib diisi',
      'number.base': 'Total harga harus berupa angka',
      'number.min': 'Total harga tidak boleh negatif'
    })
});

const updateOrderSchema = (options) => {
  Joi.object({
  order_id: orderIdUpdateSchema,

  status: options?.status ?
    orderStatusUpdateSchema.required() : orderStatusUpdateSchema.optional(),

  total_price: options?.total_price ?
    orderTotalPriceUpdateSchema.required() : orderTotalPriceUpdateSchema.optional()
  }).or('status', 'total_price')
}

const deleteOrderSchema = Joi.object({
  order_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'Order ID wajib diisi untuk penghapusan',
      'string.uuid': 'Order ID harus berupa UUID yang valid'
    }),
  user_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi untuk penghapusan',
      'string.uuid': 'User ID harus berupa UUID yang valid'
    })
});


module.exports = {
  getOrderSchema,
  insertOrderSchema,
  updateOrderSchema,
  deleteOrderSchema
};
