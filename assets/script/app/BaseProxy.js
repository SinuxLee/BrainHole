cc.Class({
  extends: puremvc.Proxy,

  properties: {

  },
  statics: {
    NAME: 'BaseProxy'
  },

  onRegister () {

  },

  onRemove () {

  },

  // 注册网络监听回调
  bindRegister (msgId, pbmessage, callback) {
    require('NetSocketMgr').instance().bindMsg(msgId, pbmessage, callback)
  },

  sendPack (msgId, body) {
    require('NetSocketMgr').instance().sendMsg(msgId, body)
  },

  checkError (errInfo) {

  }

})
