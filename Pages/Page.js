import mochaLogger from "mocha-logger";
//Timeout of 30000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. 이 에러는 getSelector() 을 붙이지 않아서 그럼.
export default class Page{
    constructor(browser) {
        this.browser = browser;
    }
    async findElementWithRetry(selector, isMany = false, maxRetries = 3){
        let element = null;
        return new Promise(async(res, rej)=>{
            for(let i=0; i<maxRetries; i++){
                element = isMany ? await this.browser.$$(selector) : await this.browser.$(selector);
                if(element && !element.error) {
                    mochaLogger.success(`FOUND ${selector} Element`);
                    return res(element);
                }
                
                await this.browser.pause(1000);
                mochaLogger.log(`Retrying to find element. Retry ${i+1}/${maxRetries}`)
                if(i===maxRetries-1){
                    mochaLogger.error(`NOT FOUND ${selector} Element`);
                    rej();
                }
            }
        })
    }
    async clickElement(element){
        try{
            await element.click();
            mochaLogger.success(`Element ${element.selector} clicked`);
        }catch(error){
            mochaLogger.error(`Element ${element?.selector} not clickable`);
        }
    }
    async wait(time){
        mochaLogger.log('wait for ', time);
        return new Promise((resolve)=>setTimeout(resolve, time));
    }
    async setElementText(element, text){
        mochaLogger.log('Set Element Value ', text);
        await element.setValue(text);
    }
}