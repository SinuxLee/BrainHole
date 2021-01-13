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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        var mainNode = this.node.getChildByName("main");
        mainNode.getChildByName("btn1").on(cc.Node.EventType.TOUCH_START, () => {
            mainNode.getChildByName("wire").active = false;
            mainNode.getChildByName("wire2").active = true;
            mainNode.getChildByName("redBall").active = false;
            mainNode.getChildByName("greenBall").active = true;
            mainNode.runAction(cc.moveTo(0.5, cc.v2(0, 0)));
        });

        mainNode.getChildByName("btn2").on(cc.Node.EventType.TOUCH_START, () => {
            if (mainNode.getChildByName("redBall").active == false) {
                mainNode.getChildByName("mask").getChildByName("picture").runAction(cc.sequence(cc.moveTo(1, cc.v2(0, 0)), cc.callFunc(() => {
                    this.onRight();
                })));
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
