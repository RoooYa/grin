const mysql = require("mysql");

const pool = mysql.createPool({
	host: '132.232.147.127',
	user: 'root',
	password: '123456',
	database: 'gurn',
	port: 3306
});

module.exports = function(sql, v, callback) {
	pool.getConnection(function(err, conn) {
		if (err) {
			callback(err, null, null);
		} else {
			if (typeof v == 'function') {
				callback = v;
				v = undefined;
			}
			conn.query(sql, v, function(qerr, vals, fields) {
				//释放连接  
				conn.release();
				//事件驱动回调  
				callback(qerr, vals, fields);
			})
		}
	})
}