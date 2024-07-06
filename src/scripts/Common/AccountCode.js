/**
*
* @ author:cmd
* @ wechat:codercmd@qq.com
* @ data: 2024-03-20 12:56
*/
export default class AccountCode extends Laya.Script {

    constructor() {
        super();
    }
}

AccountCode.Regist_CREQ="Regist_CREQ"//客户端C请求request
AccountCode.Regist_Fail="Regist_Fail"//注册失败
AccountCode.Regist_Success="Regist_Success"//注册成功

AccountCode.Login_CREQ="Login_CREQ"//注册请求
AccountCode.Login_Fail="Login_Fail"//注册失败
AccountCode.Login_Success="Login_Success"//注册成功

AccountCode.ChangeSpecies_CREQ="ChangeSpecies_CREQ"
AccountCode.ChangeSpecies_SRES="ChangeSpecies_SRES"