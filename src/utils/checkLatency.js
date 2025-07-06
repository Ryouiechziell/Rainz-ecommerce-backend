const logger = require("./logger")
const { performance } = require("perf_hooks")

function checkDbLatency(dbStart, slow, hinter){
  const dbLatency = (performance.now() - dbStart).toFixed(2)
  if (dbLatency > slow) {
      logger.warn(`${hinter} DB QUERY SUCCESS BUT SLOW DURATION: ${dbLatency}ms`);
  }else {
      logger.info(`${hinter} DB QUERY SUCCESS DURATION: ${dbLatency}ms`);
  }
}

function checkRuntimeLatency(processStart, hinter) {
  const processLatency = (performance.now() - processStart).toFixed(2);
  logger.info(`${hinter} COMPLETED WITH DURATION: ${processLatency}ms`);
}

module.exports = {checkDbLatency, checkRuntimeLatency}
