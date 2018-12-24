
let host = 'https://www.jksh.xyz'

module.exports = function (obj, success, error) {
  wx.request({
    url: host + obj.url,
    data: obj.data,
    method: obj.method || 'GET',
    success: function (res) {
      if(res.data.code === 0) {
        success && success(res.data, res)
      } else {
        error && success(res.data, res)
      }
    },
    fail: function (e) {
      error && error({msg: '网络请求失败'}, e)
    },
    complete: function (r) {

    }
  })
}