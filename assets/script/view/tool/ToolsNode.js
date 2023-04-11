const BaseCmpt = require('BaseCmpt')
const ToolsNodeMediator = require('ToolsNodeMediator')

cc.Class({
  extends: BaseCmpt,
  mediatorName: ToolsNodeMediator,

  start () {
    const versionNum = this.node.getChildByName('bg').getChildByName('versionNum')
    versionNum.getComponent('cc.Label').string = window.Version || 'dev'

    const closebtn = this.node.getChildByName('bg').getChildByName('closebtn')
    closebtn.on('click', () => {
      puremvc.Facade.sendNotification(appNotice.HIDE_NODE, { name: 'ToolsNode' })
    }, this)

    const addKeyBtn = this.node.getChildByName('bg').getChildByName('addKeyBtn')
    addKeyBtn.on('click', () => {
      let num = this.node.getChildByName('bg').getChildByName('keynum').getComponent('cc.EditBox').string
      num = Number(num) || 1
      cc.sys.localStorage.setItem('keyNum', num)
      puremvc.Facade.sendNotification(appNotice.KEY_REFRESH_EVENT)
    }, this)

    const skipBtn = this.node.getChildByName('bg').getChildByName('skipBtn')
    skipBtn.on('click', () => {
      let num = this.node.getChildByName('bg').getChildByName('pointnum').getComponent('cc.EditBox').string
      num = Number(num) || 1
      if (num && num > 0 && num < 168) {
        cc.sys.localStorage.setItem('pointNum', num)
      }
    }, this)
  }
})
