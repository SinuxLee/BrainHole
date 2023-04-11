const BaseProxy = require('BaseProxy')

cc.Class({
  extends: BaseProxy,

  statics: {
    NAME: 'USERPROXY'
  },

  onRegister () {

  },

  setKeyValue (key, value) {
    cc.sys.localStorage.setItem(key, value)
  },

  getValueByKey (key) {
    return cc.sys.localStorage.getItem(key)
  },

  removeKeyValue (key) {
    cc.sys.localStorage.removeItem(key)
  },

  onRemove () {

  }
})
