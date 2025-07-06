const {
  getProductByItemIdService,
  addProductService,
  updateProductTitleService,
  updateProductPriceService,
  updateProductStockService,
  updateProductDescriptionService,
  updateProductCategoryService,
  updateProductCoverService,
  deleteProductService
} = require("../services/productService.js");

async function getProductController(req, res, next) {
  try {
    const product = await getProductByItemIdService(req.body);
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}

async function addProductController(req, res, next) {
  try {
    const status = await addProductService(req.body);
    res.status(201).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updateProductTitleController(req, res, next) {
  try {
    const status = await updateProductTitleService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updateProductPriceController(req, res, next) {
  try {
    const status = await updateProductPriceService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updateProductStockController(req, res, next) {
  try {
    const status = await updateProductStockService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updateProductDescriptionController(req, res, next) {
  try {
    const status = await updateProductDescriptionService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updateProductCategoryController(req, res, next) {
  try {
    const status = await updateProductCategoryService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updateProductCoverController(req, res, next) {
  try {
    const status = await updateProductCoverService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function deleteProductController(req, res, next) {
  try {
    const status = await deleteProductService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getProductController,
  addProductController,
  updateProductTitleController,
  updateProductPriceController,
  updateProductStockController,
  updateProductDescriptionController,
  updateProductCategoryController,
  updateProductCoverController,
  deleteProductController
};
