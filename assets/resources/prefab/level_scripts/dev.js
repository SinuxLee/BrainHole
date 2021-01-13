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
        tips: cc.Node,
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.tips.active = true;

        this.levelnode = this.node.getChildByName("content").getChildByName("levelnode");
    },

    start () {

        preloadTool.loadPrefab("levels/level_163", (err, view)=>{
            if(err){
                return;
            }
            this.levelnode.addChild(view);
        });
    },

    // update (dt) {},
});
