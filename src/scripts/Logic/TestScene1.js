import EventType from "../Common/EventType";
import CameraFollow from "./CameraFollow";
import Player from "./Player";

/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-03-26 20:13
*/
export default class TestScene extends Laya.Script {

    constructor() {
        super();
    }

    onAwake() {        
        Laya.Scene3D.load("res/unityscene/LayaScene_New Scene/Conventional/New Scene.ls",
        Laya.Handler.create(this,function(scene){
            Laya.stage.addChild(scene)
            scene.zOrder=-1
            var camera=scene.getChildByName("Main Camera")
            camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;

            var player= scene.getChildByName("Player")

            player.addComponent(Player)
            camera.addComponent(CameraFollow).Init(player)
        }));

        //Laya.Sprite3D.load("res/unityscene/LayaScene_New Scene/Conventional/Main Camera.lh",)

    }
}