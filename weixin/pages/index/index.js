//index.js
//获取应用实例
const io = require('../../utils/io.js')
const request = require('../../utils/request.js')
const collect = require('../../utils/collection.js')

const app = getApp()

Page({
  data: {
    list: [],
    endTips: false,
    loading: true,
    loadingTxt: '正在加载...',
    link: {},
    collection: {},
    error: false
  },
  onLoad () {
    if(app.globalData.wordList.lenght > 0) {
      this.setData({ list: app.globalData.wordList })
    } else {
      this.getWord(() => {
        wx.stopPullDownRefresh()
        this.setData({ endTips: true })
      })
    }
  },

  // 监听用户下拉刷新事件。
  onPullDownRefresh () {
    let self = this
    this.setData({ list: [] })
    wx.stopPullDownRefresh({
      success() {
        self.getWord()
      }
    })
  },

  // 滚动触底
  onReachBottom() {
    this.getWord()
  },

  // 监听用户点击页面内转发按钮
  onShareAppMessage (obj) {
 
    let title = '每天十分钟，超级会搞笑'
    let path = ''
    let imageUrl = '../../image/share.png'

    if (obj.from === 'button') {
      let data = obj.target.dataset;
      if(data.id) {
        title = data.title
        imageUrl = data.imgurl.length ? data.imgurl[0] : '../../image/share.png'
        path = 'pages/details/details?id=' + data.id
        io({ url: '/weChat/word/plus', data: { id: data.id, key: 'send' } })
      }
    }

    return {
      title: title,
      imageUrl: imageUrl,
      path: path
    }
  },

  // 查看图片
  viewImages: function (event) {
    let data = event.currentTarget.dataset
    wx.previewImage({
      urls: data.urls,
      current: data.current
    })
  },

  // 加一
  push (event) {
    let data = event.currentTarget.dataset

    // 点赞
    if(data.key === 'link' && !this.data.link[data.id]) {
      let key = `link[${data.id}]`
      let link = `list[${data.index}].link`
      this.setData({ [key]: true})
      this.setData({ [link]: this.data.list[data.index].link + 1 })
      request.push(data.id, data.key)
    }

    // 收藏
    if (data.key === 'collection') {
      let key = `collection[${data.id}]`
      let collection = `list[${data.index}].collection`
      if (!this.data.collection[data.id]) {
        this.setData({ [key]: true })
        this.setData({ [collection]: this.data.list[data.index].collection + 1 })
        collect.set(data.id)
        request.push(data.id, data.key)
      } else {
        this.setData({ [key]: false })
        this.setData({ [collection]: this.data.list[data.index].collection - 1 })
        collect.remove(data.id)
      }
    }
  },

  videoPay (event) {
    let data = event.currentTarget.dataset
    let isVideo = `list[${data.index}].isVideo`
    this.setData({ [isVideo]: true })
  },

  getWord(fn) {
    this.setData({ loading: true })
    this.setData({ error: false })
    this.setData({ loadingTxt: '正在加载...'})
    io({ url: '/weChat/word', data: { st: this.data.list.length} }, (res) => {
      if(res.datas.length) {
        this.setData({ list: this.data.list.concat(res.datas) })
      } else {
        wx.showToast({ title: '已经到底了', icon: 'none' })
      }
      this.setData({ loading: false })
      fn && fn()
    }, (e) => {
      this.setData({ loading: false })
      this.setData({ error: true })
    })
  }
})
