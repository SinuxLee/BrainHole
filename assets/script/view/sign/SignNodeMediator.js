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

  refreshData () {
    this.viewComponent.refreshData()
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
