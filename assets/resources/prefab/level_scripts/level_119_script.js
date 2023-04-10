cc.Class({
  extends: cc.Component,

  properties: {
    screen: cc.Node
  },

  onLoad () {
    this.node.getChildByName('switch').on(cc.Node.EventType.TOUCH_START, (e) => {
      this.screen.runAction(cc.scaleTo(0.5, 0))
      this.onRight()
    })
  },

  start () {

  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }
})
