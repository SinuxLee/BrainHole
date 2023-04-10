const C = require('SingleNumComp')
cc.Class({
  extends: C,

  properties: {
    over: cc.Node
  },

  onRight: function () {
    this.over.active = true
    setTimeout(() => {
      cc.nd.tips.showRight(this.levelNode)
      setTimeout(() => {
        puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'ResultNode', initData: { pointNum: this.levelNode.name.replace('level_', '') } })
      }, 1500)
    }, 2000)
    this.node.active = false
  }
})
