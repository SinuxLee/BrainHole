const BaseMediator = require('BaseMediator')
cc.Class({
  extends: BaseMediator,

  didRegister () {

  },

  listNotificationInterests () {
    return [

    ]
  },

  initData (data) {
    if (data) {
      this.viewComponent.initData(data)
    }
  },

  handleNotification (notification) {
    const data = notification.getBody()
    const view = this.viewComponent
    const name = notification.getName()
    console.log('handleNotification data : ' + name + ':' + JSON.stringify(data))
    switch (name) {

    }
  }
})
