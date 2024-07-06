export default class ScrollBar extends Laya.Script {
    constructor() {
        super();
        // Declare mlist property
        /** @prop {name:mlist, tips:"提示文本", type:Node, default:null}*/
        this.mlist = null;
    }

    onAwake() {
        // Set elastic scroll properties
        this.mlist.scrollBar.elasticBackTime = 100;
        this.mlist.scrollBar.elasticDistance = 100;
        this.mlist.scrollBar.min = 0;
        this.mlist.scrollBar.max = 500;
        this.mlist.scrollBar.once=false

        this.mlist.selectEnable = true;
        this.mlist.selectHandler = new Handler(this, onSelect);
        this.mlist.renderHandler = new Handler(this, updateItem);
        
    }

    onUpdate() {
    }
}
