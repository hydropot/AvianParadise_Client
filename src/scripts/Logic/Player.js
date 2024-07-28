import EventType from "../Common/EventType";
import Code from "../Common/Code";
import FightCode from "../Common/FightCode";
import GameData from "./GameData";

/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-04-08 15:01
*/
export default class Player extends Laya.Script3D {

    constructor() {
        super();
        this.character=null;//角色控制器
        this.camera=null;
        this.playerText=null

        this.speed=0;
        this.state=0;
        this.direction=new Laya.Vector3()
        this.flyForce=0;
        this.jumpForce=0;

        this.lastPosX=0;
        this.lastPosY=0;
        this.lastPosZ=0;
        this.lastAngle=0;

        this.txtpoint=new Laya.Vector4()

    }
    Init(camera,playerText){
        this.camera=camera;
        this.playerText=playerText;
        // this.bulletPre=bulletPre;
    }
    onAwake() {  
        Laya.stage.on("OnMove",this,function(speed){
            this.speed=speed;
        })
        Laya.stage.on("OnRotate",this,function(angle){
            this.owner.transform.localRotationEulerY=angle+this.camera.transform.rotationEuler.y;//保持行进方向与视角一致
        })

        Laya.stage.on("Fly",this,function(){////起飞方式之按钮
            let character = this.owner.getComponent(Laya.CharacterController);
            character.jump();
            Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.Fly_CREQ,GameData.Id])
        })


        Laya.stage.on("Eat",this,function(){
            this.state=1;
        })
        Laya.stage.on("Sit",this,function(){
            this.state=2;
        })
        Laya.stage.on("Spin",this,function(){
            this.state=3;
        })
        Laya.stage.on("Roll",this,function(){
            this.state=4;
        })
        Laya.stage.on("Fear",this,function(){
            this.state=5;
        })
        Laya.stage.on("Bounce",this,function(){
            this.state=6;
        })

        Laya.stage.on("UpdateMotion_start",this,function(){
            var data={Id:GameData.Id,
                    state:this.state}
            Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.Motion_CREQ,data])
        })


        this.addCharacter();
        this.addAnim();

    }
    onEnable() {
        


    }
    onUpdate(){
        //头顶用户名跟随
        this.camera.worldToViewportPoint(this.owner.transform.position,this.txtpoint)
        this.playerText.pos(this.txtpoint.x,this.txtpoint.y)
        this.playerText.getChildByName("followtext").text=GameData.UserName
        this.playerText.scale(1,1)

        //摇杆控制移动
        this.owner.transform.getForward(this.direction)
        if(this.speed!=0){
            if(!this.character.isGrounded){
            this.owner.transform.localPositionX+=this.direction.x*(-1)*this.speed*3/100
            this.owner.transform.localPositionZ+=this.direction.z*(-1)*this.speed*3/100
            }else if(this.character.isGrounded){
                this.owner.transform.localPositionX+=this.direction.x*(-1)*this.speed*2/100
                this.owner.transform.localPositionZ+=this.direction.z*(-1)*this.speed*2/100
            }
        }
        //平时的位置同步
        if(this.lastPosX!=this.owner.transform.localPositionX||this.lastPosZ!=this.owner.transform.localPositionZ||this.lastAngle!=this.owner.transform.localRotationEulerY){
            var data={Id:GameData.Id,
                x:this.owner.transform.localPositionX,
                //y:this.owner.transform.localPositionY,
                z:this.owner.transform.localPositionZ,
                Angle:this.owner.transform.localRotationEulerY}
            Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.Pos_CREQ,data])
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
                    Angle:this.owner.transform.localRotationEulerY}
                Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.Pos_Init_CREQ,data])
                Laya.timer.clear(this,aaa);
            })
        })
    

    }


    onDestroy(){
        Laya.stage.off("OnMove",this)
        Laya.stage.off("OnRotate",this)
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
            Laya.stage.event(EventType.SendMsg,[Code.Fight,FightCode.Fly_CREQ,GameData.Id])
        }
    }


    addAnim(){
        Laya.timer.frameLoop(1, this, this.Anim);//每一帧都执行一次指定的回调函数,监听键盘状态
    }

    Anim(){
        var ani=this.owner.getComponent(Laya.Animator)//getChildAt(1)获取第二个子元素，RedWhiskeredBulbul_LOD0
        let character = this.owner.getComponent(Laya.CharacterController);
        ani.speed=0.5

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
                        this.owner.transform.getForward(this.direction)
                        this.owner.transform.localPositionX+=this.direction.x*(-1)*0.01
                        this.owner.transform.localPositionZ+=this.direction.z*(-1)*0.01
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
