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
        touchA: cc.Node,
        touchB: cc.Node,
        lightA: cc.Node,
        lightB: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.lightA.active = true;
        this.lightB.active = false;
        this.touchA.on(cc.Node.EventType.TOUCH_START, this.onTouch.bind(this));
        this.touchA.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
        this.touchB.on(cc.Node.EventType.TOUCH_START, this.onTouch.bind(this));
        this.touchB.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this));
    },

    onTouch: function (e) {
        e.target.isOpen = true;

        if (this.touchA.isOpen && this.touchB.isOpen) {
            this.lightA.active = false;
            this.lightB.active = true;
            cc.nd.tips.showRight(this.node);
            setTimeout(() => {
                puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: "ResultNode", initData: { pointNum: this.node.name.replace("level_", "") } });
            }, 1500);
        }
    },

    onTouchEnd: function (e) {
        e.target.isOpen = false;
    }
    // update (dt) {},
});
