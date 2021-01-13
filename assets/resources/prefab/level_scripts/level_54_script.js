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
        car: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.car.on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this));
        this.playing = false;
        this.curAni = "level54_a";
    },

    onClick: function () {
        if (this.playing) {
            return;
        }
        this.playing = true;
        var ani = this.node.getComponent(cc.Animation);
        ani.stop();
        ani.play(this.curAni);
        ani.on("finished", () => {
            if ("level54_b" == this.curAni) {
                this.onRight();
            } else {
                this.curAni = "level54_b";
                this.playing = false;
            }
        });
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(() => {
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: "ResultNode", initData: { pointNum: this.node.name.replace("level_", "") } });
        }, 1500);
    },

    // update (dt) {},
});
