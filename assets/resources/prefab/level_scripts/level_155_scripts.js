// 移动物品
cc.Class({
  extends: cc.Component,

  properties: {
    moveItems: {
      type: cc.Node,
      default: []
    },

    rightItem: cc.Node,
    faultItems: {
      type: cc.Node,
      default: []
    }
  },

  onLoad () {
    for (var i = 0; i < this.moveItems.length; i++) {
      this.moveItems[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
    }

    if (this.rightItem) {
      this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onRight.bind(this))
    }
    for (var i = 0; i < this.faultItems.length; i++) {
      this.faultItems[i].on(cc.Node.EventType.TOUCH_START, this.onFault.bind(this))
    }
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onMove: function (event) {
    const delta = event.touch.getDelta()

    event.target.x += delta.x
    event.target.y += delta.y
  },

  onRight: function (event) {
    if (event.target == this.rightItem) {
      const hairPos = event.target.getChildByName('hair')// .getPosition();
      if (hairPos.x > 30 || hairPos.y < 0) {
        cc.nd.tips.showRight(event.target)
        setTimeout(() => {
          puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
        }, 1500)
      } else {
        this.onFault(event)
      }
    }
  },

  onFault: function (event) {
    cc.nd.tips.showFault(event.target)
  }

})
