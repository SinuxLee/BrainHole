var ModelPrepCommand = require("ModelPrepCommand");
var ControllerPrepCommand = require("ControllerPrepCommand");
var ViewPrepCommand = require("ViewPrepCommand");
cc.Class({
    extends:puremvc.MacroCommand,
    properties: {

    },
    initializeMacroCommand:function(){
        this.addSubCommand(ModelPrepCommand);
        this.addSubCommand(ViewPrepCommand);
        this.addSubCommand(ControllerPrepCommand);
    }
});
