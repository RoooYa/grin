//index.js
//获取应用实例
const io = require('../../../utils/io.js')

const app = getApp()

Page({
  data: {
    name: '',
    loading: true,
    loadingTxt: '正在加载...',
    list: [],
    error: false
  },
  
  onLoad (o) {
    this.setData({ name: o.name })
    this.getWord((data)=> {
      if(data.length === 0) {
        this.setData({ loading: true })
        this.setData({ loadingTxt: '没有查询到相关结果' })
      }
    })
  },

  // 滚动触底
  onReachBottom() {
    this.getWord()
  },

  // 查看图片
  viewImages: function (event) {
    let data = event.currentTarget.dataset
    wx.previewImage({
      urls: [data.current],
      current: data.current
    })
  },

  getWord(fn) {
    this.setData({ loading: true })
    this.setData({ error: false })
    this.setData({ loadingTxt: '正在加载...' })
    io({ url: '/weChart/word/star', data: { name: this.data.name,  start: this.data.list.length } }, (res) => {
      if (res.datas.length) {
        this.setData({ list: this.data.list.concat(res.datas) })
      } else {
        wx.showToast({ title: '已经到底了', icon: 'none' })
      }
      this.setData({ loading: false })
      fn && fn(res.datas)
    }, (e) => {
      this.setData({ loading: false })
      this.setData({ error: true })
    })
  }
})
