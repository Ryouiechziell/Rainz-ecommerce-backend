const logger = require("../utils/logger.js")
const {getCartByUserId, addCart, updateCart, deleteCard} = require("../models/cartModel.js")

async function getUserCart(body){
  const { user_id } = body
  const rows = await getCartByUserId(user_id)
  if (!rows) {
    logger.info(`[carts] SELECT FAILED user_id: ${user_id}`))
    throw new Error({"Gagal mengambil data cart" });
  }
  return rows;
}

async function addUserCart(body){
  const { user_id, item_id, quantity } = body
  const result = await addCart(user_id, item_id, quantity)
  if (!user) {
    throw new Error('Gagal memasukan item ke cart')
    logger.info(`[carts] INSERT FAILED user_id: ${user_id}, item_id: ${item_id}, table: carts`)
  }
  return  result
}

async function updateUserCart(body){
  const result = await updateCart(body)
  if(!result) {
    logger.info(`[carts] UPDATE FAILED user_id: ${body.user_id}, item_id: ${body.item_id}`)
    throw new Error("Gagal mengupdate item dari cart")
  }
  return result
}

async function removeUserCart(body){
  const { user_id, item_id } = body
  const result = await removeCart(user_id, item_id)
  if(!result) {
    logger.info(`[carts] REMOVE FAILED user_id: ${body.user_id}, item_id: ${body.item_id}`)
    throw new Error("Gagal menghapus item dari cart")
  }
  return result
}


module.exports = {
  getUserCart,
  addUserCart,
  updateUserCart,
  removeUserCart
}
