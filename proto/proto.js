/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.DouyinPack = (function() {

    /**
     * Namespace DouyinPack.
     * @exports DouyinPack
     * @namespace
     */
    var DouyinPack = {};

    DouyinPack.WebcastChatMessage = (function() {

        /**
         * Properties of a WebcastChatMessage.
         * @memberof DouyinPack
         * @interface IWebcastChatMessage
         * @property {DouyinPack.ICommon|null} [common] WebcastChatMessage common
         * @property {DouyinPack.IUser|null} [user] WebcastChatMessage user
         * @property {string|null} [content] WebcastChatMessage content
         */

        /**
         * Constructs a new WebcastChatMessage.
         * @memberof DouyinPack
         * @classdesc Represents a WebcastChatMessage.
         * @implements IWebcastChatMessage
         * @constructor
         * @param {DouyinPack.IWebcastChatMessage=} [properties] Properties to set
         */
        function WebcastChatMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WebcastChatMessage common.
         * @member {DouyinPack.ICommon|null|undefined} common
         * @memberof DouyinPack.WebcastChatMessage
         * @instance
         */
        WebcastChatMessage.prototype.common = null;

        /**
         * WebcastChatMessage user.
         * @member {DouyinPack.IUser|null|undefined} user
         * @memberof DouyinPack.WebcastChatMessage
         * @instance
         */
        WebcastChatMessage.prototype.user = null;

        /**
         * WebcastChatMessage content.
         * @member {string} content
         * @memberof DouyinPack.WebcastChatMessage
         * @instance
         */
        WebcastChatMessage.prototype.content = "";

        return WebcastChatMessage;
    })();

    DouyinPack.WebcastGiftMessage = (function() {

        /**
         * Properties of a WebcastGiftMessage.
         * @memberof DouyinPack
         * @interface IWebcastGiftMessage
         * @property {DouyinPack.ICommon|null} [common] WebcastGiftMessage common
         * @property {number|Long|null} [repeatCount] WebcastGiftMessage repeatCount
         * @property {DouyinPack.IGiftUser|null} [user] WebcastGiftMessage user
         * @property {DouyinPack.IGift|null} [gift] WebcastGiftMessage gift
         */

        /**
         * Constructs a new WebcastGiftMessage.
         * @memberof DouyinPack
         * @classdesc Represents a WebcastGiftMessage.
         * @implements IWebcastGiftMessage
         * @constructor
         * @param {DouyinPack.IWebcastGiftMessage=} [properties] Properties to set
         */
        function WebcastGiftMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WebcastGiftMessage common.
         * @member {DouyinPack.ICommon|null|undefined} common
         * @memberof DouyinPack.WebcastGiftMessage
         * @instance
         */
        WebcastGiftMessage.prototype.common = null;

        /**
         * WebcastGiftMessage repeatCount.
         * @member {number|Long} repeatCount
         * @memberof DouyinPack.WebcastGiftMessage
         * @instance
         */
        WebcastGiftMessage.prototype.repeatCount = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * WebcastGiftMessage user.
         * @member {DouyinPack.IGiftUser|null|undefined} user
         * @memberof DouyinPack.WebcastGiftMessage
         * @instance
         */
        WebcastGiftMessage.prototype.user = null;

        /**
         * WebcastGiftMessage gift.
         * @member {DouyinPack.IGift|null|undefined} gift
         * @memberof DouyinPack.WebcastGiftMessage
         * @instance
         */
        WebcastGiftMessage.prototype.gift = null;

        return WebcastGiftMessage;
    })();

    DouyinPack.WebcastLikeMessage = (function() {

        /**
         * Properties of a WebcastLikeMessage.
         * @memberof DouyinPack
         * @interface IWebcastLikeMessage
         * @property {DouyinPack.ICommon|null} [common] WebcastLikeMessage common
         * @property {number|Long|null} [count] WebcastLikeMessage count
         * @property {number|Long|null} [total] WebcastLikeMessage total
         * @property {number|Long|null} [color] WebcastLikeMessage color
         * @property {DouyinPack.IUser|null} [user] WebcastLikeMessage user
         */

        /**
         * Constructs a new WebcastLikeMessage.
         * @memberof DouyinPack
         * @classdesc Represents a WebcastLikeMessage.
         * @implements IWebcastLikeMessage
         * @constructor
         * @param {DouyinPack.IWebcastLikeMessage=} [properties] Properties to set
         */
        function WebcastLikeMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WebcastLikeMessage common.
         * @member {DouyinPack.ICommon|null|undefined} common
         * @memberof DouyinPack.WebcastLikeMessage
         * @instance
         */
        WebcastLikeMessage.prototype.common = null;

        /**
         * WebcastLikeMessage count.
         * @member {number|Long} count
         * @memberof DouyinPack.WebcastLikeMessage
         * @instance
         */
        WebcastLikeMessage.prototype.count = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * WebcastLikeMessage total.
         * @member {number|Long} total
         * @memberof DouyinPack.WebcastLikeMessage
         * @instance
         */
        WebcastLikeMessage.prototype.total = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * WebcastLikeMessage color.
         * @member {number|Long} color
         * @memberof DouyinPack.WebcastLikeMessage
         * @instance
         */
        WebcastLikeMessage.prototype.color = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * WebcastLikeMessage user.
         * @member {DouyinPack.IUser|null|undefined} user
         * @memberof DouyinPack.WebcastLikeMessage
         * @instance
         */
        WebcastLikeMessage.prototype.user = null;

        return WebcastLikeMessage;
    })();

    DouyinPack.Chat = (function() {

        /**
         * Properties of a Chat.
         * @memberof DouyinPack
         * @interface IChat
         * @property {Array.<DouyinPack.IWebcastChatMessage>|null} [data] Chat data
         */

        /**
         * Constructs a new Chat.
         * @memberof DouyinPack
         * @classdesc Represents a Chat.
         * @implements IChat
         * @constructor
         * @param {DouyinPack.IChat=} [properties] Properties to set
         */
        function Chat(properties) {
            this.data = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Chat data.
         * @member {Array.<DouyinPack.IWebcastChatMessage>} data
         * @memberof DouyinPack.Chat
         * @instance
         */
        Chat.prototype.data = $util.emptyArray;

        return Chat;
    })();

    DouyinPack.User = (function() {

        /**
         * Properties of a User.
         * @memberof DouyinPack
         * @interface IUser
         * @property {number|Long|null} [id] User id
         * @property {number|Long|null} [shortId] User shortId
         * @property {string|null} [nickname] User nickname
         */

        /**
         * Constructs a new User.
         * @memberof DouyinPack
         * @classdesc Represents a User.
         * @implements IUser
         * @constructor
         * @param {DouyinPack.IUser=} [properties] Properties to set
         */
        function User(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User id.
         * @member {number|Long} id
         * @memberof DouyinPack.User
         * @instance
         */
        User.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * User shortId.
         * @member {number|Long} shortId
         * @memberof DouyinPack.User
         * @instance
         */
        User.prototype.shortId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * User nickname.
         * @member {string} nickname
         * @memberof DouyinPack.User
         * @instance
         */
        User.prototype.nickname = "";

        return User;
    })();

    DouyinPack.GiftUser = (function() {

        /**
         * Properties of a GiftUser.
         * @memberof DouyinPack
         * @interface IGiftUser
         * @property {number|Long|null} [id] GiftUser id
         * @property {number|Long|null} [shortId] GiftUser shortId
         * @property {string|null} [nickname] GiftUser nickname
         */

        /**
         * Constructs a new GiftUser.
         * @memberof DouyinPack
         * @classdesc Represents a GiftUser.
         * @implements IGiftUser
         * @constructor
         * @param {DouyinPack.IGiftUser=} [properties] Properties to set
         */
        function GiftUser(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GiftUser id.
         * @member {number|Long} id
         * @memberof DouyinPack.GiftUser
         * @instance
         */
        GiftUser.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GiftUser shortId.
         * @member {number|Long} shortId
         * @memberof DouyinPack.GiftUser
         * @instance
         */
        GiftUser.prototype.shortId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GiftUser nickname.
         * @member {string} nickname
         * @memberof DouyinPack.GiftUser
         * @instance
         */
        GiftUser.prototype.nickname = "";

        return GiftUser;
    })();

    DouyinPack.Gift = (function() {

        /**
         * Properties of a Gift.
         * @memberof DouyinPack
         * @interface IGift
         * @property {string|null} [describe] Gift describe
         */

        /**
         * Constructs a new Gift.
         * @memberof DouyinPack
         * @classdesc Represents a Gift.
         * @implements IGift
         * @constructor
         * @param {DouyinPack.IGift=} [properties] Properties to set
         */
        function Gift(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Gift describe.
         * @member {string} describe
         * @memberof DouyinPack.Gift
         * @instance
         */
        Gift.prototype.describe = "";

        return Gift;
    })();

    DouyinPack.AvatarThumb = (function() {

        /**
         * Properties of an AvatarThumb.
         * @memberof DouyinPack
         * @interface IAvatarThumb
         * @property {Array.<string>|null} [urlList] AvatarThumb urlList
         * @property {string|null} [uri] AvatarThumb uri
         */

        /**
         * Constructs a new AvatarThumb.
         * @memberof DouyinPack
         * @classdesc Represents an AvatarThumb.
         * @implements IAvatarThumb
         * @constructor
         * @param {DouyinPack.IAvatarThumb=} [properties] Properties to set
         */
        function AvatarThumb(properties) {
            this.urlList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AvatarThumb urlList.
         * @member {Array.<string>} urlList
         * @memberof DouyinPack.AvatarThumb
         * @instance
         */
        AvatarThumb.prototype.urlList = $util.emptyArray;

        /**
         * AvatarThumb uri.
         * @member {string} uri
         * @memberof DouyinPack.AvatarThumb
         * @instance
         */
        AvatarThumb.prototype.uri = "";

        return AvatarThumb;
    })();

    DouyinPack.ApiResult = (function() {

        /**
         * Properties of an ApiResult.
         * @memberof DouyinPack
         * @interface IApiResult
         * @property {Array.<DouyinPack.Imessage>|null} [messages] ApiResult messages
         * @property {string|null} [cursor] ApiResult cursor
         * @property {number|null} [fetchInterval] ApiResult fetchInterval
         * @property {number|Long|null} [now] ApiResult now
         * @property {string|null} [internalExt] ApiResult internalExt
         */

        /**
         * Constructs a new ApiResult.
         * @memberof DouyinPack
         * @classdesc Represents an ApiResult.
         * @implements IApiResult
         * @constructor
         * @param {DouyinPack.IApiResult=} [properties] Properties to set
         */
        function ApiResult(properties) {
            this.messages = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApiResult messages.
         * @member {Array.<DouyinPack.Imessage>} messages
         * @memberof DouyinPack.ApiResult
         * @instance
         */
        ApiResult.prototype.messages = $util.emptyArray;

        /**
         * ApiResult cursor.
         * @member {string} cursor
         * @memberof DouyinPack.ApiResult
         * @instance
         */
        ApiResult.prototype.cursor = "";

        /**
         * ApiResult fetchInterval.
         * @member {number} fetchInterval
         * @memberof DouyinPack.ApiResult
         * @instance
         */
        ApiResult.prototype.fetchInterval = 0;

        /**
         * ApiResult now.
         * @member {number|Long} now
         * @memberof DouyinPack.ApiResult
         * @instance
         */
        ApiResult.prototype.now = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ApiResult internalExt.
         * @member {string} internalExt
         * @memberof DouyinPack.ApiResult
         * @instance
         */
        ApiResult.prototype.internalExt = "";

        return ApiResult;
    })();

    DouyinPack.message = (function() {

        /**
         * Properties of a message.
         * @memberof DouyinPack
         * @interface Imessage
         * @property {string|null} [method] message method
         * @property {Uint8Array|null} [payload] message payload
         * @property {number|Long|null} [messageId] message messageId
         */

        /**
         * Constructs a new message.
         * @memberof DouyinPack
         * @classdesc Represents a message.
         * @implements Imessage
         * @constructor
         * @param {DouyinPack.Imessage=} [properties] Properties to set
         */
        function message(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * message method.
         * @member {string} method
         * @memberof DouyinPack.message
         * @instance
         */
        message.prototype.method = "";

        /**
         * message payload.
         * @member {Uint8Array} payload
         * @memberof DouyinPack.message
         * @instance
         */
        message.prototype.payload = $util.newBuffer([]);

        /**
         * message messageId.
         * @member {number|Long} messageId
         * @memberof DouyinPack.message
         * @instance
         */
        message.prototype.messageId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        return message;
    })();

    DouyinPack.Common = (function() {

        /**
         * Properties of a Common.
         * @memberof DouyinPack
         * @interface ICommon
         * @property {string|null} [method] Common method
         * @property {number|Long|null} [msgId] Common msgId
         * @property {number|Long|null} [roomId] Common roomId
         */

        /**
         * Constructs a new Common.
         * @memberof DouyinPack
         * @classdesc Represents a Common.
         * @implements ICommon
         * @constructor
         * @param {DouyinPack.ICommon=} [properties] Properties to set
         */
        function Common(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Common method.
         * @member {string} method
         * @memberof DouyinPack.Common
         * @instance
         */
        Common.prototype.method = "";

        /**
         * Common msgId.
         * @member {number|Long} msgId
         * @memberof DouyinPack.Common
         * @instance
         */
        Common.prototype.msgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Common roomId.
         * @member {number|Long} roomId
         * @memberof DouyinPack.Common
         * @instance
         */
        Common.prototype.roomId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        return Common;
    })();

    DouyinPack.Image = (function() {

        /**
         * Properties of an Image.
         * @memberof DouyinPack
         * @interface IImage
         * @property {string|null} [uri] Image uri
         */

        /**
         * Constructs a new Image.
         * @memberof DouyinPack
         * @classdesc Represents an Image.
         * @implements IImage
         * @constructor
         * @param {DouyinPack.IImage=} [properties] Properties to set
         */
        function Image(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Image uri.
         * @member {string} uri
         * @memberof DouyinPack.Image
         * @instance
         */
        Image.prototype.uri = "";

        return Image;
    })();

    DouyinPack.PublicAreaCommon = (function() {

        /**
         * Properties of a PublicAreaCommon.
         * @memberof DouyinPack
         * @interface IPublicAreaCommon
         * @property {string|null} [userLabel] PublicAreaCommon userLabel
         * @property {number|Long|null} [userConsumeInRoom] PublicAreaCommon userConsumeInRoom
         * @property {number|Long|null} [userSendGiftCntInRoom] PublicAreaCommon userSendGiftCntInRoom
         */

        /**
         * Constructs a new PublicAreaCommon.
         * @memberof DouyinPack
         * @classdesc Represents a PublicAreaCommon.
         * @implements IPublicAreaCommon
         * @constructor
         * @param {DouyinPack.IPublicAreaCommon=} [properties] Properties to set
         */
        function PublicAreaCommon(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PublicAreaCommon userLabel.
         * @member {string} userLabel
         * @memberof DouyinPack.PublicAreaCommon
         * @instance
         */
        PublicAreaCommon.prototype.userLabel = "";

        /**
         * PublicAreaCommon userConsumeInRoom.
         * @member {number|Long} userConsumeInRoom
         * @memberof DouyinPack.PublicAreaCommon
         * @instance
         */
        PublicAreaCommon.prototype.userConsumeInRoom = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PublicAreaCommon userSendGiftCntInRoom.
         * @member {number|Long} userSendGiftCntInRoom
         * @memberof DouyinPack.PublicAreaCommon
         * @instance
         */
        PublicAreaCommon.prototype.userSendGiftCntInRoom = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        return PublicAreaCommon;
    })();

    return DouyinPack;
})();

module.exports = $root;
