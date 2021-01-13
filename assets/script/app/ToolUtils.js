
var PreloadTool = require("PreloadTool");

window.preloadTool = new PreloadTool();

window.fw = {
    facade:puremvc.Facade,
    enterRoom(){
        var data = {
            m_SectionID:1,
            m_NodeID:1,
        };
        var message = {
            name:MainCommandCodes.ROOM.ENTER_ASK,
            data:data,
        };
        this.facade.sendNotification(appNotice.SOCKET_NOTICE,message);
    }
};