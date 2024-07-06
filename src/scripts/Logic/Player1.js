import EventType from "../Common/EventType";

/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-04-08 15:01
*/
export default class Player extends Laya.Script3D {

    constructor() {
        super();
        this.speed=0;
        this.direction=new Laya.Vector3()
        this.flyForce=0;
        this.jumpForce=0;

    }
    onAwake() {  
        Laya.stage.on("OnMove",this,function(speed){
            this.speed=speed;
        })
        Laya.stage.on("OnRotate",this,function(angle){
            this.owner.transform.localRotationEulerY=angle;
        })
                
        // Laya.stage.on("Fly",this,function(){
        //     this.jumpForce=1;
        //     console.log("JUMP!")

        // })
        // Laya.timer.frameOnce(1000,this,function(){
        //     var rig = this.owner.getComponent(Laya.Rigidbody3D)
        //     rig.applyForce(new Laya.Vector3(0,1000,0))
        //     console.log("JUMP!")
        //  })
    }
    onDestroy(){
        Laya.stage.off("OnMove",this)
        Laya.stage.off("OnRotate",this)
        //Laya.stage.off(EventType.Fly,this)
    }
    onUpdate(){
        this.owner.transform.getForward(this.direction)
        if(this.speed!=0){
            this.owner.transform.localPositionX+=this.direction.x*(-1)*this.speed/100
            this.owner.transform.localPositionZ+=this.direction.z*(-1)*this.speed/100
        }

        // Laya.stage.on("Fly",this,function(){
        //      var rig = this.owner.getComponent(Laya.Rigidbody3D)
        //      rig.applyForce(new Laya.Vector3(0,1,0))
        //      console.log("JUMP!")
        //  })

    }
}