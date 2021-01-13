cc.Class({
  extends: cc.Component,

  properties: {
    canvas: cc.Canvas
  },

  onLoad: function() {
    let canvas = this.canvas || this.getComponent(cc.Canvas);
    let designResolution = canvas.designResolution;
    let viewSize = cc.view.getFrameSize();
    let xScale = viewSize.width / designResolution.width;
    let yScale = viewSize.height / designResolution.height;
    if (xScale >= yScale) {
      canvas.fitHeight = true;
    } else {
      canvas.fitWidth = true;
    }
  }
});
