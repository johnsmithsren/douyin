import { CustomError, HttpError } from "../utils/error";
import { winstonLogger } from "../utils/winstonLogger";
let localLogger = winstonLogger(module);
export default function async(ctx, next) {
    return next().catch((err) => {
        let code = 500;
        let message = "unknown error";
        if (err instanceof CustomError || err instanceof HttpError) {
            const res = err.getCodeMsg();
            ctx.status = err instanceof HttpError ? res.code : 200;
            code = res.code;
            message = res.message;
            localLogger.error(`err: ${JSON.stringify(err)}`);
        } else {
            ctx.status = 500;
            message = err.message;
            localLogger.error(`err: ${JSON.stringify(err)}`);
        }
        ctx.body = {
            code,
            message,
        };
    });
}
