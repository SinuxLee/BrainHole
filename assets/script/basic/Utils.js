
// 设置字符串的反转
String.prototype.reverse = function () {
  let str = ''
  for (let index = this.length - 1; index >= 0; index--) {
    str += this[index]
  }
  return str
}

// 数组洗牌打乱
Array.prototype.shuffle = function () {
  const input = this

  for (let i = input.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const itemAtIndex = input[randomIndex]

    input[randomIndex] = input[i]
    input[i] = itemAtIndex
  }
  return input
}

window.utils = {
  /**
     * 截取字符串（含中文）
    */
  subString: function (str, len) {
    let strlen = 0
    let s = ''
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 128) {
        strlen += 2
      } else {
        strlen++
      }
      s += str.charAt(i)
      if (strlen >= len) {
        return s + '...'
      }
    }
    return str
  },
  /**
     * 调试的时候用
     * 输出调用栈
     */
  stackTrace: function () {
    const _err = new Error()
    const stack = _err.stack
    console.warn(stack)
  },

  // 时间格式化 分:秒
  GetDateTime: function (time) {
    let m_string = ''
    let m

    let s_string = ''
    let s
    // 时
    if (time > 3600) {
      return '60:00'
    }

    // 分
    const left = time
    m = Math.floor(left / 60)
    if (m < 10) {
      m_string = '0' + m
    } else {
      m_string = '' + m
    }
    // 秒
    s = left - 60 * m
    if (s < 10) {
      s_string = '0' + s
    } else {
      s_string = '' + s
    }

    return m_string + ':' + s_string
  },

  // 数字转化（万）
  numbertostring: function (num) {
    if (num >= 100000) {
      const ww = Math.floor(num / 10000)
      const qw = Math.floor((num % 10000) / 1000)
      const bw = Math.floor((num % 1000) / 100)
      const sw = Math.floor((num % 100) / 10)
      const gw = (num % 10)
      var str = ''
      if (bw == 0) {
        if (qw == 0) {
          return ww + '万'
        } else {
          return ww + '.' + qw + '万'
        }
      }
      str = ww + '.' + qw + bw
      str = str.substring(0, 4) + '万'
      return str
    } else if (num > 1000) {
      var str = num.toString()
      str = str.substring(0, str.length - 3) + ',' + str.substring(str.length - 3, 3)
      return str
    }
    return num
  },

  /**
     * 使用网络或resources中的资源重置图片文理
     * @param imageNode
     * @param url
     */
  restSpriteFrame (imageNode, url, cb) {
    if (!(imageNode instanceof cc.Node)) return
    if (typeof url !== 'string') return
    const sp = imageNode.getComponent(cc.Sprite)
    if (!sp) return

    let loadName = 'loadRes'
    let p = url
    if (url.indexOf('http') >= 0) {
      loadName = 'load'
      const type = cc.path.extname(url).substr(1, 3)
      p = { url, type: type != 'jpg' ? 'png' : 'jpg' }
    }

    cc.loader[loadName](p, (err, tex) => {
      if (err || !cc.isValid(sp)) return
      sp.spriteFrame = new cc.SpriteFrame(tex)
      cb && cb()
    })
  },

  flyMoney (srcPos, targetPos, completeCallBack) {
    const gapTime = 0.08
    const moveTime = 0.4
    const maxCount = 8
    srcPos = srcPos || cc.v2(cc.winSize.width / 2, cc.winSize.height / 2)
    targetPos = targetPos || cc.v2(100, cc.winSize.height - 40)

    cc.loader.loadRes('texture/keyicon', cc.SpriteFrame, (err, sp) => {
      if (err) {
        return it.log1(err)
      }

      const node = new cc.Node()
      const itemSp = node.addComponent('cc.Sprite')
      itemSp.spriteFrame = sp

      cc.director.getScene().addChild(node, 2)
      node.setPosition(srcPos.x, srcPos.y)

      const action1 = cc.delayTime(0.1)
      const action2 = cc.moveTo(0.4, targetPos).easing(cc.easeSineInOut())
      const action3 = cc.callFunc(() => {
        node.removeFromParent()
        if (completeCallBack) {
          completeCallBack()
        }
      })
      node.stopAllActions()
      node.runAction(cc.sequence(action1, action2, action3))
    })
  },

  playMusic (url) {
    cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
      const audioID = cc.audioEngine.playMusic(clip, true)
    })
  },

  stopMusic () {
    cc.audioEngine.stopMusic()
  },

  pauseMusic () {
    cc.audioEngine.pauseMusic()
  },

  resumeMusic () {
    cc.audioEngine.resumeMusic()
  },

  playSound (url) {
    cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
      const audioID = cc.audioEngine.play(clip, false, 1)
    })
  },

  stopEffect () {
    cc.audioEngine.stopAllEffects()
  }

}
