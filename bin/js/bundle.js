(function () {
    'use strict';

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-26 20:13
    */
    class FightScene extends Laya.Script {

        constructor() {
            super();
        }

        onAwake() {
            Laya.Scene3D.load("res/unityscene/LayaScene_Forest/Conventional/Forest.ls",
            new Laya.Handler(this,function(scene){
                this.owner.addChild(scene);
            }));

        }
    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-20 12:56
    */
    class AccountCode extends Laya.Script {

        constructor() {
            super();
        }
    }

    AccountCode.Regist_CREQ="Regist_CREQ";//客户端C请求request
    AccountCode.Regist_Fail="Regist_Fail";//注册失败
    AccountCode.Regist_Success="Regist_Success";//注册成功

    AccountCode.Login_CREQ="Login_CREQ";//注册请求
    AccountCode.Login_Fail="Login_Fail";//注册失败
    AccountCode.Login_Success="Login_Success";//注册成功

    AccountCode.ChangeSpecies_CREQ="ChangeSpecies_CREQ";
    AccountCode.ChangeSpecies_SRES="ChangeSpecies_SRES";

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-20 12:54
    */
    class Code extends Laya.Script {

        constructor() {
            super();
        }
    }

    Code.Account="Account";
    Code.Match="Match";
    Code.Fight="Fight";

    class EventCode extends Laya.Script{
        constructor(){
            super();
        }
    }

    EventCode.Connect="connect";
    EventCode.Connect_error="connect_error";
    EventCode.ClientMsg="ClientMsg";
    EventCode.ServerMsg="ServerMsg";
    EventCode.ShowHint="ShowHint";

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-20 11:10
    */
    class EventType extends Laya.Script {

        constructor() {
            super();
        }
    }

    EventType.ShowRigistPanel="ShowRigistPanel";
    EventType.ShowLoginPanel="ShowLoginPanel";
    EventType.SendMsg="SendMsg";//操作码，子操作码

    EventType.ShowSpecies_Bird="ShowSpecies_Bird";

    EventType.Match_Succ="Match_Succ";
    EventType.Match_OtherEnter="Match_OtherEnter";
    EventType.Match_Leave_Self="Match_Leave_Self";
    EventType.Match_Leave_Other="Match_Leave_Other";

    EventType.InitPos="InitPos";
    EventType.UpdatePos="UpdatePos";

    EventType.UpdateFly="UpdateFly";
    EventType.UpdateMotion="UpdateMotion";

    EventType.ReceiveChatMsg="ReceiveChatMsg";



    //EventType.Fly="Fly"

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-20 10:54
    */
    class LoginPanel extends Laya.Script {

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
            });

            this.btn_Regist.on(Laya.Event.CLICK,this,function(){//点击注册按钮（需跳转到注册页面
                this.input_Name.text="";
                this.input_Pwd.text="";
                this.owner.visible=false;//关闭登录面板
                Laya.stage.event(EventType.ShowRigistPanel);//广播"打开注册面板"事件

            });
            //点击登录按钮
            this.btn_Login.on(Laya.Event.CLICK,this,this.OnLoginBtnClick);
        }
        OnLoginBtnClick(){
            if(this.input_Name.text==""||this.input_Name.text==null){
                //console.log("请输入用户名！")
                Laya.stage.event(EventCode.ShowHint,"请输入用户名！");
                return;
            }
            if(this.input_Pwd.text==""||this.input_Pwd.text==null){
                //console.log("请输入密码！")
                Laya.stage.event(EventCode.ShowHint,"请输入密码！");
                return;
            }
            //向服务器发送登录请求
            //操作码:大的类型 账号模块
            //子操作码：登录请求
            var data={Username:this.input_Name.text,
                        Pwd:this.input_Pwd.text};
            Laya.stage.event(EventType.SendMsg,[Code.Account,AccountCode.Login_CREQ,data]);
        }
    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-20 10:54
    */
    class RegistPanel extends Laya.Script {

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
                this.input_Name.text="";
                this.input_Pwd.text="";
                this.owner.visible=false;
                Laya.stage.event(EventType.ShowLoginPanel);//广播事件
            });

            Laya.stage.on(EventType.ShowRigistPanel,this,function(){//监听事件
                this.owner.visible=true;
            });


            this.owner.getChildByName("btn_Regist").on(Laya.Event.CLICK,this,this.RegistBtnClick);
        }
        RegistBtnClick(){
            if(this.input_Name.text==""||this.input_Name.text==null){
                //console.log("请输入用户名！")
                Laya.stage.event(EventCode.ShowHint,"请输入用户名！");
                return;
            }
            if(this.input_Pwd.text==""||this.input_Pwd.text==null){
                //console.log("请输入密码！")
                Laya.stage.event(EventCode.ShowHint,"请输入密码！");
                return;
            }
            //向服务器发送注册请求
            //操作码:大的类型 账号模块
            //子操作码：注册请求
            var data={Username:this.input_Name.text,
                        Pwd:this.input_Pwd.text};
            Laya.stage.event(EventType.SendMsg,[Code.Account,AccountCode.Regist_CREQ,data]);
        }
    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-24 03:36
    */
    class TextHint extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:name, tips:"提示文本", type:Node, default:null}*/
            this.xx=null;
        }

        onAwake() {
            Laya.stage.on(EventCode.ShowHint,this,this.Show);
        }
        Show(txt){
            Laya.Tween.clearAll(this.owner);
            Laya.timer.clearAll(this);
            this.owner.y=800;
            this.owner.text=txt;
            this.owner.visible=true;
            Laya.Tween.to(this.owner,{alpha:1},200);
            Laya.Tween.to(this.owner,{y:566},500,null,new Laya.Handler(this,function(){
                Laya.timer.once(500,this,function(){
                    Laya.Tween.to(this.owner,{y:340,alpha:0},500,null,new Laya.Handler(this,function(){
                        this.owner.visible=false;
                    }));
                });
            }));
        }
    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-24 04:17
    */
    class GameData extends Laya.Script {

        constructor() {
            super();
        }

    }
    GameData.Id=-1;
    GameData.UserName="";
    GameData.Win=-1;
    GameData.Lose=-1;
    GameData.Species=-1;
    GameData.Type=-1;
    GameData.PlayerIdPosArr=new Array();

    /**
    *
    * @ author:Carson
    * @ email:976627526@qq.com
    * @ data: 2021-03-31 11:38
    */
    class FightCode extends Laya.Script {

        constructor() {
            super();
        }
    }
    FightCode.StartGame="StartGame";
    FightCode.Match_Succ="Match_Succ";
    FightCode.Match_OtherEnter="Match_OtherEnter";
    FightCode.Match_LeaveCREQ="Match_LeaveCREQ";//手动退出请求，还没用上
    FightCode.Match_LeaveSRES="Match_LeaveSRES";

    FightCode.Pos_Init_CREQ="Pos_Init_CREQ";
    FightCode.Pos_Init_SRES="Pos_Init_SRES";
    FightCode.Pos_CREQ="Pos_CREQ";
    FightCode.Pos_SRES="Pos_SRES";

    FightCode.Fly_CREQ="Fly_CREQ";
    FightCode.Fly_SRES="Fly_SRES";

    FightCode.Motion_CREQ="Motion_CREQ";
    FightCode.Motion_SRES="Motion_SRES";

    FightCode.Chat_SEND="Chat_SEND";
    FightCode.Chat_RECEIVE="Chat_RECEIVE";

    class ClientManager extends Laya.Script{
        constructor(){
            super();

        }
    //Socket.io内置事件码
    //https://blog.csdn.net/s_mantou/article/details/78087067
    //官方文档https://socket.io/docs/v4/client-api

        onAwake(){
            //Laya.Stat.show(0,0);

            var socket=io.connect("ws://114.55.173.51:9000");
            socket.on(EventCode.Connect,function(){
                console.log("连接成功");
            });//事件码connect：连接成功，服务器给客户端的回应为connect

            socket.on(EventCode.Connect_error,function(){
                console.log("连接服务器失败，原因可能是服务器没有启动");
            });//事件码connect_error：连接失败，服务器给客户端的回应为connect_error
            
            socket.on(EventCode.ServerMsg,function(code,opCode,data){
                switch(code){
                    case Code.Account:
                        if(opCode==AccountCode.Regist_Fail){
                            Laya.stage.event(EventCode.ShowHint,"用户名已存在");
                        }
                        if(opCode==AccountCode.Regist_Success){
                            Laya.stage.event(EventCode.ShowHint,"注册成功");
                        }
                        if(opCode==AccountCode.Login_Fail){
                            Laya.stage.event(EventCode.ShowHint,data);
                        }
                        if(opCode==AccountCode.Login_Success){
                            console.log("登录成功",data);
                            //基础属性赋值
                            GameData.Id=data.Id;
                            GameData.UserName=data.UserName;
                            GameData.Win=data.Win;
                            GameData.Lose=data.Lose;
                            GameData.Type=data.Type;
                            GameData.Species=data.Species;
                            Laya.Scene.open("MatchScene.json");
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
                            Laya.stage.event(EventType.Match_OtherEnter,data);
                        }
                        if(opCode==FightCode.Match_Succ){//自己进来时
                            console.log("Match_Succ",data);
                            Laya.stage.event(EventType.Match_Succ,[data]);
                        }
                        if(opCode==FightCode.Match_LeaveSRES){
                            if(data==GameData.Id){
                                console.log("自身玩家离开了");
                                Laya.stage.event(EventType.Match_Leave_Self);
                            }else{
                                console.log("其他玩家离开了");
                                Laya.stage.event(EventType.Match_Leave_Other,data);
                            }
                        }

                        if(opCode==FightCode.Pos_Init_SRES){
                            Laya.stage.event(EventType.InitPos,data);
                        }
                        if(opCode==FightCode.Pos_SRES){
                            Laya.stage.event(EventType.UpdatePos,data);
                        }
                        if(opCode==FightCode.Fly_SRES){
                            Laya.stage.event(EventType.UpdateFly,data);
                        }
                        if(opCode==FightCode.Motion_SRES){
                            Laya.stage.event(EventType.UpdateMotion,data);
                        }

                        if(opCode==FightCode.Chat_RECEIVE){
                            Laya.stage.event(EventType.ReceiveChatMsg,data);
                        }
                        break;
                }
            });
            //客户端向服务器发送消息
            //携带的数据为 操作码，子操作码，数据
            Laya.stage.on(EventType.SendMsg,this,function(code,opCode,data){
                socket.emit(EventCode.ClientMsg,code,opCode,data);
            });

        }

    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-04-23 10:20
    */
    class LaunchGame extends Laya.Script {//挂载ClientManager.js到root

        constructor() {
            super();
        }

        onAwake() {
            this.owner.parent.addComponent(ClientManager);
        }
    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-20 11:10
    */
    class AnimalName extends Laya.Script {

        constructor() {
            super();
        }


        /**
         * 根据type和species确定动物的英文名称
         * @param {*} type 
         * @param {*} species 
         * @returns 
         */

        static getAnimalName(type, species) {
            if (type in animalMap && species in animalMap[type]) {
                return animalMap[type][species];
            } else {
                return "unknown"; // 或者返回其他默认值
            }
        }
        /**
         * 根据type和species确定动物的中文名称
         * @param {*} type 
         * @param {*} species 
         * @returns 
         */
        static getAnimalName_CN(type, species) {
            if (type in animalMap_CN && species in animalMap_CN[type]) {
                return animalMap_CN[type][species];
            } else {
                return "未知"; // 或者返回其他默认值
            }
        }
    }

    var animalMap = {
        0: {
            0: "RedWhiskeredBulbul",
            1: "AbbottBooby",
            2: "AbyssinianRoller",
            3: "AleutianTern",
            4: "AndeanCondor",
            5: "ArchersBuzzard",
            6: "ArtilleanCrestedHummingBird",
            7: "Babbler",
            8: "BarbaryFalcon",
            9: "BlackHeadedWeaver",
            10: "BlackStork",
            11: "BlueCrane",
            12: "BlueJay",
            13: "CaliforniaCondor",
            14: "Cicadabird",
            15: "Cisticola",
            16: "CollaredFalconet",
            17: "CommonRail",
            18: "CommonScimitarbil",
            19: "Crimsonwing",
            20: "CurlCrestedJay",
            21: "Drongo",
            22: "EuropeanStarling",
            23: "EveningGrosbeak",
            24: "GrayCrownedCrane",
            25: "GrayFlycatcher",
            26: "GreatTit",
            27: "GreenKingfisher",
            28: "GreyTit",
            29: "Gyrfalcon",
            30: "HarpyEagle",
            31: "LavenderWaxbill",
            32: "MaghrebLark",
            33: "NorthernWheatear",
            34: "PhillipineDwarfKingfisher",
            35: "PinkRobin",
            36: "PrairieFalcon",
            37: "RedShoulderedHawk",
            38: "YellowThroatedLongclaw",
            39: "SacredKingfisher",
            40: "SarusCrane",
            41: "SlatyLeggedCrake",
            42: "Starling",
            43: "Swift",
            44: "Thrush",
            45: "TibetanSnowfinch",
            46: "Towhee",
            47: "Warbler",
            48: "Weka",
            49: "WhiteBelliedSeaEagle",
            50: "WhiteCheekedBarbet",
            51: "WhiteStork",
            52: "WhiteThroatedMagpieJay",
            53: "YellowBilledStork",
            54: "Sparrow",
            55: "Penguin",
            56: "SnowOwl",
            57: "Chick",
            58: "Duck",
            59: "Hen",
            60: "Rooster",
            61: "Crow",
            62: "Eagle",
            63: "Hornbill",
            64: "Owl",
            65: "Dove",
            66: "Parrot",
            67: "Pigeon",
            68: "Flamingo",
            69: "Ostrich",
            70: "GoldenEagle",
            71: "Emu",
            72: "Kookaburra",
            73: "Kingfisher",
            74: "Swan",
            75: "Pelican",
            76: "Puffin",
            77: "Goose",
            78: "Mallard",
            79: "Turkey",
            80: "Cardinal",
            81: "Toucan",
            82: "Vulture",
            83: "Woodpecker",
            84: "Kakapo",
            85: "Kiwi",
            86: "Quail",
            87: "Macaw",
            88: "Shoebill",
            89: "Seagull",

        },
        1: {
            0: "鸸鹋",
            1: "黄鼬",
            2: "石龙子",
            3: "猫"
        },
        1: {
            0: "杜鹃",
            1: "老鼠",
            2: "鳄鱼",
            3: "壁虎"
        }
    };


    var animalMap_CN = {
        0: {
            0: "红耳鹎",
            1: "粉嘴鲣鸟",
            2: "蓝头佛法僧",
            3: "白腰燕鸥",
            4: "安第斯神鹫",
            5: "索马里鵟",
            6: "凤头蜂鸟",
            7: "弯嘴鹛",
            8: "游隼",
            9: "黑头黄背织雀",
            10: "黑鹳",
            11: "蓝蓑羽鹤",
            12: "冠蓝鸦",
            13: "加州神鹫",
            14: "鹃鵙",
            15: "扇尾莺",
            16: "红腿小隼",
            17: "普通秧鸡",
            18: "弯嘴林戴胜",
            19: "红脸朱翅雀",
            20: "卷冠蓝鸦",
            21: "发冠卷尾",
            22: "紫翅椋鸟",
            23: "黄昏锡嘴雀",
            24: "灰冕鹤",
            25: "灰纹霸鹟",
            26: "大山雀",
            27: "绿鱼狗",
            28: "灰山雀",
            29: "矛隼",
            30: "角雕",
            31: "淡蓝梅花雀",
            32: "马格里布凤头百灵",
            33: "穗䳭",
            34: "菲律宾三趾翠鸟",
            35: "粉红鸲鹟",
            36: "草原隼",
            37: "赤肩鵟",
            38: "黄喉长爪鹡鸰",
            39: "白眉翡翠",
            40: "赤颈鹤",
            41: "白喉斑秧鸡",
            42: "椋鸟(亚成)",
            43: "雨燕",
            44: "宝兴歌鸫",
            45: "藏雪雀",
            46: "棕胁唧鹀",
            47: "林柳莺",
            48: "新西兰秧鸡",
            49: "白腹海雕",
            50: "小绿拟啄木鸟",
            51: "白鹳",
            52: "白喉鹊鸦",
            53: "黄嘴鹮鹳",
            54: "麻雀",
            55: "企鹅",
            56: "雪鸮",
            57: "小鸡",
            58: "鸭",
            59: "母鸡",
            60: "公鸡",
            61: "乌鸦",
            62: "白头海雕",
            63: "马来犀鸟",
            64: "猫头鹰",
            65: "灰斑鸠",
            66: "鹦鹉",
            67: "岩鸽",
            68: "火烈鸟",
            69: "非洲鸵鸟",
            70: "金雕",
            71: "鸸鹋",
            72: "笑翠鸟",
            73: "翠鸟",
            74: "天鹅",
            75: "鹈鹕",
            76: "北极海鹦",
            77: "鹅",
            78: "绿头鸭",
            79: "火鸡",
            80: "主红雀",
            81: "巨嘴鸟",
            82: "兀鹫",
            83: "啄木鸟",
            84: "鸮面鹦鹉",
            85: "几维鸟",
            86: "翎鹑",
            87: "蓝黄金刚鹦鹉",
            88: "鲸头鹳",
            89: "海鸥",

        },
        1: {
            0: "鸸鹋",
            1: "黄鼬",
            2: "石龙子",
            3: "猫"
        },
        1: {
            0: "杜鹃",
            1: "老鼠",
            2: "鳄鱼",
            3: "壁虎"
        }
    };

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-24 04:13
    */
    class MatchSceneUI extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:btn_startgame, tips:"提示文本", type:Node, default:null}*/
            this.btn_startgame = null;
            /** @prop {name:btn_bird, tips:"提示文本", type:Node, default:null}*/
            this.btn_bird = null;


        }

        onAwake() {
            this.owner.getChildByName("top").getChildByName("txt_Username").text = "用户名：" + GameData.UserName;
            this.titleUpdate();
            this.owner.getChildByName("top").getChildByName("headicon").skin = "UI/" + "icon" + GameData.Type + "/" + GameData.Species + ".png";


            this.btn_bird.on(Laya.Event.CLICK, this.btn_bird, function () {
                Laya.stage.event(EventType.ShowSpecies_Bird);
            });

            Laya.stage.on("Choose", this, function () {
                this.titleUpdate();
                var data={Type:GameData.Type,
                    Species:GameData.Species};
                Laya.stage.event(EventType.SendMsg,[Code.Account,AccountCode.ChangeSpecies_CREQ,data]);
            });


            this.btn_startgame.on(Laya.Event.CLICK, this.btn_startgame, function () {
                Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.StartGame,null]);
                //开始游戏
                Laya.Scene.open("TestScene.json");
            });


        }

        onUpdate() {
        }

        titleUpdate(){
            const animalNameStr = AnimalName.getAnimalName(GameData.Type, GameData.Species);
            const animalNameStr_CN = AnimalName.getAnimalName_CN(GameData.Type, GameData.Species);
            this.owner.getChildByName("top").getChildByName("txt_EN").text = animalNameStr;
            this.owner.getChildByName("top").getChildByName("txt_CN").text = animalNameStr_CN;
        }

    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-04-14 15:15
    */
    class SpeciesChangePanel extends Laya.Script {

        constructor() {
            super();
            /** @prop {name:speciesList, tips:"提示文本", type:Node, default:null}*/
            this.speciesList=null;
            /** @prop {name:btn_right, tips:"提示文本", type:Node, default:null}*/
            this.btn_right=null;

            this.page=0;
            this.animaltype=-1;
        }


        onAwake() { 
            this.animaltype=GameData.Type;


            this.btn_right.on(Laya.Event.CLICK,this,function(){
                if(this.animaltype==0){//鸟纲
                this.pageTurn(this.page,5);
                this.pageShow(this.page,0);//鸟纲
                }
                //其他动物大类
            });


            Laya.stage.on(EventType.ShowSpecies_Bird,this,function(){//打开鸟类板块
                this.animaltype=0;
                this.pageShow(this.page,0);
                Laya.Tween.to(this.owner,{scaleX:1,scaleY:1},100);
            });


            this.owner.getChildByName("Panel").getChildByName("btn_Close").on(Laya.Event.CLICK,this,function(){
                Laya.Tween.to(this.owner,{scaleX:0,scaleY:0},100);
            });

            //按下图标时才真正传递参数
            this.speciesList.mouseHandler=new Laya.Handler(this,function(e,index){
                if(e.type==Laya.Event.CLICK){
                    GameData.Type=this.animaltype;
                    GameData.Species=index+this.page*15;
                    Laya.Tween.to(this.owner,{scaleX:0,scaleY:0},100);
                    //console.log(GameData.Type+","+GameData.Species);
                    //console.log(index);
                    Laya.stage.event("Choose");
                }
            });

        }
        onDestroy(){
            Laya.loader.clearRes("res/atlas/UI/icon0.atlas");
            Laya.loader.clearRes("res/atlas/UI/touxiang.atlas");
            Laya.loader.clearRes("res/atlas/comp.atlas");
            Laya.loader.clearRes("res/atlas/UI.atlas");
            //Laya.Resource.destroyUnusedResources(); 
            Laya.stage.off(EventType.ShowSpecies_Bird,this);
            Laya.stage.off("Choose",this);

        }





        pageTurn(p,maxp){//实际共有maxp+1页
            this.page=p;
            if(this.page>=maxp){
                this.page=0;
            }else{
                this.page=this.page+1;
            }

        }

        pageShow(p,t){
            this.page=p;
            if(this.animaltype==t){
                for(var i=this.page*15;i<this.page*15+15;i++){//UI/icon0/0.png
                    this.speciesList.getCell(i).getChildByName("icon").skin="UI/icon"+t+"/"+(i)+".png";//放在iconX文件夹内
                    if(GameData.Species==i){
                        this.speciesList.getCell(i-this.page*15).getChildByName("choose").visible=true;
                    }else{
                        this.speciesList.getCell(i-this.page*15).getChildByName("choose").visible=false;
                    }
                }
            }
        }

    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-26 20:13
    */
    class MatchScene extends Laya.Script {

        constructor() {
            super();

            this.scene =null;
            this.model=null;
        }

        onAwake() {
            //Laya.Sprite3D.load("res/unityscene/LayaScene_New Scene/Conventional/Main Camera.lh",)
            Laya.Scene3D.load("res/unityscene/LayaScene_ShowScene/Conventional/ShowScene.ls",
            Laya.Handler.create(this,function(scene){
                this.scene = scene;
                Laya.stage.addChild(scene);
                scene.zOrder=-1;
                var camera=scene.getChildByName("Main Camera");
                camera.transform.translate(new Laya.Vector3(0, 0.3, 0));
                camera.clearFlag =Laya.BaseCamera.CLEARFLAG_SOLIDCOLOR;
                
                this.loadModel();
                
            }));


            Laya.stage.on("Choose", this, function () {
                this.removeModel();
                this.loadModel();
            });

        }

        onDestroy(){
            this.scene.destroy();
            Laya.Resource.destroyUnusedResources();
        }


        loadModel() {
            const animalNameStr = AnimalName.getAnimalName(GameData.Type, GameData.Species);
            const modelPath = "res/unityscene/LayaScene_ShowScene/Conventional/" + animalNameStr + "_LOD0.lh";
        
            Laya.Sprite3D.load(modelPath, Laya.Handler.create(this, function(sp) {
                this.model = this.scene.addChild(sp);
                /*旋转
                //let obj = this.scene.addChild(sp);
                //this.startRotation(obj);
                // AbbottBooby.transform.localScale = new Laya.Vector3(1, 1, 1);
                // AbbottBooby.transform.translate(new Laya.Vector3(0, 0, 0));
                // var vect = new Laya.Vector3(0, 1, 0);
                // Laya.timer.loop(10, null, function() {
                //     obj.transform.rotate(vect, false, false);
                // });
                */
            }));
        }

        removeModel(){
            //销毁了使用了该网格的精灵
            this.model.destroy(); 
            Laya.Resource.destroyUnusedResources(); 
            //console.log("REMOVE");
            
        }

    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-04-09 13:56
    */
    class CameraFollow extends Laya.Script {

        constructor() {
            super();
            this.target = null;
            this.out = new Laya.Vector3();
            this.followSpeed = 10; //摄像机跟随速度
            this.curTouchId = null;
            this.originPoint = new Laya.Point();
            this.originRotate = new Laya.Vector3();
            this._tempV3 = new Laya.Vector3(0, 0, 0); // Initialize _tempV3 properly
            this._speed = 0.1; // Adjust the speed of rotation
        }

        Init(target) {
            this.target = target;
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
        }

        onAwake() {
            /***是否左手遥控****/
            this.isleftControl = false;
        }

        onLateUpdate() {
            if (this.target == null) return;
            this.UpdateRotPos();//更新相机位置和旋转角

            //原固定相机逻辑
            // let targetPos = new Laya.Vector3(
            //     this.target.transform.localPositionX - 4.19,
            //     this.target.transform.localPositionY + 2,
            //     this.target.transform.localPositionZ - 0.1
            // );
            // let targetPos = this.target.transform.localPosition;
            // Laya.Vector3.lerp(this.owner.transform.position, targetPos, Laya.timer.delta / 1000 * this.followSpeed, this.out);
            // this.owner.transform.position = this.out;
        }

        onMouseDown(e) {
            //左右手遥控
            if (this.isleftControl) {
                //如果按下时是右边屏幕位置或已经按下鼠标，则返回
                if (e.stageX > Laya.stage.width / 2 || this.isDown) return;
            }
            else {
                //如果按下时是左边屏幕位置或已经按下鼠标，则返回
                if (e.stageX < Laya.stage.width / 2 || this.isDown) return;
            }
            this.curTouchId = e.touchId;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMove);
            this.originPoint.x = e.stageX;
            this.originPoint.y = e.stageY;
            this.originRotate = this.owner.transform.rotationEuler.clone();
        }

        onMove(e) {
            //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
            if (this.curTouchId && e.touchId != this.curTouchId) return;

            let offsetX = (e.stageX - this.originPoint.x) * this._speed;
            let offsetY = (e.stageY - this.originPoint.y) * this._speed;

            let xRotate = this.originRotate.x - offsetY;
            let yRotate = this.originRotate.y - offsetX;

            this._tempV3.y = yRotate;
            //视角限制 仰视50°俯视70°
            if (xRotate >= 50) this._tempV3.x = 50;
            else if (xRotate <= -70) this._tempV3.x = -70;
            else this._tempV3.x = xRotate;
        }

        onMouseUp(e) {
            //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
            if (e.touchId != this.curTouchId) return;

            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMove);
            this.originPoint.reset();
            this.curTouchId = null;
            this.originRotate = null;
            //this._tempV3.setValue(0, 0, 0);//复原位置
        }

        UpdateRotPos() {
            //更新旋转角度
            if (this._tempV3) {
                let transform = this.owner.transform;
                // Use Laya.Vector3.lerp to interpolate smoothly between rotations
                Laya.Vector3.lerp(transform.rotationEuler, this._tempV3, this._speed, transform.rotationEuler);
                transform.rotationEuler = transform.rotationEuler; // Ensure the rotation is applied
            }
            //更新相机位置
            if (this._tempV3) {
                var distance = 5.0;

                var rotationQuaternion = new Laya.Quaternion();
                Laya.Quaternion.createFromYawPitchRoll(this._tempV3.y * Math.PI / 180, this._tempV3.x * Math.PI / 180, this._tempV3.z * Math.PI / 180, rotationQuaternion);

                // 计算摄像机方向向量
                var direction = new Laya.Vector3();
                Laya.Vector3.transformQuat(new Laya.Vector3(0, 0, -1), rotationQuaternion, direction);

                // 计算摄像机位置
                var cameraPosition = new Laya.Vector3();
                Laya.Vector3.scale(direction, distance, direction);
                Laya.Vector3.subtract(this.target.transform.position, direction, cameraPosition);

                // 更新摄像机位置
                Laya.Vector3.lerp(this.owner.transform.position, cameraPosition, this._speed, this.out);
                this.owner.transform.position = this.out;
                //this.owner.transform.position = cameraPosition;
            }

        }
    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-04-08 15:01
    */
    class Player extends Laya.Script3D {

        constructor() {
            super();
            this.character=null;//角色控制器
            this.camera=null;
            this.playerText=null;

            this.speed=0;
            this.state=0;
            this.direction=new Laya.Vector3();
            this.flyForce=0;
            this.jumpForce=0;

            this.lastPosX=0;
            this.lastPosY=0;
            this.lastPosZ=0;
            this.lastAngle=0;

            this.txtpoint=new Laya.Vector4();

        }
        Init(camera,playerText){
            this.camera=camera;
            this.playerText=playerText;
            // this.bulletPre=bulletPre;
        }
        onAwake() {  
            Laya.stage.on("OnMove",this,function(speed){
                this.speed=speed;
            });
            Laya.stage.on("OnRotate",this,function(angle){
<<<<<<< HEAD
                this.owner.transform.localRotationEulerY=angle+this.camera.transform.rotationEuler.y;//保持行进方向与视角一致
=======
                this.owner.transform.localRotationEulerY=angle+this.camera.transform.rotationEuler.y;
                console.log("dhiauh",this.camera.transform.rotationEuler.y,angle);
>>>>>>> 58d8651ccee2cb204a460cb256ac451ce858f17c
            });

            Laya.stage.on("Fly",this,function(){////起飞方式之按钮
                let character = this.owner.getComponent(Laya.CharacterController);
                character.jump();
                Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.Fly_CREQ,GameData.Id]);
            });


            Laya.stage.on("Eat",this,function(){
                this.state=1;
            });
            Laya.stage.on("Sit",this,function(){
                this.state=2;
            });
            Laya.stage.on("Spin",this,function(){
                this.state=3;
            });
            Laya.stage.on("Roll",this,function(){
                this.state=4;
            });
            Laya.stage.on("Fear",this,function(){
                this.state=5;
            });
            Laya.stage.on("Bounce",this,function(){
                this.state=6;
            });

            Laya.stage.on("UpdateMotion_start",this,function(){
                var data={Id:GameData.Id,
                        state:this.state};
                Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.Motion_CREQ,data]);
            });


            this.addCharacter();
            this.addAnim();

        }
        onEnable() {
            


        }
        onUpdate(){
            //头顶用户名跟随
            this.camera.worldToViewportPoint(this.owner.transform.position,this.txtpoint);
            this.playerText.pos(this.txtpoint.x,this.txtpoint.y);
            this.playerText.getChildByName("followtext").text=GameData.UserName;
            this.playerText.scale(1,1);

            //摇杆控制移动
            this.owner.transform.getForward(this.direction);
            if(this.speed!=0){
                if(!this.character.isGrounded){
                this.owner.transform.localPositionX+=this.direction.x*(-1)*this.speed*2/100;
                this.owner.transform.localPositionZ+=this.direction.z*(-1)*this.speed*2/100;
                }else if(this.character.isGrounded){
                    this.owner.transform.localPositionX+=this.direction.x*(-1)*this.speed/100;
                    this.owner.transform.localPositionZ+=this.direction.z*(-1)*this.speed/100;
                }
            }
            //平时的位置同步
            if(this.lastPosX!=this.owner.transform.localPositionX||this.lastPosZ!=this.owner.transform.localPositionZ||this.lastAngle!=this.owner.transform.localRotationEulerY){
                var data={Id:GameData.Id,
                    x:this.owner.transform.localPositionX,
                    //y:this.owner.transform.localPositionY,
                    z:this.owner.transform.localPositionZ,
                    Angle:this.owner.transform.localRotationEulerY};
                Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.Pos_CREQ,data]);
            }
            this.lastPosX=this.owner.transform.localPositionX;
            //this.lastPosY=this.owner.transform.localPositionY;
            this.lastPosZ=this.owner.transform.localPositionZ;
            this.lastAngle=this.owner.transform.localRotationEulerY;

            //初始时进行一次位置同步
            Laya.stage.on(EventType.Match_OtherEnter,this,function(otherInfo){
                Laya.timer.once(100,this,function aaa() {
                    var data={Id:GameData.Id,
                        x:this.owner.transform.localPositionX,
                        y:this.owner.transform.localPositionY,
                        z:this.owner.transform.localPositionZ,
                        Angle:this.owner.transform.localRotationEulerY};
                    Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.Pos_Init_CREQ,data]);
                    Laya.timer.clear(this,aaa);
                });
            });
        

        }


        onDestroy(){
            Laya.stage.off("OnMove",this);
            Laya.stage.off("OnRotate",this);
        }

        addCharacter() {
            //为精灵添加角色控制器
            var character = this.owner.addComponent(Laya.CharacterController);
            this.character=character;
            //创建胶囊碰撞器
            var sphereShape = new Laya.CapsuleColliderShape(0.4, 0.9);
            //设置Shape的本地偏移
            sphereShape.localOffset = new Laya.Vector3(0, 0.4, 0);
            //设置角色控制器的碰撞形状
            character.colliderShape = sphereShape;


            Laya.timer.frameLoop(1, this, this.onKeyDown);//每一帧都执行一次指定的回调函数,监听键盘状态
        }

        onKeyDown() {//起飞方式之键盘
            let character = this.owner.getComponent(Laya.CharacterController);
            if (Laya.KeyBoardManager.hasKeyDown(32)) {//空格键
                character.jump(); //执行角色跳跃的动作\
                Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.Fly_CREQ,GameData.Id]);
            }
        }


        addAnim(){
            Laya.timer.frameLoop(1, this, this.Anim);//每一帧都执行一次指定的回调函数,监听键盘状态
        }

        Anim(){
            var ani=this.owner.getComponent(Laya.Animator);//getChildAt(1)获取第二个子元素，RedWhiskeredBulbul_LOD0
            let character = this.owner.getComponent(Laya.CharacterController);
            ani.speed=0.5;

            if (!character.isGrounded) {
                ani.play("Fly"); // 飞
                this.state=0;
            } else if(character.isGrounded){
                if(this.speed != 0){
                    ani.play("Walk"); // 走
                    this.state=0;
                }else{
                    switch (this.state) {
                        case 1:
                            ani.play("Eat");
                            if (!this.eatTimerRunning) {
                                Laya.timer.frameLoop(1, this, this.checkAnimation,[1]);
                                this.eatTimerRunning = true;
                            }
                            break;
                        case 2:
                            ani.play("Sit",0);
                            break;
                        case 3:
                            ani.play("Spin");
                            if (!this.eatTimerRunning) {
                                Laya.timer.frameLoop(1, this, this.checkAnimation,[3]);
                                this.eatTimerRunning = true;
                            }
                            break;
                        case 4:
                            ani.play("Roll");
                            this.owner.transform.getForward(this.direction);
                            this.owner.transform.localPositionX+=this.direction.x*(-1)*0.01;
                            this.owner.transform.localPositionZ+=this.direction.z*(-1)*0.01;
                            if (!this.eatTimerRunning) {
                                Laya.timer.frameLoop(1, this, this.checkAnimation,[1]);
                                this.eatTimerRunning = true;
                            }
                            break;
                        case 5:
                            ani.play("Fear");
                            if (!this.eatTimerRunning) {
                                Laya.timer.frameLoop(1, this, this.checkAnimation,[3]);
                                this.eatTimerRunning = true;
                            }
                            break;
                        case 6:
                            ani.play("Bounce");
                            break;        
                        default://默认状态
                            if (this.speed != 0) {
                                ani.play("Walk"); // 走
                            } else {
                                ani.play("Idle_A"); // 静止
                            }
                            this.state=0;
                            break;
                    }
                }
            }

            // switch (this.shapekey) {
            //     case 1:
            //         ani.play("Eyes_Annoyed");
            //         break;
            //     case 2:
            //         ani.play("B");
            //         break;
            //     case 3:
            //         ani.play("C");
            //         break;
            //     default://默认状态
            //         ani.play("Eyes_Blink");
            //         this.shapekey=0;
            //         break;
            // }

        }


        // 设定动画能播放几次；
        //如果动画播放次数不限，参考"Sit"，用不着调用此方法
        checkAnimation(times) {//times为次数，在Laya.timer.frameLoop(1, this, this.checkAnimation,[1]);的最后一个参数即为次数
            var x=times;
            var ani = this.owner.getComponent(Laya.Animator);
            if (ani.getCurrentAnimatorPlayState().normalizedTime >= x) {
                // 回到默认状态
                this.state = 0;
                // 停止定时器
                Laya.timer.clear(this, this.checkAnimation);
                this.eatTimerRunning = false;
            }
        }
    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-05-14 13:18
    */
    class OtherPlayer extends Laya.Script {

        constructor() {
            super();
            this.Id=-1;
            this.username="";
            this.camera=null;
            this.playerText=null;

            this.speed=0;
            this.state=0;
            //this.direction=new Laya.Vector3()
            //this.flyForce=0;
            //this.jumpForce=0;

            this.lastPosX=0;
            this.lastPosZ=0;
            this.lastAngle=0;

            this.txtpoint=new Laya.Vector4();
        }
        Init(playerId,camera,playerText,username){
            this.Id=playerId;
            this.username=username;
            this.camera=camera;
            this.playerText=playerText;
            console.log("camera",this.camera);
        }
        onAwake() {
            //他人离去，销毁
            Laya.stage.on(EventType.Match_Leave_Other,this,function(otherId){
                if(otherId==this.Id){
                    this.playerText.destroy();
                    this.owner.destroy();
                }
            });
            //位置初始化
            Laya.stage.on(EventType.InitPos,this,function(data){
                if(data.Id==this.Id){
                    this.owner.transform.localPositionX=data.x;
                    this.owner.transform.localPositionY=data.y;
                    this.owner.transform.localPositionZ=data.z;
                    this.owner.transform.localRotationEulerY=data.Angle;
                    //console.log("INITPOS",data);
                }
            });
            //位置更新
            Laya.stage.on(EventType.UpdatePos,this,function(data){
                if(data.Id==this.Id){
                    this.owner.transform.localPositionX=data.x;
                    //this.owner.transform.localPositionY=data.y;
                    this.owner.transform.localPositionZ=data.z;
                    this.owner.transform.localRotationEulerY=data.Angle;

                    this.lastPosX=this.owner.transform.localPositionX;
                    this.lastPosZ=this.owner.transform.localPositionZ;
                    this.lastAngle=this.owner.transform.localRotationEulerY;
                    //当没有（主要是为了排除会产生位移的）动作时
                    if(this.state==0){
                        this.speed=100;
                    }else if(this.state!=0){
                        this.speed=100;
                    }
                }
            });
            //飞行更新
            Laya.stage.on(EventType.UpdateFly,this,function(data){
                let character = this.owner.getComponent(Laya.CharacterController);
                if(data==this.Id){
                    character.jump();
                }
            });
            //动作更新
            Laya.stage.on(EventType.UpdateMotion,this,function(data){
                if(data.Id==this.Id){
                    this.state=data.state;
                }
            });


            this.addCharacter();
            this.addAnim();

        }
        onUpdate(){
            //头顶用户名跟随
            this.camera.worldToViewportPoint(this.owner.transform.position,this.txtpoint);
            this.playerText.pos(this.txtpoint.x,this.txtpoint.y);
            this.playerText.scale(5*this.txtpoint.z/this.txtpoint.w,5*this.txtpoint.z/this.txtpoint.w);
            //console.log("scale",this.playerText.scaleX);
            if(this.playerText.scaleX<0.25){
                this.playerText.getChildByName("followtext").text="";//过于远的用户名，不展示
            }else{
                this.playerText.getChildByName("followtext").text=this.username;
            }

            //判断是否在走路
            if(this.lastPosX!=this.owner.transform.localPositionX||this.lastPosZ!=this.owner.transform.localPositionZ){
                //this.speed=100
            }else{
                this.speed=0;
            }
        }
        onDestroy(){
            Laya.stage.off(EventType.UpdatePos,this);
            Laya.stage.off(EventType.UpdateFly,this);
        }



        addCharacter() {
            //为精灵添加角色控制器
            var character = this.owner.addComponent(Laya.CharacterController);
            //创建胶囊碰撞器
            var sphereShape = new Laya.CapsuleColliderShape(0.4, 0.9);
            //设置Shape的本地偏移
            sphereShape.localOffset = new Laya.Vector3(0, 0.4, 0);
            //设置角色控制器的碰撞形状
            character.colliderShape = sphereShape;


            //Laya.timer.frameLoop(1, this, this.onKeyDown);//每一帧都执行一次指定的回调函数,监听键盘状态
        }


        addAnim(){
            Laya.timer.frameLoop(1, this, this.Anim);//每一帧都执行一次指定的回调函数,监听键盘状态
        }

        Anim(){
            var ani=this.owner.getComponent(Laya.Animator);//getChildAt(1)获取第二个子元素，RedWhiskeredBulbul_LOD0
            let character = this.owner.getComponent(Laya.CharacterController);
            ani.speed=0.5;

            if (!character.isGrounded) {
                ani.play("Fly"); // 飞
                this.state=0;
            } else if(character.isGrounded){
                if(this.speed != 0){
                    ani.play("Walk"); // 走
                    this.state=0;
                }
                else{
                    switch (this.state) {
                        case 1:
                            ani.play("Eat");
                            if (!this.eatTimerRunning) {
                                Laya.timer.frameLoop(1, this, this.checkAnimation,[1]);
                                this.eatTimerRunning = true;
                            }
                            break;
                        case 2:
                            ani.play("Sit",0);
                            break;
                        case 3:
                            ani.play("Spin");
                            if (!this.eatTimerRunning) {
                                Laya.timer.frameLoop(1, this, this.checkAnimation,[3]);
                                this.eatTimerRunning = true;
                            }
                            break;
                        case 4:
                            ani.play("Roll");
                            // this.owner.transform.getForward(this.direction)
                            // this.owner.transform.localPositionX+=this.direction.x*(-1)*0.01
                            // this.owner.transform.localPositionZ+=this.direction.z*(-1)*0.01
                            if (!this.eatTimerRunning) {
                                Laya.timer.frameLoop(1, this, this.checkAnimation,[1]);
                                this.eatTimerRunning = true;
                            }
                            break;   
                        case 5:
                            ani.play("Fear");
                            if (!this.eatTimerRunning) {
                                Laya.timer.frameLoop(1, this, this.checkAnimation,[3]);
                                this.eatTimerRunning = true;
                            }
                            break;
                        case 6:
                            ani.play("Bounce");
                            break;        
                        default://默认状态
                            if (this.speed != 0) {
                                ani.play("Walk"); // 走
                            } else {
                                ani.play("Idle_A"); // 静止
                            }
                            this.state=0;
                            break;
                    }
                }
            }
        }

        // 设定动画能播放几次；
        //如果动画播放次数不限，参考"Sit"，用不着调用此方法
        checkAnimation(times) {//times为次数，在Laya.timer.frameLoop(1, this, this.checkAnimation,[1]);的最后一个参数即为次数
            var x=times;
            var ani = this.owner.getComponent(Laya.Animator);
            if (ani.getCurrentAnimatorPlayState().normalizedTime >= x) {
                // 回到默认状态
                this.state = 0;
                // 停止定时器
                Laya.timer.clear(this, this.checkAnimation);
                this.eatTimerRunning = false;
        }
        }
    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-03-26 20:13
    */
    class TestScene extends Laya.Script {

        constructor() {
            super();
            this.scene =null;
            this.camera=null;
            this.idItemObject=new Object();//模型与ID对应列表
            this.playerTextPre=null;

            this.roomData=null;
        }

        onAwake() {
            Laya.loader.load("prefab/PlayerIDTextPre.json",
            new Laya.Handler(this,function(pre){
                this.playerTextPre=pre;
                //this.scene3DInit()
            }),null,Laya.Loader.PREFAB);

            Laya.Scene3D.load("res/unityscene/LayaScene_Forest/Conventional/Forest.ls",
            //Laya.Scene3D.load("res/unityscene/LayaScene_ShowScene/Conventional/ShowScene.ls",
            Laya.Handler.create(this,function(scene){
                this.scene = scene;
                console.log("scene1",this.scene);
                Laya.stage.addChild(scene);
                scene.zOrder=-1;
                var camera=scene.getChildByName("Main Camera");
                camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
                this.camera=camera;
                
                this.roomData.forEach(playerInfo => {
                    const userModel=this.createUserModel(playerInfo.Id);
                    this.idItemObject[playerInfo.Id]=userModel;
                    const animalNameStr = AnimalName.getAnimalName(playerInfo.Type, playerInfo.Species);
                    const modelPath = "res/unityscene/LayaScene_ShowScene/Conventional/" + animalNameStr + "_LOD0.lh";
                    console.log("加载了", animalNameStr, modelPath);
                
                    Laya.Sprite3D.load(modelPath, Laya.Handler.create(this, function(sp) {
                        //实例化一个跟随ID
                        var playerText=this.playerTextPre.create();
                        this.owner.addChild(playerText);

                        // 克隆加载的模型以确保每个模型实例都是独立的
                        console.log("scene",this.scene);
                        var player= this.scene.addChild(sp.clone());
                        userModel.model=player;
                        console.log("已有-加载完毕");

                        //如果是自己的动物
                        if(playerInfo.Id==GameData.Id){
                            player.addComponent(Player).Init(this.camera,playerText);//
                            this.camera.addComponent(CameraFollow).Init(player);
                        }
                        else{
                            player.addComponent(OtherPlayer).Init(playerInfo.Id,this.camera,playerText,playerInfo.UserName);
                        }
                    }));               

                });
                // var player= scene.getChildByName("Player")
                // player.addComponent(Player)
                // camera.addComponent(CameraFollow).Init(player)
            }));

            //Laya.Sprite3D.load("res/unityscene/LayaScene_New Scene/Conventional/Main Camera.lh",)
            
            //自己进入
            Laya.stage.on(EventType.Match_Succ,this,function(roomData){
                this.roomData=roomData;

            });
            //他人进入
            Laya.stage.on(EventType.Match_OtherEnter,this,function(otherInfo){
                const userModel=this.createUserModel(otherInfo.Id);
                this.idItemObject[otherInfo.Id] = userModel;
                const animalNameStr = AnimalName.getAnimalName(otherInfo.Type, otherInfo.Species);
                const modelPath = "res/unityscene/LayaScene_ShowScene/Conventional/" + animalNameStr + "_LOD0.lh";
                console.log("加载了", animalNameStr, modelPath);
                Laya.Sprite3D.load(modelPath, Laya.Handler.create(this, function(sp) {
                    //实例化一个跟随ID
                    var playerText=this.playerTextPre.create();
                    this.owner.addChild(playerText);
                    // 克隆加载的模型以确保每个模型实例都是独立的
                    var player= this.scene.addChild(sp.clone());
                    userModel.model=player;
                    console.log("新加入-加载完毕");
                    player.addComponent(OtherPlayer).Init(otherInfo.Id,this.camera,playerText,otherInfo.UserName);
                }));  
            });
            //他人离去
            Laya.stage.on(EventType.Match_Leave_Other,this,function(otherId){
                //去除已经离去的玩家的模型
                const userModel = this.idItemObject[otherId];
                if (userModel != null && userModel.model != null) {
                    //userModel.model.destroy();// 销毁模型
                }
                // 从存储对象中移除该玩家
                delete this.idItemObject[otherId];
            });
            //自己离去
            Laya.stage.on(EventType.Match_Leave_Self,this,function(){
                console.log("Match_Leave_Self");
                Object.values(this.idItemObject).forEach(element => {
                    element.destroy();
                });
                this.idItemObject=new Object;
            });

        }
        
        onDestroy(){
            Laya.stage.off(EventType.Match_Leave_Self,this);
            Laya.stage.off(EventType.Match_Leave_Other,this);
            Laya.stage.off(EventType.Match_OtherEnter,this);
            Laya.stage.off(EventType.Match_Succ,this);

            Laya.loader.clearRes("prefab/PlayerFollowTextPre.json");
        }

        createUserModel(id){
            return {
                id: id,
                model: null // 模型暂时为空，稍后加载完成后会赋值
            };
        }

        // loadPlayerModel(userModel,type,species){
        //     const animalNameStr = AnimalName.getAnimalName(type, species);
        //     const modelPath = "res/unityscene/LayaScene_ShowScene/Conventional/" + animalNameStr + "_LOD0.lh";
        //     console.log("加载了", animalNameStr, modelPath);
        
        //     Laya.Sprite3D.load(modelPath, Laya.Handler.create(this, function(sp) {
        //         // 克隆加载的模型以确保每个模型实例都是独立的
        //         userModel.model = this.scene.addChild(sp.clone());
        //         console.log("加载完毕");
        //     }));
        // }
    }

    class Joystick extends Laya.Script {

        constructor() { 
            super();
            /** @prop {name:joystick, tips:"摇杆", type:Node, default:null}*/
            this.joystick=null;
            /** @prop {name:knob, tips:"控制点", type:Node, default:null}*/
            this.knob=null;
            /** @prop {name:pad, tips:"pad", type:Node, default:null}*/
            this.pad=null;
        }
        onAwake(){
            /***当前多点触摸id****/
            this.curTouchId = 0;
            /***手指（鼠标）是否按下****/
            this.isDown = false;
            /***摇杆的角度****/
            this.angle = -1;        
            /***摇杆的弧度****/
            this.radians = -1;
            /***是否左手遥控****/
            this.isleftControl = true;

            //鼠标按下事件监听
            Laya.stage.on(Laya.Event.MOUSE_DOWN,this,this.onMouseDown);
            //鼠标抬起事件监听
            Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onMouseUp);
            Laya.stage.on(Laya.Event.MOUSE_OUT,this,this.onMouseUp);
            
            //默认为joystick不显示
            this.joystick.visible = false;
            //控制点可以移动的距离
            this.distance=140;
            this.speed=0;
       }
       onMouseDown(e){
           //左右手遥控
           if(this.isleftControl){
               //如果按下时是右边屏幕位置或已经按下鼠标，则返回
               if(e.stageX > Laya.stage.width/2 || this.isDown)return;
           }
           else{
               //如果按下时是左边屏幕位置或已经按下鼠标，则返回
               if(e.stageX < Laya.stage.width/2 || this.isDown)return;
           }
           //记录当前按下id
            this.curTouchId = e.touchId;
            //已按下
            this.isDown = true;

            var locationPos = this.joystick.globalToLocal(new Laya.Point(Laya.stage.mouseX,Laya.stage.mouseY),false);
            //更新摇杆到鼠标按下位置
            this.knob.pos(locationPos.x, locationPos.y);
            this.pad.pos(locationPos.x, locationPos.y);
            //摇杆位置初始值
            this.originPiont =locationPos;
            //按下后显示摇杆
            this.joystick.visible = true;
            //摇杆移动控制事件监听
            Laya.stage.on(Laya.Event.MOUSE_MOVE,this,this.onMove);
       }
       /*鼠标抬起事件回调*/
       onMouseUp(e){
           //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
           if(e.touchId != this.curTouchId)return;
           this.isDown = false;
           this.joystick.visible = false;
           //移除摇杆移动事件监听
           Laya.stage.off(Laya.Event.MOUSE_MOVE,this,this.onMove);
           //修改摇杆角度与弧度为-1（代表无角度）
           this.radians = this.angle = -1;
           this.speed=0;
           Laya.stage.event("OnMove",0);
       }
       /*鼠标移动事件回调*/
       onMove(e){
           //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
           if(e.touchId != this.curTouchId)return;
           //将移动时的鼠标屏幕坐标转化为摇杆局部坐标
           var locationPos = this.joystick.globalToLocal(new Laya.Point(Laya.stage.mouseX,Laya.stage.mouseY),false);
           this.knob.pos(locationPos.x,locationPos.y);
           var deltaX = locationPos.x - this.originPiont.x;
           var deltaY = locationPos.y - this.originPiont.y;
           //利用atan2求出弧度，然后转为角度  其中 x 是临边边长，而 y 是对边边长
           this.angle = Math.atan2(deltaX,deltaY) * 180 / Math.PI;
           if(this.angle < 0) this.angle += 360;
           this.angle = Math.round(this.angle);

           //计算控制点在摇杆中的弧度
           this.radians = Math.PI / 180 * this.angle;
           var dx = deltaX * deltaX;
           var dy = deltaY * deltaY;
           //强制控制点与中心距离不超过distance
           if(dx+dy >= this.distance*this.distance){
               //控制点在半径为distance的位置（根据弧度变化）
               //Math.floor 向下取整  返回小于或等于一个给定数字的最大整数。
               var x = Math.floor(Math.sin(this.radians) * this.distance +this.originPiont.x);
               var y = Math.floor(Math.cos(this.radians) * this.distance + this.originPiont.y);
               this.knob.pos(x,y);
           }
           else{
               //不超过设定的距地取原坐标
               this.knob.pos(locationPos.x,locationPos.y);
           }

           //计算速度
           var deltaKnobX = this.knob.x - this.originPiont.x;
           var deltaKnobY = this.knob.y - this.originPiont.y;
           this.speed=Math.sqrt(deltaKnobX*deltaKnobX+deltaKnobY*deltaKnobY)/this.distance;
       }
       onUpdate(){
           if(this.speed>0){
               Laya.stage.event("OnMove",this.speed);
           }
           if(this.angle!=-1){
               Laya.stage.event("OnRotate",this.angle);
           }
       }
    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-05-16 23:53
    */
    class ChatView extends Laya.Script {

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
                this.msgReceive(data.username, data.msg);
            });


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
            this.chatPanel.addChild(chatLine);//加载到聊天框中

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
            var remainCount = msgObj.length - englishCount - chineseCount - numberCount;
            var lines = 1 + Math.floor(englishCount / 30 + chineseCount / 22 + numberCount / 38 + remainCount / 22);
            textfiled.height = 30 * lines;//聊天内容高度

            textfiled.width = 570;//文本宽
            textfiled.color = "#ffffff";//文本颜色样式
            textfiled.font = "Microsoft YaHei";//文本字体
            textfiled.fontSize = 25;//文本字体大小样式
            textfiled.valign = "middle";//文本对齐样式
            textfiled.wordWrap = "true";//换行

            textfiled.text = msgObj;//添加聊天内容
            console.log("总字数",msgObj.length,lines);
        }
    }

    /**
    *
    * @ author:cmd
    * @ wechat:codercmd@qq.com
    * @ data: 2024-04-09 16:32
    */
    class GamePanel extends Laya.Script {

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
            });

            this.btn_Fly.on(Laya.Event.CLICK,this.btn_Fly,function(){
                Laya.stage.event("Fly");
            });

            this.btn_Eat.on(Laya.Event.CLICK,this.btn_Eat,function(){
                Laya.stage.event("Eat");
                console.log("Eat");
            });
            this.btn_Sit.on(Laya.Event.CLICK,this.btn_Sit,function(){
                Laya.stage.event("Sit");
                console.log("Sit");
            });
            this.btn_Spin.on(Laya.Event.CLICK,this.btn_Spin,function(){
                Laya.stage.event("Spin");
                console.log("Spin");
            });
            this.btn_Roll.on(Laya.Event.CLICK,this.btn_Roll,function(){
                Laya.stage.event("Roll");
                console.log("Roll");
            });
            this.btn_Fear.on(Laya.Event.CLICK,this.btn_Fear,function(){
                Laya.stage.event("Fear");
                console.log("Fear");
            });

            this.btn_Bounce.on(Laya.Event.CLICK,this.btn_Bounce,function(){
                Laya.stage.event("Bounce");
                console.log("Bounce");
            });

            //状态同步
            this.owner.on(Laya.Event.CLICK,this,function(){
                Laya.stage.event("UpdateMotion_start");
                console.log("UpdateMotion_start");
            });

        }
    }

    /**This class is automatically generated by LayaAirIDE, please do not make any modifications. */

    class GameConfig {
        static init() {
            //注册Script或者Runtime引用
            let reg = Laya.ClassUtils.regClass;
    		reg("scripts/Logic/FightScene.js",FightScene);
    		reg("scripts/UI/LoginPanel.js",LoginPanel);
    		reg("scripts/UI/RegistPanel.js",RegistPanel);
    		reg("scripts/UI/TextHint.js",TextHint);
    		reg("scripts/Logic/LaunchGame.js",LaunchGame);
    		reg("scripts/UI/MatchSceneUI.js",MatchSceneUI);
    		reg("scripts/UI/SpeciesChangePanel.js",SpeciesChangePanel);
    		reg("scripts/UI/MatchScene.js",MatchScene);
    		reg("scripts/Logic/TestScene.js",TestScene);
    		reg("scripts/Logic/Joystick.js",Joystick);
    		reg("scripts/Logic/ChatView.js",ChatView);
    		reg("scripts/Logic/GamePanel.js",GamePanel);
        }
    }
    GameConfig.width = 1920;
    GameConfig.height = 1080;
    GameConfig.scaleMode ="fixedwidth";
    GameConfig.screenMode = "horizontal";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "FightScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;

    GameConfig.init();

    class Main {
    	constructor() {
    		//根据IDE设置初始化引擎		
    		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
    		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
    		Laya["Physics"] && Laya["Physics"].enable();
    		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
    		Laya.stage.scaleMode = GameConfig.scaleMode;
    		Laya.stage.screenMode = GameConfig.screenMode;
    		Laya.stage.alignV = GameConfig.alignV;
    		Laya.stage.alignH = GameConfig.alignH;
    		//兼容微信不支持加载scene后缀场景
    		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

    		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
    		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
    		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
    		if (GameConfig.stat) Laya.Stat.show();
    		Laya.alertGlobalError(true);

    		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
    		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    	}

    	onVersionLoaded() {
    		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
    		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    	}

    	onConfigLoaded() {
    		//加载IDE指定的场景
    		GameConfig.startScene && Laya.Scene.open("LoginScene.json");
    		//Laya.Scene.open("MatchScene.json")
    	}
    }
    //激活启动类
    new Main();

}());
