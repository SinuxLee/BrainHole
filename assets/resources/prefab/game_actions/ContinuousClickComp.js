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
        targetItem: cc.Node,
        frames: {
            type: cc.SpriteFrame,
            default: [],
        },
        index: 0,
        finalType: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.targetItem.on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this));
    },

    onClick: function () {
        this.targetItem.getComponent(cc.Sprite).spriteFrame = this.frames[this.index];
        this.index++;
        if (this.index == this.frames.length) {
            if (this.finalType == 0) {
                this.onRight();
            } else {
                this.targetItem.active = false;
            }
        }
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(() => {
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: "ResultNode", initData: { pointNum: this.node.name.replace("level_", "") } });
        }, 1500);
    },

    start() {

    },

    // update (dt) {},
});
