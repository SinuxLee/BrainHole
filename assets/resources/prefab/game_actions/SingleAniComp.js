cc.Class({
  extends: cc.Component,

  properties: {

  },

  start () {
    const ani = this.node.getComponent(cc.Animation)
    ani.play()
  }
})
