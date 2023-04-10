cc.Class({
  extends: cc.Component,

  properties: {
    car: cc.Node
  },

  start () {
    this.car.on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this))
    this.playing = false
    this.curAni = 'level54_a'
  },

  onClick: function () {
    if (this.playing) {
      return
    }
    this.playing = true
    const ani = this.node.getComponent(cc.Animation)
    ani.stop()
    ani.play(this.curAni)
    ani.on('finished', () => {
      if (this.curAni == 'level54_b') {
        this.onRight()
      } else {
        this.curAni = 'level54_b'
        this.playing = false
      }
    })
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }
})
