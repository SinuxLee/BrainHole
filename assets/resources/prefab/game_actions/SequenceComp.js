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

        sequenceItems: {
            type: cc.Node,
            default: [],
        },

        numAtlas: cc.SpriteAtlas,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.clickSeq = [];
        for (var i = 0; i < this.sequenceItems.length; i++) {
            this.sequenceItems[i].on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this));
        }
    },

    start() {
        if (cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    onClick: function (e) {
        utils.playSound("sound/btnclick");
        this.clickSeq.push(e.target);
        if (e.target.getChildByName("num")) {
            e.target.getChildByName("num").getComponent(cc.Sprite).spriteFrame = this.numAtlas.getSpriteFrame("num" + this.clickSeq.length);
        }
        if (this.clickSeq.length == this.sequenceItems.length) {
            if (this.checkResult()) {
                this.onRight();
            } else {
                this.onFault();
            }
        }
    },

    checkResult: function () {
        for (var i = 0; i < this.sequenceItems.length; i++) {
            if (this.clickSeq[i] != this.sequenceItems[i]) {
                return false;
            }
        }
        return true;
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(() => {
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: "ResultNode", initData: { pointNum: this.node.name.replace("level_", "") } });
        }, 1500);
    },

    onFault: function () {
        for (var i = 0; i < this.sequenceItems.length; i++) {
            if (this.sequenceItems[i].getChildByName("num")) {
                this.sequenceItems[i].getChildByName("num").getComponent(cc.Sprite).spriteFrame = null;
            }
        }
        this.clickSeq.splice(0, this.clickSeq.length);
        cc.nd.tips.showFault(this.node);

        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.RE_PLAY);
        }, 1000);
    },


    // update (dt) {},
});
