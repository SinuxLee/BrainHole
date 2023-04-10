cc.Class({
  extends: cc.Component,

  properties: {
    targetNode: cc.Node,
    speed: 2
  },

  onLeftClick: function () {
    this.targetNode.x -= this.speed
  },

  onRightClick: function () {
    this.targetNode.x += this.speed
  },

  onUpClick: function () {
    this.targetNode.y += this.speed
  },

  onDownClick: function () {
    this.targetNode.y -= this.speed
  }
})
