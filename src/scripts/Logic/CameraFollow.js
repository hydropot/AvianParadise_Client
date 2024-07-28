/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-04-09 13:56
*/
export default class CameraFollow extends Laya.Script {

    constructor() {
        super();
        this.target = null;
        this.out = new Laya.Vector3();
        this.followSpeed = 10; //摄像机跟随速度
        this.curTouchId = null;
        this.originPoint = new Laya.Point();
        this.originRotate = new Laya.Vector3();
        this._tempV3 = new Laya.Vector3(0, 0, 0); // Initialize _tempV3 properly
        this._speed = 0.1; // Adjust the speed of rotation
    }

    Init(target) {
        this.target = target;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        Laya.stage.on(Laya.Event.MOUSE_OUT, this, this.onMouseUp);
    }

    onAwake() {
        /***是否左手遥控****/
        this.isleftControl = false;
    }

    onLateUpdate() {
        if (this.target == null) return;
        this.UpdateRotPos();//更新相机位置和旋转角

        //原固定相机逻辑
        // let targetPos = new Laya.Vector3(
        //     this.target.transform.localPositionX - 4.19,
        //     this.target.transform.localPositionY + 2,
        //     this.target.transform.localPositionZ - 0.1
        // );
        // let targetPos = this.target.transform.localPosition;
        // Laya.Vector3.lerp(this.owner.transform.position, targetPos, Laya.timer.delta / 1000 * this.followSpeed, this.out);
        // this.owner.transform.position = this.out;
    }

    onMouseDown(e) {
        //左右手遥控
        if (this.isleftControl) {
            //如果按下时是右边屏幕位置或已经按下鼠标，则返回
            if (e.stageX > Laya.stage.width / 2 || this.isDown) return;
        }
        else {
            //如果按下时是左边屏幕位置或已经按下鼠标，则返回
            if (e.stageX < Laya.stage.width / 2 || this.isDown) return;
        }
        this.curTouchId = e.touchId;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMove);
        this.originPoint.x = e.stageX;
        this.originPoint.y = e.stageY;
        this.originRotate = this.owner.transform.rotationEuler.clone();
    }

    onMove(e) {
        //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
        if (this.curTouchId && e.touchId != this.curTouchId) return;

        let offsetX = (e.stageX - this.originPoint.x) * this._speed;
        let offsetY = (e.stageY - this.originPoint.y) * this._speed;

        let xRotate = this.originRotate.x - offsetY;
        let yRotate = this.originRotate.y - offsetX;

        this._tempV3.y = yRotate;
        //视角限制 仰视50°俯视70°
        if (xRotate >= 50) this._tempV3.x = 50;
        else if (xRotate <= -70) this._tempV3.x = -70;
        else this._tempV3.x = xRotate;
    }

    onMouseUp(e) {
        //如果不是上次的点击id，返回（避免多点抬起，以第一次按下id为准）
        if (e.touchId != this.curTouchId) return;

        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMove);
        this.originPoint.reset();
        this.curTouchId = null;
        this.originRotate = null;
        //this._tempV3.setValue(0, 0, 0);//复原位置
    }

    UpdateRotPos() {
        //更新旋转角度
        if (this._tempV3) {
            let transform = this.owner.transform;
            // Use Laya.Vector3.lerp to interpolate smoothly between rotations
            Laya.Vector3.lerp(transform.rotationEuler, this._tempV3, this._speed, transform.rotationEuler);
            transform.rotationEuler = transform.rotationEuler; // Ensure the rotation is applied
        }
        //更新相机位置
        if (this._tempV3) {
            var distance = 5.0;

            var rotationQuaternion = new Laya.Quaternion();
            Laya.Quaternion.createFromYawPitchRoll(this._tempV3.y * Math.PI / 180, this._tempV3.x * Math.PI / 180, this._tempV3.z * Math.PI / 180, rotationQuaternion);

            // 计算摄像机方向向量
            var direction = new Laya.Vector3();
            Laya.Vector3.transformQuat(new Laya.Vector3(0, 0, -1), rotationQuaternion, direction);

            // 计算摄像机位置
            var cameraPosition = new Laya.Vector3();
            Laya.Vector3.scale(direction, distance, direction);
            Laya.Vector3.subtract(this.target.transform.position, direction, cameraPosition);

            // 更新摄像机位置
            Laya.Vector3.lerp(this.owner.transform.position, cameraPosition, this._speed, this.out);
            this.owner.transform.position = this.out;
            //this.owner.transform.position = cameraPosition;
        }

    }
}
