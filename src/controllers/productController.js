const {
  getProductByItemIdService,
  addProductService,
  updateProductService,
  deleteProductService } = require("../services/productService.js")

const getProductController = async (req,res) => {
  try{
  const product = await getProductByItemIdService(req.body)
    res.status(200).json({message: "Berhasil mengambil info product", data: product})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const addProductController = async (req,res) => {
  try{
  const product = await addProductService(req.body)
    res.status(200).json({message: "Berhasil menambah product", data: product})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const updateProductController = async (req, res) => {
  try{
  const product = await updateProductService(req.body)
    res.status(200).json({message: "Berhasil mengedit info product", data: product})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const deleteProductController = async (req, res) => {
  try{
  const product = await deleteProductService(req.body)
    res.status(204).json({message: "Berhasil menghapus product", data: product})
  }catch(error){
    res.status(404).json({message: error})
  }
}

module.exports = {
  getProductController,
  addProductController
  updateProductController,
  deleteProductController
}
