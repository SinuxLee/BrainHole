
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.match1 = this.node.getChildByName("brown-bg").getChildByName("match1");
        this.match2 = this.node.getChildByName("brown-bg").getChildByName("match2");
    },

    onRightBefore: function (cb) {
        this.match1.getComponent("cc.Animation").play("");
        this.match2.getComponent("cc.Animation").play("");

        setTimeout(() => {
            cb && cb();
        }, 1500);
    },

    // update (dt) {},
});
