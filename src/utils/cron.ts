import { winstonLogger } from "./winstonLogger";
import { redis } from "./redisStore";
import browserInit from "../middleware/browerInit";
import request from 'request'
import { transformBuffer } from "./commonFunction";
const cron = require("cron").CronJob;
const _ = require("lodash");
let localLogger = winstonLogger(module);
// 这个弹幕监控脚本最大的问题，之所以需要使用定时操作来做的最大原因就是
// pupeteer的chromium进程，在持续获取response的情况下会出现内存泄露情况，暂时未找到合适的解决方案
// 并且发现，playwright 也一样存在问题，playwright中选择chrome和pupeteer情况相似，选择其他webkit，firefox同样会泄露，感觉是这种监听response 的机制存在一定问题
// 也许和node版本有关，并没有再深究。这里采用定时重启进程的方法，的确可以解决内存泄露的问题。
// 不过这样做带来了最大的缺陷，那就是每次重启浏览器主进程到重新监听页面，需要七秒以上的时间，如果对于极为火爆的弹幕捕捉，就会出现遗漏弹幕问题，挺致命的缺陷，但是没法解决
// 仅仅适合低烈度的弹幕获取需求
class CronFactory {
    cron: any;
    cronMap: {};
    constructor() {
        this.cron = cron;
        this.cronMap = {};
    }
    // 循环检测直播情况,如果发现直播已经结束，则会从redis中除名，下次重启浏览器进程时候不再监听该页面
    async onlineStart() {
        let task = new this.cron(
            "50 */20 * * * *",
            async function () {
                // 获取浏览器
                let browser = await browserInit.getBrowser();
                let pages = await browser.pages()
                for (let page of pages) {
                    let content = await page.content();
                    if (_.includes(content, '直播已结束')) {
                        let url = await page.url();
                        page.close();
                        let roomId = _.get(url.split('/'), '3')
                        let _pages = await redis.get(`dy:pages`);
                        if (!_.isEmpty(_pages)) {
                            _pages = JSON.parse(_pages)
                            let newPages = []
                            for (let _page of _pages) {
                                if (_.toString(_page) != _.toString(roomId)) {
                                    newPages.push(_page)
                                }
                            }
                            if (_.isEmpty(newPages)) {
                                await redis.set(`dy:pages`, '');
                            } else {
                                await redis.set(`dy:pages`, JSON.stringify(newPages));
                            }

                        }
                    }
                }
            },
            null,
            true,
            "Asia/Shanghai"
        );
        _.set(this.cronMap, 'check', task);
    }

    // 重启浏览器进程，同时从redis中获取所有需要监听的页面，重新开始监听
    async inspectPages() {
        let task = new this.cron(
            "20 */20 * * * *",
            async function () {
                // 获取所有登记的page页
                let _pages = await redis.get(`dy:pages`);
                // 获取浏览器
                let browser = await browserInit.getBrowser();
                try {
                    // 关闭浏览器进程
                    browser.close();
                } catch (error) {
                    console.log(error)
                }
                // 清除map
                browserInit.del();
                // 重新获取浏览器进程
                browser = await browserInit.getBrowser();
                // 如果发现没有需要监测的页面，就返回
                if (_.isEmpty(_pages)) {
                    return
                }
                _pages = JSON.parse(_pages)
                let newPageArray = [];
                // 针对redis中存储的每个页面进行监控
                for (let _page of _pages) {
                    let page = await browser.newPage()
                    let url = `https://live.douyin.com/${_page}`;
                    await page.waitForTimeout(3000);
                    await page.setDefaultNavigationTimeout(0);
                    page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36")
                    await page.setRequestInterception(true);
                    page.on("request", async (req) => {
                        if (req.resourceType() !== "script") {
                            req.continue()
                            return
                        }
                        const url = req.url()
                        await new Promise((resolve, reject) => {
                            request.get(url, (err, _res) => {
                                let newRes = "navigator.webdriver && delete Navigator.prototype.webdriver;" + _res.body
                                req.respond({
                                    body: newRes
                                })
                                resolve({})
                            })
                        })
                    })
                    await page.goto(url);
                    newPageArray.push(_page)
                    let result = [];
                    let info, callback
                    page.on("response", async (response) => {
                        if (!response.url().includes('live.douyin.com/webcast/im/fetch')) {
                            return
                        } else {
                            try {
                                info = await response.buffer();
                                callback = transformBuffer(_page, info)
                                if (!_.isEmpty(callback)) {
                                    result = _.concat(result, callback)
                                }
                                if (result.length > 20) {
                                    result = [];
                                } else {
                                    await redis.set(`${_page}-dy`, JSON.stringify(result));
                                    await redis.expire(`${_page}-dy`, 10);
                                }
                            } catch (err) {
                                console.log(err)
                            }

                        }
                    })
                }
            },
            null,
            true,
            "Asia/Shanghai"
        );
        _.set(this.cronMap, 'restart', task);
    }

