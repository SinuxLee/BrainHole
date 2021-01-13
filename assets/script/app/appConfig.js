var UserProxy = require('UserProxy');
var preDepends = {
    "prefab":["ToastNode"],
};
var depends = {
    "MainNode":["resDir_json"],
    "GameNodeGetRes":function(){
        var resArr = [];
        puremvc.Facade.retrieveProxy(UserProxy.NAME).sortCourseJson();
        var jsonData = puremvc.Facade.retrieveProxy(UserProxy.NAME).jsonData;
        for(var key in jsonData){
            var data = jsonData[key];
            if(data.bg){
                var bg = "image_bg/" + data.bg;
                if(resArr.indexOf(bg) == -1){
                    resArr.push(bg);
                }
                
            }
            if(data.pId){
                var person = "image_person/" + data.pId;
                if(resArr.indexOf(person) == -1){
                    resArr.push(person);
                }
                
            }
        }
        cc.log(resArr);
        return resArr;
    },
};
window.appConfig = {
    depends:depends,
    preDepends:preDepends,
};