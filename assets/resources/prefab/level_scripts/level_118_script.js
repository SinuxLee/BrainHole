cc.Class({
  extends: cc.Component,

  start () {
    const mainNode = this.node.getChildByName('main')
    mainNode.getChildByName('btn1').on(cc.Node.EventType.TOUCH_START, () => {
      mainNode.getChildByName('wire').active = false
      mainNode.getChildByName('wire2').active = true
      mainNode.getChildByName('redBall').active = false
      mainNode.getChildByName('greenBall').active = true
      mainNode.runAction(cc.moveTo(0.5, cc.v2(0, 0)))
    })

    mainNode.getChildByName('btn2').on(cc.Node.EventType.TOUCH_START, () => {
      if (mainNode.getChildByName('redBall').active == false) {
        mainNode.getChildByName('mask').getChildByName('picture').runAction(cc.sequence(cc.moveTo(1, cc.v2(0, 0)), cc.callFunc(() => {
          this.onRight()
        })))
      }
    })
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }
})
