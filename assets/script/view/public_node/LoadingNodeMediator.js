cc.Class({
  extends: puremvc.Mediator,
  properties: {
    nodePool: null
  },
  statics: {
    NAME: 'LoadingNodeMediator'
  },
  onRegister () {
    cc.log(this.mediatorName + ' onRegister')
  },
  onRemove () {
    cc.log(this.mediatorName + ' onRemove')
  },
  listNotificationInterests () {
    return [
      appNotice.PRELOAD_SHOW,
      appNotice.PRELOAD_PROGRESS,
      appNotice.PRELOAD_COMPLETE,
      appNotice.LOADING_LOGO_SHOW,
      appNotice.LOADING_LOGO_HIDE
    ]
  },
  handleNotification (notification) {
    const data = notification.getBody()
    const notificationName = notification.getName()
    const view = this.viewComponent
    switch (notificationName) {
      case appNotice.PRELOAD_SHOW:{
        view.loadingNode.active = true
        view.loadingProgressBar.node.active = true
      } break
      case appNotice.PRELOAD_PROGRESS:{
        const progress = data.progress
        view.loadingProgressBar.progress = progress
        view.progressLabel.string = (progress * 100).toFixed(1) + '%'
      } break
      case appNotice.PRELOAD_COMPLETE:{
        view.loadingNode.active = false
        view.loadingProgressBar.node.active = false
      } break
      case appNotice.LOADING_LOGO_SHOW:{
        view.loadingLogoNode.active = true
        view.loadingNode.active = true
        view.loadingLogoCircle.rotation = 0
        view.loadingLogoCircle.runAction(cc.repeatForever(cc.rotateBy(1.0, 360)))
      } break
      case appNotice.LOADING_LOGO_HIDE:{
        view.loadingNode.active = false
        view.loadingLogoCircle.stopAllActions()
        view.loadingNode.active = false
        view.loadingLogoNode.active = false
      } break
    }
  }
})
