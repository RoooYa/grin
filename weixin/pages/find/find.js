//index.js
//获取应用实例
const io = require('../../utils/io.js')
const request = require('../../utils/request.js')
const collect = require('../../utils/collection.js')

const app = getApp()

Page({
  data: {
    list: [],
    loading: true,
    loadingTxt: '正在加载...'
  },
  onLoad() {
    this.getWord(() => {
      wx.stopPullDownRefresh()
    })
  },

  // 滚动触底
  onReachBottom () {
    this.getWord()
  },

  // 监听用户下拉刷新事件。
  onPullDownRefresh() {
    let self = this
    this.setData({ list: [] })
    wx.stopPullDownRefresh({
      success() {
        self.getWord()
      }
    })
  },

  // 监听用户点击页面内转发按钮
  onShareAppMessage(obj) {},

  // 查看图片
  viewImages: function (event) {
    let data = event.currentTarget.dataset
    wx.previewImage({
      urls: data.urls,
      current: data.current
    })
  },

  getWord(fn) {
    this.setData({ loading: true })
    this.setData({ error: false })
    this.setData({ loadingTxt: '正在加载...' })
    io({ url: '/weChart/word/so', data: { start: this.data.list.length}}, (res) => {
      this.setData({ loading: false })
      this.setData({ list: this.data.list.concat(res.datas) })
      fn && fn()
    }, (e) => {
      this.setData({ loading: false })
      this.setData({ error: true })
    })
  }
})
