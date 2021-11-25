import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";
import fs from "fs";
import moment from "moment";
const staticPath = path.join(__dirname, "../..");
const { combine, timestamp, printf, label } = winston.format;
if (!fs.existsSync(path.join(staticPath, `/logs`))) {
    fs.mkdirSync(path.join(staticPath, `/logs`));
}
var options = {
    errorFile: {
        level: "error",
        filename: `${path.join(staticPath, `/logs`)}/error-%DATE%.log`,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        timestamp: true,
    },
    normalFile: {
        filename: `${path.join(staticPath, `/logs`)}/app-%DATE%.log`,
        handleExceptions: true,
        json: false,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        timestamp: true,
    },
};
const myFormat = printf((info) => {
    return `${moment(info.timestamp).format("YYYY-MM-DD HH:mm:ss")} ${info.label} ${info.level}: ${info.message}`;
});
let logger = winston.createLogger({
    level: "info",
    format: combine(timestamp(), label({ label: "" }), myFormat),
    defaultMeta: { service: "platform-service" },
    transports: [new winston.transports.DailyRotateFile(options.errorFile), new winston.transports.DailyRotateFile(options.normalFile)],
});

export const winstonLogger = (module) => {
    return logger;
};
