cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.ground = this.node.getChildByName("ground");
        this.ground1 = this.node.getChildByName("ground1");
        this.ground2 = this.node.getChildByName("ground2");
        this.ground3 = this.node.getChildByName("ground3");
        this.ground4 = this.node.getChildByName("ground4");

        this.stone = this.node.getChildByName("stone");
        this.stone.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
        this.stone.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
        this.stone.on(cc.Node.EventType.TOUCH_CANCEL, this.onMoveCancel.bind(this));
        this.originPos = this.stone.getPosition();

        this.index = 0;

        var car1 = this.node.getChildByName("car1");
        car1.on(cc.Node.EventType.TOUCH_END, this.onMoveEndCar.bind(this));

        this.stoneOriginPosY = this.stone.getPosition().y;
    },


    onMove: function (event) {
        var delta = event.touch.getDelta();
        if(delta.y > 0){
            event.target.y += delta.y;
        }
    },

    onMoveCancel:function(event){
        if(event.target.y - this.stoneOriginPosY > 30){
            this.replaceGround();
        }
    },

    onMoveEnd: function (event) {
        if(event.target.y - this.stoneOriginPosY > 30){
            this.replaceGround();
        }
    },

    replaceGround:function(){
        this.index++;
    
        this.stone.stopAllActions();
        this.stone.runAction(cc.moveTo(0.2, this.originPos.x, this.originPos.y - this.index * 34));
        setTimeout(()=>{
            this.ground.active = false;
            this.ground1.active = false;
            this.ground2.active = false;
            this.ground3.active = false;
            this.ground4.active = false;
            if(this.index == 1){
                this.ground1.active = true;
            }else if(this.index == 2){
                this.ground2.active = true;
            }else if(this.index == 3){
                this.ground3.active = true;
            }else if(this.index == 4){
                this.ground4.active = true;
            }
        },200);

        if(this.index == 4){
            this.stone.off(cc.Node.EventType.TOUCH_MOVE);
            this.stone.off(cc.Node.EventType.TOUCH_END);
        }
    },

    onMoveEndCar:function(){
        var ani = this.node.getComponent("cc.Animation");
        ani.stop();
        if(this.index == 4){
            ani.play("level_88_1");
            ani.on("finished", () => {
                this.onRight();
            });
        }else{
            ani.play("level54_a");
            ani.on("finished", () => {
                this.onFault();
            });
        }
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.node.name.replace("level_","")}});
        }, 1500);
    },

    onFault: function () {
        cc.nd.tips.showFault(this.node);
        this.resetLoad();
    },

    resetLoad:function(){
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.RE_PLAY);
        }, 1000);
    }

    // update (dt) {},
});
