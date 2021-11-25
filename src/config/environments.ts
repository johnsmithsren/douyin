
import _ from "lodash";
import { IEnvironment } from "utils/constants";
process.env.NODE_ENV = "development";
const yamlEnv = {}
const env = _.merge(yamlEnv["base"], yamlEnv[process.env.NODE_ENV]);
export const Environment: IEnvironment = env;
