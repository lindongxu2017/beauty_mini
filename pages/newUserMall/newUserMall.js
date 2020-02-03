// pages/newUserMall/newUserMall.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		header: {
			title: '优惠套餐',
			hiddenBlock: '',
			homeCapsule: '',
			tubiao: true,
			backURL: "/pages/index/index"
		},
		pdInfo: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getdata()
	},
	
	getdata() {
        app.ajax('POST', 'applet/package/lists', {version: 'v1.0'}).then(res => {
			// console.log(res)
            this.setData({
                pdInfo: res.data
            })
		})
	},
	
	goForLook: function(e) {
		wx.navigateTo({
			url: '../cardMore/cardMore?id=' + e.currentTarget.dataset.id,
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
