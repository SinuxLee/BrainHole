const BaseCmpt = require('BaseCmpt')
const ReceiveNodeMediator = require('ReceiveNodeMediator')
const leveltips_config = require('leveltips_config')

cc.Class({
  extends: BaseCmpt,
  mediatorName: ReceiveNodeMediator,
  properties: {

  },

  onLoad () {
    this._super()

    this.keynumLabel = this.node.getChildByName('keynum').getComponent('cc.Label')

    const receiveBtn = this.node.getChildByName('receiveBtn')
    receiveBtn.on('click', () => {
      this.hidePop('ReceiveNode')
      utils.playSound('sound/btnclick')
      this.stopTimeout()
      window.rewardVideo.showVideo(() => {
        console.log('激励视频播放完成, 领取奖励')
        puremvc.Facade.sendNotification(appNotice.TOAST_SHOW, { content: '获得钥匙+' + this.keynum, type: 0 })
        puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, this.keynum)
      })
    })

    const closeBtn = this.node.getChildByName('closeBtn')
    closeBtn.on('click', () => {
      this.hidePop('ReceiveNode')
      utils.playSound('sound/btnclick')
    })
  },

  initData (num) {
    num = num || 0.2
    this.keynum = 1
    if (num < 0.3) {
      this.keynum = 1
    } else if (num < 0.7) {
      this.keynum = 2
    } else {
      this.keynum = 3
    }
    this.keynumLabel.string = 'x' + this.keynum

    this.stopTimeout()
    this.timeoutID = setTimeout(() => {
      this.hidePop('ReceiveNode')
    }, 8000)
  },

  stopTimeout: function () {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID)
      this.timeoutID = null
    }
  }

})
