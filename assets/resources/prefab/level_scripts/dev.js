cc.Class({
  extends: cc.Component,

  properties: {
    tips: cc.Node

  },

  onLoad () {
    this.tips.active = true

    this.levelnode = this.node.getChildByName('content').getChildByName('levelnode')
  },

  start () {
    preloadTool.loadPrefab('levels/level_163', (err, view) => {
      if (err) {
        return
      }
      this.levelnode.addChild(view)
    })
  }
})
