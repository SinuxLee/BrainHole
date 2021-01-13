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

        item: {
            type: cc.Node,
            default: [],
        },
        target: {
            type: cc.Node,
            default: [],
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        for (var i = 0; i < this.item.length; i++) {
            this.item[i].on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.item[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
            this.item[i].on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
        }
        // for (var i = 0; i < this.target.length; i++) {
        //     this.target[i].on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
        //     this.target[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
        //     this.target[i].on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
        // }
    },

    start: function() {
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

        var isFinish = true;
        for(var i = 0; i < this.target.length; i++) {
            if(!this.checkIn(this.target[i])) {
                isFinish = false;
                break;
            }
        }
        if(isFinish) {
            this.onRight();
        }
    },

    checkIn: function(target) {
        var result = false;
        for(var i = 0; i < this.item.length; i++) {
            var t = this.item[i];
            if(t.x > target.x - target.width / 2
                && t.x < target.x + target.width / 2
                && t.y < target.y + target.height / 2
                && t.y > target.y - target.height / 2) {
                    result = true;
                    break;
                }
        }
        return result;
    },

    onRight: function (e) {
        cc.nd.tips.showRight(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.node.name.replace("level_","")}});
        }, 1500);
    },

    // update (dt) {},
});
