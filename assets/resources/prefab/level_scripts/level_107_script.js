cc.Class({
  extends: cc.Component,

  properties: {
    car: cc.Node,
    stone: cc.Node,
    stop: cc.Node
  },

  onLoad () {
    cc.director.getCollisionManager().enabled = true
  },

  start () {
    this.carCollider = this.car.getComponent(cc.BoxCollider)
    this.stoneCollider = this.stone.getComponent(cc.BoxCollider)
    this.stopCollider = this.stop.getComponent(cc.BoxCollider)
    this.car.getComponent('ColliderComp').setCb(this.onCollider.bind(this))
    this.car.on(cc.Node.EventType.TOUCH_START, () => {
      this.car.runAction(cc.moveTo(3, cc.v2(this.car.x + 500, this.car.y)))
    })
  },

  onCollider: function (other, car) {
    console.log('收到碰撞')
    this.car.stopAllActions()
    if (other.node == this.stone) {
      this.stone.runAction(cc.rotateTo(0.5, this.stone.rotation + 90))
      this.car.off(cc.Node.EventType.TOUCH_START)
    }
    if (other.node == this.stop) {
      this.onRight()
    }
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }
})
