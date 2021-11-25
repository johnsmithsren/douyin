import mongoose from "mongoose";
import { Connection } from "mongoose";
import { MONGOOSEOPTION } from "./constants";
import _ from "lodash";
class MongoClientFactory {
    client: Connection;
    private clients: Map<String, any>;
    constructor() {
        this.clients = new Map();
    }

    getMongoClient(dbUrl) {
        if (dbUrl && this.clients.has(dbUrl)) {
            this.client = this.clients.get(dbUrl);
            return this.client;
        }
        //@ts-ignore
        let client = mongoose.createConnection(dbUrl, MONGOOSEOPTION);
        this.clients.set(dbUrl, client);
        this.client = this.clients.get(dbUrl);
        return this.client;
    }
}

export default new MongoClientFactory();
