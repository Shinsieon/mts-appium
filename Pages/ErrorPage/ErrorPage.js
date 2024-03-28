import mochaLogger from "mocha-logger";
import { Selector, attribute, component } from "../../common/selector.js";
import Page from "../Page.js";

export default class ErrorPage extends Page{
    constructor(browser){
        super(browser)
    }
    async getErrorMsg(){
        let element = await this.findElementWithRetry(new Selector(component.textView, attribute.resourceId, 'msgBox').getSelector());
        mochaLogger.error("화면 에러메시지 : " , await element.getText())
        return await element.getText();
    }
}