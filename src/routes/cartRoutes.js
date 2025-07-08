const express = require("express")
const router = express.Router()
const verifyUserToken = require("../middlewares/verifyUserToken.js")
const {
  getCartController,
  addCartController,
  updateCartItemQuantityController,
  deleteCartController } = require("../controllers/cartController.js")

const {
  validateGetCartMiddleware,
  validateAddCartMiddleware,
  validateUpdateCartItemQuantityMiddleware,
  validateDeleteCartMiddleware } = require("../middlewares/validate/validateCartMiddleware.js")

router.use(verifyUserToken)

router.post("/get", validateGetCartMiddleware, getCartController)

router.post("/add", validateAddCartMiddleware, addCartController)

router.patch("/update/item_quantity", validateUpdateCartItemQuantityMiddleware, updateCartItemQuantityController)

router.post("/delete", validateDeleteCartMiddleware, deleteCartController)

module.exports = router
