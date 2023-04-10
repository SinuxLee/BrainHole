cc.Class({
  extends: cc.Component,

  properties: {
    items: {
      type: cc.Node,
      default: []
    },

    faultAniName: {
      type: cc.String,
      default: []
    }
  },

  start () {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this))
    }

    this.playing = false
    this.aniIndex = 0

    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onClick: function (e) {
    if (this.playing) {
      return
    }
    this.playing = true
    const ani = this.node.getComponent(cc.Animation)
    ani.stop()

    if (e.target != this.items[this.aniIndex]) {
      ani.play(this.faultAniName[this.aniIndex])
      ani.on('finished', () => {
        this.onFault()
      })
    } else {
      ani.play(this.node.name + '_' + this.aniIndex)
      ani.on('finished', () => {
        if (this.aniIndex == this.items.length - 1) {
          this.onRight()
        } else {
          this.aniIndex++
          this.playing = false
        }
      })
    }
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  },

  onFault: function (e) {
    cc.nd.tips.showFault(this.node)

    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.RE_PLAY)
    }, 1000)
  }
})
