//index.js
//获取应用实例
const io = require('../../utils/io.js')

const app = getApp()

Page({
  data: {
    userInfo: null,
    userImg: '../../image/user-img.jpg'
  },
  
  onLoad (o) {
    if (app.globalData.userInfo) {
      this.setData({userInfo: app.globalData.userInfo})
    }
  },

  getUserInfo(e) {
    if (e.detail.userInfo) {
      this.setData({ userInfo: e.detail.userInfo })
    }
    
    // app.getUserInfo(userInfo => {
    //   this.setData({ userInfo: userInfo })
    // })
  }
})
