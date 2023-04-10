cc.Class({
  extends: cc.Component,

  properties: {
    rightItem: cc.Node,
    faultItems: {
      type: cc.Node,
      default: []
    }
  },

  start () {
    if (this.rightItem) {
      const ani = this.rightItem.getComponent(cc.Animation)
      ani.stop()
      ani.play()
    }
  },

  update (dt) {
    for (let i = 0; i < this.faultItems.length; i++) {
      const item = this.faultItems[i]
      if (item.move_direct == null) {
        item.move_direct = 'left'
        item.speed = Math.random() * 2
      }
      const distance = 750 / 2
      if (Math.abs(item.x) > distance - 50) {
        if (item.move_direct == 'left') {
          item.move_direct = 'right'
        } else {
          item.move_direct = 'left'
        }
      }
      if (item.move_direct == 'left') {
        item.scaleX = 1
        item.x -= item.speed
      } else {
        item.scaleX = -1
        item.x += item.speed
      }
    }
  }
})
