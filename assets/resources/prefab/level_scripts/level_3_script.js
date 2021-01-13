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
        rightItem: cc.Node,
        faultItems: {
            type: cc.Node,
            default: [],
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        if (this.rightItem) {
            var ani = this.rightItem.getComponent(cc.Animation);
            ani.stop();
            ani.play();
        }
    },

    update(dt) {
        for (var i = 0; i < this.faultItems.length; i++) {
            var item = this.faultItems[i];
            if (item.move_direct == null) {
                item.move_direct = 'left';
                item.speed = Math.random() * 2;
            }
            var distance = 750 / 2;
            if (Math.abs(item.x) > distance - 50) {
                if (item.move_direct == 'left') {
                    item.move_direct = 'right';
                } else {
                    item.move_direct = 'left';
                }
            }
            if (item.move_direct == 'left') {
                item.scaleX = 1;
                item.x -= item.speed;
            } else {
                item.scaleX = -1;
                item.x += item.speed;
            }
        }
    },
});
