
const PreloadTool = require('PreloadTool')

window.preloadTool = new PreloadTool()

window.fw = {
  facade: puremvc.Facade,
  enterRoom () {
    const data = {
      m_SectionID: 1,
      m_NodeID: 1
    }
    const message = {
      name: MainCommandCodes.ROOM.ENTER_ASK,
      data
    }
    this.facade.sendNotification(appNotice.SOCKET_NOTICE, message)
  }
}
