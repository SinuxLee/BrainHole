
window.actionLib = {

  /**
     * 打开动画
     *
     * 快速移动超出目标，然后慢慢回到目标点
     * 从0缩放到1再超过1,再到1
     * 例子
        start () {
            actionLib.backOut(this.node.getChildByName("content"));
        },
     * @param node
     * @param duration
     * @param cb
     * @param tar
     */
  backIn (node, cb, tar, duration) {
    if (node) {
      node.stopAllActions()
      node.scale = 0
      node.runAction(cc.sequence(cc.scaleTo(duration || 0.2, 1).easing(cc.easeBackOut(0.2)), cc.callFunc(() => {
        if (cb) {
          tar ? cb.call(tar) : cb()
        }
      })))
    } else {
      if (cb) {
        tar ? cb.call(tar) : cb()
      }
    }
  },

  backOut (node, cb, tar, duration) {
    if (node) {
      node.stopAllActions()
      node.runAction(cc.sequence(cc.scaleTo(duration || 0.2, 0).easing(cc.easeBackIn(0.2)), cc.callFunc(() => {
        if (cb) {
          tar ? cb.call(tar) : cb()
        }
      })))
    } else {
      if (cb) {
        tar ? cb.call(tar) : cb()
      }
    }
  },

  downIn (node, cb, tar, duration) {
    if (node && node.parent) {
      node.stopAllActions()
      node.y = -1 * node.height / 2
      node.parent.getComponent('cc.Widget').updateAlignment()
      const dt = (node.parent.height - node.height) / 2
      node.y = -dt
      node.y -= node.height
      node.runAction(cc.sequence(cc.moveBy(duration || 0.2, cc.v2(0, node.height / 2)).easing(cc.easeOut(1)), cc.callFunc(() => {
        if (cb) {
          tar ? cb.call(tar) : cb()
        }
      })))
    } else {
      if (cb) {
        tar ? cb.call(tar) : cb()
      }
    }
  },

  downOut (node, cb, tar, duration) {
    if (node) {
      node.stopAllActions()
      node.runAction(cc.sequence(cc.moveBy(duration || 0.2, cc.v2(0, -node.height)).easing(cc.easeOut(4)), cc.callFunc(() => {
        if (cb) {
          tar ? cb.call(tar) : cb()
        }
      })))
    } else {
      if (cb) {
        tar ? cb.call(tar) : cb()
      }
    }
  }

}
