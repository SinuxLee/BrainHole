var BaseMediator = require("BaseMediator");

cc.Class({
    extends:BaseMediator,
    properties: {
        middlePositionX : 0,
    },

    statics:{
        NAME:"MAINNODEMEDIATOR"
    },

    didRegister(){
       
        this.bind("KEY_ADD_BTN", (data)=>{
            this.facade.sendNotification(appNotice.SHOW_POP, {name:"ShopNode"});
            window.rewardVideo.dateMark(1012);
        }, this);

        this.bind("START_GAME_CLICK", (data)=>{
            var pointNum = Number(cc.sys.localStorage.getItem("pointNum") || 0) + 1;
            if(pointNum >= 167){
                puremvc.Facade.sendNotification(appNotice.TOAST_SHOW,{content:"恭喜完全通关,新关卡在开发中", type:0});
            }else{
                this.facade.sendNotification(appNotice.SHOW_NODE, {name:"PointNode", initData:pointNum});
            }
            window.rewardVideo.dateMark(1006);
        }, this);

        this.bind("SHOP_BTN_CLICK", (data)=>{
            this.facade.sendNotification(appNotice.SHOW_POP, {name:"ShopNode"});
            window.rewardVideo.dateMark(1010);
        }, this);

        this.bind("TASK_BTN_CLICK", (data)=>{
            this.facade.sendNotification(appNotice.SHOW_NODE, {name:"SignNode"});
            window.rewardVideo.dateMark(1009);
        }, this);

        this.bind("LEVEL_BTN_CLICK", (data)=>{
            this.facade.sendNotification(appNotice.SHOW_NODE, {name:"PointSelect"});
            window.rewardVideo.dateMark(1011);
        }, this);

        this.bind("GETKEY_BTN_CLICK", (data)=>{
            window.rewardVideo.showVideo(()=>{
                console.log("激励视频播放完成, 领取奖励");
                puremvc.Facade.sendNotification(appNotice.TOAST_SHOW,{content:"获得钥匙+1", type:0});
                this.viewComponent.changeKeyNum(1);
            });
            window.rewardVideo.dateMark(1008);
        }, this);

    },

    listNotificationInterests(){
        return [
            appNotice.KEY_CHANGE_EVENT,
            appNotice.KEY_REFRESH_EVENT,
        ];
    },

    handleNotification(notification){
        var data = notification.getBody();
        console.log("handleNotification data : " , notification.getName());
        var view = this.viewComponent;
        var name = notification.getName();
        
        switch(name){
            case appNotice.KEY_CHANGE_EVENT:{
                this.viewComponent.changeKeyNum(data);
            }
            case appNotice.KEY_REFRESH_EVENT:{
                this.viewComponent.refreshKeyNum();
            }
            break;
        }
    },

});
