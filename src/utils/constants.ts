export const HTTP_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
};
export interface IEnvironment {
    fileServerUrl?: string;
    allowHttpRequest?: string[];
    userPassword?: string;
    crossSpaceServerIp?: string;
    gameServerMongooseString?: string
    crossSpaceServerPath?: string;
    userActionAddress?: string;
    userActionToken?: string;
    platformType?: string;
    questionnaireUrl?: string;
    app?: {
        host: string;
        port: number;
    };

    data_server?: {
        host: string;
        grpc_port: number;
    };

    identity?: string;
    mongo?: {
        MONGODB_USER: string;
        MONGODB_HOST: string;
        MONGODB_PORT: number;
        MONGODB_PASS: string;
        MONGODB_DATABASE: string;
        MONGODB_STRING: string;
    };

    redis?: {
        host: string;
        port: number;
        password: string;
        db: number;
    };
    rpcRequestPath?: string;
    rpcToken?: string;
    defaultServerPath?: string;
    gameServerMongooseUrl?: string;
    gameServerMongooseDbName?: string;
    serverPath?: string;
    dimensionPath?: string;
    spaceServerPath?: string;
    spaceServerIp?: string;
    controllerServerPath?: string;
    controllerServerIp?: string;
    uploadPackageVersion?: string;
    fileUploadUrl?: string;
    userName?: string;
    sipuSyncPath?: string;
    sipuKey?: string;
    sipuGameId?: number;
    needRelease?: boolean;
    utcOffset?: number;
}

export const MONGOOSEOPTION = {
    useNewUrlParser: true,

    useUnifiedTopology: true
};
