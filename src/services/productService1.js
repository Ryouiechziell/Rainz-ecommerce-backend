const { checkDbLatency, checkRuntimeLatency} = require("../utils/checkLatency")
const logger = require("../utils/logger");
const redis = require("../boot/redisClient")
const { performance } = require("perf_hooks")
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
  const hinter = "[SYNC PRODUCT STOCK REDIS]"

try {
  let rows;

  try {
    const dbStart = performance.now();

    if(item_id){
      [rows] = await getProductByItemId(item_id)
    }else{
      [rows] = await getAllProductStock();
    }
    checkDbLatency(dbStart, 400, hinter);

  } catch (err) {
    logger.error(`${hinter} DB ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data semua produk stock");
  }

  if (!rows.length) {
    logger.warn(`${hinter} FAILED LENGTH ERROR`);
    throw new InternalServerError("Produk tidak ditemukan");
  }

  for(data of rows){
    await redis().set(`stock:${data.item_id}`, data.item_stock)
    logger.debug(`${hinter} SUCCESS SYNC DATA KEY: ${data.item_id} & VALUE: ${data.item_stock}`)
  }

  checkRuntimeLatency(processStart, hinter)
  return rows;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data produk");
  }
}

async function getProductByItemIdService({ item_id }) {
  const processStart = performance.now();
  const hinter = "[GET PRODUCT]"
  logger.debug(`${hinter} ITEM ID: ${item_id}`)

try {
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

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data produk");
  }
}

async function addProductService({
  item_title,
  item_price,
  item_stock,
  item_description,
  item_category,
  item_cover,
}) {
  const processStart = performance.now();
  const item_id = "ITM-" + uuidv4();
  const hinter = "[ADD PRODUCT]"
  logger.debug(`${hinter} ITEM ID: ${item_id}, ITEM TITLE: ${item_title}, ITEM PRICE: ${item_price}, ITEM STOCK: ${item_stock}, ITEM DESCRIPTION ${item_description},  ITEM CATEGORY ${item_category}, ITEM COVER ${item_cover}`)

try {
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

  await syncProductStockToRedis(item_id)

  checkRuntimeLatency(processStart, hinter);
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat menambahkan produk");
  }
}

async function updateProductTitleService({ item_id, item_title }) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT TITLE]"
  logger.debug(`${hinter} ITEM ID: ${item_id}, ITEM_TITLE: ${item_title}`)

try {
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

  checkRuntimeLatency(processStart, hinter)
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengupdate judul produk");
  }
}

async function updateProductPriceService({ item_id, item_price }) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT PRICE]"
  logger.debug(`${hinter} ITEM ID: ${item_id}, ITEM_PRICE: ${item_price}`);

try {
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
    throw new InternalServerError("Gagal mengperbarui harga produk");
  }

  checkRuntimeLatency(processStart, hinter);
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui harga produk");
  }
}

async function updateProductStockService({ item_id, item_stock }) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT STOCK]"
  logger.debug(`${hinter} ITEM ID: ${item_id}, ITEM_STOCK: ${item_stock}`);

try {
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
    throw new InternalServerError("Gagal mengupdate Produk");
  }

  checkRuntimeLatency(processStart, hinter);
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui stok produk");
  }
}

async function updateProductDescriptionService({ item_id, item_description }) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT DESCRIPTION]"
  logger.debug(`${hinter} ITEM ID: ${item_id}, ITEM_DESCRIPTION: ${item_description}`);

try {
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

  checkRuntimeLatency(processStart, hinter)
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui deskripsi produk");
  }
}

async function updateProductCategoryService({ item_id, item_category }) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT CATEGORY]"
  logger.debug(`${hinter} ITEM ID: ${item_id}, ITEM_CATEGORY: ${item_category}`)

try {
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

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui kategori produk");
  }
}

async function updateProductCoverService({ item_id, item_cover }) {
  const processStart = performance.now();
  const hinter = "[UPDATE PRODUCT COVER]"
  logger.debug(`${hinter} ITEM ID: ${item_id}, ITEM_COVER: ${item_cover}`)

try {
  let isUpdated;

  try {
    const dbStart = performance.now();

    [isUpdated] = await updateProductCover(item_cover, item_id);
    checkDbLatency(dbStart, 400, hinter);

  } catch ({stack}) {
    logger.error(`[${hinter} DB ERROR ${stack}`);
    throw new InternalServerError("Gagal mengupdate cover produk");
  }

  if (!isUpdateSuccess(isUpdated)) {
    logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
    throw new InternalServerError("Gagal mengupdate sampul produk");
  }

  checkRuntimeLatency(processStart, hinter);
  return true;

}catch(err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui sampul produk");
  }
}

async function deleteProductService({ item_id }) {
  const processStart = performance.now();
  const hinter = "[DELETE PRODUCT]"
  logger.debug(`${hinter} ITEM ID: ${item_id}`)

try {
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

}catch(err) {
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
