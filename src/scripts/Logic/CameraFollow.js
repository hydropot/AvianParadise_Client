/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-04-09 13:56
*/
// export default class CameraFollow extends Laya.Script {

//     constructor() {
//         super();
//         this.target=null;
//     }
//     Init(target){
//         this.target=target
//     }
//     onUpdate(){
//         if(this.target==null)return
//         this.owner.transform.localPositionX=this.target.transform.localPositionX-4.19
//         this.owner.transform.localPositionY=this.target.transform.localPositionY+2
//         this.owner.transform.localPositionZ=this.target.transform.localPositionZ-0.1
//     }
// }


export default class CameraFollow extends Laya.Script {

    constructor() {
        super();
        this.target = null;
        this.out = new Laya.Vector3();
        this.followSpeed = 10; // Define follow speed here
    }

    Init(target) {
        this.target = target;
    }

    onLateUpdate(){
        if (this.target == null) return;

        // Calculate target position
        let targetPos = new Laya.Vector3(this.target.transform.localPositionX - 4.19, 
                                          this.target.transform.localPositionY + 2, 
                                          this.target.transform.localPositionZ - 0.1);

        // Interpolate between current position and target position
        Laya.Vector3.lerp(this.owner.transform.position, targetPos, Laya.timer.delta / 1000 * this.followSpeed, this.out);

        // Update camera position
        this.owner.transform.position = this.out;
    }
}
