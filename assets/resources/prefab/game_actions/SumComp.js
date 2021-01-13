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

        sumItems: {
            type: cc.Node,
            default: [],
        },

        okButton: cc.Node,

        numLimit:0,
        total: 0,

        numAtlas: cc.SpriteAtlas,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.clickSeq = [];
        for (var i = 0; i < this.sumItems.length; i++) {
            this.sumItems[i].on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this));
        }
        this.okButton.on(cc.Node.EventType.TOUCH_START, this.checkResult.bind(this));
    },

    start() {
        if(cc.nd && cc.nd.tips) {
            cc.nd.tips.hideNode();
        }
    },

    onClick: function (e) {
        if (this.clickSeq.length == this.numLimit) {
            return;
        }
        this.clickSeq.push(e.target);
        for (var i = 0; i < 10; i++) {
            var numNode = e.target.getChildByName("num" + i);
            if (numNode == null) {
                return;
            }
            if (numNode.getComponent(cc.Sprite).spriteFrame == null) {
                numNode.getComponent(cc.Sprite).spriteFrame = this.numAtlas.getSpriteFrame("num" + this.clickSeq.length);
                break;
            }
        }

    },

    checkResult: function () {
        var total = 0;
        for (var i = 0; i < this.clickSeq.length; i++) {
            total += parseInt(this.clickSeq[i].name);
        }
        if(total == parseInt(this.total)){
            this.onRight();
        } else {
            this.onFault();
        }
    },

    onRight: function () {
        cc.nd.tips.showRight(this.node);
        setTimeout(()=>{
            puremvc.Facade.sendNotification(appNotice.SHOW_POP, {name:"ResultNode", initData:{pointNum: this.node.name.replace("level_","")}});
        }, 1500);
    },

    onFault: function () {
        for (var i = 0; i < this.sumItems.length; i++) {
            for(var j = 0; j < this.sumItems[i].children.length; j++){
                if(this.sumItems[i].children[j].name.indexOf("num") >= 0) {
                    this.sumItems[i].children[j].getComponent(cc.Sprite).spriteFrame = null;
                }
            }
        }
        this.clickSeq.splice(0, this.clickSeq.length);
        cc.nd.tips.showFault(this.node);
    },

    // update (dt) {},
});
