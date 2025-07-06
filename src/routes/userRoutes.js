const express = require("express")
const router = express.Router()
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware.js")
const {
  validateGetUserMiddleware,
  validateUpdateUserUsernameMiddleware,
  validateUpdateUserEmailMiddleware,
  validateUpdateUserPasswordMiddleware,
  validateUpdateUserRoleMiddleware,
  validateUpdateUserProfilePictureMiddleware,
  validateDeleteUserMiddleware } = require("../middlewares/validate/validateUserMiddleware.js")

const {
  getUserController,
  updateUserUsernameController,
  updateUserEmailController,
  updateUserPasswordController,
  updateUserRoleController,
  updateUserProfilePictureController,
  deleteUserController } = require("../controllers/userController.js")

router.use(verifyTokenMiddleware)

router.post("/get", validateGetUserMiddleware, getUserController)

router.patch("/update/username", validateUpdateUserUsernameMiddleware , updateUserUsernameController)
router.patch("/update/email", validateUpdateUserEmailMiddleware , updateUserEmailController)
router.patch("/update/password", validateUpdateUserPasswordMiddleware, updateUserPasswordController)
router.patch("/update/role", validateUpdateUserRoleMiddleware, updateUserRoleController)
router.patch("/update/profile_picture", validateUpdateUserProfilePictureMiddleware, updateUserProfilePictureController)


router.post("/delete", validateDeleteUserMiddleware, deleteUserController)

module.exports = router
