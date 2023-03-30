const BaseCmpt = require('BaseCmpt')
const ShopNodeMediator = require('ShopNodeMediator')

cc.Class({
  extends: BaseCmpt,
  mediatorName: ShopNodeMediator,
  properties: {

  },

  onLoad () {
    this._super()

    const framebg = this.node.getChildByName('framebg')

    const watchvdBtn = framebg.getChildByName('watchvdBtn')
    watchvdBtn.on('click', () => {
      utils.playSound('sound/btnclick')
      window.rewardVideo.showVideo(() => {
        console.log('激励视频播放完成, 领取奖励')
        puremvc.Facade.sendNotification(appNotice.TOAST_SHOW, { content: '获得钥匙+1', type: 0 })
        puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, 1)
      })
      window.rewardVideo.dateMark(1013)
    }, this)

    const closebtn = framebg.getChildByName('closebtn')
    closebtn.on('click', () => {
      this.hidePop('ShopNode')

      utils.playSound('sound/btnclick')

      if (this.preData) {
        puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: this.preData.className, initData: { pointNum: this.preData.pointNum } })
      }
    }, this)
  },

  // data:{className, pointNum}
  initData: function (data) {
    this.preData = data
  },

  onDestroy () {
    this._super()
    actionLib.backOut(this.node.getChildByName('content'))
  }
})
