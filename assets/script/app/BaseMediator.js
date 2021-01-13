cc.Class({
    extends:puremvc.Mediator,
    properties: {

    },


    onRegister(){
        this.event = [];

        this.didRegister();
    },

    onRemove(){
        cc.log(this.mediatorName + " onRemove");

         for(let i = 0; i < this.event.length; ++i) {
            let eventItem = this.event[i];
            this.viewComponent.getEvent().off(eventItem.event, eventItem.callback);
        }
    },

    //绑定logic的event
    bind(event, callback){
    	this.viewComponent.getEvent().on(event, callback.bind(this));
        // -- 将事件记录到队列，注销 mediator 时称除
        this.event.push({
            event: event,
            callback: callback,
        });
    },

    //绑定网络的event
    bindMsg(msgId, pbmessage, callback){
        if(msgId){
            puremvc.Facade.sendNotification(appNotice.SOCKET_RECV_S2C,{msgId:msgId, pbmessage:pbmessage, callback:callback});
        }
    },

    refreshData(){
        this.viewComponent.refreshData();
    },

    hideNode(){
        this.viewComponent.hideNode();
    },

    listNotificationInterests(){
        
    },

    handleNotification(notification){
        
    },

});
