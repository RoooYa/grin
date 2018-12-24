const mysql = require('../../../model/mysql')
const moment = require('moment')

module.exports = function(app) {

	app.get('/admin/word', (req, res) => {
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



	app.post('/admin/word/add', (req, res) => {
		var data = {
			text: req.body.text,
			images: req.body.images,
			video: req.body.video,
			poster: req.body.poster,
			displayDate: req.body.displayDate,
			link: req.body.link,
			send: req.body.send,
			comment: req.body.comment,
			collection: req.body.collection,
			addDate: req.body.addDate,
			source: req.body.source
		}

		mysql('INSERT INTO word SET ?', data, function(err, vals, f) {
			if (err) throw err;
			res.json({
				code: 0,
				msg: '添加成功'
			});
		})
	})


	app.get('/admin/word/del', (req, res) => {
		let sql = 'delete from word where id = ' + req.query.id
		mysql(sql, function(err, vals, f) {
			if (err) throw err
			res.json({
				code: 0,
				msg: '删除成功'
			})
		})
	})

	app.post('/admin/word/up', (req, res) => {
		let body = req.body

		let sql = `update word set text = "${body.text}", images = "${body.images}", video = "${body.video}", poster = "${body.poster}", displayDate = "${body.displayDate}", link = "${body.link}", send = "${body.send}", comment = "${body.comment}", collection = "${body.collection}" where id = ${body.id}`

		mysql(sql, function(err, vals, f) {
			if (err) throw err
			res.json({
				code: 0,
				msg: '修改成功'
			})
		})
	})
}