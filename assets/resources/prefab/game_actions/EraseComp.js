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
        target: {
            type: cc.Node,
            default: [],
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this));
        for(var i = 0; i < this.target.length ;i++) {
            this.target[i].hoverNum = 0;
            this.target[i].isTouching = false;
        }
    },

    start() {
        
    },

    onMove(e) {
        for(var i = 0; i < this.target.length ;i++) {
            if(!this.target[i].active) {
                continue;
            }
            if(this.target[i].getBoundingBoxToWorld().contains(e.getLocation())){
                this.target[i].isTouching = true;
            } else if(this.target[i].isTouching){
                this.target[i].hoverNum++;
                this.target[i].isTouching = false;
                this.target[i].opacity -= 51;
                if(this.target[i].opacity <= 10) {
                    this.target[i].active = false;
                    if(this.checkOver()) {
                        this.onRight();
                    }
                }
            }
        }
    },

    checkOver() {
        for(var i = 0; i < this.target.length ;i++) {
            if(this.target[i].active) {
                return false;;
            }
        }
        return true;
    },

    onRight: function (e) {
        cc.nd.tips.showRight(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.node.name.replace("level_","")}});
        }, 1500);
    },

    // update (dt) {},
});
