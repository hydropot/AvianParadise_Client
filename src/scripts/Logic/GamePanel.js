/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-04-09 16:32
*/
export default class GamePanel extends Laya.Script {

    constructor() {
        super();
        /** @prop {name:chatPanel, tips:"提示文本", type:Node, default:null}*/
        this.chatPanel=null;
        /** @prop {name:btn_Chat, tips:"提示文本", type:Node, default:null}*/
        this.btn_Chat=null;

        /** @prop {name:btn_Fly, tips:"提示文本", type:Node, default:null}*/
        this.btn_Fly=null;

        /** @prop {name:btn_Eat, tips:"提示文本", type:Node, default:null}*/
        this.btn_Eat=null;
        /** @prop {name:btn_Sit, tips:"提示文本", type:Node, default:null}*/
        this.btn_Sit=null;
        /** @prop {name:btn_Spin, tips:"提示文本", type:Node, default:null}*/
        this.btn_Spin=null;
        /** @prop {name:btn_Roll, tips:"提示文本", type:Node, default:null}*/
        this.btn_Roll=null;
        /** @prop {name:btn_Fear, tips:"提示文本", type:Node, default:null}*/
        this.btn_Fear=null;
        /** @prop {name:btn_Bounce, tips:"提示文本", type:Node, default:null}*/
        this.btn_Bounce=null;
        

        
    }

    onAwake() {
        this.btn_Chat.on(Laya.Event.CLICK,this,function(){
            this.chatPanel.visible = !this.chatPanel.visible;
        })

        this.btn_Fly.on(Laya.Event.CLICK,this.btn_Fly,function(){
            Laya.stage.event("Fly");
        })

        this.btn_Eat.on(Laya.Event.CLICK,this.btn_Eat,function(){
            Laya.stage.event("Eat");
            console.log("Eat");
        })
        this.btn_Sit.on(Laya.Event.CLICK,this.btn_Sit,function(){
            Laya.stage.event("Sit");
            console.log("Sit");
        })
        this.btn_Spin.on(Laya.Event.CLICK,this.btn_Spin,function(){
            Laya.stage.event("Spin");
            console.log("Spin");
        })
        this.btn_Roll.on(Laya.Event.CLICK,this.btn_Roll,function(){
            Laya.stage.event("Roll");
            console.log("Roll");
        })
        this.btn_Fear.on(Laya.Event.CLICK,this.btn_Fear,function(){
            Laya.stage.event("Fear");
            console.log("Fear");
        })

        this.btn_Bounce.on(Laya.Event.CLICK,this.btn_Bounce,function(){
            Laya.stage.event("Bounce");
            console.log("Bounce");
        })

        //状态同步
        this.owner.on(Laya.Event.CLICK,this,function(){
            Laya.stage.event("UpdateMotion_start");
            console.log("UpdateMotion_start");
        })

    }
}