import { Selector, attribute, component } from "../../common/selector.js";
import Page from "../Page.js";

export default class LoginPage extends Page{
    constructor(browser){
        super(browser)
    }
    
    async doPinLogin(pinNumber){
        return new Promise(async (res, rej)=>{
            for(let i=0; i<pinNumber.length; i++){
                await this.clickElement(await this.findElementWithRetry(new Selector(component.imageView, attribute.contentDesc, pinNumber[i]).getSelector()));
                if(i === pinNumber.length-1) {
                    await this.clickElement(await this.findElementWithRetry(new Selector(component.imageView, attribute.contentDesc, '입력완료').getSelector()));
                    return res()
                }
            }
        });
    }
}

