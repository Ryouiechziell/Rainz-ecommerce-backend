const Joi = require('joi')

const itemIdUpdateSchema = Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'Item ID wajib untuk update',
      'string.uuid': 'Item ID harus berupa UUID yang valid'
    })

const itemTitleUpdateSchema = Joi.string()
  .min(5)
  .max(100)
  .messages({
    'string.min': 'Nama produk minimal 5 karakter',
    'string.max': 'Nama produk maksimal 100 karakter'
  })

const itemPriceUpdateSchema = Joi.number()
   .min(0)
   .messages({
      'number.min': 'Harga tidak boleh negatif'
   })

const itemStockUpdateSchema = Joi.number()
    .integer()
    .min(0)
    .messages({
      'number.min': 'Stok tidak boleh negatif'
    })

const itemDescriptionUpdateSchema = Joi.string()
    .allow('')
    .max(500)
    .messages({
      'string.max': 'Deskripsi maksimal 500 karakter'
    })

const itemCategoryUpdateSchema =  Joi.string()
    .valid('makanan', 'minuman', 'elektronik', 'fashion', 'lainnya')
    .messages({
      'any.only': 'Kategori tidak valid'
    })

const itemImageUrlUpdateSchema = Joi.string()
    .uri()
    .allow('')
    .messages({
      'string.uri': 'URL gambar tidak valid'
    })

module.exports = {
  itemIdUpdateSchema,
  itemTitleUpdateSchema,
  itemPriceUpdateSchema,
  itemStockUpdateSchema,
  itemDescriptionUpdateSchema,
  itemCategoryUpdateSchema,
  itemImageUrlUpdateSchema
}
