cc.Class({
  extends: cc.Component,

  properties: {
    key: cc.Node
  },

  start () {
    this.key.on(cc.Node.EventType.TOUCH_START, this.onClick.bind(this))
    this.playing = false
    const parentKey = this.node.parent.parent.getChildByName('topbg').getChildByName('keybg').getChildByName('keyicon')
    console.log(parentKey, parentKey.parent)
    let pos = parentKey.parent.convertToWorldSpaceAR(parentKey.position)
    pos = this.key.parent.convertToNodeSpaceAR(pos)
    console.log(pos)
    this.key.x = pos.x
    this.key.y = pos.y
  },

  onClick: function () {
    if (this.playing) {
      return
    }
    this.playing = true
    const ani = this.node.getComponent(cc.Animation)
    ani.stop()
    ani.play('level57')
    ani.on('finished', () => {
      this.onRight()
    })
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }
})
