// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
//移动到指定位置
cc.Class({
    extends: cc.Component,

    properties: {
        moveItems: {
            type: cc.Node,
            default: [],
        },

        rightItem1: cc.Node,
        rightItem2: cc.Node,

        oktuang:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.rightItem1) {
            this.rightItem1.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.rightItem1.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
            this.rightItem1.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd1.bind(this));
        }

        if (this.rightItem2) {
            this.rightItem2.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.rightItem2.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
            this.rightItem2.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd2.bind(this));
        }

        this.originPos = [];
        for (var i = 0; i < this.moveItems.length; i++) {
            this.moveItems[i].on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.moveItems[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
            this.moveItems[i].on(cc.Node.EventType.TOUCH_END, this.onMoveEndBack.bind(this));
            this.moveItems[i].index = i;
            this.originPos.push(this.moveItems[i].getPosition());
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

    onMoveEndBack:function(event){
        var index = event.target.index;
        this.moveItems[index].x = this.originPos[index].x;
        this.moveItems[index].y = this.originPos[index].y;
    },

    onMoveEnd: function (event) {
        var x = event.target.x;
        var y = event.target.y;
        this.onMoveEndBack();
    },

    onMoveEnd1: function (event) {
        var x = event.target.x;
        var y = event.target.y;
        if(x > this.rightItem2.x - 170 && x < this.rightItem2.x - 150 && y > this.rightItem2.y - 8 && y < this.rightItem2.y + 8){
            this.rightItem1.runAction(cc.moveTo(0.2, this.rightItem2.x - 160, this.rightItem2.y));
            setTimeout(()=>{
                this.oktuang.active = true;
                this.oktuang.x = this.rightItem2.x - 60;
                this.oktuang.y = this.rightItem2.y + 40;
                this.oktuang.opacity = 0;
                this.oktuang.runAction(cc.fadeIn(0.2));
                this.onRight();
            }, 200);
        }
    },

     onMoveEnd2: function (event) {
        var x = event.target.x;
        var y = event.target.y;
        if(x > this.rightItem1.x + 150 && x < this.rightItem1.x + 170 && y > this.rightItem1.y - 8 && y < this.rightItem1.y + 8){
            this.rightItem2.runAction(cc.moveTo(0.2, this.rightItem1.x + 160, this.rightItem1.y));
            setTimeout(()=>{
                this.oktuang.active = true;
                this.oktuang.x = this.rightItem1.x + 60;
                this.oktuang.y = this.rightItem1.y + 40;
                this.oktuang.opacity = 0;
                this.oktuang.runAction(cc.fadeIn(0.1));
                this.onRight();
            }, 100);
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
