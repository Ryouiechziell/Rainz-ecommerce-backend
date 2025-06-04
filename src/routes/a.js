const {loginController,registerController} = require("../controllers/authController.js")
const {validateUserRegisterMiddleware,validateUserLoginMiddleware } = "../middlewares/validate/validateAuthMiddleware.js"

console.log(loginController)
console.log(validateUserRegisterMiddleware)
console.log(validateUserLoginMiddleware)
