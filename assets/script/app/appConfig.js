const UserProxy = require('UserProxy')
const preDepends = {
  prefab: ['ToastNode']
}
const depends = {
  MainNode: ['resDir_json'],
  GameNodeGetRes: function () {
    const resArr = []
    puremvc.Facade.retrieveProxy(UserProxy.NAME).sortCourseJson()
    const jsonData = puremvc.Facade.retrieveProxy(UserProxy.NAME).jsonData
    for (const key in jsonData) {
      const data = jsonData[key]
      if (data.bg) {
        const bg = 'image_bg/' + data.bg
        if (resArr.indexOf(bg) == -1) {
          resArr.push(bg)
        }
      }
      if (data.pId) {
        const person = 'image_person/' + data.pId
        if (resArr.indexOf(person) == -1) {
          resArr.push(person)
        }
      }
    }
    cc.log(resArr)
    return resArr
  }
}
window.appConfig = {
  depends,
  preDepends
}
