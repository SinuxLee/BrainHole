cc.Class({
  extends: cc.Component,

  properties: {
  },

  onLoad () {
    this.plug1 = this.node.getChildByName('fax').getChildByName('plug-1')
    this.plug2 = this.node.getChildByName('fax').getChildByName('plug-2')

    this.greenBtn = this.node.getChildByName('fax').getChildByName('greenBtn')
    this.greenBtn.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))

    this.fax = this.node.getChildByName('fax')
    this.fax.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))

    const chaxianbtn = this.fax.getChildByName('chaxianbtn')
    chaxianbtn.on('click', () => {
      this.plug1.active = false
      this.plug2.active = true
      this.greenBtn.active = true
    })

    this.photo = this.fax.getChildByName('masknode').getChildByName('photo')
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
    const action1 = cc.moveTo(0.8, this.photo.x, this.photo.y - 185)
    const action2 = cc.callFunc(() => {
      this.onRight()
    })
    this.photo.runAction(cc.sequence(action1, action2))
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }

})
