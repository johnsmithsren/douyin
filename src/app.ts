import http from "http";
import Koa from "koa";
import convert from "koa-convert";
import json from "koa-json";
import koaBody from "koa-body";
import router from "./config/routes";
import restify from "./middleware/restify";
import error from "./middleware/error";
import { winstonLogger } from "./utils/winstonLogger";
import localMongoClient from "./utils/localMongoClient";
import initApp from "./utils/initCron";
let localLogger = winstonLogger(module);
const app = new Koa();
app.proxy = true
app.use(error);
app.use(koaBody({ multipart: true }));
app.use(convert(json()));
app.use(async (ctx, next) => {
    const start: any = new Date();
    localLogger.info(`${ctx.method} ${ctx.url}-可忽略`);
    await next();
    const end: any = new Date();
    const ms: number = end - start;
    if (ms > 1000) {
        localLogger.info(`${ctx.method} ${ctx.url} - ${ms}ms  长时接口`);
    } else {
        localLogger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    }
});
app.use(restify());

app.use(router.routes());
app.use(async (ctx) => {
    ctx.response.type = "application/json";
    ctx.response.status = 404;
    ctx.response.body = { message: "页面不存在" };
});
app.on("error", async (err, ctx) => {
    localLogger.error(`error occured:${err}`);
});
const port: number = 4000;
const server = http.createServer(app.callback());
server.listen(port);
server.on("error", (error?: NodeJS.ErrnoException) => {
    localLogger.error(`error Info:${JSON.stringify(error)}`);
    if (error.syscall !== "listen") {
        throw error;
    }
    switch (error.code) {
        case "EACCES":
            console.error(port + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(port + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
});
server.on("listening", () => {
    initApp();
    localMongoClient.once('open', function callback() {
        localLogger.info(`本地数据库链接成功, env: development`);
    });
});

export default app;
