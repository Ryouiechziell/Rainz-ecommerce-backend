const express = require('express');
const router = express.Router();
const {
  getProductController,
  addProductController,
  updateProductController,
  deleteProductController } = require('../models/index.js');

const {
  validateGetProductMiddleware,
  validateAddProductMiddleware,
  validateUpdateProductMiddleware,
  validateDeleteProductMiddleware } = require("../middleware/validate/validateProduct")

router.get('/get', validateGetProductMiddleware, getProductController)

router.post('/add', validateAddProductMiddleware, addProductController)

router.patch('/update', validateUpdateProductMiddleware, updateProductController)

router.delete('/delete', validateDeleteProductMiddleware, deleteProductController)

module.exports = router;
