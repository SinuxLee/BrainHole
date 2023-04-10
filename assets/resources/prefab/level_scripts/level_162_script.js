// 移动物品
cc.Class({
  extends: cc.Component,

  properties: {
    moveItem1: cc.Node,
    moveItem2: cc.Node,

    rightItem: cc.Node,
    cankaoItem: cc.Node
  },

  onLoad () {
    if (this.moveItem1) {
      this.moveItem1.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
      this.moveItem1.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
      this.originPos1 = this.moveItem1.getPosition()
    }

    if (this.moveItem2) {
      this.moveItem2.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
      this.moveItem2.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
      this.originPos2 = this.moveItem2.getPosition()
    }

    if (this.rightItem) {
      this.rightItem.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
      this.rightItem.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
    }
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onMove: function (event) {
    const delta = event.touch.getDelta()
    event.target.x += delta.x
    event.target.y += delta.y
  },

  onMoveEnd: function (event) {
    if (event.target == this.rightItem) {
      if (this.rightItem.x > this.cankaoItem.x - this.cankaoItem.width / 2 && this.rightItem.x < this.cankaoItem.x + this.cankaoItem.width / 2 &&
                this.rightItem.y > this.cankaoItem.y - this.cankaoItem.height / 2 && this.rightItem.y < this.cankaoItem.y + this.cankaoItem.height / 2) {
        this.onRight()
      }
    } else {
      if (Math.abs(this.moveItem1.x - this.moveItem2.x) <= 10 && Math.abs(this.moveItem1.y - this.moveItem2.y) <= 30) {
        this.moveItem1.active = false
        this.moveItem2.active = false
        this.rightItem.active = true
        this.rightItem.opacity = 0
        this.rightItem.x = this.moveItem2.x
        this.rightItem.y = this.moveItem2.y
        this.rightItem.runAction(cc.fadeIn(0.3))
      } else {
        if (event.target == this.moveItem1) {
          this.moveItem1.x = this.originPos1.x
          this.moveItem1.y = this.originPos1.y
        } else {
          this.moveItem2.x = this.originPos2.x
          this.moveItem2.y = this.originPos2.y
        }
      }
    }
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }

})
