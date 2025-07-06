const Joi = require('joi');
const {
  itemIdUpdateSchema,
  itemTitleUpdateSchema,
  itemPriceUpdateSchema,
  itemStockUpdateSchema,
  itemDescriptionUpdateSchema,
  itemCategoryUpdateSchema,
  itemCoverUpdateSchema } = require("./itemUpdateSchema.js")

const getProductSchema = Joi.object({
  item_id: Joi.string()
    .required()
    .messages({
      'any.required': 'item_id wajib diisi'
    })
});

const addProductSchema = Joi.object({
  item_title: Joi.string()
    .min(5)
    .max(30)
    .required()
    .messages({
      'any.required': 'Nama produk wajib diisi',
      'string.min': 'Nama produk minimal 5 karakter',
      'string.max': 'Nama produk maksimal 30 karakter'
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
    .required()
    .valid(
      'drink',
      'food',
      'electronic',
      'beauty',
      'healty',
      "cltothing",
      "accessory",
      "toy",
      "sport",
      "automotive",
      "other"
    )
    .default('other')
    .messages({
      'any.required': 'item_category wajib diisi'
    }),
  item_cover: Joi.string()
    .uri()
    .allow('')
    .messages({
      'string.uri': 'URL cover tidak valid'
    })
});

const updateProductTitleSchema = Joi.object({
  item_id: itemIdUpdateSchema,
  item_title: itemTitleUpdateSchema.required()})

const updateProductPriceSchema = Joi.object({
  item_id: itemIdUpdateSchema,
  item_price: itemPriceUpdateSchema.required()})

const updateProductStockSchema = Joi.object({
  item_id: itemIdUpdateSchema,
  item_stock: itemStockUpdateSchema.required()})

const updateProductDescriptionSchema = Joi.object({
  item_id: itemIdUpdateSchema,
  item_description: itemDescriptionUpdateSchema.required()})

const updateProductCategorySchema = Joi.object({
  item_id: itemIdUpdateSchema,
  item_category: itemCategoryUpdateSchema.required()})

const updateProductCoverSchema = Joi.object({
  item_id: itemIdUpdateSchema,
  item_cover: itemCoverUpdateSchema.required()})

const deleteProductSchema = Joi.object({
  item_id: Joi.string()
    .required()
    .messages({
      'any.required': 'item_id wajib diisi untuk menghapus produk',
    })
});

function validateGetProduct(data){
  return getProductSchema.validate(data, {abortEarly: false})
}

function validateAddProduct(data){
  return addProductSchema.validate(data, {abortEarly: false})
}

function validateUpdateProductTitle(data){
  return updateProductTitleSchema.validate(data, {abortEarly: false})
}

function  validateUpdateProductPrice(data){
  return updateProductPriceSchema.validate(data, {abortEarly: false})
}

function validateUpdateProductStock(data) {
  return updateProductStockSchema.validate(data, {abortEarly: false})
}

function validateUpdateProductDescription(data){
  return updateProductDescriptionSchema.validate(data, {abortEarly: false})
}

function validateUpdateProductCategory(data){
  return updateProductCategorySchema.validate(data, {abortEarly: false})
}

function validateUpdateProductCover(data){
  return updateProductCoverSchema.validate(data, {abortEarly: false})
}

function validateDeleteProduct(data){
  return deleteProductSchema.validate(data, {abortEarly: false})
}

module.exports = {
  validateGetProduct,

  validateAddProduct,

  validateUpdateProductTitle,
  validateUpdateProductPrice,
  validateUpdateProductStock,
  validateUpdateProductDescription,
  validateUpdateProductCategory,
  validateUpdateProductCover,

  validateDeleteProduct
};
