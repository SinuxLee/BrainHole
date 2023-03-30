const BaseCmpt = require('BaseCmpt')
const PointNodeMediator = require('PointNodeMediator')

cc.Class({
  extends: BaseCmpt,
  mediatorName: PointNodeMediator,
  properties: {
    resultTips: cc.Node
  },

  onLoad () {
    this._super()

    const getanswerBtn = this.node.getChildByName('getanswerBtn')
    getanswerBtn.on('click', () => {
      const pointNum = Number(this.levelnumLabel.string)
      this.dispatchEvent('GET_ANSWER_CLICK', pointNum)
      utils.playSound('sound/btnclick')
      window.rewardVideo.dateMark(1018)
    }, this)

    const getkeyBtn = this.node.getChildByName('getkeyBtn')
    getkeyBtn.on('click', () => {
      this.dispatchEvent('GET_KEY_CLICK')
      utils.playSound('sound/btnclick')
      window.rewardVideo.dateMark(1019)
    }, this)

    const topbg = this.node.getChildByName('topbg')
    this.keynumLabel = topbg.getChildByName('keybg').getChildByName('keynum').getComponent('cc.Label')
    const keyaddbtn = topbg.getChildByName('keybg').getChildByName('keyaddbtn')
    keyaddbtn.on('click', () => {
      this.dispatchEvent('GET_KEYADD_CLICK')
      utils.playSound('sound/btnclick')
      window.rewardVideo.dateMark(1012)
    }, this)

    this.levelnumLabel = this.node.getChildByName('level').getChildByName('levelnum').getComponent('cc.Label')

    const tipbtn = topbg.getChildByName('tipbtn')
    tipbtn.on('click', () => {
      window.rewardVideo.dateMark(1026, 1)
      const keyNum = Number(this.keynumLabel.string)
      if (keyNum > 0) {
        this.changeKeyNum(-1)
        puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'TipsNode', initData: { pointNum: Number(this.levelnumLabel.string), type: 1 } })
      } else {
        window.rewardVideo.showVideo(() => {
          console.log('激励视频播放完成, 领取奖励')
          puremvc.Facade.sendNotification(appNotice.TOAST_SHOW, { content: '获得钥匙+1', type: 0 })
          puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'TipsNode', initData: { pointNum: Number(this.levelnumLabel.string), type: 1 } })
        })
      }
      utils.playSound('sound/btnclick')

      window.rewardVideo.dateMark(1014)
    }, this)

    const skipbtn = topbg.getChildByName('skipbtn')
    skipbtn.on('click', () => {
      window.rewardVideo.dateMark(1026, 2)
      puremvc.Facade.sendNotification(appNotice.SHOW_POP, { name: 'SkipNode', initData: { pointNum: Number(this.levelnumLabel.string) } })
      utils.playSound('sound/btnclick')
      window.rewardVideo.dateMark(1015)
    }, this)

    const replaybtn = topbg.getChildByName('replaybtn')
    replaybtn.on('click', () => {
      this.panel.removeAllChildren()
      this.initData(Number(this.levelnumLabel.string))
      utils.playSound('sound/btnclick')
      window.rewardVideo.dateMark(1016)
    }, this)

    const backbtn = topbg.getChildByName('backbtn')
    backbtn.on('click', () => {
      this.dispatchEvent('BACK_BTN_CLICK')
      utils.playSound('sound/btnclick')
      window.rewardVideo.dateMark(1017)
    }, this)

    this.panel = this.node.getChildByName('panel')

    const keyNum = cc.sys.localStorage.getItem('keyNum') || 0
    this.keynumLabel.string = keyNum
  },

  start: function () {
    this.resultTips.active = false
  },

  changeKeyNum: function (num) {
    let keyNum = Number(this.keynumLabel.string) + num
    if (keyNum < 0) {
      keyNum = 0
    }
    this.keynumLabel.string = Number(this.keynumLabel.string) + num
  },

  setLevelNum: function (num) {
    this.levelnumLabel.string = num
  },

  initData: function (data) {
    this.setLevelNum(data)
    this.panel.removeAllChildren()
    // puremvc.Facade.sendNotification(appNotice.LOADING_LOGO_SHOW);
    preloadTool.loadPrefab('levels/level_' + data, (err, view) => {
      // puremvc.Facade.sendNotification(appNotice.LOADING_LOGO_HIDE);
      if (err) {
        this.hideNode('PointNode')
        return
      }

      this.panel.addChild(view)
    })
  },

  rePlay: function () {
    this.panel.removeAllChildren()
    this.initData(Number(this.levelnumLabel.string))
  },

  playNextLevel: function (data) {
    this.setLevelNum(data)
    this.panel.removeAllChildren()
    // puremvc.Facade.sendNotification(appNotice.LOADING_LOGO_SHOW);
    preloadTool.loadPrefab('levels/level_' + data, (err, view) => {
      // puremvc.Facade.sendNotification(appNotice.LOADING_LOGO_HIDE);
      if (err) {
        this.hideNode('PointNode')
        puremvc.Facade.sendNotification(appNotice.TOAST_SHOW, { content: '恭喜完全通关,新关卡在开发中', type: 0 })
        return
      }
      this.resultTips.active = false
      this.panel.addChild(view)
    })
  },

  onDestroy () {
    this._super()
    actionLib.backOut(this.node.getChildByName('content'))
  }
})
