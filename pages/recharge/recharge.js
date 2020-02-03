// pages/recharge/recharge.js
const app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		header: {
			title: '充值',
			hiddenBlock: '',
			homeCapsule: '',
			tubiao: true
		},
		quotalist: [],
		selected: 0,
		userInfo: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getdata()
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo
			})
            console.log(app.globalData.userInfo)
		}
	},
	
	getdata () {
        app.ajax('POST', '/applet/invest/lists').then(res => {
			// console.log(res)
			if(res.status == 200) {
                res.data.map((item, index) => {
                    item.disc_str = '尊享会员价' +  (item.discount / 10) + '折'
                })
				this.setData({
					quotalist: res.data
				})
			}
		})
	},
	
	select (e) {
		let index = e.currentTarget.dataset.index
		this.setData({
			selected: index
		})
	},
	
	pay () {
		// TODO
        var that = this
        wx.showLoading({
            title: '发起支付',
        })
        const id = this.data.quotalist[this.data.selected].invest_id
        if (app.globalData.userInfo) {
            if (app.globalData.userInfo.phone) {
                app.ajax('POST', '/applet/purchase/invest', { invest_id: id }).then(res => {
                    // console.log(res)
                    wx.hideLoading()
                    if (res.status == 200) {
                        wx.requestPayment({
                            timeStamp: res.data.timeStamp,
                            nonceStr: res.data.nonceStr,
                            package: res.data.package,
                            signType: res.data.signType,
                            paySign: res.data.paySign,
                            timeStamp: res.data.timeStamp,
                            success(res) {
                                // console.log(res)
                                that.getuserinfo()
                                wx.showToast({
                                    title: '充值成功',
                                    icon: 'none'
                                })
                            },
                            fail(err) {
                                // console.log(err)
                            }
                        })
                    }
                }).catch(error =>{
                    wx.hideLoading()
                })
            } else {
                wx.hideLoading()
                wx.showToast({
                    title: '您还没有绑定手机号，为了更好的为您服务，请绑定手机后购买!',
                    icon: 'none'
                })
                setTimeout(function () {
                    wx.navigateTo({
                        url: '../telLogin/telLogin',
                    })
                }, 1000)
            }
        } else {
            wx.hideLoading()
            wx.showToast({
                title: '您还没有授权，请授权后购买!',
                icon: 'none'
            })
            setTimeout(function () {
                wx.navigateTo({
                    url: '../promiseLogin/promiseLogin',
                })
            }, 1000)
        }
	},

    getuserinfo () {
        app.ajax('post', '/applet/user/details').then(res => {
            if (res.status == 200) {
                this.setData({
                    userInfo: res.data
                })
                app.globalData.userInfo = res.data
            }
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
