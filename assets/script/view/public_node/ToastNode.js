cc.Class({
  extends: cc.Component,

  properties: {
    contentLabel: cc.Label
  },

  /**
     * {content:"",type:0}
    */
  initData (data) {
    this.contentLabel.string = data.content
    switch (data.type) {
      case 0:{
        this.runMoveAction()
      } break
      case 1:{
        this.runOpacityAction()
      } break
    }
  },

  runMoveAction () {
    const move = cc.moveTo(1, cc.v2(0, 200))
    const fade = cc.fadeTo(0.6, 0)
    const func = cc.callFunc(function () {
      this.runEndAction()
    }, this)
    this.node.runAction(cc.sequence(move, fade, func))
  },

  runOpacityAction () {
    const fade = cc.fadeTo(0.6, 0)
    const func = cc.callFunc(function () {
      this.runEndAction()
    }, this)
    this.node.runAction(cc.sequence(fade, func))
  },

  runEndAction () {
    this.node.destroy()
  },

  onDestroy () {

  }
})
