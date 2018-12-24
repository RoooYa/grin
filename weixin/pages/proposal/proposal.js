//index.js
//获取应用实例
const io = require('../../utils/io.js')

const app = getApp()

Page({
  data: {
    text: '',
    loading: false
  },
  
  onLoad (o) {
    
  },

  blur (e) {
    this.setData({ text: e.detail.value})
  },

  ok () {
    setTimeout(()=> {
      if (this.data.text.length >= 5) {
        this.setData({ loading: true })
        io({ url: '/weChat/proposal/add', data: { text: this.data.text }}, () => {
          wx.showToast({ title: '提交成功' })
          this.setData({ text: ''})
          this.setData({ loading: false })
        }, ()=> {
          wx.showToast({ title: '提交失败', icon: 'none' })
          this.setData({ loading: false })
        })
      } else {
        wx.showToast({ title: '至少输入5个字符', icon: 'none' })
      }
    }, 50)
  }
})
