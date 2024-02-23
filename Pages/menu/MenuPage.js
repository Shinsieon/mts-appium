import Page from "../Page.js"
import {Selector, attribute, component} from "../../common/selector.js";

export default class MenuPage extends Page{
    constructor(browser){
        super(browser)
    }
    async goToMenu(menuName){
        await this.clickElement(await this.findMenu(menuName))
    }
    async findMenu(menuName){
        let selector = new Selector(component.editText, attribute.resourceId, 'findMenuTxt');
        await this.clickElement(await this.findElementWithRetry(selector.getSelector()));

        await this.clickElement(await this.findElementWithRetry(selector.getSelector()));

        await this.setElementText(await this.findElementWithRetry(selector.getSelector()), menuName);
        
        selector = new Selector(component.button, attribute.text, menuName);
        let element = await this.findElementWithRetry(selector.getSelector());

        return element;
    }
    
}