import EventCode from "../Common/EventCode";

/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-03-24 03:36
*/
export default class TextHint extends Laya.Script {

    constructor() {
        super();
        /** @prop {name:name, tips:"提示文本", type:Node, default:null}*/
        this.xx=null;
    }

    onAwake() {
        Laya.stage.on(EventCode.ShowHint,this,this.Show)
    }
    Show(txt){
        Laya.Tween.clearAll(this.owner)
        Laya.timer.clearAll(this)
        this.owner.y=800
        this.owner.text=txt
        this.owner.visible=true
        Laya.Tween.to(this.owner,{alpha:1},200)
        Laya.Tween.to(this.owner,{y:566},500,null,new Laya.Handler(this,function(){
            Laya.timer.once(500,this,function(){
                Laya.Tween.to(this.owner,{y:340,alpha:0},500,null,new Laya.Handler(this,function(){
                    this.owner.visible=false;
                }))
            })
        }))
    }
}