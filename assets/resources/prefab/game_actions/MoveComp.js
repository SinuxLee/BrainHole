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
        leftSuccessLimit: 0,
        rightSuccessLimit: 0,
        topSuccessLimit: 0,
        bottomSuccessLimit: 0,

        otherItems: {
            type: cc.Node,
            default: [],
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.rightItem) {
            this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.rightItem.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
            this.rightItem.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
        }

        for (var i = 0; i < this.otherItems.length; i++) {
            this.otherItems[i].on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.otherItems[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
        }
    },

    start() {
        if(cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    onMoveStart: function (event) {
        event.target.moveStartX = event.target.x;
        event.target.moveStartY = event.target.y;
    },

    onMove: function (event) {
        var startPos = event.getStartLocation();
        var newPos = event.getLocation();
        // newPos = event.target.parent.convertToNodeSpaceAR(newPos);
        event.target.x = event.target.moveStartX + newPos.x - startPos.x;
        event.target.y = event.target.moveStartY + newPos.y - startPos.y;


    },

    onMoveEnd: function (event) {
        var x = event.target.x;
        var y = event.target.y;
        if ((this.leftSuccessLimit != 0 && x < this.leftSuccessLimit)
            || (this.rightSuccessLimit != 0 && x > this.rightSuccessLimit)
            || (this.bottomSuccessLimit != 0 && y < this.bottomSuccessLimit)
            || (this.topSuccessLimit != 0 && y > this.topSuccessLimit)) {
            this.onRight();
        }
    },

    onRight: function (e) {
        cc.nd.tips.showRight(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.node.name.replace("level_","")}});
        }, 1500);
    },

    // update (dt) {},
});
