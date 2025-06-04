const Joi = require('joi');

const getPaymentSchema = Joi.object({
  user_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi',
      'string.uuid': 'User ID harus berupa UUID yang valid'
    })
});

const insertPaymentSchema = Joi.object({
  payment_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'Payment ID wajib diisi',
      'string.uuid': 'Payment ID harus berupa UUID yang valid'
    }),
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
    }),
  method: Joi.string()
    .valid('credit_card', 'bank_transfer', 'e-wallet', 'cod')
    .required()
    .messages({
      'any.required': 'Metode pembayaran wajib diisi',
      'any.only': 'Metode pembayaran tidak valid. Gunakan: credit_card, bank_transfer, e-wallet, atau cod'
    }),
  amount: Joi.number()
    .min(0)
    .required()
    .messages({
      'any.required': 'Jumlah pembayaran wajib diisi',
      'number.base': 'Jumlah pembayaran harus berupa angka',
      'number.min': 'Jumlah pembayaran tidak boleh negatif'
    }),
  status: Joi.string()
    .valid('pending', 'paid', 'failed')
    .default('pending')
    .messages({
      'any.only': 'Status pembayaran tidak valid. Gunakan: pending, paid, atau failed'
    })
});

const updatePaymentSchema = (options) => {
  Joi.object({
  payment_id: paymentIdUpdateSchema,

  status: options.status ?
    paymentStatusUpdateSchema.required() : paymentStatusUpdateSchema.optional(),

  method: options.method ?
    paymentMethodUpdateSchema.required() : paymentMethodUpdateSchema.optional(),

  amount: options.amount ?
    paymentAmountUpdateSchema.required() : paymentAmountUpdateSchema.optional(),
  }).or('payment_id','status', 'method', 'amount')
}

const deletePaymentSchema = Joi.object({
  payment_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'Payment ID wajib diisi untuk penghapusan',
      'string.uuid': 'Payment ID harus berupa UUID yang valid'
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
  getPaymentSchema,
  insertPaymentSchema,
  updatePaymentSchema,
  deletePaymentSchema
};
