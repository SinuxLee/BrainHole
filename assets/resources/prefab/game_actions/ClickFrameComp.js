cc.Class({
  extends: cc.Component,

  properties: {
    clickItem: cc.Node,
    targetItem: cc.Node,
    frames: cc.SpriteFrame
  },

  onLoad () {
    this.clickItem.on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this))
  },

  onClick: function () {
    this.targetItem.getComponent(cc.Sprite).spriteFrame = this.frames
  }

})
