cc.Class({
  extends: cc.Component,

  properties: {
    canvas: cc.Canvas
  },

  onLoad: function () {
    const canvas = this.canvas || this.getComponent(cc.Canvas)
    const designResolution = canvas.designResolution
    const viewSize = cc.view.getFrameSize()
    const xScale = viewSize.width / designResolution.width
    const yScale = viewSize.height / designResolution.height
    if (xScale >= yScale) {
      canvas.fitHeight = true
    } else {
      canvas.fitWidth = true
    }
  }
})
