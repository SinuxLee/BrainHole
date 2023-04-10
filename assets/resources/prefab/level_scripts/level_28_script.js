cc.Class({
  extends: cc.Component,

  properties: {

  },

  onLoad () {
    this.inputIndex = 0
    const NumInput = this.node.getChildByName('NumInput')
    const keys = NumInput.getChildByName('keys')
    for (let i = 0; i < keys.children.length; ++i) {
      if (keys.children[i].name != 'ok' && keys.children[i].name != 'clear') {
        keys.children[i].on(cc.Node.EventType.TOUCH_START, this.onInput.bind(this))
      }
    }

    this.values = NumInput.getChildByName('values')
  },

  resetNum: function () {
    for (let i = 0; i < this.values.children.length; ++i) {
      this.values.children[i].getComponent('cc.Label').string = ''
    }
    this.inputIndex = 0
  },

  onInput: function (e) {
    if (this.inputIndex < 4) {
      this.values.children[this.inputIndex].getComponent('cc.Label').string = parseInt(e.target.name)
      this.inputIndex++
    }
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onOk: function () {
    const now = new Date()
    const hour = now.getHours()
    const minutes = now.getMinutes()
    const inputHour = parseInt(this.values.children[0].getComponent('cc.Label').string + this.values.children[1].getComponent('cc.Label').string)
    const inputMinutes = parseInt(this.values.children[2].getComponent('cc.Label').string + this.values.children[3].getComponent('cc.Label').string)
    if (hour == inputHour && minutes == inputMinutes) {
      this.onRight()
    } else {
      this.onFault()
    }
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: 28 } })
    }, 1500)
  },

  onFault: function () {
    cc.nd.tips.showFault(this.node)
  }
})
