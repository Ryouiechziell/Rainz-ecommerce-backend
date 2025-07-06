const { checkDbLatency, checkRuntimeLatency } = require("../utils/checkLatency");
const logger = require("../utils/logger");
const redis = require("../boot/redisClient");
const { performance } = require("perf_hooks");
const { v4: uuidv4 } = require("uuid");

const {
  isUpdateSuccess,
  isInsertSuccess,
  isDeleteSuccess,
} = require("../utils/isQuerySuccess");

const {
  getAllProductStock,
  getProductByItemId,
  addProduct,
  updateProductTitle,
  updateProductPrice,
  updateProductStock,
  updateProductDescription,
  updateProductCategory,
  updateProductCover,
  deleteProduct,
} = require("../models/productModel");

const {
  InternalServerError,
  NotFoundError,
} = require("../utils/customErrors");

async function syncProductStockToRedis(item_id) {
  const processStart = performance.now();
  const hinter = "[SYNC PRODUCT STOCK REDIS]";

  try {
    let rows;

    try {
      const dbStart = performance.now();
      rows = item_id
        ? (await getProductByItemId(item_id))[0]
        : (await getAllProductStock())[0];
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat mengambil data semua produk stock");
    }

    if (!rows.length) {
      logger.warn(`${hinter} FAILED LENGTH ERROR`);
      throw new InternalServerError("Produk tidak ditemukan");
    }

    for (const data of rows) {
      await redis().set(`stock:${data.item_id}`, data.item_stock);
      logger.debug(`${hinter} SUCCESS SYNC DATA KEY: ${data.item_id} & VALUE: ${data.item_stock}`);
    }

    checkRuntimeLatency(processStart, hinter);
    return rows;
  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data produk");
  }
}

async function getProductByItemIdService(payload) {
  const processStart = performance.now();
  const hinter = "[GET PRODUCT]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
		const { item_id } = payload
    let rows;

    try {
      const dbStart = performance.now();
      [rows] = await getProductByItemId(item_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat mengambil data produk");
    }

    if (!rows.length) {
      logger.warn(`${hinter} PRODUCT NOT FOUND`);
      throw new NotFoundError("Produk tidak ditemukan");
    }

    checkRuntimeLatency(processStart, hinter);
    return rows;
  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data produk");
  }
}

async function addProductService(payload) {
  const processStart = performance.now();
  const item_id = "ITM-" + uuidv4();
  const hinter = "[ADD PRODUCT]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {

		const {
		  item_title,
		  item_price,
		  item_stock,
		  item_description,
		  item_category,
		  item_cover,
		} = payload;

    let isInserted;

    try {
      const dbStart = performance.now();

      [isInserted] = await addProduct(
        item_id,
        item_title,
        item_price,
        item_stock,
        item_description,
        item_category,
        item_cover
      );

      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Gagal menambahkan produk");
    }

    if (!isInsertSuccess(isInserted)) {
      logger.warn(`${hinter} INSERT FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal menambahkan produk");
    }

    await syncProductStockToRedis(item_id);
    checkRuntimeLatency(processStart, hinter);
    return true;
  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat menambahkan produk");
  }
}

async function updateProductTitleService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT TITLE]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
		const { item_id, item_title } = payload
    let isUpdated;

    try {
      const dbStart = performance.now();
      [isUpdated] = await updateProductTitle(item_title, item_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Gagal mengupdate judul produk");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal mengupdate judul produk");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengupdate judul produk");
  }
}

async function updateProductPriceService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT PRICE]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
		const { item_id, item_price } = payload
    let isUpdated;

    try {
      const dbStart = performance.now();
      [isUpdated] = await updateProductPrice(item_price, item_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat memperbarui harga produk");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal memperbarui harga produk");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui harga produk");
  }
}

async function updateProductStockService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT STOCK]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
		const { item_id, item_stock } = payload
    let isUpdated;

    try {
      const dbStart = performance.now();
      [isUpdated] = await updateProductStock(item_stock, item_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Gagal mengupdate stok produk");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} UPDATE STOCK FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal mengupdate produk");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui stok produk");
  }
}

async function updateProductDescriptionService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT DESCRIPTION]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
  	const { item_id, item_description } = payload
    let isUpdated;

    try {
      const dbStart = performance.now();
      [isUpdated] = await updateProductDescription(item_description, item_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Gagal mengupdate deskripsi produk");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal mengupdate deskripsi produk");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui deskripsi produk");
  }
}

async function updateProductCategoryService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT CATEGORY]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
		const { item_id, item_category } = payload
    let isUpdated;

    try {
      const dbStart = performance.now();
      [isUpdated] = await updateProductCategory(item_category, item_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Gagal mengupdate kategori produk");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal mengupdate kategori produk");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui kategori produk");
  }
}

async function updateProductCoverService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT COVER]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
		const { item_id, item_cover } = payload;
    let isUpdated;

    try {
      const dbStart = performance.now();
      [isUpdated] = await updateProductCover(item_cover, item_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch ({ stack }) {
      logger.error(`[${hinter} DB ERROR ${stack}`);
      throw new InternalServerError("Gagal mengupdate cover produk");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal mengupdate sampul produk");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui sampul produk");
  }
}

async function deleteProductService(payload) {
  const processStart = performance.now();
  const hinter = "[DELETE PRODUCT]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
    const { item_id } = payload
    let isDeleted;

    try {
      const dbStart = performance.now();
      [isDeleted] = await deleteProduct(item_id);
      checkDbLatency(dbStart, 400, hinter);
    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Gagal menghapus produk");
    }

    if (!isDeleteSuccess(isDeleted)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new NotFoundError("Gagal menghapus produk");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;
  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat menghapus produk");
  }
}

module.exports = {
  syncProductStockToRedis,
  getProductByItemIdService,
  addProductService,
  updateProductTitleService,
  updateProductPriceService,
  updateProductStockService,
  updateProductDescriptionService,
  updateProductCategoryService,
  updateProductCoverService,
  deleteProductService,
};
