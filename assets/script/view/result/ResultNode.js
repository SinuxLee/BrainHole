var BaseCmpt = require("BaseCmpt")
var ResultNodeMediator = require("ResultNodeMediator")
var leveltips_config = require("leveltips_config");

cc.Class({
    extends: BaseCmpt,
    mediatorName:ResultNodeMediator,
    properties: {

    },

    onLoad () {
        this._super();

        this.continuePass = 0;

        var framebg = this.node.getChildByName("framebg");

        this.nameLabel = framebg.getChildByName("infobg").getChildByName("name").getComponent("cc.Label");

        this.finishTag = framebg.getChildByName("finishTag");

        this.levelnumLabel = framebg.getChildByName("levelnum").getComponent("cc.Label");

        var replayBtn = framebg.getChildByName("replayBtn");
        replayBtn.on('click', ()=>{
            puremvc.Facade.sendNotification(appNotice.HIDE_POP, {name:"ResultNode"});
            puremvc.Facade.sendNotification(appNotice.RE_PLAY);

            utils.playSound("sound/btnclick");
        }, this);

        
        var taskBtn = framebg.getChildByName("taskBtn");
        taskBtn.on('click', ()=>{
            this.dispatchEvent("TASK_BTN_CLICK");

            utils.playSound("sound/btnclick");
        }, this);

        var storeBtn = framebg.getChildByName("storeBtn");
        storeBtn.on('click', ()=>{
            puremvc.Facade.sendNotification(appNotice.HIDE_POP, {name:"ResultNode"});
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ShopNode", initData:{className:"ResultNode", pointNum:Number(this.levelnumLabel.string)}});

            utils.playSound("sound/btnclick");
        }, this);

        var collectkeyBtn = framebg.getChildByName("collectkeyBtn");
        collectkeyBtn.on('click', ()=>{
            this.dispatchEvent("COLLECTKEY_BTN_CLICK");

            utils.playSound("sound/btnclick");
        }, this);

        this.watchvedioBtn = framebg.getChildByName("watchvedioBtn");
        this.watchvedioBtn.on('click', ()=>{
            this.dispatchEvent("WATCHVEDIO_BTN_CLICK");

            utils.playSound("sound/btnclick");
        }, this);

        this.nextlevelBtn = framebg.getChildByName("nextlevelBtn");
        this.nextlevelBtn.on('click', ()=>{
            var pointNum = Number(this.levelnumLabel.string) + 1;
            puremvc.Facade.sendNotification(appNotice.HIDE_POP, {name:"ResultNode"});
            puremvc.Facade.sendNotification(appNotice.PLAY_NEXT_LEVEL, pointNum);

            utils.playSound("sound/btnclick");

            //每过6关或每过5关
            if(this.continuePass % 6 == 0){
                puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"GiftNode", initData:{}});
            }else if(this.continuePass % 5 == 0){
                window.rewardVideo.showSplash();
            }
        }, this);

        this.pos1 = this.watchvedioBtn.getPosition();
        this.pos2 = this.nextlevelBtn.getPosition();

        this.tipsinfoLabel = framebg.getChildByName("tipsinfo").getComponent("cc.Label");

        this.light = this.node.getChildByName("light");
    },

    setLevelNum:function(num){
        this.levelnumLabel.string = num;

        if(leveltips_config[num]){
            this.tipsinfoLabel.string = leveltips_config[num].tips;
        }else{
            this.tipsinfoLabel.string = "同九义，汝何秀";
        }
    },

    onEnable(){
        utils.pauseMusic();
        utils.playSound("sound/result_success");
    },

    onDisable() {
        utils.resumeMusic();
        utils.stopEffect();
    },

    /**
     * data:{pointNum:3}
    */
    initData:function(data){
        if(data){
            this.light.getComponent("cc.Animation").play("light");
            
            this.setLevelNum(data);

            var pointNum = Number(cc.sys.localStorage.getItem("pointNum") || 0);
            if(pointNum < data){
                cc.sys.localStorage.setItem("pointNum", data);
            }

            this.finishTag.getComponent("cc.Animation").play("complete");
            
            utils.playSound("sound/complete");

            //每过6关或每过5关
            this.continuePass = (this.continuePass || 0) + 1;

            if(this.continuePass % 5 == 0){
                this.watchvedioBtn.x = this.pos2.x;
                this.nextlevelBtn.x = this.pos1.x;
            }else{
                this.watchvedioBtn.x = this.pos1.x;
                this.nextlevelBtn.x = this.pos2.x;
            }
        }
    },

    onDestroy(){
        this._super();
        actionLib.backOut(this.node.getChildByName("content"));
    }
});
