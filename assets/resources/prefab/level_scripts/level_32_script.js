// 移动到指定位置
cc.Class({
  extends: cc.Component,

  properties: {
    rightItem: cc.Node,

    cankaoItem: cc.Node
  },

  onLoad () {
    if (this.rightItem) {
      this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
      this.rightItem.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
      this.rightItem.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
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

  onMoveEnd: function (event) {
    const x = event.target.x
    const y = event.target.y
    if (x > this.cankaoItem.x - 20 && x < this.cankaoItem.x + 20 && y > this.cankaoItem.y - 120 && y < this.cankaoItem.y) {
      const action = cc.moveTo(0.1, cc.v2(this.cankaoItem.x, this.cankaoItem.y - 100))
      const finish = cc.callFunc(() => {
        this.onRight()
      })
      this.rightItem.runAction(cc.sequence(action, finish))
    } else {
      this.onFault(event)
    }
  },

  onRight: function (e) {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  },

  onFault: function (e) {
    cc.nd.tips.showFault(e.target)
  }
})
