import EventCode from "../Common/EventCode";
import EventType from "../Common/EventType";
import Code from "../Common/Code";
import AccountCode from "../Common/AccountCode";
import GameData from "./GameData";
import FightCode from "../Common/FightCode";

export default class ClientManager extends Laya.Script{
    constructor(){
        super();

    }
//Socket.io内置事件码
//https://blog.csdn.net/s_mantou/article/details/78087067
//官方文档https://socket.io/docs/v4/client-api

    onAwake(){
        //Laya.Stat.show(0,0);

        var socket=io.connect("ws://114.55.173.51:9000")
        socket.on(EventCode.Connect,function(){
            console.log("连接成功")
        })//事件码connect：连接成功，服务器给客户端的回应为connect

        socket.on(EventCode.Connect_error,function(){
            console.log("连接服务器失败，原因可能是服务器没有启动")
        })//事件码connect_error：连接失败，服务器给客户端的回应为connect_error
        
        socket.on(EventCode.ServerMsg,function(code,opCode,data){
            switch(code){
                case Code.Account:
                    if(opCode==AccountCode.Regist_Fail){
                        Laya.stage.event(EventCode.ShowHint,"用户名已存在")
                    }
                    if(opCode==AccountCode.Regist_Success){
                        Laya.stage.event(EventCode.ShowHint,"注册成功")
                    }
                    if(opCode==AccountCode.Login_Fail){
                        Laya.stage.event(EventCode.ShowHint,data)
                    }
                    if(opCode==AccountCode.Login_Success){
                        console.log("登录成功",data)
                        //基础属性赋值
                        GameData.Id=data.Id
                        GameData.UserName=data.UserName
                        GameData.Win=data.Win
                        GameData.Lose=data.Lose
                        GameData.Type=data.Type
                        GameData.Species=data.Species
                        Laya.Scene.open("MatchScene.json")
                    }
                    if(opCode==AccountCode.ChangeSpecies_SRES){
                        console.log("修改成功",data);
                    }
                    break;
                case Code.Match:
                    break;
                case Code.Fight:
                    if(opCode==FightCode.Match_OtherEnter){//别人进来时
                        console.log("Match_OtherEnter",data);
                        Laya.stage.event(EventType.Match_OtherEnter,data)
                    }
                    if(opCode==FightCode.Match_Succ){//自己进来时
                        console.log("Match_Succ",data)
                        Laya.stage.event(EventType.Match_Succ,[data])
                    }
                    if(opCode==FightCode.Match_LeaveSRES){
                        if(data==GameData.Id){
                            console.log("自身玩家离开了")
                            Laya.stage.event(EventType.Match_Leave_Self)
                        }else{
                            console.log("其他玩家离开了")
                            Laya.stage.event(EventType.Match_Leave_Other,data)
                        }
                    }

                    if(opCode==FightCode.Pos_Init_SRES){
                        Laya.stage.event(EventType.InitPos,data)
                    }
                    if(opCode==FightCode.Pos_SRES){
                        Laya.stage.event(EventType.UpdatePos,data)
                    }
                    if(opCode==FightCode.Fly_SRES){
                        Laya.stage.event(EventType.UpdateFly,data)
                    }
                    if(opCode==FightCode.Motion_SRES){
                        Laya.stage.event(EventType.UpdateMotion,data)
                    }

                    if(opCode==FightCode.Chat_RECEIVE){
                        Laya.stage.event(EventType.ReceiveChatMsg,data)
                    }
                    break;
            }
        })
        //客户端向服务器发送消息
        //携带的数据为 操作码，子操作码，数据
        Laya.stage.on(EventType.SendMsg,this,function(code,opCode,data){
            socket.emit(EventCode.ClientMsg,code,opCode,data)
        })

    }

}