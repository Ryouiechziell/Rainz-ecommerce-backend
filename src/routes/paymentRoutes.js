const express = require("express")
const router = express.Router()
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware.js")
const {
  getPaymentController,
  addPaymentController,
  updatePaymentStatusController,
  updatePaymentAmountController,
  updatePaymentMethodController,
  deletePaymentController } = require("../controllers/paymentController.js")

const {
  validateGetPaymentMiddleware,
  validateAddPaymentMiddleware,
  validateUpdatePaymentStatusMiddleware,
  validateUpdatePaymentAmountMiddleware,
  validateUpdatePaymentMethodMiddleware,
  validateDeletePaymentMiddleware } = require("../middlewares/validate/validatePaymentMiddleware.js")

router.use(verifyTokenMiddleware)

router.post("/get", validateGetPaymentMiddleware, getPaymentController)

router.post("/add", validateAddPaymentMiddleware, addPaymentController)

router.patch("/update/payment_status", validateUpdatePaymentStatusMiddleware, updatePaymentStatusController)
router.patch("/update/payment_amount", validateUpdatePaymentAmountMiddleware, updatePaymentAmountController)
router.patch("/update/payment_method", validateUpdatePaymentMethodMiddleware, updatePaymentMethodController)

router.post("/delete", validateDeletePaymentMiddleware, deletePaymentController)

module.exports = router
