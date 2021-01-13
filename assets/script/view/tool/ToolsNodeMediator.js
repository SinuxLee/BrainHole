var BaseMediator = require("BaseMediator")
cc.Class({
    extends:BaseMediator,
    properties: {
        _data:null,
    },

    didRegister(){
        

        
    },

    listNotificationInterests(){
        return [
         
        ];
    },

    handleNotification(notification){
        cc.log(notification);
        var data = notification.getBody();
        var view = this.viewComponent;
        var name = notification.getName();
        switch(name){
          
        }
    },
});
