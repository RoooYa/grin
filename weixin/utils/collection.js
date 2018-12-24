
module.exports = {

	value: wx.getStorageSync('collectionId') || [],

  get () {
    return wx.getStorageSync('collectionId') || []
  },

	set (id) {
		let value = wx.getStorageSync('collectionId') || []
		if (!value.includes(id)) {
			value.push(id)
			wx.setStorageSync('collectionId', value)
		}
	},

	remove (id) {
		let value = this.get()
		let index = value.indexOf(id)
		if (index > -1) {
			value.splice(index, 1)
			wx.setStorageSync('collectionId', value)
		}
	}
}