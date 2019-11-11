//index.js
//获取应用实例

const app = getApp()
if (!app.bash_url) {
	app.bash_url = 'https://skin.169kang.com/'
	// app.bash_url = 'https://ttwx.169kang.com/'
}
Page({
	data: {
		imgUrls: [
			'../../utils/img/1568777964097.jpg'
		],
		header: {
			title: '美肌商城',
			hiddenBlock: '',
			homeCapsule: '',
		},
		interval: 3000,
		duration: 1000,
		showNav: false,
		cardData: null,
		scrollTopNum: null,
		showDav: false,
		version: 0,
		isShowAd: false,
		gridlist: [
			{path: '/pages/newUserMall/newUserMall', icon: '../../utils/img/shouyetypea.png', text: '新人专享'},
			{path: '', icon: '../../utils/img/shouyetypeb.png', text: '储值活动'},
			{path: '', icon: '../../utils/img/shouyetypea.png', text: '服务项目'},
			{path: '', icon: '../../utils/img/shouyetypec.png', text: '家居产品'}
		],
		speciallist: [
			{
				title: '服务项目',
				subtitle: '精选护肤好物，爱美不分场合',
				backbg: '/utils/img/1562166341037.jpg',
				list: [
					{title: '标题描述标题描述标题描述标题描述标题描述', subtitle: '内容描述内容描述内容描述内容描述', price: '100', time: '1小时'},
					{title: '标题描述', subtitle: '内容描述内容描述内容描述内容描述', price: '100', time: '1小时'},
					{title: '标题描述', subtitle: '内容描述内容描述内容描述内容描述', price: '100', time: '1小时'},
					{title: '标题描述', subtitle: '内容描述内容描述内容描述内容描述', price: '100', time: '1小时'},
					{title: '标题描述', subtitle: '内容描述内容描述内容描述内容描述', price: '100', time: '1小时'}
				],
			}
		]
	},
	onLoad: function() {
		var self = this
		if (app.globalData.userInfo) {
			//从别的页面进来的
			self.setData({
				showDav: false,
				version: 1
			})
			wx.request({
				url: app.bash_url + 'applet/product/spreads',
				header: {
					'content-type': 'json'
				},
				success: res => {
					var arr = res.data.data
					for (var i = 0; i < arr.length; i++) {
						arr[i].original_price = ((arr[i].original_price - 0) / 100).toFixed(2)
						arr[i].current_price = ((arr[i].current_price - 0) / 100).toFixed(2)
					}
					self.setData({
						pdInfo: arr
					})
					setTimeout(function() {
						self.loadingSelf = self.selectComponent('#loadingSelf')
						self.loadingSelf.closeLoading()
						self.showAd()
					}, 1000)
				}
			})
		} else {
			app.wxlogin().then(res => {
				self.setData({
					version: app.globalData.advSwitch
				})
				if (app.globalData.userInfo) {
					self.setData({
						showDav: false
					})
					setTimeout(function() {
						self.loadingSelf = self.selectComponent('#loadingSelf')
						self.loadingSelf.closeLoading()
						self.showAd()
					}, 1000)
				} else {
					self.setData({
						showDav: true
					})
					setTimeout(function() {
						self.loadingSelf = self.selectComponent('#loadingSelf')
						self.loadingSelf.closeLoading()
						self.showAd()
					}, 1000)
				}
				wx.request({
					url: app.bash_url + 'applet/product/spreads',
					header: {
						'content-type': 'json'
					},
					success: res => {
						// self.loadingSelf = self.selectComponent('#loadingSelf')
						// self.loadingSelf.closeLoading()
						var arr = res.data.data
						for (var i = 0; i < arr.length; i++) {
							arr[i].original_price = ((arr[i].original_price - 0) / 100).toFixed(2)
							arr[i].current_price = ((arr[i].current_price - 0) / 100).toFixed(2)
						}
						self.setData({
							pdInfo: arr
						})
					}
				})
			})
		}
		
		this.data.speciallist.map((item, index) => {
			var key = 'speciallist['+index+'].backbg'
			this.setData({
				[key]: this.img2base64(this.data.speciallist[index].backbg)
			})
		})
	},
	gridTo (e) {
		let index = e.currentTarget.dataset.index
		wx.navigateTo({
			url: this.data.gridlist[index].path
		})
	},
	img2base64 (src) {
		return 'data:image/jpg;base64,' + wx.getFileSystemManager().readFileSync(src, 'base64')
	},
	hideAd() {
		this.setData({
			isShowAd: false
		})
	},
	showAd () {
		this.setData({
			isShowAd: true
		})
	},
	linkTo() {
		console.log('跳转新人专享')
		// wx.navigateTo({
		//  url: '/pages/'
		// })
	},
	handleDeposit: function(e) {
		var invest_amount = e.currentTarget.dataset.invest_amount
		var give_amount = e.currentTarget.dataset.give_amount
		var index = e.currentTarget.dataset.index
		wx.navigateTo({
			url: '../deposit/deposit?invest_amount=' + invest_amount + '&give_amount=' + give_amount + '&index=' + index
		})
	},
	bindGetUserInfo: function(res) {
		if (res.detail.userInfo) {
			//用户按了允许授权按钮
			var that = this;
			//授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
			wx.login({
				success: res => {
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					var code = res.code
					app.globalData.code = res.code
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							wx.request({
								url: app.bash_url + 'applet/auth/message',
								method: 'POST',
								data: {
									code: code,
									encryptedData: res.encryptedData,
									iv: res.iv
								},
								success: res => {
									app.globalData.unionid = res.data.data.unionid
									wx.request({
										url: app.bash_url + 'applet/user/details',
										header: {
											unionid: app.globalData.unionid
										},
										success: res => {
											app.globalData.userInfo = res.data.data
											that.setData({
												showDav: false
											})
										}
									})
								}
							})

						}
					})
				}
			})
		} else {
			//用户按了拒绝按钮
			wx.showModal({
				title: '警告',
				content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
				showCancel: false,
				confirmText: '返回授权',
				success: function(res) {
					// 用户没有授权成功，不需要改变 isHide 的值
					if (res.confirm) {
						console.log('用户点击了“返回授权”');
					}
				}

			});
		}
	},
	onShow: function() {
		if (app.globalData.userInfo) {
			this.setData({
				showDav: false
			})
		}
	},
	goForLook: function(e) {
		wx.navigateTo({
			url: '../cardMore/cardMore?id=' + e.currentTarget.dataset.id,
		})
	}
})
