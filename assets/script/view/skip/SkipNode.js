var BaseCmpt = require("BaseCmpt")
var SkipNodeMediator =require("SkipNodeMediator")

cc.Class({
    extends: BaseCmpt,
    mediatorName:SkipNodeMediator,
    properties: {

    },

    onLoad () {
        this._super();

        var framebg = this.node.getChildByName("framebg");

        var getkeyBtn = framebg.getChildByName("getkeyBtn");
        getkeyBtn.on('click', ()=>{
            window.rewardVideo.showVideo(()=>{
                console.log("激励视频播放完成, 领取奖励");
                puremvc.Facade.sendNotification(appNotice.TOAST_SHOW,{content:"获得钥匙+1", type:0});
                puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, 1);
            });

            utils.playSound("sound/btnclick");
        }, this);

        var skipBtn = framebg.getChildByName("skipBtn");
        skipBtn.on('click', ()=>{
            puremvc.Facade.sendNotification(appNotice.HIDE_POP, {name:"SkipNode"});

            var keyNum = cc.sys.localStorage.getItem("keyNum") || 0;
            if(keyNum >= 2){
                puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum:this.pointNum, type:2}});

                puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, -2);
            }else{
                puremvc.Facade.sendNotification(appNotice.TOAST_SHOW,{content: "钥匙不足两把" ,type : 0});
            }

            utils.playSound("sound/btnclick");
        }, this);

        
        var closebtn = framebg.getChildByName("closebtn");
        closebtn.on('click', ()=>{
            this.hidePop("SkipNode");

            utils.playSound("sound/btnclick");
        }, this);
    },

    initData(data){
        this.pointNum = data.pointNum;
    },

    onDestroy(){
        this._super();
        actionLib.backOut(this.node.getChildByName("content"));
    }
});
