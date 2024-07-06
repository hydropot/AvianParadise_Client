export default class Joystick2 extends Laya.Script {

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

        // 监听摇杆的移动和旋转事件
        Laya.stage.on("OnMove", this, this.onMove);
        Laya.stage.on("OnRotate", this, this.onRotate);

        // 初始化相机控制变量
        this.xzAngle = 0;
        this.yAngle = 0;
        this.radius = 2.5;
        this.speed = 0.1;
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
        Laya.stage.event("OnMoveC",0);
    }

    onMove(speed){
        this.speed = speed;
    }

    onRotate(angle){
        this.xzAngle = angle * Math.PI / 180;
    }

    onUpdate(){
        // 计算新的相机位置
        let deltaX = this.speed * Math.sin(this.xzAngle);
        let deltaZ = this.speed * Math.cos(this.xzAngle);

        // 更新相机的位置
        let camera = this.owner;
        let newPosition = new Laya.Vector3(camera.transform.position.x + deltaX, camera.transform.position.y, camera.transform.position.z + deltaZ);
        camera.transform.position = newPosition;

        // 让相机始终看向玩家
        let player = this.player;
        if (player) {
            camera.transform.lookAt(new Laya.Vector3(player.transform.position.x, player.transform.position.y + 1.5, player.transform.position.z), new Laya.Vector3(0, 1, 0));
        }
    }

    Init(t, i, e) {
        this.scene3D = i;
        this.camera = this.owner;
        this.lookAtObj = e;
        this.player = t;
        this.playerPos = this.player.transform.position;
        this.selfPos = this.owner.transform.position;
    }
}
