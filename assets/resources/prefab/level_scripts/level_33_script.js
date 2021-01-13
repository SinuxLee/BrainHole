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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.rightItem) {
            this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onRight.bind(this));
        }
        for (var i = 0; i < this.faultItems.length; i++) {
            this.faultItems[i].on(cc.Node.EventType.TOUCH_START, this.onFault.bind(this));
        }

        this.questionnaire1 = this.node.getChildByName("questionnaire1");
        this.questionnaire1.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
        this.questionnaire1.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
        this.questionnaire1.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
    },

    start() {
        if (cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    onMoveStart: function (event) {
        event.target.moveStartX = event.target.x;
        event.target.moveStartY = event.target.y;
    },

    onMove: function (event) {
        var delta = event.touch.getDelta();
        this.questionnaire1.x += delta.x;
        this.questionnaire1.y += delta.y;
    },

    onMoveEnd: function (event) {
        var x = event.target.x;
        var y = event.target.y;
    },

    onRight: function (e) {
        var ok = e.target.getChildByName("ok");
        ok.active = true;
        setTimeout(()=>{
            cc.nd.tips.showRight(e.target);
            setTimeout(() => {
                puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: "ResultNode", initData: { pointNum: this.node.name.replace("level_", "") } });
            }, 1500);
        }, 500);
    },

    onFault: function (e) {
        var ok = e.target.getChildByName("ok");
        ok.active = true;
        setTimeout(()=>{
            ok.active = false;
            cc.nd.tips.showFault(e.target);
        }, 500);
    },

    onDestroy: function () {

    }

    // update (dt) {},
});
