// 移动物品
cc.Class({
  extends: cc.Component,

  properties: {
    moveItem: cc.Node

  },

  onLoad () {
    this.moveItem.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
    this.moveItem.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))

    this.boy1 = this.node.getChildByName('boy1')

    this.boy2 = this.node.getChildByName('boy2')
    this.boy2.getComponent('cc.Animation').play('boy2')
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onMove: function (event) {
    const delta = event.touch.getDelta()
    event.target.x += delta.x
    event.target.y += delta.y
  },

  onMoveEnd: function (event) {
    if (event.target.y < -80 || event.target.y > 50) {
      event.target.active = false
      const ani = this.node.getComponent('cc.Animation')
      if (ani) {
        ani.play(this.node.name)
        ani.on('finished', () => {
          this.boy2.active = false
          this.boy1.active = true
          this.boy1.getComponent('cc.Animation').play('boy1')
          setTimeout(() => {
            this.onRight()
          }, 1000)
        })
      }
    }
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }

})
