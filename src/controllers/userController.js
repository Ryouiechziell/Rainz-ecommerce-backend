const {
  getUserByIdService,
  updateUserUsernameService,
  updateUserEmailService,
  updateUserPasswordService,
  updateUserRoleService,
  updateUserProfilePictureService,
  deleteUserService
} = require("../services/userService.js");

async function getUserController(req, res, next) {
  try {
    const user = await getUserByIdService(req.body);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

async function updateUserUsernameController(req, res, next) {
  try {
    const status = await updateUserUsernameService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updateUserEmailController(req, res, next) {
  try {
    const status = await updateUserEmailService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updateUserPasswordController(req, res, next) {
  try {
    const status = await updateUserPasswordService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updateUserRoleController(req, res, next) {
  try {
    const status = await updateUserRoleService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function updateUserProfilePictureController(req, res, next) {
  try {
    const status = await updateUserProfilePictureService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

async function deleteUserController(req, res, next) {
  try {
    const status = await deleteUserService(req.body);
    res.status(200).json({ success: true, status });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUserController,
  updateUserUsernameController,
  updateUserEmailController,
  updateUserPasswordController,
  updateUserRoleController,
  updateUserProfilePictureController,
  deleteUserController
};
