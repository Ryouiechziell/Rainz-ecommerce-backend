const logger = require("../utils/logger")
const { performance } = require("perf_hooks")
const { checkDbLatency, checkRuntimeLatency } = require("../utils/checkLatency")
const {
  isInsertSuccess,
  isUpdateSuccess,
  isDeleteSuccess
} = require("../utils/isQuerySuccess");

const {
  getAllStats,
  getOrderStats,
  getProductStats,
  getUserStats,
} = require("../models/adminModel.js");

const {
  InternalServerError,
  NotFoundError
} = require("../utils/customErrors");

/*async function getAllStatsService() {
  try{
  const processStart = performance.now();

  const hinter = "[GET ALL STATS]"

  let rows, rows1, rows2, rows3;
  try {
    const dbStart = performance.now();

    [rows] = await getAllStats();
    [rows1] = await getProductStats();
    [rows3] = await getOrderStats();

    checkDbLatency(dbStart, 500, hinter);
  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data all stats");
  }

  if (!rows.length || !rows1.length || !rows2.length || !rows3.length) {
    logger.warn(`${hinter} FAILED BEBERAPA STATS TIDAK DI TEMUKAN`);
    throw new InternalServerError("Gagal mengambil data seluruh stats");
  }

  checkRuntimeLatency(processStart, hinter);
  return {
    user: {
      total_user: rows.total_user,
      total_admin: rows.total_admin,
    },
    order: {
      total_order: rows.total_order,
      total_pending_order: rows3.total_pending_order,
      total_paid_order: rows3.total_paid_order,
      total_cancelled_order: rows3.total_cancelled_order,
      total_failed_order: rows3.total_failed_order,
    },
    product: {
      total_product: rows.total_product,
      total_food_product: rows1.total_food_product,
      total_drink_product: rows1.total_drink_product,
      total_clothing_product: rows1.total_clothing_product,
      total_electronic_product: rows1.total_electronic_product,
      total_sport_product: rows1.total_sport_product,
      total_automotive_product: rows1.total_automotive_product,
      total_accessory_product: rows1.total_accessory_product,
      total_other_product: rows1.total_other_product,
    },
  }
  }catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat ");
  }
}*/

async function getAllStatsService() {
  const processStart = performance.now();
  const hinter = "[GET ALL STATS]";

  try {
    let rows, rows1, rows3;

    try {
      const dbStart = performance.now();

      const [
        statsAllResult,
        statsProductResult,
        statsOrderResult
      ] = await Promise.allSettled([
        getAllStats(),
        getProductStats(),
        getOrderStats()
      ]);

      if (statsAllResult.status === "fulfilled") {
        rows = statsAllResult.value[0];
      } else {
        logger.warn(`${hinter} GAGAL AMBIL DATA USER: ${statsAllResult.reason}`);
      }

      if (statsProductResult.status === "fulfilled") {
        rows1 = statsProductResult.value[0];
      } else {
        logger.warn(`${hinter} GAGAL AMBIL DATA PRODUCT: ${statsProductResult.reason}`);
      }

      if (statsOrderResult.status === "fulfilled") {
        rows3 = statsOrderResult.value[0];
      } else {
        logger.warn(`${hinter} GAGAL AMBIL DATA ORDER: ${statsOrderResult.reason}`);
      }

    } catch (dbError) {
      logger.error(`${hinter} DB ERROR ${dbError.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat mengambil data statistik dari database");
    }

    checkRuntimeLatency(processStart, hinter);

    return {
      user: rows ? {
        total_user: rows.total_user,
        total_admin: rows.total_admin,
      } : null,

      order: rows3 ? {
        total_order: rows.total_order,
        total_pending_order: rows3.total_pending_order,
        total_paid_order: rows3.total_paid_order,
        total_cancelled_order: rows3.total_cancelled_order,
        total_failed_order: rows3.total_failed_order,
      } : null,

      product: rows1 ? {
        total_product: rows.total_product,
        total_food_product: rows1.total_food_product,
        total_drink_product: rows1.total_drink_product,
        total_clothing_product: rows1.total_clothing_product,
        total_electronic_product: rows1.total_electronic_product,
        total_sport_product: rows1.total_sport_product,
        total_automotive_product: rows1.total_automotive_product,
        total_accessory_product: rows1.total_accessory_product,
        total_other_product: rows1.total_other_product,
      } : null,
    };
  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memproses statistik");
  }
}

async function getUserStatsService() {
  const processStart = performance.now();
  const hinter = "[GET USER STATS]"

try{
  let rows;

  try {
    const dbStart = performance.now();

    [rows] = await getUserStats();

    checkDbLatency(dbStart, 400, hinter);
  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil stats users");
  }

  if (!rows.length) {
    logger.warn(`${hinter} STATS USERS TIDAK DITEMUKAN`);
    throw new NotFoundError("Gagal mengambil stats users");
  }

  checkRuntimeLatency(processStart, hinter);
  return rows;
}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat ");
}
}

async function getOrderStatsService() {
  try{
  const processStart = performance.now();

  const hinter = "[GET ORDER STATS]"

  let rows;
  try {
    const dbStart = performance.now();

    [rows] = await getOrderStats();

    checkDbLatency(dbStart, 400, hinter);
  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data stats orders");
  }

  if (!rows.length) {
    logger.warn(`${hinter} ORDER STATS NOT FOUND`);
    throw new NotFoundError("Gagal mengambil data stats orders");
  }

  checkRuntimeLatency(processStart, hinter);
  return rows;
  }catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data stats orders");
  }
}

async function getProductStatsService() {
  const processStart = performance.now();
  const hinter = "[GET PRODUCT STATS]"

try {
  let rows;

  try {
    const dbStart = performance.now();

    [rows] = await getProductStats();

    checkRuntimeLatency(processStart, hinter);
  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data stats products");
  }

  if (!rows.length) {
    logger.warn(`${hinter} STATS PRODUCTS NOT FOUND`);
    throw new NotFoundError("Gagal mengambil data stats products");
  }

  checkRuntimeLatency(processStart, hinter)
  return rows;
}catch(err) {
  logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
  throw new InternalServerError("Terjadi kesalahan saat mengambil data stats product");
}
}

module.exports = {
  getAllStatsService,
  getUserStatsService,
  getOrderStatsService,
  getProductStatsService
}
