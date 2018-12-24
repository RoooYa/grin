const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const http = require('http')
const https = require('https')
const compression = require('compression')
const fs = require('fs')

const app = express()

const httpsServer = https.createServer({
    key: fs.readFileSync('./api/keys/Nginx/2_jksh.xyz.key', 'utf8'), 
    cert: fs.readFileSync('./api/keys/Nginx/1_jksh.xyz_bundle.crt', 'utf8')
}, app)

app.use(compression())  //静态资源压缩

app.use(express.static('static')) //设置静态资源目录

app.set('x-powered-by', false);

app.use(session({
	secret: 'guin', //为了安全性的考虑设置secret属性
	cookie: {
		maxAge: 60 * 1000 * 60
	}, //设置过期时间
	resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
	saveUninitialized: false, //
}))

// 判断是否登录
app.use('/admin/', function(req, res, next) {
	if (req.session.login) {
		next()
	} else{
		res.json({
			code: -100,
			msg: '未登录'
		})
	}
})

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(bodyParser.json())

// session
app.use(function(req, res, next) {
	res.locals.session = req.session;
	next()
})

// 引入路由
const routes = require('./routes/routes');
routes(app)


// app.listen(80, function() {
// 	console.log("启动成功")
// })

httpsServer.listen(443, () => {
	console.log("https启动成功")
})

