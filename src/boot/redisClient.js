const Redis = require('ioredis');
const logger = require('../utils/logger');

function redisClient() {
    return new Redis({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT) || 5739,
      password: process.env.REDIS_PASSWORD || "meguminsayang",
      db: 0,
    });

    redis.on('connect', () => {
      logger.info(`[REDIS CLIENT] SUCCESS CONNECTED!`);
    });

    redis.on('error', (err) => {
      logger.error(`[REDIS CLIENT] CONNECTION ERROR: ${err.stack}`);
    });
}


module.exports = redisClient ;
