const Joi = require("joi")

const paymentIdUpdateSchema = Joi.string()
    .required()
    .messages({
      'any.required': 'Payment ID wajib diisi untuk update',
    })

const paymentStatusUpdateSchema = Joi.string()
    .valid('pending', 'paid', 'failed')
    .messages({
      'any.only': 'Status pembayaran tidak valid. Gunakan: pending, paid, atau failed'
    })

const paymentMethodUpdateSchema = Joi.string()
    .valid('credit_card', 'bank_transfer', 'e-wallet', 'cod')
    .messages({
      'any.only': 'Metode pembayaran tidak valid. Gunakan: credit_card, bank_transfer, e-wallet, atau cod'
    })
const paymentAmountUpdateSchema = Joi.number()
    .min(0)
    .messages({
      'any.required': 'Jumlah pembayaran wajib diisi',
      'number.base': 'Jumlah pembayaran harus berupa angka',
      'number.min': 'Jumlah pembayaran tidak boleh negatif'
    })


module.exports = {
  paymentIdUpdateSchema,
  paymentStatusUpdateSchema,
  paymentMethodUpdateSchema,
  paymentAmountUpdateSchema
}
