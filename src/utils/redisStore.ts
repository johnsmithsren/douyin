import { defaultConfig } from "../config/config"
const Redis = require("ioredis");
const config = {
    redis: {
        host: defaultConfig.host,
        port: defaultConfig.port,
        password: defaultConfig.password,
        db: defaultConfig.db,
        family: defaultConfig.family,
    },
};
export const redis = new Redis(config.redis);
export default async function (ctx, next) {
    ctx.redis = redis;
    await next();
}



