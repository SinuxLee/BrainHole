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
      this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onRight.bind(this))
    }
    for (let i = 0; i < this.faultItems.length; i++) {
      this.faultItems[i].on(cc.Node.EventType.TOUCH_START, this.onFault.bind(this))
    }
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onRight: function (e) {
    const tipstag = e.target.getChildByName('tipstag')
    if (tipstag) {
      tipstag.active = true
      setTimeout(() => {
        cc.nd.tips.showRight(e.target)
        setTimeout(() => {
          puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
        }, 1500)
      }, 500)
    } else {
      cc.nd.tips.showRight(e.target)
      setTimeout(() => {
        puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
      }, 1500)
    }
  },

  onFault: function (e) {
    cc.nd.tips.showFault(e.target)
  },

  onDestroy: function () {

  }
})
