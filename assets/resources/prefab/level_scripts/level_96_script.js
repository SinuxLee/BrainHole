cc.Class({
  extends: cc.Component,

  properties: {
    targetNode: cc.Node,
    faultNode: cc.PolygonCollider,
    successNode: cc.BoxCollider,
    targetCollider: cc.CircleCollider,
    speed: 2
  },

  onLoad () {
    cc.director.getCollisionManager().enabled = true
  },

  start () {

  },

  onLeftClick: function () {
    this.targetNode.x -= this.speed
    this.check()
  },

  onRightClick: function () {
    this.targetNode.x += this.speed
    this.check()
  },

  onUpClick: function () {
    this.targetNode.y += this.speed
    this.check()
  },

  onDownClick: function () {
    this.targetNode.y -= this.speed
    this.check()
  },

  check: function () {
    if (cc.Intersection.polygonCircle(this.faultNode.world.points, this.targetCollider.world)) {
      this.onFault()
    } else if (cc.Intersection.polygonCircle(this.successNode.world.points, this.targetCollider.world)) {
      this.onRight()
    }
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  },

  onFault: function () {
    cc.nd.tips.showFault(this.node)
    this.targetNode.x = -254
    this.targetNode.y = 275
  }
})
