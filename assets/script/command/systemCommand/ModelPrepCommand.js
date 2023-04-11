const UserProxy = require('UserProxy')

cc.Class({
  extends: puremvc.SimpleCommand,

  execute (notification) {
    this.facade.registerProxy(new UserProxy(UserProxy.NAME))
  }
})
