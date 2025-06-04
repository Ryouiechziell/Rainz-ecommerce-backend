const path = require("path")
const logger = require("../utils/logger.js")
const { isUpdateSuccess,isInsertSuccess,isDeleteSuccess } = require("../utils/isQuerySuccess")
const {
  getProductByItemId,
  addProduct,
  updateProduct,
  deleteProduct} = require("../models/productModel.js")

async function getProductService(body){
  const { item_id } = body
  const [[rows]] = await getProductByItemId(item_id)

  if (!rows) {
    logger.info(`[products] SELECT FAILED item_id: ${item_id}`))
    throw new Error({"Gagal mengambil data product" });
  }
  return rows;
}

async function addProductService(body){
  const item_id = path.join("ITM-", uuidv4())
  const {
    item_title,
    item_price,
    item_stock,
    item_description,
    item_category,
    item_cover} = body

  const [isInserted] = await addProduct(
    item_id,
    item_title,
    item_price,
    item_stock,
    item_description,
    item_category,
    item_cover)

  if (!isInsertSuccess(isInserted)) {
    throw new Error('Gagal menambah item ke product')
    logger.info(`[products] INSERT FAILED item_id: ${item_id}, item_price: ${item_price}, item_category: ${item_title}`)
  }
  return  isInsertSuccess(isInserted)
}

async function updateProductService(body){
  const [isUpdated] = await updateProduct(body)

  if(!isUpdateSuccess(isUpdated)) {
    logger.info(`[carts] UPDATE FAILED user_id: ${body.user_id}, item_id: ${body.item_id}`)
   throw new Error("Gagal mengupdate item dari cart")
  }
  return isUpdatedSuccess(isUpdated)
}

async function deleteProductService(body){
  const { user_id, item_id } = body
  const [isDeleted] = await deleteProduct(user_id, item_id)

  if(!isDeleteSuccess(isDeleted)) {
    logger.info(`[carts] REMOVE FAILED user_id: ${body.user_id}, item_id: ${body.item_id}`)
    throw new Error("Gagal menghapus item dari cart")
  }
  return isDeleteSuccess(isDeleted)
}


module.exports = {
  getProductService,
  addProductService,
  updateProductService,
  deleteProductService
}
