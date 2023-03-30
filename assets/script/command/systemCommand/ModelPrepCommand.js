const UserProxy = require('UserProxy')

cc.Class({
  extends: puremvc.SimpleCommand,

  properties: {

  },

  execute (notification) {
    this.facade.registerProxy(new UserProxy(UserProxy.NAME))
  }
})
