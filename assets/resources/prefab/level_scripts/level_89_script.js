const SingleInSingleComp = require('SingleInSingleComp')
cc.Class({
  extends: SingleInSingleComp,

  properties: {
    clickBtn: cc.Node
  },

  onLoad: function () {
    this._super()
    this.clickBtn.on(cc.Node.EventType.TOUCH_START, this.onStartRound.bind(this))
    this.playing = false
  },

  onMoveEnd: function (event) {
    const x = event.target.x
    const y = event.target.y
  },

  onStartRound: function (event) {
    this.playing = true
    const ani = this.node.getComponent(cc.Animation)
    ani.stop()
    ani.play()
    ani.on('finished', () => {
      let isFinish = true
      for (let i = 0; i < this.target.length; i++) {
        if (!this.checkIn(this.target[i])) {
          isFinish = false
          break
        }
      }
      if (isFinish) {
        this.onRight()
      } else {
        this.onFault()
      }
    })
  },

  onFault: function () {
    cc.nd.tips.showFault(this.node)
  }
})
