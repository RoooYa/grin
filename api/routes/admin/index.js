const sign = require('./sign/index')
const word = require('./word/index')

module.exports = function(app) {
	sign(app)
	word(app)
}