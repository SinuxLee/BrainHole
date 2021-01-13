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
        var keys = this.node.getChildByName("keys");
        for(var i = 0; i < keys.children.length; i++) {
            if(keys.children[i].name != 'ok' && keys.children[i].name !='clear') {
                keys.children[i].on(cc.Node.EventType.TOUCH_START, this.onInput.bind(this));
            }
        }
    },

    resetNum: function() {
        this.num = 0;
        this.updateLabel();
    },

    updateLabel: function() {
        this.numLabel.string = this.num+'';
    },

    onInput:function(e) {
        utils.playSound("sound/btnclick");
        if(this.num < 100000){
            this.num = this.num * 10 + parseInt(e.target.name);
            this.updateLabel();
        }
    },

    start() {
        if(cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    onOk: function(){
        if(this.num == parseInt(this.realValue)) {
            this.onRight();
        } else {
            this.onFault();
        }
    },

    onRight: function () {
        cc.nd.tips.showRight(this.levelNode);

        var levelScript = this.levelNode.getComponent(this.levelNode.name + "_script");
        if(levelScript && levelScript.onRightBefore){
            levelScript.onRightBefore(()=>{
                setTimeout(()=>{
                    puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.levelNode.name.replace("level_","")}});
                }, 1000);
            })
        }else{
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
