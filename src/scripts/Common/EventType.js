/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-03-20 11:10
*/
export default class EventType extends Laya.Script {

    constructor() {
        super();
    }
}

EventType.ShowRigistPanel="ShowRigistPanel"
EventType.ShowLoginPanel="ShowLoginPanel"
EventType.SendMsg="SendMsg"//操作码，子操作码

EventType.ShowSpecies_Bird="ShowSpecies_Bird"

EventType.Match_Succ="Match_Succ"
EventType.Match_OtherEnter="Match_OtherEnter"
EventType.Match_Leave_Self="Match_Leave_Self"
EventType.Match_Leave_Other="Match_Leave_Other"

EventType.InitPos="InitPos"
EventType.UpdatePos="UpdatePos"

EventType.UpdateFly="UpdateFly"
EventType.UpdateMotion="UpdateMotion"

EventType.ReceiveChatMsg="ReceiveChatMsg"



//EventType.Fly="Fly"