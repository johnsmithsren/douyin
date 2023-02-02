import redis from "./redisStore";
import request from 'request'
import qs from 'qs'
import { transformBuffer } from "./commonFunction";
import WebSocket from 'ws';
import * as path from 'path'
import { PythonShell } from 'python-shell'
const ProtoBufJs = require("protobufjs");
const DouyinLoader = ProtoBufJs.loadSync(path.join(__dirname, '../../dy.proto'));
const WebcastPushFrame = DouyinLoader.lookupType("douyin.PushFrame");
const _ = require("lodash");

class DouYinFactory {
    constructor() {
    }
    async startInspectPage(roomId) {
        let header = {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
            'cookie': '__ac_nonce=063d927dc00fc0e499901',
        }
        let roomInfo: any = await new Promise<void>((resolve, reject) => {
            PythonShell.run(path.join(__dirname, '../../getRoomInfo.py'), { args: [roomId] }, function (err, results) {
                if (err) throw err;
                resolve(JSON.parse(results[0]));
            });
        })
        let ttwid = await new Promise((resolve, reject) => {
            request({
                url: `https://live.douyin.com/${roomId}`,
                method: "GET",
                headers: header,
            }, function (error, response, body) {
                if (error) {
                    reject('')
                }
                let ttwid = qs.parse(response.headers['set-cookie'][0].split(';')[0]).ttwid
                resolve(ttwid)
            });
        })
        let liveRoomId = roomInfo.liveRoomId
        let checkExist = await redis.getRedis().hget('ws', `${liveRoomId}-ws`);
        if (checkExist == 'true') {
            return
        }
        let webSocketUrl = "wss://webcast3-ws-web-hl.douyin.com/webcast/im/push/v2/?app_name=douyin_web&version_code=180800&webcast_sdk_version=1.3.0&update_version_code=1.3.0&compress=gzip&internal_ext=internal_src:dim|wss_push_room_id:" + liveRoomId + "|wss_push_did:" + liveRoomId + "|dim_log_id:2022122306295965382308B5DCD45D07F8|fetch_time:1671748199438|seq:1|wss_info:0-1671748199438-0-0|wrds_kvs:WebcastRoomRankMessage-1671748147622091132_WebcastRoomStatsMessage-1671748195537766499&cursor=t-1671748199438_r-1_d-1_u-1_h-1&host=https://live.douyin.com&aid=6383&live_id=1&did_rule=3&debug=false&endpoint=live_pc&support_wrds=1&im_path=/webcast/im/fetch/&device_platform=web&cookie_enabled=true&screen_width=1440&screen_height=900&browser_language=zh&browser_platform=MacIntel&browser_name=Mozilla&browser_version=5.0%20(Macintosh;%20Intel%20Mac%20OS%20X%2010_15_7)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/108.0.0.0%20Safari/537.36&browser_online=true&tz_name=Asia/Shanghai&identity=audience&room_id=" + liveRoomId + "&heartbeatDuration=0"
        let wsHeader = {
            'cookie': "ttwid=" + ttwid,
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        }
        let messageList = []
        let emptyCount = 0
        let messageMaxLength = 50
        const ws = new WebSocket(webSocketUrl, { headers: wsHeader });
        await redis.getRedis().hset('ws', `${liveRoomId}-ws`, 'true');
        ws.on('error', function error(err) {
            console.log(err)
        });
        ws.on('close', async function close(err) {
            await redis.getRedis().del(`${roomId}-dy`);
            await redis.getRedis().hdel('ws', `${liveRoomId}-ws`);
            console.log('监听结束')
        });
        ws.on('open', function open(err) {
            const result = WebcastPushFrame.create({ payloadType: 'hb' });
            let paramBuffer = WebcastPushFrame.encode(result).finish();
            paramBuffer = Buffer.from(paramBuffer);
            ws.send(paramBuffer)
            // console.log('[ping] [💗发送ping心跳] [房间Id：' + liveRoomId + '] ====> 房间🏖标题【' + '】')
            let interval = setInterval(async () => {
                const result = WebcastPushFrame.create({ payloadType: 'hb' });
                let paramBuffer = WebcastPushFrame.encode(result).finish();
                paramBuffer = Buffer.from(paramBuffer);
                ws.send(paramBuffer)
                // console.log('[ping] [💗发送ping心跳] [房间Id：' + liveRoomId + '] ====> 房间🏖标题【' + '】')
                if (emptyCount > 600) {
                    clearInterval(interval)
                    ws.close();
                }
            }, 10000)
        });
        ws.on('message', async function message(data) {
            let callback = transformBuffer(roomId, data, ws);
            if (callback.length > messageMaxLength) {
                messageMaxLength = callback.length + 1
            }
            if (callback.length == 0) {
                emptyCount++
            } else {
                emptyCount = 0
            }
            for (let info of callback) {
                if (messageList.length == messageMaxLength) {
                    messageList.shift()
                }
                messageList.push(info)
            }
            await redis.getRedis().set(`${roomId}-dy`, JSON.stringify(messageList));
            await redis.getRedis().expire(`${roomId}-dy`, 10);
        });
    }

}

export const douyinFactory = new DouYinFactory();
