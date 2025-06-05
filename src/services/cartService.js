const logger = require("../utils/logger");
const { isInsertSuccess,isUpdateSuccess,isDeleteSuccess } = require("../utils/isQuerySuccess")

const {
  findCartItem,
  getCartByUserId,
  addCartItem,
  updateCartItemQuantity,
  updateCartItem,
  deleteCartItem } = require("../models/cartModel");

async function getCartService(body) {
  const { user_id } = body;
  const [[rows]] = await getCartByUserId(user_id);
  if (!rows) {
    logger.info(`[carts] GET FAILED user_id: ${user_id}`);
    throw new Error("Gagal mengambil data cart");
  }
  return rows;
}

async function addCartService(body) {
  const { user_id, item_id, quantity } = body;
  const [[isExisted]] = await findCartItem(user_id, item_id)
  if(isExisted) {
    const sumQuantity = isExisted?.quantity + quantity
    const [isUpdated] = await updateCartItemQuantity(user_id, item_id, sumQuantity)
    if(!isUpdateSuccess(isUpdated)){
      logger.info(`[carts] UPDATE FAILED user_id: ${user_id}, item_id: ${item_id}`);
      throw new Error("Gagal mengupdate item cart")
    }
    return isUpdateSuccess(isUpdated)
  }

  const [isInserted] = await addCartItem(user_id, item_id, quantity);
  if (!isInsertSuccess(isInserted)) {
    logger.error(`[carts] INSERT FAILED user_id: ${user_id}, item_id: ${item_id}`);
    throw new Error("Gagal menambahkan item ke cart");
  }
  return isInsertSuccess(isInserted);
}

async function updateCartService(body) {
  const [isUpdated] = await updateCartItem(body);
  if (!isInsertSuccess(isUpdated)) {
    logger.error(`[carts] UPDATE FAILED user_id: ${body.user_id}, item_id: ${body.item_id}`);
    throw new Error("Gagal mengupdate item cart");
  }

  return isUpdateSuccess(isUpdated);
}

async function deleteCartService(body) {
  const { user_id, item_id } = body;
  const [isRemoved] = await removeCartItem(user_id, item_id);
  if (!isDeleteSuccess(isRemoved)) {
    logger.error(`[carts] REMOVE FAILED user_id: ${user_id}, item_id: ${item_id}`);
    throw new Error("Gagal menghapus item dari cart");
  }
  return isRemoveSuccess(isRemoved);
}

module.exports = {
  getCartService,
  addCartService,
  updateCartService,
  deleteCartService
};
