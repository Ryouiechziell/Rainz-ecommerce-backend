const logger = require("../utils/logger");
const redis = require("../boot/redisClient");
const { performance } = require("perf_hooks");
const { v4: uuidv4 } = require("uuid");
const { checkDbLatency, checkRuntimeLatency } = require("../utils/checkLatency");
const {
  isUpdateSuccess,
  isInsertSuccess,
  isDeleteSuccess,
} = require("../utils/checkQuery");

const {
  begin,
  rollback,
  commit
} = require("../models/utilsModel");

const {
  getOrderByOrderId,
  getOrderByUserId,
  createOrder,
  updateOrderStatus,
  updateOrderTotalPrice,
  deleteOrder,
  addOrderItem,
} = require("../models/orderModel");

const {
  getAllProductStock
} = require("../models/productModel");

const {
  InternalServerError,
  NotFoundError,
} = require("../utils/customError");

async function getOrderService(payload) {
  const processStart = performance.now();
  const hinter = "[GET ORDER]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

		const { order_id } = payload
    let rows;
		const cached = await redis().get(`order:${order_id}`)
    if(cached) { checkRuntimeLatency(performance.now(),hinter); return JSON.parse(cached); }

    try {
      const dbStart = performance.now();
      [rows] = await getOrderByOrderId(order_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat mengambil data pesanan");
    }

    if (!rows.length) {
      logger.warn(`${hinter} ORDER NOT FOUND`);
      throw new NotFoundError("Pesanan tidak ditemukan");
    }

		await redis().set(`order:${order_id}`, JSON.stringify(rows), "EX", 3600)
    checkRuntimeLatency(processStart, hinter);
    return rows;
}

async function addOrderService(payload) {
  const processStart = performance.now();
  const order_id = "ORD-" + uuidv4();
  const hinter = "[ADD ORDER]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

  const { user_id, order_status, order_items } = payload
  let order_total_price = 0;

    for (const item of order_items) {
      const { item_id, item_quantity, item_price } = item;
      const currentStock = await redis().get(`stock:${item_id}`);

      if (currentStock === null) {
        logger.warn(`${hinter} STOCK KEY NOT FOUND FOR ITEM: ${item_id}`);
        throw new InternalServerError("Stock product salah satu item tidak ditemukan");
      }

      if (parseInt(currentStock) < item_quantity) {
        logger.warn(`${hinter} INSUFFICIENT STOCK FOR ITEM: ${item_id}`);
        throw new InternalServerError("Salah satu stock product tidak cukup");
      }

      order_total_price += item_price;
    }

    const pipe = redis().pipeline();
    for (const item of order_items) {
      pipe.decrby(`stock:${item.item_id}`, item.item_quantity);
    }
    await pipe.exec();

    let isInserted;
    let isInserted2;

    try {
      const dbStart = performance.now();

      await begin();

      [isInserted] = await createOrder(user_id, order_id, order_total_price, order_status);
      [isInserted2] = await addOrderItem(order_id, order_items);

      checkDbLatency(dbStart, 500, hinter);
    } catch (err) {
      rollback();

      const pipe = redis().pipeline();
	    for (const item of order_items) {
  	    await pipe.decrby(`stock:${item.item_id}`, item.item_quantity);
      }
  	  await pipe.exec();

      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat membuat pesanan");
    }

    if (isInserted?.affectedRows === 0 || isInserted2?.affectedRows === 0) {
      rollback();

			const pipe = redis().pipeline();
	    for (const item of order_items) {
  	    pipe.decrby(`stock:${item.item_id}`, item.item_quantity);
    	}
	    await pipe.exec();

      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal membuat pesanan");
    }

    commit();

    checkRuntimeLatency(processStart, hinter);
    return true;
}

async function updateOrderStatusService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE ORDER STATUS]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

    const { order_id, order_status } = payload
    let isUpdated;

    try {
      const dbStart = performance.now();
      [isUpdated] = await updateOrderStatus(order_status, order_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat memperbarui status pesanan");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal memperbarui status pesanan");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
}

async function updateOrderTotalPriceService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE ORDER TOTAL PRICE]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

		const { order_id, order_total_price } = payload
    let isUpdated;

    try {
      const dbStart = performance.now();
      [isUpdated] = await updateOrderTotalPrice(order_total_price, order_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat memperbarui total harga pesanan");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal memperbarui total harga pesanan");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
}

async function deleteOrderService(payload) {
  const processStart = performance.now();
  const hinter = "[DELETE ORDER]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

    const { user_id, order_id } = payload
    let isDeleted;

    try {
      const dbStart = performance.now();
      [isDeleted] = await deleteOrder(user_id, order_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat menghapus pesanan");
    }

    if (!isDeleteSuccess(isDeleted)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal menghapus pesanan");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
}

module.exports = {
  getOrderService,
  addOrderService,
  updateOrderStatusService,
  updateOrderTotalPriceService,
  deleteOrderService,
};
