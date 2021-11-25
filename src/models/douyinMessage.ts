import { Document, Schema } from "mongoose";
import localMongodb from "../utils/localMongoClient";
export interface IDouyinMessage extends Document {
    code: number;
    msg: string;
    roomId: string;
    data: {
        messages: [{
            "method": string,
            "msg_id": string,
            "payload": {
                "room_id": string,
                "content": string,
                "user": {
                    "uid": string,
                    "nickname": string
                }
            }
        }]
    }
    createTime: number;
}

const DouyinMessageSchema = new Schema({
    code: Number,
    msg: String,
    roomId: {
        type: String,
        index: true,
    },
    data: {
        messages: [{
            "method": String,
            "msg_id": String,
            "payload": {
                "room_id": String,
                "content": String,
                "user": {
                    "uid": String,
                    "nickname": String
                }
            }
        }]
    },
    createTime: {
        type: Number,
        index: true,
    }
});
export default localMongodb.model<IDouyinMessage>("DouyinMessage", DouyinMessageSchema, "douyinMessage");
