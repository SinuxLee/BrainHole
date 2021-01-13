
cc.Class({
    extends: cc.Component,

    properties: {
        item: cc.Node,
            
        aniNames: {
            type: cc.String,
            default: [],
        },

        cankaoItem:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        
        this.item.on(cc.Node.EventType.TOUCH_END, this.onClick.bind(this));
        this.item.index = 0;   //对应动画索引
       

        this.item.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
    },

    onMove: function (event) {
        var delta = event.touch.getDelta();
        event.target.x += delta.x;
        event.target.y += delta.y;
    },

    onClick: function (e) {
        if (this.playing) {
            return;
        }
        
        if(e.target.x > this.cankaoItem.x - this.cankaoItem.width/2 && e.target.x < this.cankaoItem.x + this.cankaoItem.width/2 && e.target.y > this.cankaoItem.y - this.cankaoItem.height/2 && e.target.y < this.cankaoItem.y + this.cankaoItem.height/2){
            this.onRight();
        }else{
            this.playing = true;
            var ani = this.node.getComponent("cc.Animation");
            ani.stop();

            ani.play(this.aniNames[e.target.index]);
            ani.on("finished", () => {
                this.playing = false;
                this.onFault();
            });
        }
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(() => {
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: "ResultNode", initData: { pointNum: this.node.name.replace("level_", "") } });
        }, 1500);
    },

    onFault: function (e) {
        cc.nd.tips.showFault(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.RE_PLAY);
        }, 1000);
    },
    
});
