import Koa from "koa";
import convert from "koa-convert";
import json from "koa-json";
import koaBody from "koa-body";
import redis from "./utils/redisStore";
import router from "./config/routes";
import restify from "./middleware/restify";
import error from "./middleware/error";
import localMongoClient from "./utils/localMongoClient";
const app = new Koa();
app.proxy = true
app.use(error);
app.use(koaBody({ multipart: true }));
app.use(convert(json()));
app.use(async (ctx, next) => {
    await redis.getRedis().del('ws');
    const start: any = new Date();
    console.info(`${ctx.method} ${ctx.url}-可忽略`);
    await next();
    const end: any = new Date();
    const ms: number = end - start;
    if (ms > 1000) {
        console.info(`${ctx.method} ${ctx.url} - ${ms}ms  长时接口`);
    } else {
        console.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    }
});
app.use(restify());
app.use(router.routes());
app.use(async (ctx) => {
    ctx.response.type = "application/json";
    ctx.response.status = 404;
    ctx.response.body = { message: "页面不存在" };
});
const port: number = 4000;
app.listen(port);
console.info(`端口监听中:`, port);
app.on("error", (error?: NodeJS.ErrnoException) => {
    console.error(`error Info:${JSON.stringify(error)}`);
    throw error;
});

export default app;
