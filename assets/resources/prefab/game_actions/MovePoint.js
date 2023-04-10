// 移动到指定位置
cc.Class({
  extends: cc.Component,

  properties: {
    rightItem: cc.Node,

    otherItems: {
      type: cc.Node,
      default: []
    },

    cankaoItem: cc.Node
  },

  onLoad () {
    if (this.rightItem) {
      this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
      this.rightItem.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
      this.rightItem.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
    }

    this.originPos = []
    for (let i = 0; i < this.otherItems.length; i++) {
      this.otherItems[i].on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
      this.otherItems[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
      this.otherItems[i].on(cc.Node.EventType.TOUCH_END, this.onMoveEndBack.bind(this))
      this.otherItems[i].index = i
      this.originPos.push(this.otherItems[i].getPosition())
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
    this.otherItems[index].x = this.originPos[index].x
    this.otherItems[index].y = this.originPos[index].y
  },

  onMoveEnd: function (event) {
    const x = event.target.x
    const y = event.target.y
    if (x > this.cankaoItem.x - this.cankaoItem.width / 2 && x < this.cankaoItem.x + this.cankaoItem.width / 2 && y > this.cankaoItem.y - this.cankaoItem.height / 2 && y < this.cankaoItem.y + this.cankaoItem.height / 2) {
      this.onRight()
    }
  },

  onRight: function (e) {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, {
        name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') }
      })
    }, 1500)
  }

})
