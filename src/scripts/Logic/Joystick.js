export default class Joystick extends Laya.Script {

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
           Laya.stage.event("OnRotate",this.angle-90);
       }
   }
}