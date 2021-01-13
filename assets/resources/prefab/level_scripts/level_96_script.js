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
        targetNode: cc.Node,
        faultNode: cc.PolygonCollider,
        successNode: cc.BoxCollider,
        targetCollider: cc.CircleCollider,
        speed: 2,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    },

    start () {

    },

    onLeftClick: function() {
        this.targetNode.x -= this.speed;
        this.check();
    },

    onRightClick: function() {
        this.targetNode.x += this.speed;
        this.check();
    },

    onUpClick: function() {
        this.targetNode.y += this.speed;
        this.check();
    },

    onDownClick: function() {
        this.targetNode.y -= this.speed;
        this.check();
    },

    check: function () {
        if (cc.Intersection.polygonCircle(this.faultNode.world.points, this.targetCollider.world)) {
            this.onFault();
        } else if(cc.Intersection.polygonCircle(this.successNode.world.points,this.targetCollider.world)) {
            this.onRight();
        }
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.node.name.replace("level_","")}});
        }, 1500);
    },

    onFault: function () {
        cc.nd.tips.showFault(this.node);
        this.targetNode.x = -254;
        this.targetNode.y = 275;
    },

    // update (dt) {},
});
