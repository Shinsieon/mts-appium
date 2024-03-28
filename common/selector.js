export class Selector{
    constructor(comp, attr, text){
        this.comp = comp;
        this.attr = attr;
        this.text = text;
        this.setSelector();

        if(attr === attribute.resourceId) this.setContains(true);
        
    }
    getSelector(){
        return this.makeSelector();
    }
    setSelector(){
        this.os = `//android.`;
        this.widget = this.comp === component.view ? 'view.' : 'widget.';
        this.tag = `[@${this.attr} = "${this.text}"]`;
    }
    makeSelector(){
        return this.os + this.widget + this.comp + this.tag;
    }
    setContains(bool){
        if(bool) {
            this.tag = `[contains(@${this.attr}, "${this.text}")]`;
        }
    }
}

export const component = {
    button : 'Button',
    editText : 'EditText',
    imageView : 'ImageView',
    view : 'View',
    textView : 'TextView'
}
export const attribute = {
    resourceId : 'resource-id',
    text : 'text',
    xpath : 'xpath',
    contentDesc : 'content-desc'
}