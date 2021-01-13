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
        key: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.key.on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this));
        this.playing = false;
        var parentKey = this.node.parent.parent.getChildByName('topbg').getChildByName('keybg').getChildByName('keyicon');
        console.log(parentKey, parentKey.parent);
        var pos = parentKey.parent.convertToWorldSpaceAR(parentKey.position);
        pos = this.key.parent.convertToNodeSpaceAR(pos);
        console.log(pos);
        this.key.x = pos.x;
        this.key.y = pos.y;
    },

    onClick: function () {
        if (this.playing) {
            return;
        }
        this.playing = true;
        var ani = this.node.getComponent(cc.Animation);
        ani.stop();
        ani.play("level57");
        ani.on("finished", () => {
            this.onRight();
        });
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(() => {
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: "ResultNode", initData: { pointNum: this.node.name.replace("level_", "") } });
        }, 1500);
    },

    // update (dt) {},
});