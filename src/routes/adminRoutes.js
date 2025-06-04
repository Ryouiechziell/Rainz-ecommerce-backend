const express = require('express');
const router = express.Router();

const { getStatsController, getAllUserController, getAllProductController, getAllPaymentController, getAllOrderController } = require("../services/adminService.js")

router.get('/get/user/all', getAllUserController);

router.get('/get/order/all', getAllOrderController);

router.get('/get/payment/all', getAllPaymentController)

router.get('/get/product/all', getAllProductController)

router.get('/get/stats', getStatsController)

module.exports = router;
