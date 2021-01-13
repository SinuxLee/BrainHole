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
        items: {
            type: cc.Node,
            default: [],
        },

        faultAniName: {
            type: cc.String,
            default: [],
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this));
        }

        this.playing = false;
        this.aniIndex = 0;


        if (cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    onClick: function (e) {
        if (this.playing) {
            return;
        }
        this.playing = true;
        var ani = this.node.getComponent(cc.Animation);
        ani.stop();

        if (e.target != this.items[this.aniIndex]) {
            ani.play(this.faultAniName[this.aniIndex]);
            ani.on("finished", () => {
                this.onFault();
            });
        } else {
            ani.play(this.node.name + "_" + this.aniIndex);
            ani.on("finished", () => {
                if (this.aniIndex == this.items.length - 1) {
                    this.onRight();
                } else {
                    this.aniIndex++;
                    this.playing = false;
                }
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
    // update (dt) {},
});
