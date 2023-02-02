const _ = require("lodash");
import ProtoBufJs from 'protobufjs'
import zlib from 'zlib'
const path = require('path')
const DouyinLoader = ProtoBufJs.loadSync(path.join(__dirname, '../../dy.proto'));
const WebcastResponse = DouyinLoader.lookupType("douyin.Response");
const WebcastChatMessage = DouyinLoader.lookupType("douyin.ChatMessage");
const WebcastGiftMessage = DouyinLoader.lookupType("douyin.GiftMessage");
const WebcastLikeMessage = DouyinLoader.lookupType("douyin.LikeMessage");
const WebcastPushFrame = DouyinLoader.lookupType("douyin.PushFrame");

export const transformBuffer = (roomId, info, ws) => {
    let wssPackage: any = WebcastPushFrame.decode(info)
    let apiInfo: any = WebcastResponse.decode(new Uint8Array(zlib.gunzipSync(wssPackage.payload)))
    if (apiInfo.needAck) {
        const result = WebcastPushFrame.create({ payloadType: apiInfo.internalExt, logId: wssPackage.logId });
        let paramBuffer = WebcastPushFrame.encode(result).finish();
        paramBuffer = Buffer.from(paramBuffer);
        ws.send(paramBuffer)
    }
    let messageArray = [];
    for (let message of apiInfo.messagesList) {
        if (message.method === 'WebcastChatMessage') {
            let chatInfo
            try {
                chatInfo = WebcastChatMessage.decode(message.payload);
            } catch (error) {
                console.log(error)
                continue
            }
            messageArray.push({
                "method": message.method,
                "msg_id": _.toString(chatInfo.common.msgId),
                "payload": {
                    "room_id": _.toString(chatInfo.common.roomId),
                    "content": chatInfo.content,
                    "user": {
                        "uid": _.toString(chatInfo.user.id),
                        "nickname": chatInfo.user.nickName,
                    }
                }
            })
        }
        if (message.method === 'WebcastGiftMessage') {
            let giftInfo: any = WebcastGiftMessage.decode(message.payload)
            if (!_.get(giftInfo, 'gift.describe')) {
                continue
            }
            messageArray.push({
                "method": message.method,
                "msg_id": _.toString(giftInfo.common.msgId),
                "payload": {
                    "room_id": _.toString(giftInfo.common.roomId),
                    "content": `${giftInfo.user.nickName}-${_.get(giftInfo, 'gift.describe')}-${giftInfo.repeatCount}个`,
                    "user": {
                        "uid": _.toString(giftInfo.user.id),
                        "nickname": giftInfo.user.nickName,
                    }
                }
            })
        }
        if (message.method === 'WebcastLikeMessage') {
            let likeInfo: any = WebcastLikeMessage.decode(message.payload);
            messageArray.push({
                "method": message.method,
                "msg_id": _.toString(likeInfo.common.msgId),
                "payload": {
                    "room_id": _.toString(likeInfo.common.roomId),
                    "content": '',
                    "user": {
                        "uid": _.toString(likeInfo.user.id),
                        "nickname": likeInfo.user.nickName,
                    }
                }
            })
        }
    }
    if (_.isEmpty(messageArray)) {
        return []
    } else {
        return messageArray
    }
}


