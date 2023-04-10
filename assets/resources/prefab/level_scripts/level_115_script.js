cc.Class({
  extends: cc.Component,

  properties: {
    nodeA: cc.Node,
    nodeB: cc.Node,
    nodeC: cc.Node,
    nodeD: cc.Node,

    lNodeA: cc.Node,
    lNodeB: cc.Node,

    isFinish: 0
  },

  start () {
    this.nodeA.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this))
    this.nodeA.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this))
    this.nodeB.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this))
    this.nodeB.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this))
    this.nodeC.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this))
    this.nodeC.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this))
    this.nodeD.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this))
    this.nodeD.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this))
    this.restart()
  },

  restart: function () {
    this.nodeA.active = true
    this.nodeA.opacity = 1

    this.nodeB.active = true
    this.nodeB.opacity = 1

    this.nodeC.active = true
    this.nodeC.opacity = 1

    this.nodeD.active = true
    this.nodeD.opacity = 1

    this.lNodeB.active = false
    this.lNodeA.active = false
    this.isFinish = 0
  },

  onTouchStart: function (e) {
    e.target.opacity = 255
    e.target.getChildByName('a').active = true
    e.target.getChildByName('b').active = false
    this.isFinish = this.check()
  },

  onTouchEnd: function (e) {
    if (this.isFinish == 1) {
      this.onRight()
    } else if (this.nodeA.opacity == 255) {
      this.nodeD.getChildByName('b').active = true
      this.nodeD.getChildByName('a').active = false
      this.nodeD.opacity = 0
      this.nodeD.runAction(cc.sequence(cc.fadeIn(0.5), cc.callFunc(() => {
        this.lNodeB.active = true
        this.lNodeB.opacity = 0
        this.lNodeB.runAction(cc.sequence(cc.fadeIn(0.5), cc.callFunc(this.onFault.bind(this))))
      })))
    } else {
      this.nodeA.opacity = 255
      this.nodeA.getChildByName('b').active = true
      this.nodeA.getChildByName('a').active = false
      this.nodeA.opacity = 0
      this.nodeA.runAction(cc.sequence(cc.fadeIn(0.5), cc.callFunc(() => {
        this.lNodeA.active = true
        this.lNodeA.opacity = 0
        this.lNodeA.runAction(cc.sequence(cc.fadeIn(0.5), cc.callFunc(this.onFault.bind(this))))
      })))
    }
  },

  check: function () {
    if ((this.nodeA.opacity == 255 && this.nodeB.opacity == 255) || (this.nodeC.opacity == 255 && this.nodeD.opacity == 255)) {
      return 1
    } else {
      return 2
    }
  },

  onRight: function (e) {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  },

  onFault: function (e) {
    cc.nd.tips.showFault(this.node)
    this.restart()
  }
})
