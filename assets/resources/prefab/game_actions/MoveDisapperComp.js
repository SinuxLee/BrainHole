// 移动消失

cc.Class({
    extends: cc.Component,

    properties: {
        rightItem: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.rightItem) {
            this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.rightItem.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
            this.rightItem.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
        }

        this.originPos = this.rightItem.getPosition();
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
        if(Math.abs(x - this.originPos.x) > 50 || Math.abs(y - this.originPos.y) > 50){
            event.target.runAction(cc.fadeOut(0.3));
            this.onRight(event);
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
