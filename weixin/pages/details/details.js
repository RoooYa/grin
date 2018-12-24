
const io = require('../../utils/io.js')
const request = require('../../utils/request.js')
const collect = require('../../utils/collection.js')

const app = getApp()

Page({
  data: {
    id: null,
    loading: true,
    item: {},
    zan: false,
    colle: false
  },
  onLoad (o) {
    this.setData({id: o.id})
    this.getWord()
  },

  // 监听用户下拉刷新事件。
  onPullDownRefresh () {
    let self = this
    wx.stopPullDownRefresh({
      success() {
        self.getWord()
      }
    })
  },

  // 监听用户点击页面内转发按钮
  onShareAppMessage () {},

  viewImages: function (event) {
    let data = event.currentTarget.dataset
    wx.previewImage({
      urls: data.urls,
      current: data.current
    })
  },

  // 加一
  push(event) {
    let data = event.currentTarget.dataset
    // 点赞
    if (data.key === 'link' && !this.data.zan) {
      let link = `item.link`
      this.setData({ zan: true })
      this.setData({ [link]: this.data.item.link + 1 })
      request.push(data.id, data.key)
    }

    // 收藏
    if (data.key === 'collection') {
      let collection = `item.collection`
      if (!this.data.colle) {
        this.setData({ colle: true })
        this.setData({ [collection]: this.data.item.collection + 1 })
        collect.set(data.id)
        request.push(data.id, data.key)
      } else {
        this.setData({ colle: false })
        this.setData({ [collection]: this.data.item.collection - 1 })
        collect.remove(data.id)
      }
    }
  },

  videoPay(event) {
    let data = event.currentTarget.dataset
    let isVideo = `item.isVideo`
    this.setData({ [isVideo]: true })
  },

  getWord(fn) {
    wx.showNavigationBarLoading()
    io({ url: '/weChat/word/details', data: { id: this.data.id} }, (res) => {
      this.setData({ item: res.datas })
      fn && fn()
      wx.hideNavigationBarLoading()
      this.setData({ loading: false })
    }, (e) => {
      wx.hideNavigationBarLoading()
    })
  },

  href () {
    wx.reLaunch({url: "/pages/index/index"})
  }
})
