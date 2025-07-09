const logger = require("./logger")
const { performance } = require("perf_hooks")
const chalk = require("chalk")

const checkDbLatency = (dbStart, slow, hinter) => {
  const dbLatency = (performance.now() - dbStart).toFixed(2)
  if (dbLatency > slow) return logger.warn(`${hinter} - DATABASE SLOW - ${chalk.redBright(dbLatency + " ms")}`);
  logger.info(`${hinter} - DATABASE NORMAL - ${chalk.greenBright(dbLatency + " ms")}`);
}

const checkRuntimeLatency = (processStart, hinter) => {
  const processLatency = (performance.now() - processStart).toFixed(2);
  logger.info(`${hinter} - COMPLETED - ${chalk.greenBright(processLatency + " ms")}`);
}

module.exports = {checkDbLatency, checkRuntimeLatency}
