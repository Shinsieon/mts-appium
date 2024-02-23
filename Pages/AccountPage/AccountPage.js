import { Selector, attribute, component } from "../../common/selector.js";
import Page from "../Page.js";

export default class AccountPage extends Page{
    constructor(browser){
        super(browser)
    }
    async setPassword(pw){
        return new Promise(async(res, rej)=>{
            for(let i=0; i<pw.length; i++){
                await this.clickElement(await this.findElementWithRetry(new Selector(component.imageView, attribute.contentDesc, pw[i]).getSelector()));
                if(i === pw.length-1){
                    await this.clickElement(await this.findElementWithRetry(new Selector(component.imageView, attribute.contentDesc, '입력완료').getSelector()));
                    return res();
                }
            }
        });
    }
}