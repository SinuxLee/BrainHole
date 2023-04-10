cc.Class({
  extends: cc.Component,

  setCb: function (cb) {
    this._cb = cb
  },

  onCollisionEnter: function (other, self) {
    console.log('碰撞')
    if (this._cb) {
      this._cb(other, self)
    }
  }
})
