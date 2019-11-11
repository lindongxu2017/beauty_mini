// pages/activity/activity.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '',
            hiddenBlock: '',
            homeCapsule: true,
            tubiao: true,
            backURL: ""
        },
        detail: {},
        isAuth: false,
        isBindPhone: false,
        activityid: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this.isAuth()
        if (options.scene) {
            this.data.activityid = decodeURIComponent(options.scene)
        }
    },

    isAuth(fn) {
        var self = this
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    self.setData({
                        isAuth: true
                    })
                    app.wxlogin().then(res => {
                        // console.log(app.globalData.userInfo)
                        if (app.globalData.userInfo && app.globalData.userInfo.phone) {
                            self.data.isBindPhone = true
                        }
                    })
                }
            }
        })
    },

    pay() {
        if (this.data.isAuth) {
            // 绑定了手机号
            if (this.data.isBindPhone) {
                if (this.data.activityid) {
                    app.ajax('post', '/applet/purchase/spread', {
                        package_id: this.data.activityid
                    }).then(res => {
                        // console.log(res)
                        wx.requestPayment({
                            timeStamp: res.data.timeStamp,
                            nonceStr: res.data.nonceStr,
                            package: res.data.package,
                            signType: 'MD5',
                            paySign: res.data.paySign,
                            success(res) {
                                // TODO 跳转至卡包
                                wx.redirectTo({
                                    url: '/pages/mycard/mycard',
                                })
                            },
                            fail(res) {
                                // TODO  跳转未支付订单
                                wx.redirectTo({
                                    url: '/pages/allorder/allorder?flag=1',
                                })
                            }
                        })
                    })
                } else {
                    wx.showToast({
                        title: '活动id不存在',
                        icon: 'none'
                    })
                }
            } else {
                // 未绑定手机号
                this.goTel()
            }
        }
    },

    onGotUserInfo(e) {
        var self = this
        if (e.detail.userInfo) {
            wx.login({
                success: res => {
                    var code = res.code
                    app.globalData.code = res.code
                    wx.request({
                        url: app.bash_url + 'applet/auth/message',
                        method: 'POST',
                        data: {
                            code: app.globalData.code,
                            encryptedData: e.detail.encryptedData,
                            iv: e.detail.iv
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
                                    if (app.globalData.userInfo.phone) {
                                        self.setData({
                                            isBindPhone: true
                                        })
                                    }
                                    self.setData({
                                        isAuth: true
                                    })
                                    this.pay()
                                }
                            })
                        }
                    })
                }
            })
        } else {
            console.log('您拒绝了授权')
        }
    },

    goTel () {
        wx.navigateTo({
            url: '../telLogin/telLogin?isback=1',
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
        this.isAuth()
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