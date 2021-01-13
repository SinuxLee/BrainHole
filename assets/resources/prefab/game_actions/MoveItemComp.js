// 移动物品
cc.Class({
    extends: cc.Component,

    properties: {
        moveItems: {
            type: cc.Node,
            default: [],
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        for (var i = 0; i < this.moveItems.length; i++) {
            this.moveItems[i].on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.moveItems[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
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
});
