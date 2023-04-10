// 移动到指定位置
cc.Class({
  extends: cc.Component,

  properties: {
    moveItems: {
      type: cc.Node,
      default: []
    },

    rightItem1: cc.Node,
    rightItem2: cc.Node,

    oktuang: cc.Node
  },

  onLoad () {
    if (this.rightItem1) {
      this.rightItem1.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
      this.rightItem1.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
      this.rightItem1.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd1.bind(this))
    }

    if (this.rightItem2) {
      this.rightItem2.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
      this.rightItem2.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
      this.rightItem2.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd2.bind(this))
    }

    this.originPos = []
    for (let i = 0; i < this.moveItems.length; i++) {
      this.moveItems[i].on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
      this.moveItems[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
      this.moveItems[i].on(cc.Node.EventType.TOUCH_END, this.onMoveEndBack.bind(this))
      this.moveItems[i].index = i
      this.originPos.push(this.moveItems[i].getPosition())
    }
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onMoveStart: function (event) {
    event.target.moveStartX = event.target.x
    event.target.moveStartY = event.target.y
  },

  onMove: function (event) {
    const startPos = event.getStartLocation()
    const newPos = event.getLocation()
    // newPos = event.target.parent.convertToNodeSpaceAR(newPos);
    event.target.x = event.target.moveStartX + newPos.x - startPos.x
    event.target.y = event.target.moveStartY + newPos.y - startPos.y
  },

  onMoveEndBack: function (event) {
    const index = event.target.index
    this.moveItems[index].x = this.originPos[index].x
    this.moveItems[index].y = this.originPos[index].y
  },

  onMoveEnd: function (event) {
    const x = event.target.x
    const y = event.target.y
    this.onMoveEndBack()
  },

  onMoveEnd1: function (event) {
    const x = event.target.x
    const y = event.target.y
    if (x > this.rightItem2.x - 20 && x < this.rightItem2.x + 20 && y > this.rightItem2.y - 20 && y < this.rightItem2.y + 20) {
      this.rightItem1.runAction(cc.moveTo(0.2, this.rightItem2.x - 9, this.rightItem2.y))
      setTimeout(() => {
        this.rightItem1.active = false
        this.rightItem2.active = false
        this.oktuang.active = true
        this.oktuang.x = this.rightItem2.x
        this.oktuang.y = this.rightItem2.y
        this.oktuang.opacity = 0
        this.oktuang.runAction(cc.fadeIn(0.2))
        this.onRight()
      }, 200)
    }
  },

  onMoveEnd2: function (event) {
    const x = event.target.x
    const y = event.target.y
    if (x > this.rightItem1.x - 20 && x < this.rightItem1.x + 20 && y > this.rightItem1.y - 20 && y < this.rightItem1.y + 20) {
      this.rightItem2.runAction(cc.moveTo(0.1, this.rightItem1.x - 9, this.rightItem1.y))
      setTimeout(() => {
        this.rightItem1.active = false
        this.rightItem2.active = false
        this.oktuang.active = true
        this.oktuang.x = this.rightItem1.x
        this.oktuang.y = this.rightItem1.y
        this.oktuang.opacity = 0
        this.oktuang.runAction(cc.fadeIn(0.1))
        this.onRight()
      }, 100)
    }
  },

  onRight: function (e) {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }
})
