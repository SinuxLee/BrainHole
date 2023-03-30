const BaseMediator = require('BaseMediator')
cc.Class({
  extends: BaseMediator,

  properties: {

  },

  didRegister () {

  },

  listNotificationInterests () {
    return [

    ]
  },

  initData: function () {
    this.viewComponent.initData()
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
