import puppeteer from "puppeteer"
class BrowserFactory {
    private browsers: Map<String, any>;
    browser: any;
    constructor() {
        this.browsers = new Map();
    }

    async getBrowser() {
        if (this.browsers.has('browserOne')) {
            this.browser = this.browsers.get('browserOne');
            return this.browser;
        }
        let browser = await puppeteer.launch({
            headless: true,
            slowMo: 200,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
        this.browsers.set('browserOne', browser);
        this.browser = this.browsers.get('browserOne');
        return this.browser;
    }

    del() {
        this.browsers.delete('browserOne')
    }
}

export default new BrowserFactory();
