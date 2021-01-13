var BaseCmpt = require("BaseCmpt")
var MainNodeMediator = require("MainNodeMediator");

cc.Class({
    extends: BaseCmpt,
    //mediator名字定义
    mediatorName: MainNodeMediator,

    properties: {

    },

    onLoad() {
        this._super();

        var keyaddbtn = this.node.getChildByName("keybg").getChildByName("keyaddbtn");
        keyaddbtn.on("click", ()=>{
            this.dispatchEvent("KEY_ADD_BTN");
            utils.playSound("sound/btnclick");
        });

        this.keynumLabel = this.node.getChildByName("keybg").getChildByName("keynum").getComponent("cc.Label");

        //开始游戏
        var startbtn = this.node.getChildByName("startbtn");
        startbtn.on("click", ()=>{
            this.dispatchEvent("START_GAME_CLICK");
            utils.playSound("sound/btnclick");
        });

        var shopbtn = this.node.getChildByName("shopbtn");
        shopbtn.on("click", ()=>{
            this.dispatchEvent("SHOP_BTN_CLICK");
            utils.playSound("sound/btnclick");
        });
        var taskbtn = this.node.getChildByName("taskbtn");
        taskbtn.on("click", ()=>{
            this.dispatchEvent("TASK_BTN_CLICK");
            utils.playSound("sound/btnclick");
        });
        var levelbtn = this.node.getChildByName("levelbtn");
        levelbtn.on("click", ()=>{
            this.dispatchEvent("LEVEL_BTN_CLICK");
            utils.playSound("sound/btnclick");
        });
        var getkeybtn = this.node.getChildByName("getkeybtn");
        getkeybtn.on("click", ()=>{
            this.dispatchEvent("GETKEY_BTN_CLICK");
            utils.playSound("sound/btnclick");
        }); 

        var keyNum = cc.sys.localStorage.getItem("keyNum") || 0;
        this.keynumLabel.string = keyNum;
    },

    start() {
        cc.log("MainNode load success");
        window.rewardVideo.dateMark(1005);
    },

    onEnable(){
       utils.playMusic("sound/bj");
    },

    onDisable() {
        utils.stopMusic();
    },

    changeKeyNum(num){
        this.keynumLabel.string = Number(this.keynumLabel.string) + num;
        cc.sys.localStorage.setItem("keyNum", this.keynumLabel.string);
    },

    refreshKeyNum(){
        var keyNum = cc.sys.localStorage.getItem("keyNum") || 0;
        this.keynumLabel.string = keyNum;
    },

    onToolPanel(){
        puremvc.Facade.sendNotification(appNotice.SHOW_NODE, {name:"ToolsNode"});
    },

    onDestroy() {
        this._super();
    }
});

