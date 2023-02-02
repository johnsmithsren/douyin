
import Router from "koa-router";
import onlineApiRouter from "../routers/online";
const apiRouter = new Router();
apiRouter.use("/online", onlineApiRouter.routes(), onlineApiRouter.allowedMethods());
export default apiRouter;