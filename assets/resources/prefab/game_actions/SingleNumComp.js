cc.Class({
  extends: cc.Component,

  properties: {
    numLabel: cc.Label,
    realValue: 0,
    levelNode: cc.Node
  },

  onLoad () {
    this.num = 0

    this.isCanClick = true
  },

  resetNum: function () {
    if (!this.isCanClick) {
      return
    }
    this.num = 0
    this.updateLabel()
  },

  updateLabel: function () {
    this.numLabel.string = this.num + ''
  },

  addValue: function () {
    if (!this.isCanClick) {
      return
    }
    this.num++
    this.updateLabel()
    utils.playSound('sound/btnclick')
  },

  decValue: function () {
    if (!this.isCanClick) {
      return
    }
    this.num--
    this.updateLabel()
    utils.playSound('sound/btnclick')
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onOk: function () {
    if (!this.isCanClick) {
      return
    }
    if (this.num == parseInt(this.realValue)) {
      this.onRight()
    } else {
      this.onFault()
    }
    utils.playSound('sound/btnclick')
  },

  onRight: function () {
    const ani = this.levelNode.getComponent('cc.Animation')
    if (ani) {
      this.isCanClick = false
      ani.play(this.levelNode.name)
      ani.on('finished', () => {
        this.isCanClick = true
        cc.nd.tips.showRight(this.levelNode)
        setTimeout(() => {
          puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.levelNode.name.replace('level_', '') } })
        }, 1000)
      })
    } else {
      cc.nd.tips.showRight(this.levelNode)
      setTimeout(() => {
        puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.levelNode.name.replace('level_', '') } })
      }, 1500)
    }
  },

  onFault: function () {
    cc.nd.tips.showFault(this.levelNode)
  }
})
