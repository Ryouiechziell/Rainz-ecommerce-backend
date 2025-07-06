const express = require('express');
const router = express.Router();
const verifyAdminMiddleware = require("../middlewares/verifyAdminMiddleware.js")
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware.js")
const {
  getAllStatsController,
  getUserStatsController,
  getProductStatsController,
  getOrderStatsController } = require("../controllers/adminController.js")

router.use(verifyTokenMiddleware)

router.use(verifyAdminMiddleware)

router.get('/get/stats/all', getAllStatsController);

router.get('/get/stats/order', getOrderStatsController);

router.get('/get/stats/user', getUserStatsController)

router.get('/get/stats/product', getProductStatsController)


module.exports = router;
