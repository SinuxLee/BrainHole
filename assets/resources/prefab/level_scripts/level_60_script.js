cc.Class({
  extends: cc.Component,

  properties: {
    touchA: cc.Node,
    touchB: cc.Node,
    lightA: cc.Node,
    lightB: cc.Node
  },

  start () {
    this.lightA.active = true
    this.lightB.active = false
    this.touchA.on(cc.Node.EventType.TOUCH_START, this.onTouch.bind(this))
    this.touchA.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this))
    this.touchB.on(cc.Node.EventType.TOUCH_START, this.onTouch.bind(this))
    this.touchB.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this))
  },

  onTouch: function (e) {
    e.target.isOpen = true

    if (this.touchA.isOpen && this.touchB.isOpen) {
      this.lightA.active = false
      this.lightB.active = true
      cc.nd.tips.showRight(this.node)
      setTimeout(() => {
        puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
      }, 1500)
    }
  },

  onTouchEnd: function (e) {
    e.target.isOpen = false
  }
})
