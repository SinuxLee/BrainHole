var BaseCmpt = require("BaseCmpt")
var SignNodeMediator =require("SignNodeMediator")

cc.Class({
    extends: BaseCmpt,
    mediatorName:SignNodeMediator,
    properties: {

    },

    onLoad () {
        this._super();

        var topbg = this.node.getChildByName("topbg");

        this.ljqdnumLabel = topbg.getChildByName("ljqdnum").getComponent("cc.Label");
        
        this.keynumLabel = topbg.getChildByName("keybg").getChildByName("keynum").getComponent("cc.Label");
        var keyNum = cc.sys.localStorage.getItem("keyNum") || 0;
        this.keynumLabel.string = keyNum;

        this.keyicon = topbg.getChildByName("keybg").getChildByName("keyicon");
        var keyaddbtn = topbg.getChildByName("keybg").getChildByName("keyaddbtn");
        keyaddbtn.on('click', ()=>{
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ShopNode"});
            utils.playSound("sound/btnclick");
            window.rewardVideo.dateMark(1012);
        }, this);
        
        var closebtn = topbg.getChildByName("closebtn");
        closebtn.on('click', ()=>{
            this.hideNode("SignNode");

            utils.playSound("sound/btnclick");
        }, this);

        this.daysnode = this.node.getChildByName("daysnode");  


        var tasknode = this.node.getChildByName("tasknode");
        //1.签到
        this.qd_getbtn = tasknode.getChildByName("taskitem1").getChildByName("getbtn");
        this.qd_getbtn.on('click', ()=>{
            this.qd_getbtn.active = false;
            this.qd_gotbtn.active = true;
            cc.sys.localStorage.setItem("signDay", this.currentDay + "," + Math.floor(Date.now()));
            this.daysnode.children[this.currentDay - 1].getChildByName("ok").active = true;

            this.ljqdnumLabel.string = "已累计签到" + this.currentDay + "天";
            
            let srcPos = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2);
            let targetPos = this.keyicon.convertToWorldSpaceAR(cc.v2(0,0));

            utils.flyMoney(srcPos, targetPos, ()=>{
                this.keynumLabel.string = Number(this.keynumLabel.string) + 1;

                utils.playSound("sound/lqkey");

                puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, 1);
            })
        }, this);
        this.qd_gotbtn = tasknode.getChildByName("taskitem1").getChildByName("gotbtn");
        //2.通关
        this.tg_tagLabel = tasknode.getChildByName("taskitem2").getChildByName("label").getComponent("cc.Label");
        this.tg_getbtn = tasknode.getChildByName("taskitem2").getChildByName("getbtn");
        this.tg_getbtn.on('click', ()=>{
            this.tg_getbtn.active = false;
            this.tg_gotbtn.active = true;

            cc.sys.localStorage.setItem("taskPointNum", this.taskPointNum);
            
            let srcPos = cc.v2(cc.winSize.width / 2, cc.winSize.height / 2);
            let targetPos = this.keyicon.convertToWorldSpaceAR(cc.v2(0,0));

            utils.playSound("sound/lqkey");

            utils.flyMoney(srcPos, targetPos, ()=>{
                this.keynumLabel.string = Number(this.keynumLabel.string) + 1;
                puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, 1);

                this.setTgState();
            })
        }, this);
        this.tg_gotbtn = tasknode.getChildByName("taskitem2").getChildByName("gotbtn");
        this.tglabel = tasknode.getChildByName("taskitem2").getChildByName("tglabel").getComponent("cc.Label");
        //3.vedio
        this.vedio_getbtn = tasknode.getChildByName("taskitem3").getChildByName("getbtn");
        this.vedio_getbtn.on('click', ()=>{
            window.rewardVideo.showVideo(()=>{
                console.log("激励视频播放完成, 领取奖励");
                puremvc.Facade.sendNotification(appNotice.TOAST_SHOW,{content:"获得钥匙+1", type:0});
                puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, 1);

                this.currentVedioNum += 1;
                cc.sys.localStorage.setItem("tastVedio", this.currentVedioNum + "," + Math.floor(Date.now()));

                this.targetnumLabel.string = this.currentVedioNum + "/5";
                if(this.currentVedioNum >= 5){
                    this.vedio_getbtn.active = false;
                    this.vedio_gotbtn.active = true;
                    this.targetnumLabel.node.active = false;
                }

            });

            utils.playSound("sound/btnclick");
        }, this);
        this.vedio_gotbtn = tasknode.getChildByName("taskitem3").getChildByName("gotbtn");
        this.targetnumLabel = tasknode.getChildByName("taskitem3").getChildByName("targetnum").getComponent("cc.Label");
    },

    start(){
        this.refreshData();
    },

    setSignState(){
        var signDay = cc.sys.localStorage.getItem("signDay") || "0,0";
        var signDayNum = signDay.split(",");
        this.currentDay = Number(signDayNum[0]);

        this.ljqdnumLabel.string = "已累计签到" + this.currentDay + "天";

        if(this.currentDay > 7){
            this.currentDay = 0;
            signDayNum[1] = 0;
        }
        for(var i = 0; i < this.daysnode.children.length; ++i){
            if(i < this.currentDay){
                this.daysnode.children[i].getChildByName("ok").active = true;
            }else{
                this.daysnode.children[i].getChildByName("ok").active = false;
            }
        }

        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        if(signDayNum[1] < today){
            this.currentDay += 1;
            this.qd_getbtn.active = true;
            this.qd_gotbtn.active = false;
        }else{
            this.qd_getbtn.active = false;
            this.qd_gotbtn.active = true;
        }
    },

    setTgState(){
        var tgLevels = [10, 50, 100, 144, 160];
        var taskPointNum = cc.sys.localStorage.getItem("taskPointNum") || 1;  //已通关领取奖励的关卡数
        this.taskPointNum = 200;
        for(var i = 0; i < tgLevels.length; ++i){
            if(taskPointNum < tgLevels[i]){
                this.tg_tagLabel.string = "通关达到" + tgLevels[i] + "关";
                this.taskPointNum = tgLevels[i];
                break;
            }
        }

        var pointNum = cc.sys.localStorage.getItem("pointNum") || 1;
        this.tglabel.string = "1把钥匙(已通关第" + pointNum + ")";
        if(pointNum >= this.taskPointNum){
            this.tg_getbtn.active = true;
            this.tg_gotbtn.active = false;
        }else{
            this.tg_getbtn.active = false;
            this.tg_gotbtn.active = true;
        }
    },

    setVedioState(){
        var tastVedio = cc.sys.localStorage.getItem("tastVedio") || "0,0";
        var tastVedioNum = tastVedio.split(",");
        this.currentVedioNum = Number(tastVedioNum[0]);

        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        var time = Number(tastVedioNum[1] - today)
        if(time < 0){
            this.currentVedioNum = 0;
            this.targetnumLabel.string = 0 + "/5";
        }else{
            this.targetnumLabel.string = this.currentVedioNum + "/5";
        }
        this.vedio_getbtn.active = true;
        this.vedio_gotbtn.active = false;
        this.targetnumLabel.node.active = true;
        if(this.currentVedioNum >= 5){
            this.vedio_getbtn.active = false;
            this.vedio_gotbtn.active = true;
            this.targetnumLabel.node.active = false;
        }
    },

    refreshData(){
        var keyNum = cc.sys.localStorage.getItem("keyNum") || 0;
        this.keynumLabel.string = keyNum;

        this.setSignState()
        this.setTgState();
        this.setVedioState();
    },

    onDestroy(){
        this._super();
    }
});
