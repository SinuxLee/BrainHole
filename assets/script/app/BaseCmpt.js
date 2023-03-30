cc.Class({
  extends: cc.Component,
  mediatorName: null,

  onLoad () {
    const name = this.node.name + this.node.uuid
    puremvc.Facade.registerMediator(new this.mediatorName(name, this))

    this.view = {}
    this.load_all_object(this.node, '')
  },

  onEnable () {
    this.view = {}
    this.load_all_object(this.node, '')
  },

  getEvent () {
    if (!this._event) {
      this._event = new Emitter()
    }
    return this._event
  },

  dispatchEvent (eventName, param) {
    this.getEvent().emit(eventName, param)
  },

  // hide-show时刷新数据用
  refreshData () {

  },

  // 统一关闭事件
  hideNode (prefabName) {
    puremvc.Facade.sendNotification(appNotice.HIDE_NODE, { name: prefabName })
  },

  hidePop (prefabName) {
    puremvc.Facade.sendNotification(appNotice.HIDE_POP, { name: prefabName })
  },

  onDestroy () {
    const name = this.node.name + this.node.uuid
    puremvc.Facade.removeMediator(name)
  },

  load_all_object (root, path) {
    for (let i = 0; i < root.childrenCount; i++) {
      this.view[path + root.children[i].name] = root.children[i]
      this.load_all_object(root.children[i], path + root.children[i].name + '/')
    }
  }
})
