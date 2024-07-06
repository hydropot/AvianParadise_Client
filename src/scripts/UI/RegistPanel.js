import EventType from "../Common/EventType";
import Code from "../Common/Code";
import AccountCode from "../Common/AccountCode";
import EventCode from "../Common/EventCode";

/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-03-20 10:54
*/
export default class RegistPanel extends Laya.Script {

    constructor() {
        super();
        /** @prop {name:btn_Back, tips:"提示文本", type:Node, default:null}*/
        this.btn_Back=null;
        /** @prop {name:input_Name, tips:"提示文本", type:Node, default:null}*/
        this.input_Name=null;
        /** @prop {name:input_Pwd, tips:"提示文本", type:Node, default:null}*/
        this.input_Pwd=null;
        
    }

    onAwake() {
        this.btn_Back.on(Laya.Event.CLICK,this,function(){//点击返回按钮
            this.input_Name.text=""
            this.input_Pwd.text=""
            this.owner.visible=false;
            Laya.stage.event(EventType.ShowLoginPanel)//广播事件
        })

        Laya.stage.on(EventType.ShowRigistPanel,this,function(){//监听事件
            this.owner.visible=true;
        })


        this.owner.getChildByName("btn_Regist").on(Laya.Event.CLICK,this,this.RegistBtnClick)
    }
    RegistBtnClick(){
        if(this.input_Name.text==""||this.input_Name.text==null){
            //console.log("请输入用户名！")
            Laya.stage.event(EventCode.ShowHint,"请输入用户名！")
            return;
        }
        if(this.input_Pwd.text==""||this.input_Pwd.text==null){
            //console.log("请输入密码！")
            Laya.stage.event(EventCode.ShowHint,"请输入密码！")
            return;
        }
        //向服务器发送注册请求
        //操作码:大的类型 账号模块
        //子操作码：注册请求
        var data={Username:this.input_Name.text,
                    Pwd:this.input_Pwd.text}
        Laya.stage.event(EventType.SendMsg,[Code.Account,AccountCode.Regist_CREQ,data])
    }
}