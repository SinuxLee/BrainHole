const URL = 'http://sgame_jielong.99yjn.com'

var HTTP = cc.Class({
  extends: cc.Component,

  statics: {
    sessionId: 0,
    userId: 0,
    master_url: URL,
    url: URL,
    sendRequest: function (path, data, handler, extraUrl) {
      const xhr = cc.loader.getXMLHttpRequest()
      xhr.timeout = 5000
      let str = '?'
      for (const k in data) {
        if (str != '?') {
          str += '&'
        }
        str += k + '=' + data[k]
      }
      if (extraUrl == null) {
        extraUrl = HTTP.url
      }
      const requestURL = extraUrl + path + encodeURI(str)
      console.log('RequestURL:' + requestURL)
      xhr.open('GET', requestURL, true)
      if (cc.sys.isNative) {
        xhr.setRequestHeader('Accept-Encoding', 'gzip,deflate', 'text/html;charset=UTF-8')
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
          console.log('http res(' + xhr.responseText.length + '):' + xhr.responseText)
          try {
            const ret = JSON.parse(xhr.responseText)
            if (handler !== null) {
              handler(ret)
            } /* code */
          } catch (e) {
            console.log('err:' + e)
            // handler(null);
          } finally {
            if (cc.vv && cc.vv.wc) {
              //       cc.vv.wc.hide();
            }
          }
        }
      }

      if (cc.vv && cc.vv.wc) {
        // cc.vv.wc.show();
      }
      xhr.send()
      return xhr
    },

    postRequest: function (path, data, handler, extraUrl) {
      const xhr = cc.loader.getXMLHttpRequest()
      xhr.timeout = 5000
      const str = data
      if (extraUrl == null) {
        extraUrl = HTTP.url
      }
      const requestURL = extraUrl + path
      console.log('RequestURL:' + requestURL)
      console.log(`POSTING DATA: ${JSON.stringify(str)}`)
      xhr.open('POST', requestURL, true)
      if (cc.sys.isNative) {
        xhr.setRequestHeader('Accept-Encoding', 'gzip,deflate', 'text/html;charset=UTF-8')
      }
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

      xhr.onreadystatechange = function () {
        console.log(`xhr.readyState=${xhr.readyState}, xhr.status=${xhr.status}`)
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
          console.log('http res(' + xhr.responseText.length + '):' + xhr.responseText)
          try {
            const ret = JSON.parse(xhr.responseText)
            if (handler !== null) {
              handler(ret)
            } /* code */
          } catch (e) {
            console.log('err:' + e)
            // handler(null);
          } finally {
            if (cc.vv && cc.vv.wc) {
              //       cc.vv.wc.hide();
            }
          }
        }
      }

      if (cc.vv && cc.vv.wc) {
        // cc.vv.wc.show();
      }
      xhr.send(str)
      return xhr
    }
  }
})
