
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.sincos_answer1 = this.node.getChildByName("sincos_answer1");
        this.sincos_answer2 = this.node.getChildByName("sincos_answer2");
        this.sincos_answer3 = this.node.getChildByName("sincos_answer3");

        this.NumInput = this.node.getChildByName("NumInput");
    },

    onRightBefore: function (cb) {
        this.NumInput.active = false;

        var dealy1 = cc.delayTime(0.4);
        var fadeIn1 = cc.fadeIn(0.3);
        this.sincos_answer1.active = true;
        this.sincos_answer1.opacity = 0;
        this.sincos_answer1.runAction(cc.sequence(dealy1, fadeIn1));

        var dealy2 = cc.delayTime(0.8);
        var fadeIn2 = cc.fadeIn(0.3);
        this.sincos_answer2.active = true;
        this.sincos_answer2.opacity = 0;
        this.sincos_answer2.runAction(cc.sequence(dealy2, fadeIn2));

        var dealy3 = cc.delayTime(1.2);
        var fadeIn3 = cc.fadeIn(0.3);
        var dealy4 = cc.delayTime(1);
        var callfunc = cc.callFunc(()=>{
            cb & cb();
        })
        this.sincos_answer3.active = true;
        this.sincos_answer3.opacity = 0;
        this.sincos_answer3.runAction(cc.sequence(dealy3, fadeIn3, dealy4, callfunc));
        
    },

    // update (dt) {},
});
