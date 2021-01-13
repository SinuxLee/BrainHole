// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var C = require("SingleNumComp")
cc.Class({
    extends: C,

    properties: {
        over: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onRight: function () {
        this.over.active = true;
        setTimeout(()=>{cc.nd.tips.showRight(this.levelNode);
            setTimeout(()=>{
                puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.levelNode.name.replace("level_","")}});
            }, 1500);
        }, 2000);
        this.node.active = false;
    },
});
