const express = require('express');
const router = express.Router();
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware.js")
const { loginController, registerController } = "../controllers/authController.js"
const { validateUserRegisterMiddleware, validateUserLoginMiddleware } = "../middlewares/validate/validateAuthMiddleware.js"
console.log(validateUserRegisterMiddleware)

router.post('/register', registerController)
router.post('/login', validateUserLoginMiddleware, verifyTokenMiddleware, loginController);


module.exports = router;
