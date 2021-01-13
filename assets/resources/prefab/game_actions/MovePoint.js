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
        rightItem: cc.Node,

        otherItems: {
            type: cc.Node,
            default: [],
        },

        cankaoItem:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.rightItem) {
            this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.rightItem.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
            this.rightItem.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
        }

        this.originPos = [];
        for (var i = 0; i < this.otherItems.length; i++) {
            this.otherItems[i].on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.otherItems[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
            this.otherItems[i].on(cc.Node.EventType.TOUCH_END, this.onMoveEndBack.bind(this));
            this.otherItems[i].index = i;
            this.originPos.push(this.otherItems[i].getPosition());
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
        this.otherItems[index].x = this.originPos[index].x;
        this.otherItems[index].y = this.originPos[index].y;
    },

    onMoveEnd: function (event) {
        var x = event.target.x;
        var y = event.target.y;
        if(x > this.cankaoItem.x - this.cankaoItem.width/2 && x < this.cankaoItem.x + this.cankaoItem.width/2 && y > this.cankaoItem.y - this.cankaoItem.height/2 && y < this.cankaoItem.y + this.cankaoItem.height/2){
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
