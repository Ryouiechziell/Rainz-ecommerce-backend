const Joi = require('joi');
const {
  paymentIdUpdateSchema,
  paymentStatusUpdateSchema,
  paymentMethodUpdateSchema,
  paymentAmountUpdateSchema } = require("./paymentUpdateSchema.js")

const getPaymentSchema = Joi.object({
  payment_id: Joi.string()
    .required()
    .messages({
      'any.required': 'Payment ID wajib diisi'
    }),
  user_id: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi'
    })
});

const addPaymentSchema = Joi.object({
  user_id: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi',
    }),
  order_id: Joi.string()
    .required()
    .messages({
      'any.required': 'Order ID wajib diisi',
    }),
  payment_method: Joi.string()
    .valid('credit_card', 'bank_transfer', 'e-wallet', 'cod')
    .required()
    .messages({
      'any.required': 'Metode pembayaran wajib diisi',
      'any.only': 'Metode pembayaran tidak valid. Gunakan: credit_card, bank_transfer, e-wallet, atau cod'
    }),
  payment_amount: Joi.number()
    .min(0)
    .required()
    .messages({
      'any.required': 'Jumlah pembayaran wajib diisi',
      'number.base': 'Jumlah pembayaran harus berupa angka',
      'number.min': 'Jumlah pembayaran tidak boleh negatif'
    }),
  payment_status: Joi.string()
    .valid('pending', 'paid', 'failed')
    .default('pending')
    .messages({
      'any.only': 'Status pembayaran tidak valid. Gunakan: pending, paid, atau failed'
    })
});

const updatePaymentStatusSchema = Joi.object({
  payment_id: paymentIdUpdateSchema,
  payment_status: paymentStatusUpdateSchema.required()})

const updatePaymentAmountSchema = Joi.object({
  payment_id: paymentIdUpdateSchema,
  payment_amount: paymentAmountUpdateSchema.required()})

const updatePaymentMethodSchema = Joi.object({
  payment_id: paymentIdUpdateSchema,
  payment_method: paymentMethodUpdateSchema.required()})

const deletePaymentSchema = Joi.object({
  payment_id: Joi.string()
    .required()
    .messages({
      'any.required': 'Payment ID wajib diisi untuk penghapusan'
    }),
  user_id: Joi.string()
    .required()
    .messages({
      'any.required': 'User ID wajib diisi untuk penghapusan'
    })
});

function validateGetPayment(body){
  return getPaymentSchema.validate(body, {abotEarly: false})
}

function validateAddPayment(body){
  return addPaymentSchema.validate(body, {abortEarly: false})
}

function validateUpdatePaymentStatus(body){
  return updatePaymentStatusSchema.validate(body, { abortEarly: false })
}

function validateUpdatePaymentAmount(data){
  return updatePaymentAmountSchema.validate(data, {abortEarly: false})
}

function  validateUpdatePaymentMethod(data){
  return updatePaymentMethodSchema.validate(data, {abortEarly: false})
}

function validateDeletePayment(body){
  return deletePaymentSchema.validate(body, { abortEarly: false})
}

module.exports = {
  validateGetPayment,
  validateAddPayment,

  validateUpdatePaymentStatus,
  validateUpdatePaymentAmount,
  validateUpdatePaymentMethod,

  validateDeletePayment
};
