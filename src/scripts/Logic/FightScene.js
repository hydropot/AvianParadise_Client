/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-03-26 20:13
*/
export default class FightScene extends Laya.Script {

    constructor() {
        super();
    }

    onAwake() {
        Laya.Scene3D.load("res/unityscene/LayaScene_Forest/Conventional/Forest.ls",
        new Laya.Handler(this,function(scene){
            this.owner.addChild(scene)
        }));

    }
}