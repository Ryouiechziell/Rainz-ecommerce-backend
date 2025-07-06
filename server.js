require("dotenv").config();
const { exec } = require("child_process")
const http = require("http");
const logger = require("./src/utils/logger");
const app = require("./src/main");
const port = 5001;
const server = http.createServer(app);

const redis = require("./src/boot/redisClient");
const { syncProductStockToRedis } = require("./src/services/productService");

async function startApp() {
  try {
    await redis().ping();
    logger.info("[REDIS] CONNECTED!");

    await syncProductStockToRedis();
  } catch (err) {
    logger.error(`[REDIS] ERROW DURING STARTUP: ${err.stack}`);
    process.exit(1);
  }

  server.listen(port, () => {
    logger.info(`[SERVER] Listening on port ${port}`);
  });
}

startApp();
