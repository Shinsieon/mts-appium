export class Selector{
    constructor(comp, attr, text){
        this.comp = comp;
        this.attr = attr;
        this.text = text;
        this.selector = `//android.widget.${comp}[@${attr}="${text}"]`;
        if(attr === attribute.resourceId) this.setContains(true);
        if(comp === component.view) this.selector = `//android.view.${comp}[@${attr}="${text}"]`;
    }
    getSelector(){
        return this.selector;
    }
    setSelector(selector){
        this.selector = selector;
    }
    setContains(bool){
        if(bool) {
            this.selector = `//android.widget.${this.comp}[contains(@${this.attr}, "${this.text}")]`;
        }
    }
}

export const component = {
    button : 'Button',
    editText : 'EditText',
    imageView : 'ImageView',
    view : 'View'
}
export const attribute = {
    resourceId : 'resource-id',
    text : 'text',
    xpath : 'xpath',
    contentDesc : 'content-desc'
}