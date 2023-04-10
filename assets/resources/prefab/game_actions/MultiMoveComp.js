cc.Class({
  extends: cc.Component,

  properties: {
    rightItems: {
      type: cc.Node,
      default: []
    },

    cankaoItem: cc.Node
  },

  onLoad () {
    for (let i = 0; i < this.rightItems.length; i++) {
      this.rightItems[i].on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
      this.rightItems[i].on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
      this.rightItems[i].on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
    }
    this.numIndex = 0
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
    if (x > this.cankaoItem.x - this.cankaoItem.width / 2 && x < this.cankaoItem.x + this.cankaoItem.width / 2 && y > this.cankaoItem.y - this.cankaoItem.height / 2 && y < this.cankaoItem.y + this.cankaoItem.height / 2) {
      const ani = event.target.getComponent('cc.Animation')
      if (ani) {
        ani.play()
      }
      this.numIndex++
      if (this.numIndex >= this.rightItems.length) {
        this.onRight()
      }
    }
  },

  onRight: function (e) {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }
})
