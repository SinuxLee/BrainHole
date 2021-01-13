var UserProxy = require("UserProxy");
cc.Class({
    extends: puremvc.SimpleCommand,

    properties: {
        
    },

    statics:{
        register(){
            puremvc.Facade.registerCommand(appNotice.CMD_LOGIN, this);
            puremvc.Facade.registerCommand(appNotice.SHARE_WX, this);
            puremvc.Facade.registerCommand(appNotice.REQUEST_INIT, this);
            puremvc.Facade.registerCommand(appNotice.RECEIVE_COIN, this);
            puremvc.Facade.registerCommand(appNotice.WEALTH_RECEVIE, this);
            puremvc.Facade.registerCommand(appNotice.SIGN_RECEVIE, this);
            puremvc.Facade.registerCommand(appNotice.UPGRADE_RECEVIE, this);
            puremvc.Facade.registerCommand(appNotice.REQUEST_TASK_INFO, this);
            puremvc.Facade.registerCommand(appNotice.REQUEST_TASK_STATE, this);
            puremvc.Facade.registerCommand(appNotice.REQUEST_EXCHANGE_INFO, this);
            puremvc.Facade.registerCommand(appNotice.REQUEST_DATA, this);
        },
    },

    execute(notification){     
        var data = notification.getBody();
        var name = notification.getName();
        var proxy = this.facade.retrieveProxy(UserProxy.NAME);
        switch(name){
            case appNotice.CMD_LOGIN:{
                proxy.requestLogin(data);
            }break;
            case appNotice.SHARE_WX:{
                proxy.requestShare2WX(data);
            }break;
            case appNotice.REQUEST_INIT:{
                proxy.requestInitData(data);
            }break;
            case appNotice.RECEIVE_COIN:{
                console.log("USERCommand RECEIVE_TOTAL_COIN");
                proxy.receiveCoin();
            }break;
            case appNotice.WEALTH_RECEVIE:{
                proxy.requestWealthRecevie();
            }break;
            case appNotice.SIGN_RECEVIE:{
                proxy.requestSignRecevie(data);
            }break;
            case appNotice.UPGRADE_RECEVIE:{
                proxy.requestUpgradeRecevie(data);
            }break;
            case appNotice.REQUEST_TASK_INFO:{
                proxy.requestTaskInfo(data);
            }break;
            case appNotice.REQUEST_TASK_STATE:{
                proxy.requestTaskState(data);
            }break;
            case appNotice.REQUEST_EXCHANGE_INFO:{
                proxy.requestExchangeInfo();
            }break;
            case appNotice.REQUEST_DATA:{
                proxy.requestData();
            }break;


        } 
    }
});