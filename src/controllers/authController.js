const { validateUserLogin,validateUserRegister } = require("../utils/validate/validateAuth/validateAuth.js")
const { authRegisterService, authLoginService } = require("../services/authService.js")

async function registerController (req, res) {
  try{
    const register = authRegisterService(req.body)
    res.status(201).json({message: "Berhasil mendaftarkan akun", data: register});
  }catch(error){
    res.status(500).json({message: error})
  }
}

async function loginController (req, res){
  try{
    const login = authLoginService(req.body)
    res.status(201).json({ message: 'Berhasil login ke akun', data: login});
  }catch(error){
    res.status(500).json({message: error})
  }

}

module.exports = {
  registerController,
  loginController
}
