import { cronFactory } from "../utils/cron";
import DouyinMessageModel from "../models/douyinMessage";
import { redis } from "../utils/redisStore";
import moment from 'moment'
const _ = require('lodash')
class OnlineApiController {
    async start(ctx, next) {
        let { roomId } = ctx.request.query;
        // 方便测试，后续需要删除
        await await redis.del(`dy:pages`);
        await cronFactory.startInspectPage(roomId)
        return ctx.rest({});
    }

    async getMessage(ctx, next) {
        let { id } = ctx.params;
        let roomMessage = await redis.get(`${id}-dy`);
        if (roomMessage) {
            roomMessage = JSON.parse(roomMessage);
            return ctx.rest({
                "code": 200,
                roomId: id,
                "msg": "成功",
                "data": {
                    messages: roomMessage
                },
                createTime: moment().utcOffset(8).valueOf()
            });
        } else {
            let currentTime = moment().utcOffset(8).subtract(5, 'seconds').valueOf()
            let result = await DouyinMessageModel.find({ roomId: id, createTime: { $gte: currentTime } }).lean();
            await redis.set(`${id}-dy`, JSON.stringify(result));
            await redis.expire(`${id}-dy`, 300);
            return ctx.rest({
                "code": 200,
                roomId: id,
                "msg": "成功",
                "data": {
                    messages: []
                },
                createTime: moment().utcOffset(8).valueOf()
            });
        }
    }
}
export default new OnlineApiController();
