const _ = require("lodash");
const ProtoBufJs = require("protobufjs");
const path = require('path')
const DouyinLoader = ProtoBufJs.loadSync(path.join(__dirname, '../../proto/douyin.proto'));
const ApiResult = DouyinLoader.lookupType("DouyinPack.ApiResult");
const WebcastChatMessage = DouyinLoader.lookupType("DouyinPack.WebcastChatMessage");
const WebcastGiftMessage = DouyinLoader.lookupType("DouyinPack.WebcastGiftMessage");
const WebcastLikeMessage = DouyinLoader.lookupType("DouyinPack.WebcastLikeMessage");

export const transformBuffer = (roomId, info) => {
    let apiInfo = ApiResult.decode(info);
    let messageArray = [];
    for (let message of apiInfo.messages) {
        if (message.method === 'WebcastChatMessage') {
            let chatInfo = WebcastChatMessage.decode(message.payload);
            // roomId = _.toString(chatInfo.common.roomId)
            messageArray.push({
                "method": message.method,
                "msg_id": _.toString(chatInfo.common.msgId),
                "payload": {
                    "room_id": _.toString(chatInfo.common.roomId),
                    "content": chatInfo.content,
                    "user": {
                        "uid": _.toString(chatInfo.user.id),
                        "nickname": chatInfo.user.nickname,
                    }
                }
            })
        }
        if (message.method === 'WebcastGiftMessage') {
            let giftInfo = WebcastGiftMessage.decode(message.payload)
            // roomId = _.toString(giftInfo.common.roomId);
            if (!_.get(giftInfo, 'gift.describe')) {
                continue
            }
            messageArray.push({
                "method": message.method,
                "msg_id": _.toString(giftInfo.common.msgId),
                "payload": {
                    "room_id": _.toString(giftInfo.common.roomId),
                    "content": `${giftInfo.user.nickname}-${_.get(giftInfo, 'gift.describe')}-${giftInfo.repeatCount}个`,
                    "user": {
                        "uid": _.toString(giftInfo.user.id),
                        "nickname": giftInfo.user.nickname,
                    }
                }
            })
        }
        if (message.method === 'WebcastLikeMessage') {
            let likeInfo = WebcastLikeMessage.decode(message.payload);
            // roomId = _.toString(likeInfo.common.roomId)
            messageArray.push({
                "method": message.method,
                "msg_id": _.toString(likeInfo.common.msgId),
                "payload": {
                    "room_id": _.toString(likeInfo.common.roomId),
                    "content": '',
                    "user": {
                        "uid": _.toString(likeInfo.user.id),
                        "nickname": likeInfo.user.nickname,
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


