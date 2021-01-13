
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.match_move = this.node.getChildByName("brown-bg").getChildByName("match_move");
    },

    onRightBefore: function (cb) {
        var ani = this.match_move.getComponent("cc.Animation");
        ani.play("level36_move");
        ani.on("finished", () => {
            cb && cb();
        });
        
    },

    // update (dt) {},
});
