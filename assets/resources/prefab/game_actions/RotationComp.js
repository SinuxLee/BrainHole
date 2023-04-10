cc.Class({
  extends: cc.Component,

  properties: {
    target: cc.Node
  },

  onLoad () {
    this.target.on(cc.Node.EventType.TOUCH_START, this.onMoveStart.bind(this))
    this.target.on(cc.Node.EventType.TOUCH_MOVE, this.onClick.bind(this))
    this.target.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd.bind(this))
    this.target.on(cc.Node.EventType.TOUCH_CANCEL, this.onMoveEnd.bind(this))
  },

  onMoveStart: function (event) {
    event.target.moveStartX = event.target.x
    event.target.moveStartY = event.target.y
  },

  onClick: function (event) {
    const startPos = event.getStartLocation()
    const newPos = event.getLocation()

    const newX = event.target.moveStartX + newPos.x - startPos.x
    const newY = event.target.moveStartY + newPos.y - startPos.y

    const angle = Math.atan2((event.target.moveStartY - newY), (newX - event.target.moveStartX)) // 弧度 -0.6435011087932844, 即 2*Math.PI - 0.6435011087932844
    const rot = angle * (180 / Math.PI)
    // newPos = event.target.parent.convertToNodeSpaceAR(newPos);
    // event.target.x = event.target.moveStartX + newPos.x - startPos.x;
    // event.target.y = event.target.moveStartY + newPos.y - startPos.y;
    event.target.rotation = rot
  },

  onMoveEnd: function (event) {
    const data = ((this.target.rotation % 360) + 360) % 360
    if (data > 160 && data < 200) {
      this.onRight()
    }
  },

  onRight: function () {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  },

  start () {

  }
})
