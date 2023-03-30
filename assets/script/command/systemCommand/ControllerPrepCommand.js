const UserCommand = require('UserCommand')

cc.Class({
  extends: puremvc.SimpleCommand,

  properties: {

  },

  execute (notification) {
    UserCommand.register()
  }
})
