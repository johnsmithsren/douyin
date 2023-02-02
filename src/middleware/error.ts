import { CustomError, HttpError } from "../utils/error";
export default function async(ctx, next) {
    return next().catch((err) => {
        let code = 500;
        let message = "unknown error";
        if (err instanceof CustomError || err instanceof HttpError) {
            const res = err.getCodeMsg();
            ctx.status = err instanceof HttpError ? res.code : 200;
            code = res.code;
            message = res.message;
        } else {
            ctx.status = 500;
            message = err.message;
        }
        ctx.body = {
            code,
            message,
        };
    });
}
