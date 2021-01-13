// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        numLabel: cc.Label,
        realValue: 0,
        levelNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.num = 0;

        this.isCanClick = true;
    },

    resetNum: function() {
        if(!this.isCanClick){
            return;
        }
        this.num = 0;
        this.updateLabel();
    },

    updateLabel: function() {
        this.numLabel.string = this.num+'';
    },

    addValue: function() {
        if(!this.isCanClick){
            return;
        }
        this.num++;
        this.updateLabel();
        utils.playSound("sound/btnclick");
    },

    decValue: function() {
        if(!this.isCanClick){
            return;
        }
        this.num--;
        this.updateLabel();
        utils.playSound("sound/btnclick");
    },

    start () {
        if(cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    onOk: function(){
        if(!this.isCanClick){
            return;
        }
        if(this.num == parseInt(this.realValue)) {
            this.onRight();
        } else {
            this.onFault();
        }
        utils.playSound("sound/btnclick");
    },

    onRight: function () {
        var ani = this.levelNode.getComponent("cc.Animation");
        if(ani){
            this.isCanClick = false;
            ani.play(this.levelNode.name);
            ani.on("finished", ()=>{
                this.isCanClick = true;
                cc.nd.tips.showRight(this.levelNode);
                setTimeout(()=>{
                    puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.levelNode.name.replace("level_","")}});
                }, 1000);
            })
        }else{
            cc.nd.tips.showRight(this.levelNode);
            setTimeout(()=>{
                puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.levelNode.name.replace("level_","")}});
            }, 1500);
        } 
    },

    onFault: function () {
        cc.nd.tips.showFault(this.levelNode);
    },

    // update (dt) {},
});
