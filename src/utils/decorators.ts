import { Context } from "koa";
import { HTTP_CODE } from "./constants";
import { HttpError } from "./error";

export function validateQuery(name, type) {
    return (target: any, name: string, value: PropertyDescriptor) => {
        if (!Array.isArray(target[name])) target[name] = [target[name]];
        target[name].splice(target[name].length - 1, 0, validate);
    };

    async function validate(ctx: Context, next: Function) {
        if (typeof ctx.query[name] !== type) ctx.throw(400, `${name}'s type should be ${type}'`);
        await next();
    }
}

export function checkPermission(func) {
    return (target, name, descriptor) => {
        let oldValue = descriptor.value;
        descriptor.value = function () {
            if (!func(...arguments)) {
                throw new HttpError(HTTP_CODE.FORBIDDEN, "请重新登陆或者检查权限");
            }
            return oldValue.apply(this, arguments);
        };
        return descriptor;
    };
}
