const {
  getCartService,
  addCartService,
  updateCartItemQuantityService,
  deleteCartService
} = require("../services/cartService.js");

async function getCartController(req, res, next) {
  try {
    const cart = await getCartService(req.body);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
}

async function addCartController(req, res, next) {
  try {
    const status = await addCartService(req.body);
    res.status(201).json({ success: true, status });
  } catch (error) {
    next(error);
  }
}

async function updateCartItemQuantityController(req, res, next) {
  try {
    const status = await updateCartItemQuantityService(req.body);
    res.status(200).json({ success: true, status });
  } catch (error) {
    next(error);
  }
}

async function deleteCartController(req, res, next) {
  try {
    const cart = await deleteCartService(req.body);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCartController,
  addCartController,
  updateCartItemQuantityController,
  deleteCartController
};
