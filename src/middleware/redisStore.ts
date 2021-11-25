import { publicConfig } from "../config/settings";
const Redis = require("ioredis");
const config = {
    redis: {
        host: publicConfig.redis.host,
        port: publicConfig.redis.port,
        family: 4, // 4 (IPv4) or 6 (IPv6)
        password: publicConfig.redis.password,
        db: publicConfig.redis.db,
    },
};
export const redis = new Redis(config.redis);
export default async function (ctx, next) {
    ctx.redis = redis;
    await next();
}



