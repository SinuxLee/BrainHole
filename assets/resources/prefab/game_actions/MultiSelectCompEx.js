// 多选
cc.Class({
  extends: cc.Component,

  properties: {
    selectItems: cc.Node,

    righSelectItems0: {
      type: cc.Node,
      default: []
    },
    righSelectItems1: {
      type: cc.Node,
      default: []
    },
    righSelectItems2: {
      type: cc.Node,
      default: []
    },

    checkedActive: 0
  },

  onLoad () {
    for (let i = 0; i < this.selectItems.children.length; ++i) {
      this.selectItems.children[i].on(cc.Node.EventType.TOUCH_END, this.onMove.bind(this))
      this.selectItems.children[i].isSelect = false
    }

    const ok = this.node.getChildByName('ok')
    ok.on('click', () => {
      const touch_selectItems = []
      for (let i = 0; i < this.selectItems.children.length; ++i) {
        if (this.selectItems.children[i].isSelect) {
          touch_selectItems.push(this.selectItems.children[i])
        }
      }

      this.righSelectItems0.sort((a, b) => { return a.id > b.id })
      touch_selectItems.sort((a, b) => { return a.id > b.id })
      if (this.righSelectItems0.length == touch_selectItems.length) {
        if (this.checkAInB(this.righSelectItems0, touch_selectItems) &&
                    this.checkAInB(touch_selectItems, this.righSelectItems0)) {
          this.onRight()
          return
        }
      }

      this.righSelectItems1.sort((a, b) => { return a.id > b.id })
      touch_selectItems.sort((a, b) => { return a.id > b.id })
      if (this.righSelectItems1.length == touch_selectItems.length) {
        if (this.checkAInB(this.righSelectItems1, touch_selectItems) &&
                    this.checkAInB(touch_selectItems, this.righSelectItems1)) {
          this.onRight()
          return
        }
      }

      this.righSelectItems2.sort((a, b) => { return a.id > b.id })
      touch_selectItems.sort((a, b) => { return a.id > b.id })
      if (this.righSelectItems2.length == touch_selectItems.length) {
        if (this.checkAInB(this.righSelectItems2, touch_selectItems) &&
                    this.checkAInB(touch_selectItems, this.righSelectItems2)) {
          this.onRight()
          return
        }
      }

      this.onFault()
    })
  },

  checkAInB (arrA, arrB) {
    for (let i = 0; i < arrA.length; i++) {
      if (!this.find(arrA[i], arrB)) {
        return false
      }
    }
    return true
  },

  find (target, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == target) {
        return true
      }
    }
    return false
  },

  onMove: function (event) {
    event.target.isSelect = !event.target.isSelect
    if (event.target.isSelect) {
      if (this.checkedActive == 1) {
        event.target.opacity = 255
      } else {
        event.target.color = cc.color(105, 72, 72, 255)
      }
    } else {
      if (this.checkedActive == 1) {
        event.target.opacity = 0
      } else {
        event.target.color = cc.color(105, 72, 72, 255)
      }
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
    setTimeout(() => {
      puremvc.Facade.sendNotification(appNotice.RE_PLAY)
    }, 1000)
  },

  start () {
    if (cc.nd && cc.nd.tips) {
      cc.nd.tips.hideNode()
    }
  }
})
