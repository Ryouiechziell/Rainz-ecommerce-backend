const Joi = require('joi');
const {
  orderIdUpdateSchema,
  orderStatusUpdateSchema,
  orderTotalPriceUpdateSchema,
} = require("./orderUpdateSchema.js")

const getOrderSchema = Joi.object({
  user_id: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi'
    }),
  order_id: Joi.string()
    .required()
    .messages({
      'any.required': 'Order ID wajib diisi'
    })
});

const addOrderSchema = Joi.object({
  user_id: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi',
      'string.base': 'User ID harus berupa string',
    }),

  order_total_price: Joi.number()
    .min(0)
    .required()
    .messages({
      'any.required': 'Total harga pesanan wajib diisi',
      'number.base': 'Total harga pesanan harus berupa angka',
      'number.min': 'Total harga pesanan tidak boleh kurang dari 0',
    }),

  order_status: Joi.string()
    .valid('pending', 'paid', 'cancelled')
    .required()
    .messages({
      'any.required': 'Status pesanan wajib diisi',
      'any.only': 'Status pesanan harus salah satu dari: pending, paid, cancelled',
      'string.base': 'Status pesanan harus berupa string',
    }),

  order_items: Joi.array()
    .items(
      Joi.object({
        item_id: Joi.string()
          .required()
          .messages({
            'any.required': 'Item ID wajib diisi',
            'number.base': 'Item ID harus berupa string ID',
          }),

        item_price: Joi.number()
          .min(0)
          .required()
          .messages({
            'any.required': 'Harga item wajib diisi',
            'number.base': 'Harga item harus berupa angka',
            'number.min': 'Harga item tidak boleh kurang dari 0',
          }),

        item_quantity: Joi.number()
          .integer()
          .min(1)
          .required()
          .messages({
            'any.required': 'Jumlah item wajib diisi',
            'number.base': 'Jumlah item harus berupa angka',
            'number.integer': 'Jumlah item harus berupa bilangan bulat',
            'number.min': 'Jumlah item minimal 1',
          }),
      })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Items harus berupa array',
      'array.min': 'Minimal harus ada satu item dalam pesanan',
      'any.required': 'Items tidak boleh kosong',
    }),
});

/*const addOrderSchema = Joi.object({
  user_id: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi'
    }),
  order_status: Joi.string()
    .valid('pending', 'paid', 'expired', 'failed', 'cancelled')
    .optional()
    .default('pending')
    .messages({
      'any.required': 'Status pesanan wajib diisi',
      'any.only': 'Status pesanan tidak valid. Pilih antara: pending, paid, shipped, completed, cancelled'
    }),
  order_total_price: Joi.number()
    .precision(2)
    .min(0)
    .required()
    .messages({
      'any.required': 'Total harga wajib diisi',
      'number.base': 'Total harga harus berupa angka',
      'number.min': 'Total harga tidak boleh negatif'
    })
});*/

const updateOrderStatusSchema = Joi.object({
  order_id: orderIdUpdateSchema.required(),
  order_status: orderStatusUpdateSchema.required()})

const updateOrderTotalPriceSchema = Joi.object({
  order_id: orderIdUpdateSchema.required(),
  order_total_price: orderTotalPriceUpdateSchema.required()})

const deleteOrderSchema = Joi.object({
  order_id: Joi.string()
    .required()
    .messages({
      'any.required': 'Order ID wajib diisi untuk penghapusan'
    }),
  user_id: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi untuk penghapusan'
    })
});


function validateGetOrder(body){
  return getOrderSchema.validate(body, {abotEarly: false})
}

function validateAddOrder(body){
  return addOrderSchema.validate(body, {abortEarly: false})
}

function validateUpdateOrderStatus(body){
  return updateOrderStatusSchema.validate(body, { abortEarly: false })
}

function validateUpdateOrderTotalPrice(body){
  return updateOrderTotalPriceSchema.validate(body, {abortEarly: false})
}

function validateDeleteOrder(body){
  return deleteOrderSchema.validate(body, { abortEarly: false})
}

module.exports = {
  validateGetOrder,
  validateAddOrder,
  validateUpdateOrderStatus,
  validateUpdateOrderTotalPrice,
  validateDeleteOrder
};
