import EventType from "../Common/EventType";
import Code from "../Common/Code";
import FightCode from "../Common/FightCode";
import GameData from "./GameData";
/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-05-14 13:18
*/
export default class OtherPlayer extends Laya.Script {

    constructor() {
        super();
        this.Id=-1;
        this.username="";
        this.camera=null
        this.playerText=null

        this.speed=0;
        this.state=0;
        //this.direction=new Laya.Vector3()
        //this.flyForce=0;
        //this.jumpForce=0;

        this.lastPosX=0;
        this.lastPosZ=0;
        this.lastAngle=0;

        this.txtpoint=new Laya.Vector4()
    }
    Init(playerId,camera,playerText,username){
        this.Id=playerId
        this.username=username
        this.camera=camera
        this.playerText=playerText
        console.log("camera",this.camera);
    }
    onAwake() {
        //他人离去，销毁
        Laya.stage.on(EventType.Match_Leave_Other,this,function(otherId){
            if(otherId==this.Id){
                this.playerText.destroy();
                this.owner.destroy();
            }
        })
        //位置初始化
        Laya.stage.on(EventType.InitPos,this,function(data){
            if(data.Id==this.Id){
                this.owner.transform.localPositionX=data.x;
                this.owner.transform.localPositionY=data.y;
                this.owner.transform.localPositionZ=data.z;
                this.owner.transform.localRotationEulerY=data.Angle;
                //console.log("INITPOS",data);
            }
        })
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
        })
        //飞行更新
        Laya.stage.on(EventType.UpdateFly,this,function(data){
            let character = this.owner.getComponent(Laya.CharacterController);
            if(data==this.Id){
                character.jump();
            }
        })
        //动作更新
        Laya.stage.on(EventType.UpdateMotion,this,function(data){
            if(data.Id==this.Id){
                this.state=data.state
            }
        })


        this.addCharacter();
        this.addAnim();

    }
    onUpdate(){
        //头顶用户名跟随
        this.camera.worldToViewportPoint(this.owner.transform.position,this.txtpoint)
        this.playerText.pos(this.txtpoint.x,this.txtpoint.y)
        this.playerText.scale(5*this.txtpoint.z/this.txtpoint.w,5*this.txtpoint.z/this.txtpoint.w)
        //console.log("scale",this.playerText.scaleX);
        if(this.playerText.scaleX<0.25){
            this.playerText.getChildByName("followtext").text=""//过于远的用户名，不展示
        }else{
            this.playerText.getChildByName("followtext").text=this.username
        }

        //判断是否在走路
        if(this.lastPosX!=this.owner.transform.localPositionX||this.lastPosZ!=this.owner.transform.localPositionZ){
            //this.speed=100
        }else{
            this.speed=0;
        }
    }
    onDestroy(){
        Laya.stage.off(EventType.UpdatePos,this)
        Laya.stage.off(EventType.UpdateFly,this)
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