const UserCommand = require('UserCommand')

cc.Class({
  extends: puremvc.SimpleCommand,

  execute (notification) {
    UserCommand.register()
  }
})
