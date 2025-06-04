const express = require('express');
const router = express.Router();

const { registerService, loginService } = require("../services/authSe>

router.get('/get', async (req, res) => {
  const { error } = validateUserRegister(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return res.status(403).json(message: messages})
  }
  try{
    const register = registerService(req.body)
    res.status(201).json({message: "Berhasil mendaftarkan akun", data>
  }catch(error){
    res.status(403).json({message: error})
  }
});

router.post('/login', async (req, res) => {
  const { error,value } = validateUserLogin(req.body)
  if(error) {
    const messages = error.details.map(e => e.message)
    return res.status(403).json(message: messages})
  }
  try{
    const login = loginService(req.body)
    res.status(201).json({ message: 'Berhasil login ke akun', data: l>  }catch(error){
    res.status(403).json({message: error})
  }

});


module.exports = router;
