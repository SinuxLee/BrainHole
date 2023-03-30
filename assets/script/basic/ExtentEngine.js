
/**
 * 扩展引擎一些方法  按钮屏蔽多点
 */

cc.NodePool.prototype.getByAttr = function (key, value, ...p) {
  const last = this._pool.length - 1
  if (last < 0) {
    return null
  } else {
    for (let i = 0; i < this._pool.length; i++) {
      const obj = this._pool[i]
      if (obj[key || 'name'] == value) {
        this._pool.splice(i, 1)
        // Invoke pool handler
        const handler = this.poolHandlerComp ? obj.getComponent(this.poolHandlerComp) : null
        if (handler && handler.reuse) {
          handler.reuse.apply(handler, ...p)
        }
        return obj
      }
    }
    return null
  }
}

cc.Toggle.prototype._updateCheckMark = function () {
  if (this.checkMark) {
    this.checkMark.node.active = !!this.isChecked
  }
  this.node.emit('updateCheckMark', this)
}

// let touchId = null;
// let timeoutId = null;
// function startTimeout(tid) {
//     endTimeout();
//     touchId = tid;
//     timeoutId = setTimeout(function () {
//         endTimeout();
//     },400);
// };
//
// function endTimeout(){
//     if(timeoutId !== null){
//         clearTimeout(timeoutId);
//     }
//     timeoutId = null;
//     touchId = null;
// };
//
// cc.Button.prototype._onTouchBegan = function(event) {
//     console.log("_onTouchBegan 1111111111");
//     if (!this.interactable || !this.enabledInHierarchy) return;
//     utils.debugLog("_onTouchBegan1 : " + touchId);
//     if(touchId !== null) return;
//     startTimeout(event.getID());
//     utils.debugLog("_onTouchBegan2 : " + touchId);
//     this._pressed = true;
//     this._updateState();
//     event.stopPropagation();
//
// };
//
// cc.Button.prototype._onTouchEnded = function (event) {
//     console.log("_onTouchEnded 1111111111");
//     if (!this.interactable || !this.enabledInHierarchy) return;
//     utils.debugLog("_onTouchEnded  touchId: " + touchId + "  curTouchId : "+event.getID());
//     if(touchId !== event.getID()) return;
//     // endTimeout();
//     if (this._pressed) {
//         cc.Component.EventHandler.emitEvents(this.clickEvents, event);
//         this.node.emit('click', this);
//     }
//     this._pressed = false;
//     this._updateState();
//     event.stopPropagation();
// };
//
// cc.Button.prototype._onTouchCancel = function() {
//     console.log("_onTouchCancel 1111111111");
//     if (!this.interactable || !this.enabledInHierarchy) return;
//     utils.debugLog("_onTouchCancel : " + touchId);
//     // endTimeout();
//     this._pressed = false;
//     this._updateState();
// };
let canClick = true
cc.Button.prototype._onTouchBegan = function (event) {
  if (!this.interactable || !this.enabledInHierarchy) { return }
  this._pressed = true
  this._updateState()
  event.stopPropagation()
},
//
// cc.Button.prototype._onTouchMove = function(event) {
//     if (!this.interactable || !this.enabledInHierarchy || !this._pressed)
//         return;
//     var touch = event.touch;
//     var hit = this.node._hitTest(touch.getLocation());
//     var target = this._getTarget();
//     var originalScale = this._originalScale;
//     if (this.transition === Transition.SCALE && originalScale) {
//         if (hit) {
//             this._fromScale.x = originalScale.x;
//             this._fromScale.y = originalScale.y;
//             this._toScale.x = originalScale.x * this.zoomScale;
//             this._toScale.y = originalScale.y * this.zoomScale;
//             this._transitionFinished = false;
//         } else {
//             this.time = 0;
//             this._transitionFinished = true;
//             target.setScale(originalScale.x, originalScale.y);
//         }
//     } else {
//         var state = void 0;
//         if (hit) {
//             state = State.PRESSED;
//         } else {
//             state = State.NORMAL;
//         }
//         this._applyTransition(state);
//     }
//     event.stopPropagation();
// },
cc.Button.prototype._onTouchEnded = function (event) {
  if (!this.interactable || !this.enabledInHierarchy) { return }
  if (this._pressed) {
    cc.Component.EventHandler.emitEvents(this.clickEvents, event)
    console.log('********************emit')
    if (canClick == true) {
      this.node.emit('click', this)
      canClick = false
      setTimeout(function () {
        canClick = true
      }, 300)
    } else {
      console.log('cannot click')
    }
  }
  this._pressed = false
  this._updateState()
  event.stopPropagation()
}

cc.Button.prototype._onTouchCancel = function () {
  if (!this.interactable || !this.enabledInHierarchy) { return }
  this._pressed = false
  this._updateState()
}
