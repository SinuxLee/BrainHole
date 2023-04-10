
cc.Class({
  extends: cc.Component,

  properties: {
    pointNum: 0
  },

  onLoad () {
    this.basketballhoop = this.node.getChildByName('basketball-hoop')

    this.boybasketball1 = this.node.getChildByName('boy-basketball1')
    this.boybasketball2 = this.node.getChildByName('boy-basketball2')

    this.basketball = this.node.getChildByName('basketball')

    this.rock1 = this.node.getChildByName('rock-1')
    this.rock2 = this.node.getChildByName('rock-2')
    this.rock3 = this.node.getChildByName('rock-3')

    this.boybasketball1.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))

    this.rock1.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd1.bind(this))
    this.rock2.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd2.bind(this))
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onMoveEnd1: function (event) {
    this.rock1.active = false
    this.rock2.active = true
  },

  onMoveEnd2: function (event) {
    this.rock2.active = false
    this.rock3.active = true
    this.basketballhoop.getComponent('cc.Animation').play()
  },

  onMoveEnd: function (event) {
    this.boybasketball1.active = false
    this.boybasketball2.active = true
    this.basketball.active = true
    const ani = this.basketball.getComponent('cc.Animation')
    ani.play('basket2')

    ani.on('finished', () => {
      if (this.rock3.active == true) {
        this.onRight()
      } else {
        this.onFault()
      }
    })
  },

  onOkClick: function () {
    if (this.diannode.x > this.cankaoItem.x - 15 && this.diannode.x < this.cankaoItem.x + 15 && this.diannode.y > this.cankaoItem.x - 25 && this.diannode.x < this.cankaoItem.x + 25) {
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
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.pointNum } })
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
