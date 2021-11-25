
import Router from "koa-router";
import onlineApiRouter from "../routers/online";

// api
const apiRouter = new Router();
apiRouter.use("/online", onlineApiRouter.routes(), onlineApiRouter.allowedMethods());

// router
const router = new Router();
router.use("/api", apiRouter.routes(), router.allowedMethods());

export default router;