    // 立刻开始监控页面,大概需要七秒时间
    async startInspectPage(roomId) {
        let date = new Date();
        date.setSeconds(date.getSeconds() + 2);
        let task = new this.cron(
            date,
            async function () {
                let _pages = await redis.get(`dy:pages`);
                if (_.isEmpty(_pages)) {
                    _pages = []
                } else {
                    _pages = JSON.parse(_pages)
                }
                // 获取浏览器
                let browser = await browserInit.getBrowser();
                let totalPages = await browser.pages();
                let continueFlag = true;
                // 从浏览器进程中获取当前监听的所有页面，如果找到和开启的页面相同的roomid，则停止监听流程
                for (let checkPage of totalPages) {
                    let _url = await checkPage.url();
                    let _roomId = _.get(_url.split('/'), '3', '')
                    if (_roomId === roomId) {
                        continueFlag = false
                    }
                }
                if (!continueFlag) {
                    return
                }
                let page = await browser.newPage()
                let url = `https://live.douyin.com/${roomId}`;
                await page.waitForTimeout(3000);
                await page.setDefaultNavigationTimeout(0);
                page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36")
                await page.setRequestInterception(true);
                page.on("request", async (req) => {
                    if (req.resourceType() !== "script") {
                        req.continue()
                        return
                    }
                    const url = req.url()
                    await new Promise((resolve, reject) => {
                        request.get(url, (err, _res) => {
                            let newRes = "navigator.webdriver && delete Navigator.prototype.webdriver;" + _res.body
                            req.respond({
                                body: newRes
                            })
                            resolve({})
                        })
                    })
                })
                await page.goto(url);
                if (!_.includes(_pages, roomId)) {
                    _pages.push(roomId)
                }
                let result = [];
                let info, callback
                // 开始监听
                page.on("response", async (response) => {
                    if (!response.url().includes('live.douyin.com/webcast/im/fetch')) {
                        return
                    } else {
                        try {
                            info = await response.buffer();
                            callback = transformBuffer(roomId, info)
                            if (!_.isEmpty(callback)) {
                                result = _.concat(result, callback)
                            }
                            if (result.length > 20) {
                                result = [];
                            } else {
                                await redis.set(`${roomId}-dy`, JSON.stringify(result));
                                await redis.expire(`${roomId}-dy`, 10);
                            }
                        } catch (err) {
                            console.log(err)
                        }
                    }
                })
                await redis.set(`dy:pages`, JSON.stringify(_pages));
            },
            null,
            true,
            "Asia/Shanghai"
        );
        _.set(this.cronMap, `dy-${roomId}`, task);
    }

    async listCron() {
        return this.cronMap;
    }

    async startCron(roomId, browser, page) {

        let list = _.keys(this.cronMap);
        return list;
    }


    async stopCron(id) {
        let cron = _.get(this.cronMap, id);
        if (cron) {
            localLogger.info(cron.lastDate());
            let result = cron.stop();
            localLogger.info(result);
            _.unset(this.cronMap, id);
        }
        let list = _.keys(this.cronMap);
        return list;
    }

    async initCron() {
        await this.inspectPages();
        await this.onlineStart()
        return;
    }
}

export const cronFactory = new CronFactory();
