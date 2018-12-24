const mysql = require('../../model/mysql')
const moment = require('moment')
const request = require('request')

module.exports = function(app) {

	// 推荐
	app.get('/weChat/word', (req, res) => {
		let st = req.query.st || 0
		mysql('SELECT * FROM word ORDER BY `addDate` DESC LIMIT '+ st +', 10', function(err, vals, fields) {
			if (err) throw err
			vals.forEach(item => {item.images = item.images ? item.images.split(',') : []})
			res.json({
				code: 0,
				msg: '请求成功',
				datas: vals
			})
		})
	})

	// 详情
	app.get('/weChat/word/details', (req, res) => {
		mysql('SELECT * FROM word WHERE id = ' + req.query.id, function(err, vals, fields) {
			if (err) throw err
			vals.forEach(item => {item.images = item.images ? item.images.split(',') : []})
			res.json({
				code: 0,
				msg: '请求成功',
				datas: vals[0]
			})
		})
	})

	// so搞笑
	app.get('/weChart/word/so', (req, res) => {
		let start = req.query.start || 0
		request({
			url: 'https://pic.sogou.com/pics/gif/home.jsp?start='+ start +'&xml_len=10&type=recom',
			method: "get",
			gzip: true,
			headers: {
				"Accept": "application/json",
				"Accept-Encoding": "gzip, deflate",
				"Accept-Language": "zh-CN,zh;q=0.9",
				"Cache-Control": "no-cache",
				"Connection": "keep-alive",
				//"Cookie": "__guid=15484592.2219058119460824300.1518086198782.3777; __huid=10eNyMEDzDhHeeVKCYRDV6WYFASjUzbgRSkkAqcd9KymM%3D; smidV2=2018022610211843e58a398af5bc0f5cb163579f601614000c363831c59eac0; __DC_gid=6491553.460847795.1532334969444.1532334969444.1; lightbox_thumb_visible=1; mimage_s=RRc(A4z4SR!SXRTRCj_9Vx; _MS=50d7ebe23b9e2afbc5e14e76c9c6648c",
				"Host": "pic.sogou.com",
				"Pragma": "no-cache",
				"Referer": "https://pic.sogou.com/pic/gif2.0/category.jsp?&from=navtab",
				"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
				"X-Requested-With": "XMLHttpRequest"
			}
		}, (error, response, body) => {
			if(!error && response.statusCode == 200 ) {
				let data = JSON.parse(body).items
				let datas = []
				data.forEach(o => {
					datas.push({
						text: o.title,
						images: [o.picUrl]
					})
				})
				res.json({
					code: 0,
					datas: datas
				})
			}
		})
	})

	// 明星gif图
	app.get('/weChart/word/star', (req, res) => {
		let start = req.query.start || 0,
				name = req.query.name
		request({
			url: 'https://pic.sogou.com/pics/gif/search.jsp?query='+ encodeURIComponent(name) +'&ie=utf8&start='+start+'&xml_len=8',
			method: "get",
			gzip: true,
			headers: {
				"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
				"Accept-Encoding": "gzip, deflate, br",
				"Accept-Language": "zh-CN,zh;q=0.9",
				"Cache-Control": "no-cache",
				"Connection": "keep-alive",
				// "Cookie": "LCLKINT=421261; GOTO=Af99046; SUV=00A2178F71F69A7659E8C2D3B8021259; IPLOC=CN4301; SNUID=D3016CEB999CF284DCE861C59AE97105; sct=1; SUID=CA3D16D27E23900A0000000055E5908C; pgv_pvi=5489212416; SNUID=84C758DCAEABD4DD23D4DF1DAE0B2DD2; usid=E03pk368RFt1bTLs; wuid=AAEyX72fIwAAAAqRGnlgLAIAZAM=; fromwww=1; CXID=8A06EE4BE068E6E2BC0260B3012CCD10; JSESSIONID=aaa3irDEFuiXia2kewZBw; ABTEST=1|1541",
				"Host": "pic.sogou.com",
				"Pragma": "no-cache",
				"Upgrade-Insecure-Requests": 1,
				// "Referer": "https://pic.sogou.com/pic/gif2.0/category.jsp?&from=navtab",
				"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
				// "X-Requested-With": "XMLHttpRequest"
			}
		}, (error, response, body) => {
			if(!error && response.statusCode == 200 ) {
				let data = JSON.parse(body).items
				let datas = []
				data.forEach(o => {
					datas.push({
						images: o.thumbUrl,
						imagesBig: o.picUrl
					})
				})
				res.json({
					code: 0,
					datas: datas
				})
			}
		})
	})

	// 加一
	app.get('/weChat/word/plus', (req, res) => {
		mysql('update word set word.'+ req.query.key +' = word.'+ req.query.key +'+1 where id = ' + req.query.id, function(err, vals, fields) {
			if (err) throw err;
			res.json({
				code: 0,
				msg: '修改成功'
			})
		})
	})


	// 我的收藏
	app.get('/weChat/word/collection', (req, res) => {
		mysql('SELECT * FROM word WHERE id in (' + req.query.id + ')', function(err, vals, fields) {
			if (err) throw err;
			vals.forEach(item => {item.images = item.images ? item.images.split(',') : []})
			res.json({
				code: 0,
				datas: vals,
				msg: '查询成功'
			})
		})
	})


	// 反馈
	app.get('/weChat/proposal/add', (req, res) => {
		var data = {
			content: req.query.text
		}
		mysql('INSERT INTO proposal SET ?', data, function(err, vals, f) {
			if (err) throw err;
			res.json({
				code: 0,
				msg: '添加成功'
			});
		})
	})
}