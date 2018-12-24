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
    none: false
  },
  onLoad () {
    this.getWord(() => {
      wx.stopPullDownRefresh()
      this.setData({ loading: false})
      this.setData({ endTips: true })
    })
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
  },

  // 删除
  remove(event) {
    let data = event.currentTarget.dataset
    wx.showModal({
      title: ' ',
      content: '是否确定删除？',
      success: res => {
        if(res.confirm) {
          collect.remove(data.id)
          this.getWord()
        }
      }
    })
  },

  videoPay(event) {
    let data = event.currentTarget.dataset
    let isVideo = `list[${data.index}].isVideo`
    this.setData({ [isVideo]: true })
  },

  getWord(fn) {
    this.setData({ loadingTxt: '正在加载...'})
    wx.showNavigationBarLoading()
    let id = collect.get().length ? collect.get().toString() : 0
    io({ url: '/weChat/word/collection', data: { id: id}}, (res) => {
      this.setData({ list: res.datas })
      fn && fn()
      setTimeout(wx.hideNavigationBarLoading, 350)
      if(!res.datas.length) {
        this.setData({ none: true })
      }
    }, (e) => {
      this.setData({ loadingTxt: e.msg + ', 请下拉刷新' })
      wx.hideNavigationBarLoading()
    })
  }
})
