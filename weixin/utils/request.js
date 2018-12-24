const io = require('./io.js')

module.exports = {

	// 加一
	push (id, key) {
		io({ url: '/weChat/word/plus', data: { id: id, key: key } })
	},

	// 登录
	login () {

	}
}