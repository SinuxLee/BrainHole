cc.Class({
  extends: cc.Component,

  properties: {

    sequenceItems: {
      type: cc.Node,
      default: []
    },

    falutItems: {
      type: cc.Node,
      default: []
    },

    numAtlas: cc.SpriteAtlas

  },

  onLoad () {
    this.clickSeq = []
    for (var i = 0; i < this.sequenceItems.length; i++) {
      this.sequenceItems[i].on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this))
    }

    for (var i = 0; i < this.falutItems.length; i++) {
      this.falutItems[i].on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this))
    }
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onClick: function (e) {
    utils.playSound('sound/btnclick')
    if (e.target.getChildByName('num').getComponent(cc.Sprite).spriteFrame == null) {
      this.clickSeq.push(e.target)
      if (e.target.getChildByName('num')) {
        e.target.getChildByName('num').getComponent(cc.Sprite).spriteFrame = this.numAtlas.getSpriteFrame('num' + this.clickSeq.length)
      }
    }
  },

  onSureClick () {
    if (this.clickSeq.length == this.sequenceItems.length) {
      if (this.checkResult()) {
        this.onRight()
      } else {
        this.onFault()
      }
    } else {
      this.onFault()
    }
  },

  checkResult: function () {
    for (let i = 0; i < this.sequenceItems.length; i++) {
      if (this.clickSeq[i] != this.sequenceItems[i]) {
        return false
      }
    }
    return true
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  },

  onFault: function () {
    for (let i = 0; i < this.clickSeq.length; i++) {
      if (this.clickSeq[i].getChildByName('num')) {
        this.clickSeq[i].getChildByName('num').getComponent(cc.Sprite).spriteFrame = null
      }
    }
    this.clickSeq.splice(0, this.clickSeq.length)
    cc.nd.tips.showFault(this.node)

    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.RE_PLAY)
    }, 1000)
  }
})
