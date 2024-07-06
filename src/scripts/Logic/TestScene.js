import EventType from "../Common/EventType";
import Code from "../Common/Code";
import FightCode from "../Common/FightCode";
import GameData from "./GameData";
import CameraFollow from "./CameraFollow";
import Player from "./Player";
import test from "./test";
import AnimalName from "../Common/AnimalName";
import OtherPlayer from "./OtherPlayer";

/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-03-26 20:13
*/
export default class TestScene extends Laya.Script {

    constructor() {
        super();
        this.scene =null;
        this.camera=null;
        this.idItemObject=new Object()//模型与ID对应列表
        this.playerTextPre=null;

        this.roomData=null
    }

    onAwake() {
        Laya.loader.load("prefab/PlayerIDTextPre.json",
        new Laya.Handler(this,function(pre){
            this.playerTextPre=pre;
            //this.scene3DInit()
        }),null,Laya.Loader.PREFAB)

        Laya.Scene3D.load("res/unityscene/LayaScene_Forest/Conventional/Forest.ls",
        //Laya.Scene3D.load("res/unityscene/LayaScene_ShowScene/Conventional/ShowScene.ls",
        Laya.Handler.create(this,function(scene){
            this.scene = scene;
            console.log("scene1",this.scene);
            Laya.stage.addChild(scene)
            scene.zOrder=-1
            var camera=scene.getChildByName("Main Camera")
            camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
            this.camera=camera
            
            this.roomData.forEach(playerInfo => {
                const userModel=this.createUserModel(playerInfo.Id)
                this.idItemObject[playerInfo.Id]=userModel;
                const animalNameStr = AnimalName.getAnimalName(playerInfo.Type, playerInfo.Species);
                const modelPath = "res/unityscene/LayaScene_ShowScene/Conventional/" + animalNameStr + "_LOD0.lh";
                console.log("加载了", animalNameStr, modelPath);
            
                Laya.Sprite3D.load(modelPath, Laya.Handler.create(this, function(sp) {
                    //实例化一个跟随ID
                    var playerText=this.playerTextPre.create()
                    this.owner.addChild(playerText);

                    // 克隆加载的模型以确保每个模型实例都是独立的
                    console.log("scene",this.scene);
                    var player= this.scene.addChild(sp.clone());
                    userModel.model=player
                    console.log("已有-加载完毕");

                    //如果是自己的动物
                    if(playerInfo.Id==GameData.Id){
                        player.addComponent(Player).Init(this.camera,playerText);//
                        this.camera.addComponent(CameraFollow).Init(player)
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
            this.roomData=roomData

        })
        //他人进入
        Laya.stage.on(EventType.Match_OtherEnter,this,function(otherInfo){
            const userModel=this.createUserModel(otherInfo.Id)
            this.idItemObject[otherInfo.Id] = userModel;
            const animalNameStr = AnimalName.getAnimalName(otherInfo.Type, otherInfo.Species);
            const modelPath = "res/unityscene/LayaScene_ShowScene/Conventional/" + animalNameStr + "_LOD0.lh";
            console.log("加载了", animalNameStr, modelPath);
            Laya.Sprite3D.load(modelPath, Laya.Handler.create(this, function(sp) {
                //实例化一个跟随ID
                var playerText=this.playerTextPre.create()
                this.owner.addChild(playerText);
                // 克隆加载的模型以确保每个模型实例都是独立的
                var player= this.scene.addChild(sp.clone());
                userModel.model=player
                console.log("新加入-加载完毕");
                player.addComponent(OtherPlayer).Init(otherInfo.Id,this.camera,playerText,otherInfo.UserName);
            }));  
        })
        //他人离去
        Laya.stage.on(EventType.Match_Leave_Other,this,function(otherId){
            //去除已经离去的玩家的模型
            const userModel = this.idItemObject[otherId];
            if (userModel != null && userModel.model != null) {
                //userModel.model.destroy();// 销毁模型
            }
            // 从存储对象中移除该玩家
            delete this.idItemObject[otherId];
        })
        //自己离去
        Laya.stage.on(EventType.Match_Leave_Self,this,function(){
            console.log("Match_Leave_Self");
            Object.values(this.idItemObject).forEach(element => {
                element.destroy()
            });
            this.idItemObject=new Object;
        })

    }
    
    onDestroy(){
        Laya.stage.off(EventType.Match_Leave_Self,this);
        Laya.stage.off(EventType.Match_Leave_Other,this);
        Laya.stage.off(EventType.Match_OtherEnter,this);
        Laya.stage.off(EventType.Match_Succ,this);

        Laya.loader.clearRes("prefab/PlayerFollowTextPre.json")
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