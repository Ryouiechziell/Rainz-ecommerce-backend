const express = require("express")
const router = express.Router()
const verifyUserToken = require("../middlewares/verifyUserToken.js")
const {
  getProductController,
  addProductController,
  updateProductTitleController,
  updateProductPriceController,
  updateProductStockController,
  updateProductDescriptionController,
  updateProductCategoryController,
  updateProductCoverController,
  deleteProductController } = require("../controllers/productController.js")

const {
  validateGetProductMiddleware,
  validateAddProductMiddleware,
  validateUpdateProductTitleMiddleware,
  validateUpdateProductPriceMiddleware,
  validateUpdateProductStockMiddleware,
  validateUpdateProductDescriptionMiddleware,
  validateUpdateProductCategoryMiddleware,
  validateUpdateProductCoverMiddleware,
  validateDeleteProductMiddleware } = require("../middlewares/validate/validateProductMiddleware.js")

router.use(verifyUserToken)

router.post("/get", validateGetProductMiddleware, getProductController)

router.post("/add", validateAddProductMiddleware, addProductController)

router.patch("/update/title", validateUpdateProductTitleMiddleware, updateProductTitleController)

router.patch("/update/price", validateUpdateProductPriceMiddleware, updateProductPriceController)

router.patch("/update/stock", validateUpdateProductStockMiddleware, updateProductStockController)

router.patch("/update/description", validateUpdateProductDescriptionMiddleware, updateProductDescriptionController)

router.patch("/update/category", validateUpdateProductCategoryMiddleware, updateProductCategoryController)

router.patch("/update/cover", validateUpdateProductCoverMiddleware, updateProductCoverController)

router.post("/delete", validateDeleteProductMiddleware, deleteProductController)

module.exports = router
