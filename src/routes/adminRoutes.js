const express = require('express');
const router = express.Router();
const verifyRole = require("../middlewares/verifyRole.js")
const verifyUserToken = require("../middlewares/verifyUserToken.js")
const {
  getAllStatsController,
  getUserStatsController,
  getProductStatsController,
  getOrderStatsController } = require("../controllers/adminController.js")

router.use(verifyUserToken)

router.use(verifyRole)

router.get('/get/stats/all', getAllStatsController);

router.get('/get/stats/order', getOrderStatsController);

router.get('/get/stats/user', getUserStatsController)

router.get('/get/stats/product', getProductStatsController)


module.exports = router;
