import * as $protobuf from "protobufjs";
/** Namespace DouyinPack. */
export namespace DouyinPack {

    /** Properties of a WebcastChatMessage. */
    interface IWebcastChatMessage {

        /** WebcastChatMessage common */
        common?: (DouyinPack.ICommon|null);

        /** WebcastChatMessage user */
        user?: (DouyinPack.IUser|null);

        /** WebcastChatMessage content */
        content?: (string|null);
    }

    /** Represents a WebcastChatMessage. */
    class WebcastChatMessage implements IWebcastChatMessage {

        /**
         * Constructs a new WebcastChatMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.IWebcastChatMessage);

        /** WebcastChatMessage common. */
        public common?: (DouyinPack.ICommon|null);

        /** WebcastChatMessage user. */
        public user?: (DouyinPack.IUser|null);

        /** WebcastChatMessage content. */
        public content: string;
    }

    /** Properties of a WebcastGiftMessage. */
    interface IWebcastGiftMessage {

        /** WebcastGiftMessage common */
        common?: (DouyinPack.ICommon|null);

        /** WebcastGiftMessage repeatCount */
        repeatCount?: (number|Long|null);

        /** WebcastGiftMessage user */
        user?: (DouyinPack.IGiftUser|null);

        /** WebcastGiftMessage gift */
        gift?: (DouyinPack.IGift|null);
    }

    /** Represents a WebcastGiftMessage. */
    class WebcastGiftMessage implements IWebcastGiftMessage {

        /**
         * Constructs a new WebcastGiftMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.IWebcastGiftMessage);

        /** WebcastGiftMessage common. */
        public common?: (DouyinPack.ICommon|null);

        /** WebcastGiftMessage repeatCount. */
        public repeatCount: (number|Long);

        /** WebcastGiftMessage user. */
        public user?: (DouyinPack.IGiftUser|null);

        /** WebcastGiftMessage gift. */
        public gift?: (DouyinPack.IGift|null);
    }

    /** Properties of a WebcastLikeMessage. */
    interface IWebcastLikeMessage {

        /** WebcastLikeMessage common */
        common?: (DouyinPack.ICommon|null);

        /** WebcastLikeMessage count */
        count?: (number|Long|null);

        /** WebcastLikeMessage total */
        total?: (number|Long|null);

        /** WebcastLikeMessage color */
        color?: (number|Long|null);

        /** WebcastLikeMessage user */
        user?: (DouyinPack.IUser|null);
    }

    /** Represents a WebcastLikeMessage. */
    class WebcastLikeMessage implements IWebcastLikeMessage {

        /**
         * Constructs a new WebcastLikeMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.IWebcastLikeMessage);

        /** WebcastLikeMessage common. */
        public common?: (DouyinPack.ICommon|null);

        /** WebcastLikeMessage count. */
        public count: (number|Long);

        /** WebcastLikeMessage total. */
        public total: (number|Long);

        /** WebcastLikeMessage color. */
        public color: (number|Long);

        /** WebcastLikeMessage user. */
        public user?: (DouyinPack.IUser|null);
    }

    /** Properties of a Chat. */
    interface IChat {

        /** Chat data */
        data?: (DouyinPack.IWebcastChatMessage[]|null);
    }

    /** Represents a Chat. */
    class Chat implements IChat {

        /**
         * Constructs a new Chat.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.IChat);

        /** Chat data. */
        public data: DouyinPack.IWebcastChatMessage[];
    }

    /** Properties of a User. */
    interface IUser {

        /** User id */
        id?: (number|Long|null);

        /** User shortId */
        shortId?: (number|Long|null);

        /** User nickname */
        nickname?: (string|null);
    }

    /** Represents a User. */
    class User implements IUser {

        /**
         * Constructs a new User.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.IUser);

        /** User id. */
        public id: (number|Long);

        /** User shortId. */
        public shortId: (number|Long);

        /** User nickname. */
        public nickname: string;
    }

    /** Properties of a GiftUser. */
    interface IGiftUser {

        /** GiftUser id */
        id?: (number|Long|null);

        /** GiftUser shortId */
        shortId?: (number|Long|null);

        /** GiftUser nickname */
        nickname?: (string|null);
    }

    /** Represents a GiftUser. */
    class GiftUser implements IGiftUser {

