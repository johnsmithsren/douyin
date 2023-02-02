import Redis from "ioredis"
const config = {
    redis: {
        port: 0,
        host: "xxxx",
        password: "xxxx",
        db: 2,
    },
};

class RedisStore {
    redis: Redis.Redis;
    constructor() {
        this.redis = new Redis(config.redis);
    }
    getRedis() {
        return this.redis;
    }
}

export default new RedisStore();



