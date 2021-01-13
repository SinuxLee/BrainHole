// 移动物品
cc.Class({
    extends: cc.Component,

    properties: {
        moveItem1: cc.Node,
        moveItem2: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (this.moveItem1) {
            this.moveItem1.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
            this.moveItem1.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
            this.originPos1 = this.moveItem1.getPosition();
        }

    },

    start() {
        if(cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    onMove: function (event) {
        var delta = event.touch.getDelta();
        event.target.x += delta.x;
        event.target.y += delta.y;
    },


    onMoveEnd: function (event) {
        if(Math.abs(this.moveItem1.x - this.moveItem2.x) <= 90 && this.moveItem1.y - this.moveItem2.y > 144 && this.moveItem1.y - this.moveItem2.y < 234){
            this.moveItem1.x = this.moveItem2.x;
            this.moveItem1.y = this.moveItem2.y + 188;
            
            var action = cc.moveTo(0.4, cc.v2(this.moveItem2.x, this.moveItem2.y + 188));
            var finish = cc.callFunc(()=>{
                this.onRight();
            });
            this.moveItem1.runAction(cc.sequence(action, finish));
        }else{
            // this.moveItem1.x = this.originPos1.x;
            // this.moveItem1.y = this.originPos1.y;
            this.moveItem1.runAction(cc.moveTo(0.2, this.originPos1));
        }
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum:this.node.name.replace("level_","")}});
        }, 1500);
    },


});
