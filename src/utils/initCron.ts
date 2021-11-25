import { cronFactory } from "./cron";
import _ from 'lodash'
export default async function () {
    await cronFactory.initCron();
}
