// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var SingleInSingle = require("SingleInSingleComp");
cc.Class({
    extends: SingleInSingle,

    properties: {
        air: cc.Node,
    },

    onRight() {
        var ani = this.node.getComponent(cc.Animation);
        ani.play();
        utils.playSound("sound/lp");
    },

    // update (dt) {},
});
