const Joi = require("joi")

const orderIdUpdateSchema = Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'Order ID wajib diisi untuk update',
      'string.uuid': 'Order ID harus berupa UUID yang valid'
    })

const orderStatusUpdateSchema = Joi.string()
    .valid('pending', 'paid', 'shipped', 'completed', 'cancelled')
    .messages({
      'any.only': 'Status pesanan tidak valid. Pilih antara: pending, paid, shipped, completed, cancelled'
    })

const orderTotalPriceUpdateSchema =  Joi.number()
    .precision(2)
    .min(0)
    .messages({
      'number.base': 'Total harga harus berupa angka',
      'number.min': 'Total harga tidak boleh negatif'
    })

module.exports = {
  orderIdUpdateSchema,
  orderStatusUpdateSchema,
  orderTotalPriceUpdateSchema,
}
