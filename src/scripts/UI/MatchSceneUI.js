import GameData from "../Logic/GameData";
import EventType from "../Common/EventType";
import AnimalName from "../Common/AnimalName";
import Code from "../Common/Code";
import AccountCode from "../Common/AccountCode";
import FightCode from "../Common/FightCode";

/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-03-24 04:13
*/
export default class MatchSceneUI extends Laya.Script {

    constructor() {
        super();
        /** @prop {name:btn_startgame, tips:"提示文本", type:Node, default:null}*/
        this.btn_startgame = null;
        /** @prop {name:btn_bird, tips:"提示文本", type:Node, default:null}*/
        this.btn_bird = null;


    }

    onAwake() {
        this.owner.getChildByName("top").getChildByName("txt_Username").text = "用户名：" + GameData.UserName
        this.titleUpdate();
        this.owner.getChildByName("top").getChildByName("headicon").skin = "UI/" + "icon" + GameData.Type + "/" + GameData.Species + ".png"


        this.btn_bird.on(Laya.Event.CLICK, this.btn_bird, function () {
            Laya.stage.event(EventType.ShowSpecies_Bird);
        })

        Laya.stage.on("Choose", this, function () {
            this.titleUpdate();
            var data={Type:GameData.Type,
                Species:GameData.Species}
            Laya.stage.event(EventType.SendMsg,[Code.Account,AccountCode.ChangeSpecies_CREQ,data])
        })


        this.btn_startgame.on(Laya.Event.CLICK, this.btn_startgame, function () {
            Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.StartGame,null])
            //开始游戏
            Laya.Scene.open("TestScene.json");
        })


    }

    onUpdate() {
    }

    titleUpdate(){
        const animalNameStr = AnimalName.getAnimalName(GameData.Type, GameData.Species)
        const animalNameStr_CN = AnimalName.getAnimalName_CN(GameData.Type, GameData.Species)
        this.owner.getChildByName("top").getChildByName("txt_EN").text = animalNameStr
        this.owner.getChildByName("top").getChildByName("txt_CN").text = animalNameStr_CN
    }

}
