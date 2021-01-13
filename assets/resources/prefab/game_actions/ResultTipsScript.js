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
        rightNode: cc.Node,
        faultNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(cc.nd == null) {
            cc.nd={};
        }
        cc.nd.tips = this;
        this.node.active = false;

        this.maskBg = this.node.getChildByName("maskBg");

    },

    start () {

    },

    hideNode: function() {
        this.node.active = false;
    },

    showRight: function(node) {
        this.faultNode.active = false;
        this.rightNode.active = true;
        this.maskBg.active = true;
        this.node.active = true;
        this.changePos(node);
        var ani = this.rightNode.getComponent(cc.Animation);
        ani.stop();
        ani.play();

        utils.playSound("sound/oktips");
    },

    showFault: function(node) {
        this.rightNode.active = false;
        this.faultNode.active = true;
        this.node.active = true;
        this.maskBg.active = true;
        this.changePos(node);
        var ani = this.faultNode.getComponent(cc.Animation);
        ani.stop();
        ani.play();
        ani.on("finished", () => {
            this.maskBg.active = false;
        });

        utils.playSound("sound/errortips");
    },

    changePos: function(node) {
        var pos = node.parent.convertToWorldSpaceAR(node);
        pos = this.node.parent.convertToNodeSpaceAR(pos);
        this.node.x = pos.x;
        this.node.y = pos.y;
    }
    // update (dt) {},
});
