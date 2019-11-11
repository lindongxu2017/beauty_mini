// pages/newUserMall/newUserMall.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		header: {
			title: '新人专享',
			hiddenBlock: '',
			homeCapsule: '',
			tubiao: true,
			backURL: "/pages/index/index"
		},
		list: [
			{
				current_price: 9900,
				describe: "腋下/唇部/发际线/手背/脚背五选一",
				id: 8,
				img_url: "https://tcdn.169kang.com/skincare/project/942cbba1f8b360ca337a77b719e5192b.png",
				original_price: 19900,
				purchase_times: 0,
				title: "蓝宝石冰点无痛永久性脱毛1次",
			},
			{
				current_price: 9900,
				describe: "腋下/唇部/发际线/手背/脚背五选一",
				id: 8,
				img_url: "https://tcdn.169kang.com/skincare/project/942cbba1f8b360ca337a77b719e5192b.png",
				original_price: 19900,
				purchase_times: 0,
				title: "蓝宝石冰点无痛永久性脱毛1次",
			}
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

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
