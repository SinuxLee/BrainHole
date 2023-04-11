const ModelPrepCommand = require('ModelPrepCommand')
const ControllerPrepCommand = require('ControllerPrepCommand')
const ViewPrepCommand = require('ViewPrepCommand')

cc.Class({
  extends: puremvc.MacroCommand,

  initializeMacroCommand () {
    this.addSubCommand(ModelPrepCommand)
    this.addSubCommand(ViewPrepCommand)
    this.addSubCommand(ControllerPrepCommand)
  }
})
