

import { Context } from "koa";

export default function (pathPrefix = "/api/") {
    return async (ctx: Context, next) => {
        if (ctx.request.path.startsWith(pathPrefix)) {
            ctx.rest = (data, code = 200) => {
                ctx.response.type = "application/json";
                ctx.response.status = code;
                ctx.response.body = data;
            };
            await next();
        } else {
            await next();
        }
    };
}
