const express = require('express');
const router = express.Router();
const {
      loginController,
      registerController,
      loginGoogleController,
      loginGoogleCallbackController
 } = require("../controllers/authController.js")

const {
	validateUserRegisterMiddleware,
  validateUserLoginMiddleware
} = require("../middlewares/validate/validateAuthMiddleware.js")

const verifyGoogleCode = require("../middlewares/verifyGoogleCode")

router.post('/register', validateUserRegisterMiddleware, registerController)

router.post('/login', validateUserLoginMiddleware, loginController);

router.get('/login/google', loginGoogleController)

router.get('/login/google/callback', verifyGoogleCode, loginGoogleCallbackController)

module.exports = router;
