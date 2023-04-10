cc.Class({
  extends: cc.Component,

  properties: {
    targetItem: cc.Node,
    frames: {
      type: cc.SpriteFrame,
      default: []
    },
    index: 0,
    finalType: 0
  },

  onLoad () {
    this.targetItem.on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this))
  },

  onClick: function () {
    this.targetItem.getComponent(cc.Sprite).spriteFrame = this.frames[this.index]
    this.index++
    if (this.index == this.frames.length) {
      if (this.finalType == 0) {
        this.onRight()
      } else {
        this.targetItem.active = false
      }
    }
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, {
        name: 'ResultNode',
        initData: { pointNum: this.node.name.replace('level_', '') }
      })
    }, 1500)
  },

  start () {

  }

})
