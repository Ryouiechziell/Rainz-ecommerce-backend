const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const { createLogger, transports, format } = require("winston");
require("dotenv").config();

const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const colorizeMessage = (level, message) => {
  switch (level) {
    case "error":
      return chalk.redBright(message);
    case "warn":
      //return chalk.hex("#FFA500")(message);
			return chalk.yellowBright(message);
    case "info":
      return chalk.blue(message);
    default:
      return message;
  }
};

const logFormatForConsole = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message }) => {
    const coloredTimestamp = chalk.cyanBright(`[${timestamp}]`);
    const coloredLevel = chalk.yellowBright(level.toUpperCase());
    const coloredMessage = colorizeMessage(level, message);
    return `${coloredTimestamp} ${coloredLevel} : ${coloredMessage}`;
  })
);

const logFormatForFile = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()} : ${message}`;
  })
);

const logLevel = (process.env.STATUS === "production" && process.env.LEVEL === "debug") || process.env.LEVEL === "verbose" ? "warn" : process.env.LEVEL || "info";

const logger = createLogger({
  level: logLevel,
  transports: [
    new transports.Console({
      format: logFormatForConsole,
    }),
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      format: logFormatForFile,
    }),
    new transports.File({
      filename: path.join(logDir, "warn.log"),
      level: "warn",
      format: logFormatForFile,
    }),
    new transports.File({
      filename: path.join(logDir, "info.log"),
      level: "info",
      format: logFormatForFile,
    }),
  ],
});

module.exports = logger;
