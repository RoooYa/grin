//app.js
const io = require('./utils/io.js')
App({
  // 小程序初始化完成时（全局只触发一次）
  onLaunch () {
    this.getWord()
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.getUserInfo()
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    wordList: []
  },
  getUserInfo(fn) {
    wx.getUserInfo({
      success: res => {
        this.globalData.userInfo = res.userInfo
        fn && fn(res.userInfo)
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  getWord () {
    io({ url: '/weChat/word', data: { st: 0 } }, (res) => {
      if (res.datas.length) {
        this.globalData.wordList = res.datas
      }
    })
  }
})