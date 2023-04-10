cc.Class({
  extends: cc.Component,

  properties: {

  },

  onLoad () {
    this.ground = this.node.getChildByName('ground')

    this.ground.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
    this.ground.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
    this.ground.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
    this.ground.on(cc.Node.EventType.TOUCH_CANCEL, this.onMoveCancel.bind(this))

    const carnode = this.ground.getChildByName('carnode')
    carnode.on(cc.Node.EventType.TOUCH_START, this.onMoveError.bind(this))
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onMoveError: function (event) {
    const ani = this.node.getComponent('cc.Animation')
    ani.stop()
    ani.play('zcar')
    ani.on('finished', () => {
      this.onFault()
    })
  },

  onMoveStart: function (event) {
    // _startPoint
    const touchpos = event.touch._startPoint
    this.touchEnable = false
    if (touchpos.x < 200) {
      this.touchEnable = true
    }
  },

  onMove: function (event) {
    if (this.touchEnable == true) {
      const delta = event.touch.getDelta()
      if (delta.y > 0 && this.ground.rotation <= 10) {
        this.ground.rotation += delta.y
      }
    }
  },

  onMoveCancel: function () {
    this.onMoveEnd()
  },

  onMoveEnd: function () {
    if (this.ground.rotation != 0) {
      this.ground.rotation = 10

      this.ground.off(cc.Node.EventType.TOUCH_START)
      this.ground.off(cc.Node.EventType.TOUCH_MOVE)
      this.ground.off(cc.Node.EventType.TOUCH_END)

      const ani = this.node.getComponent('cc.Animation')
      ani.stop()
      ani.play('stoneAni')
      utils.playSound('sound/gst')
      setTimeout(() => {
        ani.play('carnode1')
        ani.on('finished', () => {
          this.onRight()
        })
      }, 1000)
    }
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
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
