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
        target: cc.Node,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.target.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this));
        this.target.on(cc.Node.EventType.TOUCH_MOVE, this.onClick.bind(this));
        this.target.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this));
        this.target.on(cc.Node.EventType.TOUCH_CANCEL, this.onMoveEnd.bind(this));
    },

    onMoveStart: function (event) {
        event.target.moveStartX = event.target.x;
        event.target.moveStartY = event.target.y;
    },


    onClick: function (event) {
        var startPos = event.getStartLocation();
        var newPos = event.getLocation();

        var newX = event.target.moveStartX + newPos.x - startPos.x;
        var newY = event.target.moveStartY + newPos.y - startPos.y;

        var angle = Math.atan2((event.target.moveStartY - newY), (newX - event.target.moveStartX)) //弧度 -0.6435011087932844, 即 2*Math.PI - 0.6435011087932844
        var rot = angle * (180 / Math.PI);
        // newPos = event.target.parent.convertToNodeSpaceAR(newPos);
        // event.target.x = event.target.moveStartX + newPos.x - startPos.x;
        // event.target.y = event.target.moveStartY + newPos.y - startPos.y;
        event.target.rotation = rot;
    },

    onMoveEnd: function(event) {
        var data = ((this.target.rotation % 360) + 360) % 360;
        if(data > 160 && data < 200) {
            this.onRight();
        }
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(() => {
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: "ResultNode", initData: { pointNum: this.node.name.replace("level_", "") } });
        }, 1500);
    },

    start() {

    },

    // update (dt) {},
});
