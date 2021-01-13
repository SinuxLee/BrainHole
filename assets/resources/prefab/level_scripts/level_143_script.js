cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.qipan = this.node.getChildByName("qipan");

        this.qipan.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
            
        this.close1 = this.node.getChildByName("close1");
        this.yellowcircle = this.node.getChildByName("yellowcircle");

        this.yellowcircle.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
        this.yellowcircle.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd1.bind(this));
    },

    onMoveEnd1: function (event) { 
        if(this.yellowcircle.x > this.qipan.x - 255 && this.yellowcircle.x < this.qipan.x - 85 && this.yellowcircle.y > this.qipan.y + 80 && this.yellowcircle.y < this.qipan.y + 240){
            this.step = 1;
        }else if(this.yellowcircle.x > this.qipan.x + 85 && this.yellowcircle.x < this.qipan.x + 255 && this.yellowcircle.y > this.qipan.y + 80 && this.yellowcircle.y < this.qipan.y + 240){
            this.step = 2;
        }else if(this.yellowcircle.x > this.qipan.x - 85 && this.yellowcircle.x < this.qipan.x + 85 && this.yellowcircle.y > this.qipan.y - 80 && this.yellowcircle.y < this.qipan.y + 80){
            this.step = 3;
        }else if(this.yellowcircle.x > this.qipan.x - 85 && this.yellowcircle.x < this.qipan.x + 85 && this.yellowcircle.y > this.qipan.y - 240 && this.yellowcircle.y < this.qipan.y - 80){
            this.step = 4;
        }
        if(this.step){
            this.yellowcircle.off(cc.Node.EventType.TOUCH_MOVE);
            this.yellowcircle.off(cc.Node.EventType.TOUCH_END);
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
        var touchpos = this.qipan.convertToNodeSpace(event.touch._startPoint);
        var closePos = null;
        if(this.step != 1 && touchpos.x < 170 && touchpos.y > 320){
            var node = cc.instantiate(this.yellowcircle);
            this.node.addChild(node);
            node.x = this.qipan.x - 170;
            node.y = this.qipan.y + 160;
            
            closePos = {x:this.qipan.x, y:this.qipan.y - 160};

            this.qipan.off(cc.Node.EventType.TOUCH_END);

            if(this.step == 2){
                this.onRight();
                return;
            }
        }else if(this.step != 2 && touchpos.x > 340 && touchpos.y > 320){
            var node = cc.instantiate(this.yellowcircle);
            this.node.addChild(node);
            node.x = this.qipan.x + 170;
            node.y = this.qipan.y + 160;

            closePos = {x:this.qipan.x - 170, y:this.qipan.y + 160};
            this.qipan.off(cc.Node.EventType.TOUCH_END);

            if(this.step == 1){
                this.onRight();
                return;
            }
        }else if(this.step != 3 && touchpos.x > 170 && touchpos.x < 340 && touchpos.y > 160 && touchpos.y < 320){
            var node = cc.instantiate(this.yellowcircle);
            this.node.addChild(node);
            node.x = this.qipan.x;
            node.y = this.qipan.y;
            
            closePos = {x:this.qipan.x, y:this.qipan.y - 160};
            this.qipan.off(cc.Node.EventType.TOUCH_END);

            if(this.step == 4){
                this.onRight();
                return;
            }
        }else if(this.step != 4 && touchpos.x > 170 && touchpos.x < 340 && touchpos.y < 160){
            var node = cc.instantiate(this.yellowcircle);
            this.node.addChild(node);
            node.x = this.qipan.x;
            node.y = this.qipan.y - 160;
            
            closePos = {x:this.qipan.x - 170, y:this.qipan.y + 160};
            this.qipan.off(cc.Node.EventType.TOUCH_END);

            if(this.step == 3){
                this.onRight();
                return;
            }
        }

        if(closePos){
            setTimeout(()=>{
                var node = cc.instantiate(this.close1);
                this.node.addChild(node);
                node.x = closePos.x;
                node.y = closePos.y;
                this.onFault();
            }, 300); 
        }
    },

    onFault: function () {
        cc.nd.tips.showFault(this.node);

        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.RE_PLAY);
        }, 1000);
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.node.name.replace("level_","")}});
        }, 1500);
    },

    // update (dt) {},
});
