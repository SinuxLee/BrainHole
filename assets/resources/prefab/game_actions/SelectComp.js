cc.Class({
  extends: cc.Component,

  properties: {
    rightItem: cc.Node,
    faultItems: {
      type: cc.Node,
      default: []
    }
  },

  onLoad () {
    if (this.rightItem) {
      this.rightItem.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
    }
    for (let i = 0; i < this.faultItems.length; i++) {
      this.faultItems[i].on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
    }
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onMoveEnd: function (e) {
    this.rightItem.getChildByName('selectbg').active = false
    for (let i = 0; i < this.faultItems.length; i++) {
      this.faultItems[i].getChildByName('selectbg').active = false
    }
    e.target.getChildByName('selectbg').active = true
  },

  onSureClick: function () {
    if (this.rightItem.getChildByName('selectbg').active == true) {
      cc.nd.tips.showRight(this.node)
      setTimeout(() => {
        puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
      }, 1500)
    } else {
      cc.nd.tips.showFault(this.node)
    }
  },

  onDestroy: function () {

  }
})
