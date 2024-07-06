import EventType from "../Common/EventType";
import Code from "../Common/Code";
import FightCode from "../Common/FightCode";
import GameData from "./GameData";

/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-05-16 23:53
*/
export default class ChatView extends Laya.Script {

    constructor() {
        super();
        /** @prop {name:btn_send, tips:"提示文本", type:Node, default:null}*/
        this.btn_send = null;
        /** @prop {name:chatPanel, tips:"提示文本", type:Node, default:null}*/
        this.chatPanel = null;
        /** @prop {name:chatInfo, tips:"提示文本", type:Node, default:null}*/
        this.chatInfo = null;

        /**聊天内容条目UI存放容器 **/
        this.chatLineArr = new Array();
        /**聊天内容条目总高度 **/
        this.msgTotalHeight = 0;
    }

    onAwake() {

        //监听发送信息事件
        this.btn_send.on(Laya.Event.CLICK, this, function () {
            this.onSendMsg();
        });

        Laya.stage.on(EventType.ReceiveChatMsg, this, function (data) {
            this.msgReceive(data.username, data.msg)
        })


        //为聊天内容条目容器加入滚动条
        //无滚动条皮肤
        this.chatPanel.vScrollBarSkin = "";
        //垂直滚动
        this.chatPanel.vScrollBar.isVertical = true;
        //滚动在头或底回弹时间
        this.chatPanel.vScrollBar.elasticBackTime = 600;
        //滚动在头或底最大距离
        this.chatPanel.vScrollBar.elasticDistance = 200;

    }


    /** 发送当前数据 **/
    onSendMsg() {
        var messageText = this.chatInfo.text.trim();//去除消息中头尾空格
        //如果为空，不发送消息
        if (messageText == "") return;
        //用户聊天输入信息数据
        var data = {
            id: GameData.Id,
            username: GameData.UserName,
            msg: messageText
        };
        //发送用户登录信息给服务器
        Laya.stage.event(EventType.SendMsg, [Code.Fight, FightCode.Chat_SEND, data]);
        console.log("发送消息", data);
        //发出消息后，输入框设置为空
        this.chatInfo.text = "";
    }

    msgReceive(username, msgObj) {
        var chatLine = Laya.Pool.getItemByClass("chatLine", ChatLineView);
        chatLine.init(username, msgObj);//初始化聊天信息条
        this.chatPanel.addChild(chatLine)//加载到聊天框中

        // if (this.chatLineArr.length > 15) {
        //     var deleteChatLine = this.chatLineArr.shift();//需要删除的信息
        //     deleteChatLine.removeSelf();//移除自己
        //     Laya.Pool.recover("chatLine", deleteChatLine);//回收到对象池
        //     //针对聊天条目进行重新排版
        //     this.msgTotalHeight = 0
        //     for (var i=0,sz=this.chatLineArr.length;i<sz;i++) {
        //         chatLine = this.chatLineArr[i];
        //         chatLine.y = this.msgTotalHeight;
        //         this.msgTotalHeight += chatLine.height;
        //     }
        // }
        chatLine.y = this.msgTotalHeight;//y座标为现有聊天框高度
        this.msgTotalHeight += chatLine.height;//更新聊天框总高度
        this.chatLineArr.push(chatLine);//加入聊天框数组
        this.chatPanel.vScrollBar.max = this.chatPanel.contentHeight;//更新滚动条最大滚动数值
        this.chatPanel.vScrollBar.value = this.chatPanel.vScrollBar.max;//设置滚动条当前位置为最下
    }

}

class ChatLineView extends Laya.Box {
    init(username, msg) {
        // 获取当前时间戳
        var timestamp = Date.now();
        // 创建一个新的 Date 对象，传入时间戳
        var date = new Date(timestamp);
        // 获取时、分
        var hours = date.getHours();
        var minutes = date.getMinutes();


        var textfiled = new Laya.Text();
        this.addChild(textfiled);
        var msgObj = hours+":"+minutes+" [" + username + "] " + msg;
        // 使用正则表达式匹配字符并计算数量
        var englishRegex = /[a-zA-Z]/g;
        var chineseRegex = /[\u4e00-\u9fa5]/g;
        var numberRegex = /[0-9]/g;
        var englishCount = (msgObj.match(englishRegex) || []).length;
        var chineseCount = (msgObj.match(chineseRegex) || []).length;
        var numberCount = (msgObj.match(numberRegex) || []).length;
        var remainCount = msgObj.length - englishCount - chineseCount - numberCount
        var lines = 1 + Math.floor(englishCount / 30 + chineseCount / 22 + numberCount / 38 + remainCount / 22)
        textfiled.height = 30 * lines;//聊天内容高度

        textfiled.width = 570;//文本宽
        textfiled.color = "#ffffff";//文本颜色样式
        textfiled.font = "Microsoft YaHei";//文本字体
        textfiled.fontSize = 25;//文本字体大小样式
        textfiled.valign = "middle";//文本对齐样式
        textfiled.wordWrap = "true"//换行

        textfiled.text = msgObj;//添加聊天内容
        console.log("总字数",msgObj.length,lines);
    }
}