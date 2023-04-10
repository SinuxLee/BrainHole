cc.Class({
  extends: cc.Component,

  properties: {
    hideNode: cc.Node
  },

  onLoad () {
    this.node.on(cc.Node.EventType.TOUCH_START, () => {
      this.hideNode.active = false
    })
    this.node.on(cc.Node.EventType.TOUCH_END, () => {
      this.hideNode.active = true
      this.hideNode.opacity = 0
      this.hideNode.runAction(cc.fadeIn(1))
    })
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
      this.hideNode.active = true
      this.hideNode.opacity = 0
      this.hideNode.runAction(cc.fadeIn(1))
    })
  }
})
