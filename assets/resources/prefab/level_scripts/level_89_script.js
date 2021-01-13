// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var SingleInSingleComp = require("SingleInSingleComp")
cc.Class({
    extends: SingleInSingleComp,

    properties: {
        clickBtn: cc.Node,
    },

    onLoad: function () {
        this._super();
        this.clickBtn.on(cc.Node.EventType.TOUCH_START, this.onStartRound.bind(this));
        this.playing = false;
    },

    onMoveEnd: function (event) {
        var x = event.target.x;
        var y = event.target.y;
    },

    onStartRound: function (event) {
        this.playing = true;
        var ani = this.node.getComponent(cc.Animation);
        ani.stop();
        ani.play();
        ani.on("finished", () => {
            var isFinish = true;
            for (var i = 0; i < this.target.length; i++) {
                if (!this.checkIn(this.target[i])) {
                    isFinish = false;
                    break;
                }
            }
            if (isFinish) {
                this.onRight();
            } else {
                this.onFault();
            }
        });

    },

    onFault: function () {
        cc.nd.tips.showFault(this.node);
    },

    // update (dt) {},
});
