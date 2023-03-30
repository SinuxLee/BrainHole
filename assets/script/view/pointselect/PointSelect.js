const BaseCmpt = require('BaseCmpt')
const PointSelectMediator = require('PointSelectMediator')

cc.Class({
  extends: BaseCmpt,
  mediatorName: PointSelectMediator,
  properties: {

  },

  onLoad () {
    this._super()

    const exitBtn = this.node.getChildByName('topbg').getChildByName('exitBtn')
    exitBtn.on('click', () => {
      if (this.pselectIndex == 0) {
        this.hideNode('PointSelect')
      } else if (this.pselectIndex == 1) {
        this.pageview.active = true
        this.tableview.active = false
        this.pselectIndex = 0
      }
      utils.playSound('sound/btnclick')
    }, this)

    const content = this.node.getChildByName('pageview').getChildByName('view').getChildByName('content')

    this.itemList = []
    for (let i = 1; i < 4; ++i) {
      const page = content.getChildByName('page_' + i)
      for (let j = 0; j < page.children.length; j++) {
        this.itemList.push(page.children[j])
      }
    }

    this.pageview = this.node.getChildByName('pageview')

    this.tableview = this.node.getChildByName('tableview')
    this._tableContent = this.tableview.getChildByName('view').getChildByName('content')
    this._viewitemTemp = this._tableContent.children[0]
    this._tableContent.removeChild(this._viewitemTemp)

    this.pselectIndex = 0

    this.initData()
  },

  maxPointSelect: function (event, data) {
    const pointNum = cc.sys.localStorage.getItem('pointNum') || 1
    const selectIndex = Number(data)
    if (selectIndex == 7) {
      puremvc.Facade.sendNotification(appNotice.TOAST_SHOW, { content: '程序小哥拼命开发中~', type: 0 })
    } else if (this.itemList[selectIndex].getChildByName('frame2').active == true) {
      puremvc.Facade.sendNotification(appNotice.TOAST_SHOW, { content: '该关卡未解锁~', type: 0 })
    } else {
      this.initTabViewData(selectIndex)
    }
  },

  initData: function () {
    const pointNum = cc.sys.localStorage.getItem('pointNum') || 1
    const data = [0, 24, 48, 72, 96, 120, 144]

    for (let i = data.length - 1; i >= 0; --i) {
      if (pointNum > data[i]) {
        this.itemList[i].getChildByName('frame1').active = true
        this.itemList[i].getChildByName('frame2').active = false

        for (let j = i - 1; j >= 0; --j) {
          this.itemList[j].getChildByName('frame1').active = false
          this.itemList[j].getChildByName('frame2').active = false
        }
        break
      } else {
        this.itemList[i].getChildByName('frame1').active = false
        this.itemList[i].getChildByName('frame2').active = true
      }
    }
  },

  initTabViewData: function (index) {
    this.pselectIndex = 1
    this.pageview.active = false
    this.tableview.active = true

    const pointNum = cc.sys.localStorage.getItem('pointNum') || 0
    const data = [24, 24, 24, 24, 24, 24, 23]
    for (let i = 0; i < 24; ++i) {
      const node = this.getViewItem(i)
      node.index = index * 24 + i
      if (i < data[index]) {
        node.active = true
      } else {
        node.active = false
      }
      node.getChildByName('level').getComponent('cc.Label').string = node.index + 1
      if (pointNum > node.index) {
        node.getChildByName('star1').active = false
        node.getChildByName('star2').active = true
        node.getChildByName('frame1').active = false
        node.getChildByName('frame2').active = false
      } else if (pointNum == node.index) {
        node.getChildByName('star1').active = true
        node.getChildByName('star2').active = false
        node.getChildByName('frame1').active = true
        node.getChildByName('frame2').active = false
      } else {
        node.getChildByName('star1').active = false
        node.getChildByName('star2').active = false
        node.getChildByName('frame1').active = false
        node.getChildByName('frame2').active = true
      }
    }
  },

  getViewItem: function (index) {
    if (this._tableContent.childrenCount > index) {
      return this._tableContent.children[index]
    }
    const node = cc.instantiate(this._viewitemTemp)
    this._tableContent.addChild(node)
    return node
  },

  onItemClick: function (event) {
    const index = event.target.index + 1
    const pointNum = cc.sys.localStorage.getItem('pointNum') || 1
    if (pointNum < index - 1) {
      puremvc.Facade.sendNotification(appNotice.TOAST_SHOW, { content: '该关卡未解锁', type: 0 })
    } else {
      puremvc.Facade.sendNotification(appNotice.SHOW_NODE, { name: 'PointNode', initData: index })
    }
  },

  refreshData () {
    this.pageview.active = true
    this.tableview.active = false
    this.pselectIndex = 0

    this.initData()
  },

  onDestroy () {
    this._super()
    actionLib.backOut(this.node.getChildByName('content'))
  }
})
