const {
  getAllStatsService,
  getOrderStatsService,
  getUserStatsService,
  getProductStatsService } = require("../services/adminService.js")

const getAllStatsController = async (req,res,next) => {
  try{
    const allStats = await getAllStatsService()
    res.status(200).json({success: true,  data: allStats})
  }catch(error){
    next(error)
  }
}

const getOrderStatsController = async (req,res,next) => {
  try{
  const orderStats = await getOrderStatsService(req.body)
    res.status(200).json({success: true,  data: orderStats})
  }catch(error){
    next(error)
  }
}

const getUserStatsController = async (req, res, next) => {
  try{
  const userStats = await getUserStatsService(req.body)
    res.status(200).json({success: true, data: userStats})
  }catch(error){
    next(error)
  }
}

/*const getAllPaymentController = async (req, res) => {
  try{
  const allPayment = await getAllPaymentService(req.body)
    res.status(200).json({message: "Berhasil mengambil semua data payment", data: cart})
  }catch(error){
    res.status(404).json({message: error})
  }
}*/

const getProductStatsController = async (req, res, next) => {
  try{
  const productStats = await getProductStatsService(req.body)
    res.status(200).json({success: true, data: productStats})
  }catch(error){
    next(error)
  }
}

module.exports = {
  getAllStatsController,
  getOrderStatsController,
  getUserStatsController,
  getProductStatsController
}
