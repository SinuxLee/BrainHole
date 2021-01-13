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
        targetA: cc.Node,
        targetB: cc.Node,
        land: cc.Node,

        nearXDiffMin: 0,
        nearXDiffMax: 0,
        nearYDiffMin: 0,
        nearYDiffMax: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    checkOver: function () {
        if (this.targetA.x < this.land.x + this.land.width / 2
            && this.targetA.x > this.land.x - this.land.width / 2
            && this.targetA.y < this.land.y + this.land.height / 2
            && this.targetA.y > this.land.y - this.land.height / 2) {
                var diffx = Math.abs(this.targetA.x - this.targetB.x);
                var diffy = Math.abs(this.targetA.y - this.targetB.y);
                if(diffx >= this.nearXDiffMin && diffx <= this.nearXDiffMax
                    && diffy >= this.nearYDiffMin && diffy <= this.nearYDiffMax) {
                        this.onRight();
                        return;
                    }
            }
        
            this.onFault();
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(() => {
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: "ResultNode", initData: { pointNum: this.node.name.replace("level_", "") } });
        }, 1500);
    },

    onFault: function () {
        cc.nd.tips.showFault(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.RE_PLAY);
        }, 1000);
    },

    start() {
        if(cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    // update (dt) {},
});
