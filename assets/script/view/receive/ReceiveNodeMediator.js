var BaseMediator = require("BaseMediator")
cc.Class({
    extends:BaseMediator,

    properties: {

    },

    didRegister(){
        
    },

    listNotificationInterests(){
        return [
            
        ];
    },

    initData:function(data){
        if(data){
            this.viewComponent.initData(data);
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
