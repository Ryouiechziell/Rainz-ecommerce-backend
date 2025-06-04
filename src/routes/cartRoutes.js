const express = require("express")
const router = express.Router()
const {
  getCartController,
  addCartController,
  updateCartComtroller,
  deleteCartController } = require("../controller/cartController.js")

const {
  validateGetCart,
  validateAddCart,
  validateUpdateCart,
  validateDeleteCart } = require("../middleware/cartMiddleware")

router.get("/get", validateGetCart, getCartController)
router.post("/add", validateAddCart, addCartControlelr)
router.patch("/update", validateUpdateCart, updateCartController)
router.delete("delete", validateDeleteCart, deleteCartController)

module.exports = router
