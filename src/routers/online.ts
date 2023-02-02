import Router from "koa-router";
import OnlineApiController from "../controllers/online";
const router = new Router();
router.get("/room/start", OnlineApiController.start);
router.get("/:id", OnlineApiController.getMessage);
export default router;
