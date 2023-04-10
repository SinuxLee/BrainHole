cc.Class({
  extends: cc.Component,

  properties: {
    numLabel: cc.Label,
    realValue: 0,
    levelNode: cc.Node
  },

  onLoad () {
    this.num = 0
    const keys = this.node.getChildByName('keys')
    for (let i = 0; i < keys.children.length; i++) {
      if (keys.children[i].name != 'ok' && keys.children[i].name != 'clear') {
        keys.children[i].on(cc.Node.EventType.TOUCH_START, this.onInput.bind(this))
      }
    }
  },

  resetNum: function () {
    this.num = 0
    this.updateLabel()
  },

  updateLabel: function () {
    this.numLabel.string = this.num + ''
  },

  onInput: function (e) {
    utils.playSound('sound/btnclick')
    if (this.num < 100000) {
      this.num = this.num * 10 + parseInt(e.target.name)
      this.updateLabel()
    }
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onOk: function () {
    if (this.num == parseInt(this.realValue)) {
      this.onRight()
    } else {
      this.onFault()
    }
  },

  onRight: function () {
    cc.nd.tips.showRight(this.levelNode)

    const levelScript = this.levelNode.getComponent(this.levelNode.name + '_script')
    if (levelScript && levelScript.onRightBefore) {
      levelScript.onRightBefore(() => {
        setTimeout(() => {
          puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.levelNode.name.replace('level_', '') } })
        }, 1000)
      })
    } else {
      setTimeout(() => {
        puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.levelNode.name.replace('level_', '') } })
      }, 1500)
    }
  },

  onFault: function () {
    cc.nd.tips.showFault(this.levelNode)
  }
})
