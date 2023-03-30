const BaseCmpt = require('BaseCmpt')
const AlertPopNodeMediator = require('AlertPopNodeMediator')
cc.Class({
  extends: BaseCmpt,
  mediatorName: AlertPopNodeMediator,
  properties: {
    titleLabel: cc.Label,
    contentLabel: cc.Label,
    btnContent: cc.Node
  },

  start () {
    const btn0Node = this.btnContent.children[0]
    btn0Node.on('click', () => {
      this.dispatchEvent('CLICK_BTN', 0)
    }, this)

    const btn1Node = this.btnContent.children[1]
    btn1Node.on('click', () => {
      this.dispatchEvent('CLICK_BTN', 1)
    }, this)
  },

  initData (data) { // {title:"",content:"",btnArr:[{name:"",callback:""},{name:"",callback:""}]}
    if (data.title) {
      this.titleLabel.string = data.title
    } else {
      this.titleLabel.node.active = false
    }
    this.contentLabel.string = data.content
    for (let i = 0; i < this.btnContent.childrenCount; i++) {
      const btnNode = this.btnContent.children[i]
      const btnData = data.btnArr[i]
      if (data.btnArr.length <= i) {
        btnNode.active = false
      } else {
        btnNode.active = true
        btnNode.getChildByName('buttonLabel').getComponent(cc.Label).string = btnData.name
      }
    }
    this.btnContent.getComponent(cc.Layout).updateLayout()
  }
})
