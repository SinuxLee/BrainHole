var BaseCmpt = require("BaseCmpt")
var TipsNodeMediator =require("TipsNodeMediator")
var leveltips_config = require("leveltips_config");

cc.Class({
    extends: BaseCmpt,
    mediatorName:TipsNodeMediator,
    properties: {

    },

    onLoad () {
        this._super();

        var framebg = this.node.getChildByName("framebg");

        var getkeyBtn = framebg.getChildByName("getkeyBtn");
        getkeyBtn.on('click', ()=>{
            utils.playSound("sound/btnclick");
            window.rewardVideo.showVideo(()=>{
                console.log("激励视频播放完成, 领取奖励");
                puremvc.Facade.sendNotification(appNotice.TOAST_SHOW,{content:"获得钥匙+1", type:0});
                puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, 1);
            });
        }, this);

        
        var closebtn = framebg.getChildByName("closebtn");
        closebtn.on('click', ()=>{
            this.hidePop("TipsNode");

            utils.playSound("sound/btnclick");
        }, this);

        this.tipsinfoLabel = framebg.getChildByName("tipsinfo").getComponent("cc.Label");

        this.tips = framebg.getChildByName("tips");
        this.key_1 = framebg.getChildByName("key_1");
        this.answer = framebg.getChildByName("answer");
    },

    /**
     * data:{pointNum:3, type:1}
    */
    initData:function(data){
        if(leveltips_config[data.pointNum]){
            this.tipsinfoLabel.string = leveltips_config[data.pointNum].answer;
        }else{
            this.tipsinfoLabel.string = "同九义，汝何秀";
        }

        if(data.type == 1){
            this.tips.active = true;
            this.key_1.active = true;
            this.answer.active = false;
        }else{
            this.tips.active = false;
            this.key_1.active = false;
            this.answer.active = true;
        }
    },


    onDestroy(){
        this._super();
        actionLib.backOut(this.node.getChildByName("content"));
    }
});
