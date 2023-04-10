const SingleNumComp = require('SingleNumComp')
cc.Class({
  extends: SingleNumComp,

  onLoad () {
    this._super()
    this.isFlag = false
  },

  addValue: function () {
    this.num++
    if (this.num == 8 && this.isFlag == false) {
      this.num--
      this.isFlag = true
    }
    this.updateLabel()
  }
})
