cc.Class({
  extends: cc.Component,

  properties: {
    target: {
      type: cc.Node,
      default: []
    }
  },

  onLoad () {
    this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMove.bind(this))
    for (let i = 0; i < this.target.length; i++) {
      this.target[i].hoverNum = 0
      this.target[i].isTouching = false
    }
  },

  start () {

  },

  onMove (e) {
    for (let i = 0; i < this.target.length; i++) {
      if (!this.target[i].active) {
        continue
      }
      if (this.target[i].getBoundingBoxToWorld().contains(e.getLocation())) {
        this.target[i].isTouching = true
      } else if (this.target[i].isTouching) {
        this.target[i].hoverNum++
        this.target[i].isTouching = false
        this.target[i].opacity -= 51
        if (this.target[i].opacity <= 10) {
          this.target[i].active = false
          if (this.checkOver()) {
            this.onRight()
          }
        }
      }
    }
  },

  checkOver () {
    for (let i = 0; i < this.target.length; i++) {
      if (this.target[i].active) {
        return false
      }
    }
    return true
  },

  onRight: function (e) {
    cc.nd.tips.showRight(this.node)
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.node.name.replace('level_', '') } })
    }, 1500)
  }
})
