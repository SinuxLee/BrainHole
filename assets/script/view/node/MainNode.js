const BaseCmpt = require('BaseCmpt')
const MainNodeMediator = require('MainNodeMediator')

cc.Class({
  extends: BaseCmpt,
  // mediator名字定义
  mediatorName: MainNodeMediator,

  onLoad () {
    this._super()

    const keyaddbtn = this.node.getChildByName('keybg').getChildByName('keyaddbtn')
    keyaddbtn.on('click', () => {
      this.dispatchEvent('KEY_ADD_BTN')
      utils.playSound('sound/btnclick')
    })

    this.keynumLabel = this.node.getChildByName('keybg').getChildByName('keynum').getComponent('cc.Label')

    // 开始游戏
    const startbtn = this.node.getChildByName('startbtn')
    startbtn.on('click', () => {
      this.dispatchEvent('START_GAME_CLICK')
      utils.playSound('sound/btnclick')
    })

    const shopbtn = this.node.getChildByName('shopbtn')
    shopbtn.on('click', () => {
      this.dispatchEvent('SHOP_BTN_CLICK')
      utils.playSound('sound/btnclick')
    })

    const taskbtn = this.node.getChildByName('taskbtn')
    taskbtn.on('click', () => {
      this.dispatchEvent('TASK_BTN_CLICK')
      utils.playSound('sound/btnclick')
    })

    const levelbtn = this.node.getChildByName('levelbtn')
    levelbtn.on('click', () => {
      this.dispatchEvent('LEVEL_BTN_CLICK')
      utils.playSound('sound/btnclick')
    })
    
    const getkeybtn = this.node.getChildByName('getkeybtn')
    getkeybtn.on('click', () => {
      this.dispatchEvent('GETKEY_BTN_CLICK')
      utils.playSound('sound/btnclick')
    })

    const keyNum = cc.sys.localStorage.getItem('keyNum') || 0
    this.keynumLabel.string = keyNum
  },

  start () {
    cc.log('MainNode load success')
    window.rewardVideo.dateMark(1005)
  },

  onEnable () {
    utils.playMusic('sound/bj')
  },

  onDisable () {
    utils.stopMusic()
  },

  changeKeyNum (num) {
    this.keynumLabel.string = Number(this.keynumLabel.string) + num
    cc.sys.localStorage.setItem('keyNum', this.keynumLabel.string)
  },

  refreshKeyNum () {
    const keyNum = cc.sys.localStorage.getItem('keyNum') || 0
    this.keynumLabel.string = keyNum
  },

  onToolPanel () {
    puremvc.Facade.sendNotification(appNotice.SHOW_NODE, { name: 'ToolsNode' })
  },

  onDestroy () {
    this._super()
  }
})
