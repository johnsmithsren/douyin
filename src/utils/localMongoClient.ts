import gameServerDb from "./baseMongoClient";
import { defaultConfig } from "../config/config"
import _ from "lodash";
// db
let uri = defaultConfig.mongoUrl;
export default gameServerDb.getMongoClient(uri);