        /**
         * Constructs a new GiftUser.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.IGiftUser);

        /** GiftUser id. */
        public id: (number|Long);

        /** GiftUser shortId. */
        public shortId: (number|Long);

        /** GiftUser nickname. */
        public nickname: string;
    }

    /** Properties of a Gift. */
    interface IGift {

        /** Gift describe */
        describe?: (string|null);
    }

    /** Represents a Gift. */
    class Gift implements IGift {

        /**
         * Constructs a new Gift.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.IGift);

        /** Gift describe. */
        public describe: string;
    }

    /** Properties of an AvatarThumb. */
    interface IAvatarThumb {

        /** AvatarThumb urlList */
        urlList?: (string[]|null);

        /** AvatarThumb uri */
        uri?: (string|null);
    }

    /** Represents an AvatarThumb. */
    class AvatarThumb implements IAvatarThumb {

        /**
         * Constructs a new AvatarThumb.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.IAvatarThumb);

        /** AvatarThumb urlList. */
        public urlList: string[];

        /** AvatarThumb uri. */
        public uri: string;
    }

    /** Properties of an ApiResult. */
    interface IApiResult {

        /** ApiResult messages */
        messages?: (DouyinPack.Imessage[]|null);

        /** ApiResult cursor */
        cursor?: (string|null);

        /** ApiResult fetchInterval */
        fetchInterval?: (number|null);

        /** ApiResult now */
        now?: (number|Long|null);

        /** ApiResult internalExt */
        internalExt?: (string|null);
    }

    /** Represents an ApiResult. */
    class ApiResult implements IApiResult {

        /**
         * Constructs a new ApiResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.IApiResult);

        /** ApiResult messages. */
        public messages: DouyinPack.Imessage[];

        /** ApiResult cursor. */
        public cursor: string;

        /** ApiResult fetchInterval. */
        public fetchInterval: number;

        /** ApiResult now. */
        public now: (number|Long);

        /** ApiResult internalExt. */
        public internalExt: string;
    }

    /** Properties of a message. */
    interface Imessage {

        /** message method */
        method?: (string|null);

        /** message payload */
        payload?: (Uint8Array|null);

        /** message messageId */
        messageId?: (number|Long|null);
    }

    /** Represents a message. */
    class message implements Imessage {

        /**
         * Constructs a new message.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.Imessage);

        /** message method. */
        public method: string;

        /** message payload. */
        public payload: Uint8Array;

        /** message messageId. */
        public messageId: (number|Long);
    }

    /** Properties of a Common. */
    interface ICommon {

        /** Common method */
        method?: (string|null);

        /** Common msgId */
        msgId?: (number|Long|null);

        /** Common roomId */
        roomId?: (number|Long|null);
    }

    /** Represents a Common. */
    class Common implements ICommon {

        /**
         * Constructs a new Common.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.ICommon);

        /** Common method. */
        public method: string;

        /** Common msgId. */
        public msgId: (number|Long);

        /** Common roomId. */
        public roomId: (number|Long);
    }

    /** Properties of an Image. */
    interface IImage {

        /** Image uri */
        uri?: (string|null);
    }

    /** Represents an Image. */
    class Image implements IImage {

        /**
         * Constructs a new Image.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.IImage);

        /** Image uri. */
        public uri: string;
    }

    /** Properties of a PublicAreaCommon. */
    interface IPublicAreaCommon {

        /** PublicAreaCommon userLabel */
        userLabel?: (string|null);

        /** PublicAreaCommon userConsumeInRoom */
        userConsumeInRoom?: (number|Long|null);

        /** PublicAreaCommon userSendGiftCntInRoom */
        userSendGiftCntInRoom?: (number|Long|null);
    }

    /** Represents a PublicAreaCommon. */
    class PublicAreaCommon implements IPublicAreaCommon {

        /**
         * Constructs a new PublicAreaCommon.
         * @param [properties] Properties to set
         */
        constructor(properties?: DouyinPack.IPublicAreaCommon);

        /** PublicAreaCommon userLabel. */
        public userLabel: string;

        /** PublicAreaCommon userConsumeInRoom. */
        public userConsumeInRoom: (number|Long);

        /** PublicAreaCommon userSendGiftCntInRoom. */
        public userSendGiftCntInRoom: (number|Long);
    }
}
