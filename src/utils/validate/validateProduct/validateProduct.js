const Joi = require('joi');
const {
  itemTitleUpdateSchema,
  itemPriceUpdateSchema,
  itemStockUpdateSchema,
  itemDescriptionUpdateSchema,
  itemCategoryUpdateSchema,
  itemImageUrlUpdateSchema } = require("./itemUpdateSchema.js")

const getProductSchema = Joi.object({
  item_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'string.uuid': 'Item ID harus berupa UUID yang valid'
    })
});

const insertProductSchema = Joi.object({
  item_title: Joi.string()
    .min(5)
    .max(150)
    .required()
    .messages({
      'any.required': 'Nama produk wajib diisi',
      'string.min': 'Nama produk minimal 5 karakter',
      'string.max': 'Nama produk maksimal 150 karakter'
    }),
  item_price: Joi.number()
    .min(0)
    .required()
    .messages({
      'any.required': 'Harga produk wajib diisi',
      'number.base': 'Harga harus berupa angka',
      'number.min': 'Harga tidak boleh negatif'
    }),
  item_stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      'any.required': 'Stok produk wajib diisi',
      'number.base': 'Stok harus berupa angka bulat',
      'number.min': 'Stok tidak boleh negatif'
    }),
  item_description: Joi.string()
    .allow('')
    .max(500)
    .messages({
      'string.max': 'Deskripsi maksimal 500 karakter'
    }),
  item_category: Joi.string()
    .valid('makanan', 'minuman', 'elektronik', 'fashion', 'lainya')
    .default('lainnya')
    .messages({
      'any.only': 'Kategori tidak valid. Gunakan: makanan, minuman, elektronik, fashion, atau lainnya'
    }),
  item_image_url: Joi.string()
    .uri()
    .allow('')
    .messages({
      'string.uri': 'URL gambar tidak valid'
    })
});

const updateProductSchema = (options) => {
  Joi.object({

  item_id: itemIdUpdateSchema,

  item_title: options?.item_title ?
    itemTitleUpdateSchema.required() : itemTitleUpdateSchema.optional(),

  item_price: options?.item_price ?
   itemPriceUpdateSchema.required() : itemPriceUpdateSchema.optional(),

  item_stock: options?.item_stock ?
    itemStockUpdateSchema.required() : itemStockUpdateSchema.optional(),

  item_description: options?.item_description ?
    itemDescriptionUpdateSchema.required() : itemDescriptionUpdateSchema.optional(),

  item_category: options?.item_category ?
    itemCategoryUpdateSchema.required() : itemCategoryUpdateSchema.optional(),

  item_image_url: options?.item_image_url ?
    itemImageUrlUpdateSchema.required() : itemImageUrlUpdateSchema.optional(),

  }).or('item_name', 'item_price', 'item_stock', 'item_description', 'item_category', 'item_image_url')
}

const deleteProductSchema = Joi.object({
  item_id: Joi.string()
    .uuid()
    .required()
    .messages({
      'any.required': 'Item ID wajib diisi untuk menghapus produk',
      'string.uuid': 'Item ID harus berupa UUID yang valid'
    })
});

module.exports = {
  getProductSchema,
  insertProductSchema,
  updateProductSchema,
  deleteProductSchema
};
