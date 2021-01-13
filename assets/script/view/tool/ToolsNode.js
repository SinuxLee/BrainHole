var BaseCmpt = require("BaseCmpt")
var ToolsNodeMediator = require("ToolsNodeMediator");
cc.Class({
    extends: BaseCmpt,
    mediatorName:ToolsNodeMediator,
    properties: {

    },
    
    start(){
        var versionNum = this.node.getChildByName("bg").getChildByName("versionNum");;
        versionNum.getComponent("cc.Label").string = window.Version || "dev";

        var closebtn = this.node.getChildByName("bg").getChildByName("closebtn");
        closebtn.on('click', ()=>{
            puremvc.Facade.sendNotification(appNotice.HIDE_NODE,{name:"ToolsNode"});
        }, this);

        var addKeyBtn = this.node.getChildByName("bg").getChildByName("addKeyBtn");;
        addKeyBtn.on('click', ()=>{
            var num = this.node.getChildByName("bg").getChildByName("keynum").getComponent("cc.EditBox").string;
            num = Number(num) || 1;
            cc.sys.localStorage.setItem('keyNum', num);
            puremvc.Facade.sendNotification(appNotice.KEY_REFRESH_EVENT);
        }, this);

        var skipBtn = this.node.getChildByName("bg").getChildByName("skipBtn");;
        skipBtn.on('click', ()=>{
            var num = this.node.getChildByName("bg").getChildByName("pointnum").getComponent("cc.EditBox").string;
            num = Number(num) || 1;
            if(num && num > 0 && num < 168){
                cc.sys.localStorage.setItem('pointNum', num);
            }
        }, this);
    },
});

