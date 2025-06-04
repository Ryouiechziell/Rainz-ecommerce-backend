const {
  getOrderByOrderIdService,
  addProductService,
  updateProductService,
  deleteProductService } = require("../services/productService.js")

const getOrderController = async (req,res) => {
  try{
  const order = await getOrderByOrderIdService(req.body)
    res.status(200).json({message: "Berhasil mengambil info order", data: order})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const addOrderController = async (req,res) => {
  try{
  const order = await addOrderService(req.body)
    res.status(200).json({message: "Berhasil menambah order", data: order})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const updateOrderController = async (req, res) => {
  try{
  const order = await updateOrderService(req.body)
    res.status(200).json({message: "Berhasil mengedit info order", data: order})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const deleteOrderController = async (req, res) => {
  try{
  const order = await deleteOrderService(req.body)
    res.status(204).json({message: "Berhasil menghapus order", data: order})
  }catch(error){
    res.status(404).json({message: error})
  }
}

module.exports = {
  getOrderController,
  addOrderController
  updateOrderController,
  deleteOrderController
}
