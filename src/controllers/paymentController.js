const {
  getPaymentService,
  addPaymentService,
  updatePaymentStatusService,
  updatePaymentAmountService,
  updatePaymentMethodService,
  deletePaymentService
} = require("../services/paymentService.js");

async function getPaymentController(req, res, next) {
  try {
    const payment = await getPaymentService(req.body);
    res.status(200).json({ success: true, data: payment });
  } catch (err) {
    next(err);
  }
}

async function addPaymentController(req, res, next) {
  try {
    const status = await addPaymentService(req.body);
    res.status(201).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updatePaymentStatusController(req, res, next) {
  try {
    const status = await updatePaymentStatusService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updatePaymentAmountController(req, res, next) {
  try {
    const status = await updatePaymentAmountService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updatePaymentMethodController(req, res, next) {
  try {
    const status = await updatePaymentMethodService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function deletePaymentController(req, res, next) {
  try {
    const status = await deletePaymentService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPaymentController,
  addPaymentController,
  updatePaymentStatusController,
  updatePaymentAmountController,
  updatePaymentMethodController,
  deletePaymentController
};
