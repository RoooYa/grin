
const admin = require('./admin/index')
const wechat = require('./wechat/word')

const weixinLogin = require('./wechat/login')

module.exports = function(app) {

	admin(app)

	wechat(app)

	weixinLogin(app)

}