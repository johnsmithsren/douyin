import { douyinFactory } from "../utils/douyin";
import redis from "../utils/redisStore";
import moment from 'moment'
class OnlineApiController {
    async start(ctx, next) {
        let { roomId } = ctx.request.query;
        await douyinFactory.startInspectPage(roomId)
        return ctx.body = { msg: 'success' }
    }

    async getMessage(ctx, next) {
        let { id } = ctx.params;
        let roomMessage = await redis.getRedis().get(`${id}-dy`);
        if (roomMessage) {
            roomMessage = JSON.parse(roomMessage);
            return ctx.body = {
                "code": 200,
                'roomId': id,
                "msg": "成功",
                "data": {
                    'messages': roomMessage
                },
                'createTime': moment().utcOffset(8).valueOf()
            }
        } else {
            return ctx.body = {
                "code": 200,
                'roomId': id,
                "msg": "成功",
                "data": {
                    'messages': []
                },
                'createTime': moment().utcOffset(8).valueOf()
            };
        }
    }
}
export default new OnlineApiController();
