
cc.Class({
  extends: cc.Component,

  properties: {
    touchItems: {
      type: cc.Node,
      default: []
    },

    posItems: {
      type: cc.Node,
      default: []
    },

    cankaoItem: cc.Node
  },

  onLoad () {
    this.originPos = []
    for (var i = 0; i < this.touchItems.length; i++) {
      this.touchItems[i].on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
      this.originPos.push(this.touchItems[i].getPosition())
      this.touchItems[i].index = i
    }

    this.toPos = []
    for (var i = 0; i < this.posItems.length; i++) {
      this.toPos.push(this.posItems[i].getPosition())
    }

    this.diannode = this.node.getChildByName('dian')
    this.diannode.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))

    this.numList = [0, 1, 2]
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
    if (event.target.selectIndex == null) {
      const index = this.numList[0]
      this.numList.splice(0, 1)
      event.target.x = this.toPos[index].x
      event.target.y = this.toPos[index].y
      event.target.selectIndex = index
    } else {
      event.target.x = this.originPos[event.target.index].x
      event.target.y = this.originPos[event.target.index].y
      for (let i = 0; i < this.numList.length; ++i) {
        if (event.target.selectIndex < this.numList[i]) {
          this.numList.splice(i, 0, event.target.selectIndex)
          break
        }
      }
      event.target.selectIndex = null
    }
  },

  onOkClick: function () {
    if (this.diannode.x > this.cankaoItem.x - this.cankaoItem.width / 2 && this.diannode.x < this.cankaoItem.x + this.cankaoItem.width / 2 && this.diannode.y > this.cankaoItem.y - this.cankaoItem.height / 2 && this.diannode.x < this.cankaoItem.y + this.cankaoItem.height / 2) {
      for (let i = 0; i < this.touchItems.length; i++) {
        if (this.touchItems[i].selectIndex != i) {
          return
        }
      }
      this.onRight()
    } else {
      this.onFault()
    }
  },

  onRight: function (e) {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: 131 } })
    }, 1500)
  },

  onFault: function () {
    cc.nd.tips.showFault(this.node)
    this.resetLoad()
  },

  resetLoad: function () {
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.RE_PLAY)
    }, 1000)
  }
})
