import AccountCode from "../Common/AccountCode";
import Code from "../Common/Code";
import EventCode from "../Common/EventCode";
import EventType from "../Common/EventType";

/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-03-20 10:54
*/
export default class LoginPanel extends Laya.Script {

    constructor() {
        super();
        /** @prop {name:btn_Regist, tips:"提示文本", type:Node, default:null}*/
        this.btn_Regist=null;
        /** @prop {name:btn_Login, tips:"提示文本", type:Node, default:null}*/
        this.btn_Login=null;
        /** @prop {name:input_Name, tips:"提示文本", type:Node, default:null}*/
        this.input_Name=null;
        /** @prop {name:input_Pwd, tips:"提示文本", type:Node, default:null}*/
        this.input_Pwd=null;
    }

    onAwake() {
        Laya.stage.on(EventType.ShowLoginPanel,this,function(){//监听"打开登录面板"事件
            this.owner.visible=true;//打开登录面板
        })

        this.btn_Regist.on(Laya.Event.CLICK,this,function(){//点击注册按钮（需跳转到注册页面
            this.input_Name.text=""
            this.input_Pwd.text=""
            this.owner.visible=false//关闭登录面板
            Laya.stage.event(EventType.ShowRigistPanel)//广播"打开注册面板"事件

        })
        //点击登录按钮
        this.btn_Login.on(Laya.Event.CLICK,this,this.OnLoginBtnClick)
    }
    OnLoginBtnClick(){
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
        //向服务器发送登录请求
        //操作码:大的类型 账号模块
        //子操作码：登录请求
        var data={Username:this.input_Name.text,
                    Pwd:this.input_Pwd.text}
        Laya.stage.event(EventType.SendMsg,[Code.Account,AccountCode.Login_CREQ,data])
    }
}