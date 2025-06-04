const express = require("express")
const router = express.Router()
const {
  validateGetUserMiddleware,
  validateUpdateUserMiddleware,
  validateDeleteUserMiddleware } = require("../middlewares/validate/validateUserMiddleware.js")

const { getUserController, updateUserController, deleteUserController } = require("../controllers/userController.js")

router.get("/get", validateGetUserMiddleware, getUserController)
router.post("/update", validateUpdateUserMiddleware, updateUserController)
router.delete("/delete", validateDeleteUserMiddleware, deleteUserController)

module.exports = router
