const BaseMediator = require('BaseMediator')
cc.Class({
  extends: BaseMediator,

  didRegister () {
    this.bind('GET_ANSWER_CLICK', (pointNum) => {
      window.rewardVideo.showVideo(() => {
        console.log('激励视频播放完成, 领取奖励')
        puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'TipsNode', initData: { pointNum, type: 2 } })
        // puremvc.Facade.sendNotification(appNotice.TOAST_SHOW,{content:"获得钥匙+1", type:0});
        // puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, 1);
      })
    }, this)

    this.bind('GET_KEY_CLICK', (data) => {
      window.rewardVideo.showVideo(() => {
        console.log('激励视频播放完成, 领取奖励')
        puremvc.Facade.sendNotification(appNotice.TOAST_SHOW, { content: '获得钥匙+1', type: 0 })
        puremvc.Facade.sendNotification(appNotice.KEY_CHANGE_EVENT, 1)
      })
    }, this)

    this.bind('GET_KEYADD_CLICK', (data) => {
      this.facade.sendNotification(appNotice.SHOW_POP, { name: 'ShopNode' })
    }, this)

    this.bind('BACK_BTN_CLICK', (data) => {
      this.facade.sendNotification(appNotice.HIDE_NODE, { name: 'PointNode' })
      this.facade.sendNotification(appNotice.SHOW_NODE, { name: 'PointSelect' })
    }, this)
  },

  listNotificationInterests () {
    return [
      appNotice.PLAY_NEXT_LEVEL,
      appNotice.RE_PLAY,
      appNotice.KEY_CHANGE_EVENT
    ]
  },

  initData (data) {
    this.viewComponent.initData(data)
  },

  handleNotification (notification) {
    const data = notification.getBody()
    const view = this.viewComponent
    const name = notification.getName()
    console.log('handleNotification data : ' + name + ':' + JSON.stringify(data))
    switch (name) {
      case appNotice.RE_PLAY:{
        this.viewComponent.rePlay()
      } break
      case appNotice.PLAY_NEXT_LEVEL:{
        this.viewComponent.playNextLevel(data)
      } break
      case appNotice.KEY_CHANGE_EVENT:{
        this.viewComponent.changeKeyNum(data)
      }
        break
    }
  }

})
