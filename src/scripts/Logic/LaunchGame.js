import ClientManager from "./ClientManager";

/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-04-23 10:20
*/
export default class LaunchGame extends Laya.Script {//挂载ClientManager.js到root

    constructor() {
        super();
    }

    onAwake() {
        this.owner.parent.addComponent(ClientManager)
    }
}