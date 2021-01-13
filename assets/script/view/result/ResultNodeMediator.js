var BaseMediator = require("BaseMediator")
cc.Class({
    extends:BaseMediator,

    properties: {

    },

    didRegister(){
        this.bind("TASK_BTN_CLICK", (data)=>{
            this.facade.sendNotification(appNotice.HIDE_POP, {name:"ResultNode"});
            this.facade.sendNotification(appNotice.SHOW_NODE, {name:"SignNode"});
        }, this);


        this.bind("COLLECTKEY_BTN_CLICK", (data)=>{
            window.rewardVideo.showVideo(()=>{
                console.log("激励视频播放完成, 领取奖励");
                puremvc.Facade.sendNotification(appNotice.TOAST_SHOW,{content:"获得钥匙+1", type:0});
                puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, 1);
            });
        }, this);

        this.bind("WATCHVEDIO_BTN_CLICK", (data)=>{
            window.rewardVideo.showVideo(()=>{
                console.log("激励视频播放完成, 领取奖励");
                puremvc.Facade.sendNotification(appNotice.TOAST_SHOW,{content:"获得钥匙+1", type:0});
                puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, 1);
            });
        }, this);  
    },

    listNotificationInterests(){
        return [
            
        ];
    },

    /**
     *data:{pointNum:3}
    */
    initData:function(data){
        if(data){
            this.viewComponent.initData(data.pointNum);
        }
    },

    handleNotification(notification){
        var data = notification.getBody();
        var view = this.viewComponent;
        var name = notification.getName();
        console.log("handleNotification data : " + name + ":" + JSON.stringify(data));
        switch(name){
            
        }
    },

});
