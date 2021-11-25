import path from "path";
import * as envrionments from "./environments";
export const staticPath = path.join(__dirname, "../../static");
export const publicConfig = envrionments.Environment;
