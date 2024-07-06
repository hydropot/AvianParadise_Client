import GameData from "../Logic/GameData";
import AnimalName from "../Common/AnimalName";
/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-03-26 20:13
*/
export default class MatchScene extends Laya.Script {

    constructor() {
        super();

        this.scene =null;
        this.model=null
    }

    onAwake() {
        //Laya.Sprite3D.load("res/unityscene/LayaScene_New Scene/Conventional/Main Camera.lh",)
        Laya.Scene3D.load("res/unityscene/LayaScene_ShowScene/Conventional/ShowScene.ls",
        Laya.Handler.create(this,function(scene){
            this.scene = scene;
            Laya.stage.addChild(scene)
            scene.zOrder=-1
            var camera=scene.getChildByName("Main Camera")
            camera.transform.translate(new Laya.Vector3(0, 0.3, 0));
            camera.clearFlag =Laya.BaseCamera.CLEARFLAG_SOLIDCOLOR;
            
            this.loadModel();
            
        }));


        Laya.stage.on("Choose", this, function () {
            this.removeModel();
            this.loadModel();
        })

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