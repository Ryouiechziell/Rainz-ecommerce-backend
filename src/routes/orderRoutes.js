const express = require("express")
const router = express.Router()
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware.js")
const {
  getOrderController,
  addOrderController,
  updateOrderStatusController,
  updateOrderTotalPriceController,
  deleteOrderController } = require("../controllers/orderController.js")

const {
  validateGetOrderMiddleware,
  validateAddOrderMiddleware,
  validateUpdateOrderStatusMiddleware,
  validateUpdateOrderTotalPriceMiddleware,
  validateDeleteOrderMiddleware } = require("../middlewares/validate/validateOrderMiddleware.js")

router.use(verifyTokenMiddleware)

router.post("/get", validateGetOrderMiddleware, getOrderController)

router.post("/add", validateAddOrderMiddleware, addOrderController)

router.patch("/update/status", validateUpdateOrderStatusMiddleware, updateOrderStatusController)
router.patch("/update/total_price", validateUpdateOrderTotalPriceMiddleware, updateOrderTotalPriceController)

router.post("/delete", validateDeleteOrderMiddleware, deleteOrderController)

module.exports = router
