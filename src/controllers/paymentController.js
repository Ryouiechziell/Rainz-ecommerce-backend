const {
  getPaymentService,
  addPaymentService,
  updatePaymentService,
  deletePaymentService } = require("../services/paymentService.js")

const getPaymentController = async (req,res) => {
  try{
  const payment = await getPaymentService(req.body)
    res.status(200).json({message: "Berhasil mengambil info payment", data: payment})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const addPaymentController = async (req, res) => {
  try{
  const payment = await addPaymentService(req.body)
    res.status(200).json({message: "Berhasil menambah ke payement", data: payment})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const updatePaymentController = async (req, res) => {
  try{
  const payment = await updatePaymentService(req.body)
    res.status(200).json({message: "Berhasil mengedit payment", data: payment})
  }catch(error){
    res.status(404).json({message: error})
  }
}

const deletePaymentController = async (req, res) => {
  try{
  const payment = await deletePaymentService(req.body)
    res.status(204).json({message: "Berhasil menghapus payment ", data: payment})
  }catch(error){
    res.status(404).json({message: error})
  }
}

module.exports = {
  getPaymentController,
  addPaymentController,
  updatePaymentController,
  deletePayemntController
}
