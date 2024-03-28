import { Selector, attribute, component } from "../../common/selector.js";
import Page from "../Page.js";

export default class ApexFamilyOfficePage extends Page{
    constructor(browser){
        super(browser)
    }
    async findMomentItem(rel){
        return new Promise(async(res, rej)=>{
            let relations = await this.findElementWithRetry(new Selector(component.button, attribute.resourceId, 'role').getSelector(), true);
            for(let i=0; i<relations.length; i++){
                let relVal = await relations[i].getText();
                if(relVal === rel){
                    return res(relations[i]);
                }
            }
        });
    }
}
