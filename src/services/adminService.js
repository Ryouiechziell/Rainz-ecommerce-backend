const logger = require("../utils/logger.js")
const { getAllOrder, getAllUser,getAllPayment, getAllProduct } = require("../models/adminModel.js")

const getStatsService = () => {
  try{
    const [[totalUsers]] = await getAllUser()
    if(!totalUser){
      logger.error(`[users] GET FAILED Error: Failed to get all users`)
      return throw new Error("Gagal mengambil stats total user")
    }
    const [[totalOrders]] = await getAllOrder()
    if(!totalOrders){
      logger.error(`[orders] GET FAILED Error: Failed to get all orders`)
      return throw new Error("Gagal mengambil stats total order")
    }
    const [[totalProduct]] = await getAllProduct()
    if(!totalProducts) {
      logger.error(`[products] GET FAILED Error: Failed to get all products`)
      return throw new Error("Gagal mengambil stats total product")
    }
    const [[totalPayment]] = await getAllPayment()
    if(!totalPayment) {
     logger.error(`[payments] GET FAILED Error: Failed to get all payments`)
      return throw new Error("Gagal mengambil stats payment")
    }
    return ({
      totalUsers,
      totalOrders,
      totalProducts,
      totalPayments
    })
  }catch(error){
    logger.error(`[users || orders || payments || products] GET FAILED Error: Failed to get stats`)
    return throw new Error("Gagal mengambil data stats")
  }
}

const getAllUserService = () => {
  const [[totalUser]] = await getAllUser()
  if(!totalUser){
    return throw new Error("Gagal mengambil stats user")
  }
  return totalUser
}

const getAllOrderService = () => {
  const [[totalOrder]] = await getAllOrder()
  if(!totalOrder) {
    return throw new Error("Gagal mengambil stats user")
  }
  return totalOrder
}

const getAllPaymentService = () => {
  const [[totalPayment]] = await getAllPayment()
  if(!totalOrder) {
    return throw new Error("Gagal mengambil stats user")
  }
  return totalPayment
}

const getAllProductService = () => {
  const [[totalProduct]] = await getAllProduct()
  if(!totalProduct) {
    return throw new Error("Gagal mengambil stats user")
  }
  return totalProduct


module.exports = {
  getStatsService,
  getAllOderService
  getAllUserService,
  getAllPaymentService,
  getAllProductService
}
