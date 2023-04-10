cc.Class({
  extends: cc.Component,

  properties: {
    key: cc.Node
  },

  start () {
    this.key.on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this))
    this.playing = false
    const parentKey = this.node.parent.parent.getChildByName('level').getChildByName('levelnum')

    let pos = parentKey.parent.convertToWorldSpaceAR(parentKey.position)
    pos = this.key.parent.convertToNodeSpaceAR(pos)
    console.log(pos)
    this.key.x = pos.x
    this.key.y = pos.y

    this.titletimu = this.node.getChildByName('titletimu')
    this.titletimupos = this.titletimu.getPosition()
  },

  onClick: function () {
    if (this.playing) {
      return
    }
    this.playing = true

    const action = cc.moveTo(0.4, cc.v2(this.titletimupos.x + 400, this.titletimupos.y))
    const finish = cc.callFunc(() => {
      this.key.active = false
      this.titletimu.getComponent('cc.Label').string = '66 + 34 = 100'
      this.onRight()
    })
    this.key.runAction(cc.sequence(action, finish))
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }
})
