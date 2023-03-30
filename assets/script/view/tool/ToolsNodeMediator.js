const BaseMediator = require('BaseMediator')
cc.Class({
  extends: BaseMediator,
  properties: {
    _data: null
  },

  didRegister () {

  },

  listNotificationInterests () {
    return [

    ]
  },

  handleNotification (notification) {
    cc.log(notification)
    const data = notification.getBody()
    const view = this.viewComponent
    const name = notification.getName()
    switch (name) {

    }
  }
})
