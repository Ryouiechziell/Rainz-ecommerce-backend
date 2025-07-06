const logger = require("../utils/logger")
const { performance } = require("perf_hooks")
const { v4: uuidv4 } = require("uuid");
const { checkDbLatency, checkRuntimeLatency } = require("../utils/checkLatency")
const {
  isInsertSuccess,
  isUpdateSuccess,
  isDeleteSuccess
} = require("../utils/isQuerySuccess");

const {
  getCartByUserId,
  addCartItem,
  updateCartItemQuantity,
  deleteCartItem
} = require("../models/cartModel.js");

const {
  InternalServerError,
  NotFoundError
} = require("../utils/customErrors");

async function getCartService(payload) {
  const processStart = performance.now();
  const hinter = "[GET CART]"
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

  try {
    const { user_id } = payload
    let rows;

    try {
      const dbStart = performance.now();

      [rows] = await getCartByUserId(user_id);

      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat mengambil info cart");
    }

    if (!rows.length) {
      logger.warn(`${hinter} CART NOT FOUND`);
      throw new NotFoundError("Cart tidak ditemukan");
    }

    checkRuntimeLatency(processStart, hinter);
    return rows;

  }catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil info cart");
  }
}

async function addCartService(payload) {
  const processStart = performance.now();
  const cart_id = "CRT" + uuidv4()
  const hinter = "[ADD CART]"
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

  try {
    const { user_id, item_id, item_quantity } = payload
    let isInserted;

    try {
      const dbStart = performance.now();

      [isInserted] = await addCartItem(cart_id, user_id, item_id, item_quantity);

      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat menambahkan item ke cart");
    }

    if (!isInsertSuccess(isInserted)) {
      logger.warn(`${hinter} SUCCESS BUT DUPLICATE THEN SYSTEM ADDING THE ITEM QUANTITY INSTEAD`);
      throw new InternalServerError("Berhasil/Gagal menambahkan item ke cart");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;

  }catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat menambahkan item ke cart");
  }
}

async function updateCartItemQuantityService(payload) {
    const processStart = performance.now();
    const hinter = "[UPDATE CART ITEM QUANTITY]"
    logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

  try{
		const { user_id, item_id, item_quantity } = payload
    let isUpdated;

    try {
      const dbStart = performance.now();

      [isUpdated] = await updateCartItemQuantity(user_id, item_id, item_quantity);

      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat mengupdate kuantitas item");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal mengupdate kuantitas item");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;

  }catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengupdate kuantitas item");
  }
}

async function deleteCartService(payload) {
  const processStart = performance.now();
  const hinter = "[DELETE CART ITEM]"
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

  try {
    const { user_id, item_id } = payload
    let isDeleted;

    try {
      const dbStart = performance.now();

      [isDeleted] = await deleteCartItem(user_id, item_id);

      const dbLatency = (performance.now() - processStart).toFixed(2);

      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat menghapus item dari cart");
    }

    if (!isDeleteSuccess(isDeleted)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal menghapus item dari cart");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;

  }catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat menghapus item dari cart");
  }
}

module.exports = {
  getCartService,
  addCartService,
  updateCartItemQuantityService,
  deleteCartService
};
