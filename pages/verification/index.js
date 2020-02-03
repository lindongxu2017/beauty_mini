// pages/verification/index.js
import wxbarcode from '../../utils/index.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '预约',
            hiddenBlock: '',
            homeCapsule: '',
            // tubiao: true,
            // backURL: "/pages/mine/mine"
        },
        navgationHeight: 64,
        page: 0,
        list: [],
        nomore: false,
        version: 0,
        showDav: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.globalData.navgationHeight) {
            this.setData({
                navgationHeight: app.globalData.navgationHeight
            })
        }
        // this.getdata()

        var self = this
        if (app.globalData.userInfo) {
            //从别的页面进来的
            self.setData({
                showDav: false,
                version: 1
            })
            // this.getdata()
        } else {
            app.wxlogin().then(res => {
                self.setData({
                    version: app.globalData.advSwitch
                })
                if (app.globalData.userInfo) {
                    self.setData({
                        showDav: false
                    })
                    setTimeout(function () {
                        self.showAd()
                    }, 1000)
                } else {
                    self.setData({
                        showDav: true
                    })
                    setTimeout(function () {
                        self.showAd()
                    }, 1000)
                }
            })
        }
    },

    getdata () {
        app.ajax('post', 'applet/order/waits', {
            // state: 0,
            page: this.data.page + 1
        }).then(res => {
            if(res.status == 200) {
                if (res.data.length == 0) {
                    this.setData({
                        nomore: true
                    })
                } else {
                    res.data.map(item => {
                        item.is_show = false
                    })
                    this.data.page = res.page
                    this.setData({
                        list: this.data.list.concat(res.data)
                    }, () => {
                        this.data.list.map(obj => {
                            wxbarcode.barcode('barcode_' + obj.code, obj.code, 540, 164);
                        })
                    })
                }
            }
            wx.stopPullDownRefresh()
            // console.log(res)
        })
    },

    showAd() {
        this.setData({
            isShowAd: true
        })
    },

    bindGetUserInfo: function (res) {
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
                            app.ajax('post', 'applet/auth/message', {
                                code: code,
                                encryptedData: res.encryptedData,
                                iv: res.iv
                            }).then(res => {
                                app.globalData.unionid = res.data.unionid
                                app.ajax('post','applet/user/details').then(res => {
                                    app.globalData.userInfo = res.data
                                    that.setData({
                                        showDav: false
                                    })
                                    that.getdata()
                                })
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
                success: function (res) {
                    // 用户没有授权成功，不需要改变 isHide 的值
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”');
                    }
                }

            });
        }
    },

    change(e) {
        let { index } = e.currentTarget.dataset
        let key = 'list[' + index +'].is_show'
        this.setData({
            [key]: !this.data.list[index].is_show
        })
    },
    godetail(e) {
        let { item } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/order_detail/index?order_id=${item.order_id}&order_type=1&reserve_id=${item.reserve_id}`,
        })
    },
    call() {
        wx.makePhoneCall({
            phoneNumber: '19926540972'
        })
    },
    location() {
        wx.openLocation({
            latitude: 22.5284770000,
            longitude: 114.0273230000,
            name: '深圳市福田区kkone京基滨河时代广场A座1807（地铁下沙站B口出）'
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (app.globalData.userInfo) {
            this.setData({
                showDav: false
            })
            this.getdata()
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            nomore: false,
            page: 0,
            list: []
        })
        this.getdata()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.getdata()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})