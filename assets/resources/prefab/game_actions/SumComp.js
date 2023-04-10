cc.Class({
  extends: cc.Component,

  properties: {

    sumItems: {
      type: cc.Node,
      default: []
    },

    okButton: cc.Node,

    numLimit: 0,
    total: 0,

    numAtlas: cc.SpriteAtlas

  },

  onLoad () {
    this.clickSeq = []
    for (let i = 0; i < this.sumItems.length; i++) {
      this.sumItems[i].on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this))
    }
    this.okButton.on(cc.Node.EventType.TOUCH_START, this.checkResult.bind(this))
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onClick: function (e) {
    if (this.clickSeq.length == this.numLimit) {
      return
    }
    this.clickSeq.push(e.target)
    for (let i = 0; i < 10; i++) {
      const numNode = e.target.getChildByName('num' + i)
      if (numNode == null) {
        return
      }
      if (numNode.getComponent(cc.Sprite).spriteFrame == null) {
        numNode.getComponent(cc.Sprite).spriteFrame = this.numAtlas.getSpriteFrame('num' + this.clickSeq.length)
        break
      }
    }
  },

  checkResult: function () {
    let total = 0
    for (let i = 0; i < this.clickSeq.length; i++) {
      total += parseInt(this.clickSeq[i].name)
    }
    if (total == parseInt(this.total)) {
      this.onRight()
    } else {
      this.onFault()
    }
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  },

  onFault: function () {
    for (let i = 0; i < this.sumItems.length; i++) {
      for (let j = 0; j < this.sumItems[i].children.length; j++) {
        if (this.sumItems[i].children[j].name.indexOf('num') >= 0) {
          this.sumItems[i].children[j].getComponent(cc.Sprite).spriteFrame = null
        }
      }
    }
    this.clickSeq.splice(0, this.clickSeq.length)
    cc.nd.tips.showFault(this.node)
  }
})
