const {
  getUserByIdService,
  getUserByEmailService,
  updateUserService,
  deleteUserService } = require("../services/userService.js")

const getUserController = async (req,res) => {
  try{
  const cart = await getUserByIdService(req.body)
    res.status(200).json({message: "Berhasil mengambil info user", data: cart})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const updateUserController = async (req, res) => {
  try{
  const cart = await updateUser(req.body)
    res.status(200).json({message: "Berhasil mengedit info  user", data: cart})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const deleteUserController = async (req, res) => {
  try{
  const cart = await deleteUser(req.body)
    res.status(204).json({message: "Berhasil menghapus user", data: cart})
  }catch(error){
    res.status(404).json({message: error})
  }
}

module.exports = {
  getUserController,
  updateUserController,
  deleteUserController
}
