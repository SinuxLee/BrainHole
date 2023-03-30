cc.Class({
  extends: cc.Component,

  properties: {
  },

  showVideo (onSuccess, onFailed) {
    this.onSuccess = onSuccess
    this.onFailed = onFailed

    if (CC_DEV) {
      if (this.onSuccess) {
        this.onSuccess()
      }
    } else {
      window.adInterface.click('vedio')
      this.dateMark(1020)
    }
  },

  onSuccess () {
    if (this.onSuccess) {
      this.onSuccess()
      this.dateMark('26')
    }
  },

  onFailed () {
    if (this.onFailed) {
      this.onFailed()
    }
  },

  // 插屏广告
  showSplash () {
    if (CC_DEV) {
      console.log('play splash ad')
    } else {
      window.adInterface.click('splash')
      this.dateMark(1021)
    }
  },

  // 数据埋点
  dateMark (id, param) {
    if (CC_DEV) {
      console.log('dateMark:', id, param)
    } else {
      window.adInterface.event(id, param || '')
    }
  }

})
