const createValidationMiddleware = require("../../utils/createValidationMiddleware.js")
const {
  validateGetProduct,
  validateAddProduct,
  validateUpdateProductTitle,
  validateUpdateProductPrice,
  validateUpdateProductStock,
  validateUpdateProductDescription,
  validateUpdateProductCategory,
  validateUpdateProductCover,
  validateDeleteProduct
} = require("../../utils/validate/validateProduct/validateProduct")

module.exports = {
  validateGetProductMiddleware: createValidationMiddleware(validateGetProduct),
  validateAddProductMiddleware: createValidationMiddleware(validateAddProduct),
  validateUpdateProductTitleMiddleware: createValidationMiddleware(validateUpdateProductTitle),
  validateUpdateProductPriceMiddleware: createValidationMiddleware(validateUpdateProductPrice),
  validateUpdateProductStockMiddleware: createValidationMiddleware(validateUpdateProductStock),
  validateUpdateProductDescriptionMiddleware: createValidationMiddleware(validateUpdateProductDescription),
  validateUpdateProductCategoryMiddleware: createValidationMiddleware(validateUpdateProductCategory),
  validateUpdateProductCoverMiddleware: createValidationMiddleware(validateUpdateProductCover),
  validateDeleteProductMiddleware: createValidationMiddleware(validateDeleteProduct)
}
