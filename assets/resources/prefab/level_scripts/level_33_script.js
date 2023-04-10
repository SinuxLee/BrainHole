cc.Class({
  extends: cc.Component,

  properties: {
    rightItem: cc.Node,
    faultItems: {
      type: cc.Node,
      default: []
    }
  },

  onLoad () {
    if (this.rightItem) {
      this.rightItem.on(cc.Node.EventType.TOUCH_START, this.onRight.bind(this))
    }
    for (let i = 0; i < this.faultItems.length; i++) {
      this.faultItems[i].on(cc.Node.EventType.TOUCH_START, this.onFault.bind(this))
    }

    this.questionnaire1 = this.node.getChildByName('questionnaire1')
    this.questionnaire1.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
    this.questionnaire1.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
    this.questionnaire1.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  },

  onMoveStart: function (event) {
    event.target.moveStartX = event.target.x
    event.target.moveStartY = event.target.y
  },

  onMove: function (event) {
    const delta = event.touch.getDelta()
    this.questionnaire1.x += delta.x
    this.questionnaire1.y += delta.y
  },

  onMoveEnd: function (event) {
    const x = event.target.x
    const y = event.target.y
  },

  onRight: function (e) {
    const ok = e.target.getChildByName('ok')
    ok.active = true
    setTimeout(() => {
      cc.nd.tips.showRight(e.target)
      setTimeout(() => {
        puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
      }, 1500)
    }, 500)
  },

  onFault: function (e) {
    const ok = e.target.getChildByName('ok')
    ok.active = true
    setTimeout(() => {
      ok.active = false
      cc.nd.tips.showFault(e.target)
    }, 500)
  },

  onDestroy: function () {

  }
})
