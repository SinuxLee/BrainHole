const SingleInSingle = require('SingleInSingleComp')
cc.Class({
  extends: SingleInSingle,

  properties: {
    air: cc.Node
  },

  onRight () {
    const ani = this.node.getComponent(cc.Animation)
    ani.play()
    utils.playSound('sound/lp')
  }

})
