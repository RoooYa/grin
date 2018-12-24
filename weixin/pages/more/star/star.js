//index.js
//获取应用实例
const io = require('../../../utils/io.js')

const app = getApp()

Page({
  data: {
    list: [
      {
        "name": "鹿晗",
        "icon": "https://i01piccdn.sogoucdn.com/748c1d7771a0e7b5",
      },
      {
        "name": "关晓彤",
        "icon": "https://i04picsos.sogoucdn.com/cd0c9ebcbcd8b339",
      },
      {
        "name": "易烊千玺",
        "icon": "https://i04picsos.sogoucdn.com/6d4a13c295f84323",
      },
      {
        "name": "郑爽",
        "icon": "https://i02piccdn.sogoucdn.com/3f47ff860f81ca16",
      },
      {
        "name": "杨紫",
        "icon": "https://i02picsos.sogoucdn.com/18bd2319c2d4db8d",
      },
      {
        "name": "王源",
        "icon": "https://i03picsos.sogoucdn.com/2bb96e991cdfadab",
      },
      {
        "name": "赵丽颖",
        "icon": "https://i03picsos.sogoucdn.com/5d39732a105a6d61",
      },
      {
        "name": "薛之谦",
        "icon": "https://i04piccdn.sogoucdn.com/395e682b4e47fc8e",
      },
      {
        "name": "王俊凯",
        "icon": "https://i01picsos.sogoucdn.com/5fff2e6257998412",
      },
      {
        "name": "邓伦",
        "icon": "https://i02picsos.sogoucdn.com/7fc4684d56f6d5fb",
      },
      {
        "name": "唐嫣",
        "icon": "https://i04picsos.sogoucdn.com/2658d482bcbf722c",
      },
      {
        "name": "吴亦凡",
        "icon": "https://i02picsos.sogoucdn.com/33049d00ff726b8a",
      },
      {
        "name": "迪丽热巴",
        "icon": "https://i04picsos.sogoucdn.com/d0d1e7d20dac73b1",
      },
      {
        "name": "李易峰",
        "icon": "https://i02picsos.sogoucdn.com/9981aab297aa5580",
      },
      {
        "name": "杨洋",
        "icon": "https://i04picsos.sogoucdn.com/42ab6376d142edb5",
      },
      {
        "name": "tfboys",
        "icon": "https://i04picsos.sogoucdn.com/bdf9b18889f62689",
      },
      {
        "name": "张艺兴",
        "icon": "https://i04picsos.sogoucdn.com/c9ad324b6255407d",
      },
      {
        "name": "蔡徐坤",
        "icon": "https://i03piccdn.sogoucdn.com/3e7b60de8fdb7baf",
      }
    ]
  },
  
  onLoad (o) {
    
  },

  bindconfirm (e) {
    wx.navigateTo({
      url: '/pages/more/stardetails/stardetails?name=' + e.detail.value
    })
  }
})
