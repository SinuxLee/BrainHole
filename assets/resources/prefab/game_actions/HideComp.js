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
        hideNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, ()=>{
            this.hideNode.active = false;
        });
        this.node.on(cc.Node.EventType.TOUCH_END, ()=>{
            this.hideNode.active = true;
            this.hideNode.opacity = 0;
            this.hideNode.runAction(cc.fadeIn(1));
        });
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, ()=>{
            this.hideNode.active = true;
            this.hideNode.opacity = 0;
            this.hideNode.runAction(cc.fadeIn(1));
        });
    },

    // update (dt) {},
});
