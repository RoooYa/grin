
//获取应用实例
const io = require('../../utils/io.js')

const app = getApp()

let times = 0

Page({
  data: {
    text: '00.00',
    go: false,
    countTime: null,
    result: null,
    difference: 0
  },
  
  onLoad (o) {
    times = 0
  },

  onShareAppMessage () {
    return {
      title: '挑战10秒,99%的人都失败了',
      imageUrl: '../../image/10m.jpg'
    }
  },

  start () {
    this.setData({ text: '00.00' })
    this.setData({go: true})
    this.data.countTime = setInterval( () => {
      times++
      var ms = Math.floor(times / 100).toString()
      if (ms.length <= 1) {
        ms = "0" + ms
      }
      let hm = Math.floor(times % 100).toString()
      if (hm.length <= 1) {
        hm = "0" + hm
      }
      this.setData({text: ms + '.' + hm})
    }, 10)
  },

  end () {
    this.cancel()
    if(times === 1000) {
      this.setData({ result: true })
    } else {
      this.setData({ result: false })
      let n = times > 1000 ? times - 1000 : 1000 - times
      this.setData({ difference: n/100})
    }
  },

  onHide () {
    this.cancel()
    //this.setData({ text: '00.00' })
  },

  onUnload () {
    this.cancel()
  },

  cancel () {
    //times = 0
    this.setData({ go: false })
    clearInterval(this.data.countTime)
  },

  startTo () {
    times = 0
    this.setData({ text: '00.00' })
    this.setData({ result: null })
  },

  getInfo () {
    wx.showModal({
      title: '规则',
      content: '按下开始按钮开始计时，按下停止按钮结束计时。结束时若刚好停在10.00，则挑战成功。',
      showCancel: false
    })
  }
})
