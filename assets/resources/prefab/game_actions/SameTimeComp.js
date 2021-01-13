
cc.Class({
    extends: cc.Component,

    properties: {
        rightItem: {
            type: cc.Node,
            default: [],
        },

        faultItems: {
            type: cc.Node,
            default: [],
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        for (var i = 0; i < this.rightItem.length; i++) {
            this.rightItem[i].on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
            this.rightItem[i].on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
            this.rightItem[i].on(cc.Node.EventType.TOUCH_CANCEL, this.onMoveCancel.bind(this));
        }

        for (var i = 0; i < this.faultItems.length; i++) {
            this.faultItems[i].on(cc.Node.EventType.TOUCH_START, this.onFault.bind(this));
        }
    },

    start() {
        if (cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    onMoveStart:function(e){
        e.target.isTouch = true;
        for (var i = 0; i < this.rightItem.length; i++) {
            if(!this.rightItem[i].isTouch){
                return;
            }
        }
        this.onRight();
    },

    onMoveEnd:function(e){
        e.target.isTouch = null;
    },

    onMoveCancel:function(e){
        e.target.isTouch = null;
    },

    onRight: function () {
        var ani = this.node.getComponent("cc.Animation");
        if(ani){
            ani.play(this.node.name);
            ani.on("finished", ()=>{
                cc.nd.tips.showRight(this.node);
                setTimeout(()=>{
                    puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{ pointNum: this.node.name.replace("level_", "") }});
                }, 1500);
            });
        }else{
            cc.nd.tips.showRight(this.node);
            setTimeout(()=>{
                puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{ pointNum: this.node.name.replace("level_", "") }});
            }, 1500);
        }
    },

    onFault: function (e) {
        cc.nd.tips.showFault(e.target);
    },

    onDestroy: function () {

    }

    // update (dt) {},
});
