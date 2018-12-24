

let userName = 'xxx',
	password = "xxx"

module.exports = function(app) {
	
	app.post('/administration/login', function(req, res) {
		let userInfo = {
			userName: req.body.userName,
			password: req.body.password
		}

		if (userInfo.userName == userName && userInfo.password == password) {
			req.session.login = true
			res.json({
				code: 0,
				msg: '登录成功'
			})
		} else {
			res.json({
				code: 100,
				msg: '账号或密码不正确'
			})
		}
	})

	app.get('/admin/login/get', (req, res) => {
		res.json({
			code: 0,
			msg: '已登录'
		})
	})
}