const { performance } = require("perf_hooks");
const logger = require("../utils/logger");
const chalk = require("chalk")

module.exports = (req, res, next) => {
  const requestStart = performance.now();

  res.on("finish", () => {
    const duration = (performance.now() - requestStart).toFixed(2);
    logger.info(`[${req.method}] ${req.originalUrl} - ${res.statusCode} - ${chalk.greenBright(duration + " ms")} \n`);
  });

  next();
};
