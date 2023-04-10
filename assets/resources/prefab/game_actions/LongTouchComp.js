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
      this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
      this.rightItem.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
    }
    for (let i = 0; i < this.faultItems.length; i++) {
      this.faultItems[i].on(cc.Node.EventType.TOUCH_START, this.onFault.bind(this))
    }
    this.isComplete = false
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onMoveStart: function (event) {
    this.time = Date.now()
  },

  onMove: function (event) {
    const lefttime = Math.floor((Date.now() - this.time) / 1000)
    if (lefttime >= 1 && !this.isComplete) {
      this.isComplete = true
      this.onRight(event)
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

  onShowTips: function () {
    cc.nd.tips.showRight(e.target)
  },

  onFault: function (e) {
    cc.nd.tips.showFault(e.target)
  },

  onDestroy: function () {

  }
})
