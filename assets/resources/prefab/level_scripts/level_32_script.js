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
        
        cankaoItem:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.rightItem) {
            this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.rightItem.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
            this.rightItem.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
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
        if(x > this.cankaoItem.x - 20 && x < this.cankaoItem.x + 20 && y > this.cankaoItem.y - 120 && y < this.cankaoItem.y){
            var action = cc.moveTo(0.1, cc.p(this.cankaoItem.x, this.cankaoItem.y - 100));
            var finish = cc.callFunc(()=>{
                this.onRight();
            });
            this.rightItem.runAction(cc.sequence(action, finish));
        }else{
            this.onFault(event);
        }
    },

    onRight: function (e) {
        cc.nd.tips.showRight(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.node.name.replace("level_","")}});
        }, 1500);
    },

    onFault: function (e) {
        cc.nd.tips.showFault(e.target);
    },

    // update (dt) {},
});
