const BaseMediator = require('BaseMediator')
cc.Class({
  extends: BaseMediator,
  properties: {
    _data: null
  },

  didRegister () {
    this.bind('CLICK_BTN', (data) => {
      // var callback = this._data.CLICK_BTN[data].callback;
      const callback = this._data.btnArr[data].callback
      if (callback) {
        callback()
      } else {
        this.facade.sendNotification(appNotice.HIDE_POP, { name: 'AlertPopNode' })
      }
    }, this)
  },

  initData (data) {
    this._data = data
    this.viewComponent.initData(data)
  },

  listNotificationInterests () {
    return [
      appNotice.INIT_DATA
    ]
  },

  btnClicked (event) {
    const tag = Number(event.target.name.split('btn')[1])
    const callback = this._data.btnArr[tag].callback
  },

  handleNotification (notification) {
    cc.log(notification)
    const data = notification.getBody()
    const view = this.viewComponent
    const name = notification.getName()
    switch (name) {
      case appNotice.INIT_DATA:{
        this.viewComponent.initData(data)
      } break
    }
  }
})
