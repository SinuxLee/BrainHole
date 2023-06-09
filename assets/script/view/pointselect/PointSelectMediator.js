const BaseMediator = require('BaseMediator')
cc.Class({
  extends: BaseMediator,

  didRegister () {
    this.bind('GET_ANSWER_CLICK', (data) => {

    }, this)

    this.bind('GET_KEY_CLICK', (data) => {

    }, this)

    this.bind('GET_KEYADD_CLICK', (data) => {

    }, this)

    this.bind('TIP_BTN_CLICK', (data) => {

    }, this)

    this.bind('SKIP_BTN_CLICK', (data) => {

    }, this)

    this.bind('REPLAY_BTN_CLICK', (data) => {

    }, this)

    this.bind('BACK_BTN_CLICK', (data) => {

    }, this)
  },

  listNotificationInterests () {
    return [

    ]
  },

  handleNotification (notification) {
    const data = notification.getBody()
    const view = this.viewComponent
    const name = notification.getName()
    console.log('handleNotification data : ' + name + ':' + JSON.stringify(data))
    switch (name) {

    }
  },

  refreshData () {
    this.viewComponent.refreshData()
  }

})
