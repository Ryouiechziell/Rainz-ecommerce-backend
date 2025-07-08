const logger = require("../utils/logger");
const { performance } = require("perf_hooks");
const { v4: uuidv4 } = require("uuid");
const {
  isInsertSuccess,
  isUpdateSuccess,
  isDeleteSuccess,
} = require("../utils/checkQuery");

const {
  createPayment,
  getPaymentByPaymentId,
  getPaymentByUserId,
  getPaymentByOrderId,
  updatePaymentStatus,
  updatePaymentAmount,
  updatePaymentMethod,
  deletePayment,
} = require("../models/paymentModel");

const {
  InternalServerError,
  NotFoundError,
} = require("../utils/customError");

async function addPaymentService(payload) {
  const processStart = performance.now();
  const payment_id = "PAY-" + uuidv4();
  const hinter = "[ADD PAYMENT]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

  try {
		const { user_id, order_id, payment_method, payment_amount, payment_status } = payload;
    let isInserted;

    try {
      const dbStart = performance.now();

      [isInserted] = await createPayment(payment_id, user_id, order_id, payment_method, payment_amount, payment_status);
      checkDbLatency(dbStart, 400, hinter);

    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat membuat pembayaran");
    }

    if (!isInsertSuccess(isInserted)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal membuat pembayaran");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;

  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat membuat pembayaran");
  }
}

async function getPaymentService(payload) {
  const processStart = performance.now();
  const hinter = "[GET PAYMENT]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`)

  try {
    let payment;
		const { payment_id, user_id } = payload

    try {
      const dbStart = performance.now();

      [payment] = await getPaymentByPaymentId(payment_id, user_id);
      checkDbLatency(dbStart, 400, hinter);

    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat mengambil data pembayaran");
    }

    if (!payment.length) {
      logger.warn(`${hinter} PAYMENT NOT FOUND`);
      throw new NotFoundError("Pembayaran tidak ditemukan");
    }

    checkRuntimeLatency(processStart, hinter);
    return payment;

  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat mengambil data pembayaran");
  }
}

async function updatePaymentStatusService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE PAYMENT STATUS]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
    const { payment_id, payment_status } = payload;
    let isUpdated;

    try {
      const dbStart = performance.now();

      [isUpdated] = await updatePaymentStatus(payment_status, payment_id);
      checkDbLatency(dbStart, 400, hinter);

    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat memperbarui status pembayaran");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal memperbarui status pembayaran");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;

  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui status pembayaran");
  }
}

async function updatePaymentMethodService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE PAYMENT METHOD]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
		const { payment_id, payment_method } = payload
    let isUpdated;

    try {
      const dbStart = performance.now();

      [isUpdated] = await updatePaymentMethod(payment_method, payment_id);
      checkDbLatency(dbStart, 400, hinter);

    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat memperbarui metode pembayaran");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal memperbarui metode pembayaran");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;

  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui metode pembayaran");
  }
}

async function updatePaymentAmountService(payload) {
  const processStart = performance.now();
  const hinter = "[UPDATE PAYMENT AMOUNT]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
		const { payment_id, payment_amount } = payload
    let isUpdated;

    try {
      const dbStart = performance.now();

      [isUpdated] = await updatePaymentAmount(payment_amount, payment_id);
      checkDbLatency(dbStart, 400, hinter);

    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Gagal memperbarui jumlah pembayaran");
    }

    if (!isUpdateSuccess(isUpdated)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal memperbarui jumlah pembayaran");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;

  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat memperbarui jumlah pembayaran");
  }
}

async function deletePaymentService(payload) {
  const processStart = performance.now();
  const hinter = "[DELETE PAYMENT]";
  logger.debug(`${hinter} PAYLOAD: ${JSON.stringify(payload,null,2)}`);

  try {
		const { payment_id, user_id } = payload
    let isDeleted;

    try {
      const dbStart = performance.now();

      [isDeleted] = await deletePayment(payment_id, user_id);
      checkDbLatency(dbStart, 400, hinter);

    } catch (err) {
      logger.error(`${hinter} DB ERROR ${err.stack}`);
      throw new InternalServerError("Terjadi kesalahan saat menghapus pembayaran");
    }

    if (!isDeleteSuccess(isDeleted)) {
      logger.warn(`${hinter} FAILED NO ROWS AFFECTED ERROR`);
      throw new InternalServerError("Gagal menghapus pembayaram");
    }

    checkRuntimeLatency(processStart, hinter);
    return true;

  } catch (err) {
    logger.error(`${hinter} RUNTIME ERROR ${err.stack}`);
    throw new InternalServerError("Terjadi kesalahan saat menghapus pembayaran");
  }
}

module.exports = {
  addPaymentService,
  getPaymentService,
  updatePaymentStatusService,
  updatePaymentMethodService,
  updatePaymentAmountService,
  deletePaymentService,
};
