const BaseCmpt = require('BaseCmpt')
const GiftNodeMediator = require('GiftNodeMediator')

cc.Class({
  extends: BaseCmpt,
  mediatorName: GiftNodeMediator,
  properties: {
    progressBarView: {
      type: cc.ProgressBar,
      default: null
    }
  },

  onLoad () {
    this._super()

    const kdopenBtn = this.node.getChildByName('kdopenBtn')
    kdopenBtn.on(cc.Node.EventType.TOUCH_START, this.onTouchStart.bind(this))
    kdopenBtn.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd.bind(this))
    kdopenBtn.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel.bind(this))

    this.lefttimeLabel = this.node.getChildByName('lefttime').getComponent('cc.Label')
  },

  initData () {
    this.isEnd = false
    this.progress = 0
    this.progressBarView.progress = this.progress
    this.lefttimeLabel.string = '5.00s'
    this.startDownTime()
  },

  onTouchStart () {
    this.stopTimeout()
    this.progress = this.progress + 0.02
    this.progressBarView.progress = this.progress
    this.startTimeOut(0.03)
  },

  onTouchEnd () {
    this.stopTimeout()
    this.timeOutId = setTimeout(() => {
      this.startTimeOut(-0.02)
    }, 300)
  },

  onTouchCancel () {
    this.stopTimeout()
    this.timeOutId = setTimeout(() => {
      this.startTimeOut(-0.02)
    }, 300)
  },

  startTimeOut (num) {
    const callback = () => {
      this.progress = this.progress + num
      if (this.progress >= 1) {
        this.progress = 1
        this.successEnd()
      } else if (this.progress <= 0) {
        this.progress = 0
        this.stopBtnInterval()
      }
      this.progressBarView.progress = this.progress
    }

    this.stopBtnInterval()
    this.btnIntervalId = setInterval(callback, 300)
  },

  stopTimeout () {
    clearTimeout(this.timeOutId)
    this.timeOutId = null
  },

  stopBtnInterval () {
    clearInterval(this.btnIntervalId)
    this.btnIntervalId = null
  },

  startDownTime () {
    const startTime = Date.now() + 5000
    const callback = () => {
      let lefttime = startTime - Date.now()
      if (lefttime <= 1) {
        lefttime = 1
        this.successEnd()
      }
      this.lefttimeLabel.string = (lefttime / 1000).toFixed(2) + 's'
    }

    this.stopGiftInterval()
    this.giftIntervalId = setInterval(callback, 100)
  },

  stopGiftInterval () {
    clearInterval(this.giftIntervalId)
    this.giftIntervalId = null
  },

  successEnd () {
    if (!this.isEnd) {
      this.isEnd = true
      this.stopGiftInterval()
      this.stopBtnInterval()
      setTimeout(() => {
        puremvc.Facade.sendNotification(appNotice.SHOW_POP, { 
          name: 'ReceiveNode', initData: this.progressBarView.progress || 0 
        })
      }, 200)
    }
  }

})
