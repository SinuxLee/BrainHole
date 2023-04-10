cc.Class({
  extends: cc.Component,

  properties: {

    item: {
      type: cc.Node,
      default: []
    },
    target: {
      type: cc.Node,
      default: []
    }
  },

  onLoad () {
    for (let i = 0; i < this.item.length; i++) {
      this.item[i].on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
      this.item[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
      this.item[i].on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
    }
  },

  start: function () {
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

    let isFinish = true
    for (let i = 0; i < this.target.length; i++) {
      if (!this.checkIn(this.target[i])) {
        isFinish = false
        break
      }
    }
    if (isFinish) {
      this.onRight()
    }
  },

  checkIn: function (target) {
    let result = false
    for (let i = 0; i < this.item.length; i++) {
      const t = this.item[i]
      if (t.x > target.x - target.width / 2 &&
                t.x < target.x + target.width / 2 &&
                t.y < target.y + target.height / 2 &&
                t.y > target.y - target.height / 2) {
        result = true
        break
      }
    }
    return result
  },

  onRight: function (e) {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }
})
