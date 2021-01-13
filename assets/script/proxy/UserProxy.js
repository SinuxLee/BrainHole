var BaseProxy = require("BaseProxy");

cc.Class({
    extends: BaseProxy,

    properties:{

    },
    statics:{
        NAME:"USERPROXY"
    },

    onRegister(){
        
    },

    setKeyValue(key, value){
        cc.sys.localStorage.setItem(key, value);
    },

    getValueByKey(key){
       return cc.sys.localStorage.getItem(key);
    },

    removeKeyValue(key){
        cc.sys.localStorage.removeItem(key);
    },

    onRemove(){
        
    },
});
