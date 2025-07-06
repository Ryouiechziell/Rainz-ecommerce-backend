const {
  getOrderService,
  addOrderService,
  updateOrderStatusService,
  updateOrderTotalPriceService,
  deleteOrderService
} = require("../services/orderService.js"); // pastikan file ini benar

async function getOrderController(req, res, next) {
  try {
    const order = await getOrderService(req.body);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

async function addOrderController(req, res, next) {
  try {
    const status = await addOrderService(req.body);
    res.status(201).json({ success: true, status });
  } catch (error) {
    next(error);
  }
}

async function updateOrderStatusController(req, res, next) {
  try {
    const status = await updateOrderStatusService(req.body);
    res.status(200).json({ success: true, status });
  } catch (error) {
    next(error);
  }
}

async function updateOrderTotalPriceController(req, res, next) {
  try {
    const status = await updateOrderTotalPriceService(req.body);
    res.status(200).json({ success: true, status });
  } catch (error) {
    next(error);
  }
}

async function deleteOrderController(req, res, next) {
  try {
    const status = await deleteOrderService(req.body);
    res.status(200).json({ success: true, status });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getOrderController,
  addOrderController,
  updateOrderStatusController,
  updateOrderTotalPriceController,
  deleteOrderController
};
