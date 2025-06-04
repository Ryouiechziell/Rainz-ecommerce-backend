const {
  getCartService,
  addCartService,
  updateCartService,
  deleteCartService } = require("../services/cartService.js")

const getCartController = async (req,res) => {
  try{
  const cart = await getCartService(req.body)
    res.status(200).json({message: "Berhasil mengambil cart user", data: cart})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const addCartController = async (req, res) => {
  try{
  const cart = await addCartService(req.body)
    res.status(200).json({message: "Berhasil menambah ke cart user", data: cart})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const updateCartController = async (req, res) => {
  try{
  const cart = await updateCartService(req.body)
    res.status(200).json({message: "Berhasil mengedit item dari cart user", data: cart})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const deleteUserController = async (req, res) => {
  try{
  const cart = await deleteCartService(req.body)
    res.status(204).json({message: "Berhasil menghapus item dari cart user", data: cart})
  }catch(error){
    res.status(404).json({message: error})
  }
}

module.exports = {
  getCartController,
  addCartController,
  updateCartController,
  deleteCartController
}
