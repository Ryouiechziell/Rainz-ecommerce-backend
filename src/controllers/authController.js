const createError = require("../utils/createError")
const { validateUserLogin,validateUserRegister } = require("../utils/validate/validateAuth/validateAuth")
const {
  authRegisterService,
  authLoginService,
  authLoginGoogleService,
  authLoginGoogleCallbackService
} = require("../services/authService")

async function registerController (req, res, next) {
  try{
    const register = await authRegisterService(req.body)
    res.status(201).json({success: true, data: register});
  }catch({message}){
    next(createError(500, message))
  }
}

async function loginController (req, res, next){
  try{
    const login = await authLoginService(req.body)
    res.status(200).json({ success: true, data: login});
  }catch({message}){
    next(createError(500, message))
  }
}

async function loginGoogleController (req, res, next){
  try{
    const url = await authLoginGoogleService()
    res.redirect(url);
  }catch({message}){
    next(createError(500, message))
  }
}

async function loginGoogleCallbackController (req, res, next){
  try{
    const url = await authLoginGoogleCallbackService(req.query)
    res.redirect(url)
  }catch({message}){
    next(createError(500, message))
  }
}

module.exports = {
  registerController,
  loginController,
  loginGoogleController,
  loginGoogleCallbackController
}
