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
        rightItem: cc.Node,
        faultItems: {
            type: cc.Node,
            default: [],
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.rightItem) {
            this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onRight.bind(this));
        }
        for (var i = 0; i < this.faultItems.length; i++) {
            this.faultItems[i].on(cc.Node.EventType.TOUCH_START, this.onFault.bind(this));
        }
    },

    start() {
        if (cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    onRight: function (e) {
        var ani = this.node.getComponent("cc.Animation");
        ani.play(this.node.name);
        ani.on("finished", ()=>{
            cc.nd.tips.showRight(this.node);
            setTimeout(() => {
                puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: "ResultNode", initData: { pointNum: this.node.name.replace("level_", "") } });
            }, 1000);
        })
    },

    onFault: function (e) {
        cc.nd.tips.showFault(e.target);
    },

    onDestroy: function () {

    }

    // update (dt) {},
});
