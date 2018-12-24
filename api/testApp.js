const express = require('express')
const http = require('http')
const https = require('https')
const fs = require('fs')

const app = express()

const httpsServer = https.createServer({
	key: fs.readFileSync('./api/keys/Nginx/2_jksh.xyz.key', 'utf8'),
	cert: fs.readFileSync('./api/keys/Nginx/1_jksh.xyz_bundle.crt', 'utf8')
}, app)


app.get('/', (req, res) => {
	let text = req.query.text
	let msg = ''
	if (text) {
		msg = text.replace(/[?？]/, '!')
		msg = msg.replace('吗', '')
	}
	res.json({msg: msg})
})


app.listen(667, () => {
	console.log("启动成功")
})


httpsServer.listen(666, () => {
	console.log("https启动成功")
})