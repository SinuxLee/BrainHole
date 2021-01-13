cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.magnifying = this.node.getChildByName("magnifying-glass");
        this.match = this.node.getChildByName("match");
        this.candle = this.node.getChildByName("candle");
        var sun = this.node.getChildByName("sun");
        sun.on(cc.Node.EventType.TOUCH_END, this.onFault.bind(this));


        this.magnifying.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
        this.magnifying.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));

        
        this.match.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
        this.match.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
            

        this.step = 0;
    },

    start() {
        if(cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    onMove: function (event) {
        if((this.step == 0 && event.target == this.magnifying) || (this.step == 1 && event.target == this.match)){
            var delta = event.touch.getDelta();
            event.target.x += delta.x;
            event.target.y += delta.y;
        }
        
    },

    onMoveEnd: function (event) { 
        if(this.step == 0 && event.target == this.magnifying){
            if(this.magnifying.x > this.match.x - 70 && this.magnifying.x < this.match.x - 20 && this.magnifying.y > this.match.y - 90 && this.magnifying.y < this.match.y - 50){
                this.magnifying.x = this.match.x - 42;
                this.magnifying.y = this.match.y - 68;
                this.match.getChildByName("fire").active = true;
                this.step = 1;

                this.magnifying.off(cc.Node.EventType.TOUCH_MOVE);
                this.magnifying.off(cc.Node.EventType.TOUCH_END);
            }
        }else if(this.step == 1 && event.target == this.match){
            if(this.match.x > this.candle.x + 30 && this.match.x < this.candle.x + 50 && this.match.y > this.candle.y + 80 && this.match.y < this.candle.y + 110){
                this.onRight();
                this.step == 2;
                this.match.off(cc.Node.EventType.TOUCH_MOVE);
                this.match.off(cc.Node.EventType.TOUCH_END);
            }
        }
    },

    onFault: function (e) {
        cc.nd.tips.showFault(e.target);
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.node.name.replace("level_","")}});
        }, 1500);
    },

    // update (dt) {},
});
