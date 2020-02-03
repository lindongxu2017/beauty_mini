// pages/cardMore/cardMore.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '套餐详情',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true,
            // backURL: "/pages/index/index"
        },
        pdData: {},
        orderId: null,
        version: 0,
        showDav: false,
        showL: false,
        type: 0,
        actions: [
            {
                name: '余额支付',
                type: 2
            },
            {
                name: '微信支付',
                type: 1
            },
        ],
        show: false,
        popup: false,
        sms: '',
        order_detail: {},
        code_flag: false,
        timer: null,
        code_text: '获取验证码',
        click_flag: false
    },
    onLoad: function(options) {
        var that = this
        that.data.type = options.type
        that.setData({
            orderId: options.id || 14
        })
        if (app.globalData.userInfo) {
            //首页进来
            that.loadingData(that)
        } else {
            //分享进来,先判断开关是否打开
            app.wxswitch().then(res => {
                if (app.globalData.advSwitch) {
                    //开着，表示正常运行，用户使用状态
                    that.setData({
                        version: 1,
                        showL: true
                    })
                    app.wxlogin().then(res => {
                        if (app.globalData.userInfo) {
                            //进入有注册过的用户
                            that.loadingData(that)
                            that.setData({
                                showDav: false
                            })
                            that.loadingSelf = that.selectComponent('#loadingSelf')
                            that.loadingSelf.closeLoading()
                        } else {
                            //进入无注册过的用户
                            that.loadingData(that)
                            that.setData({
                                showDav: true
                            })
                            that.loadingSelf = that.selectComponent('#loadingSelf')
                            that.loadingSelf.closeLoading()
                        }
                    })
                } else {
                    that.loadingData(that)
                }
            })
        }
    },
    godetail (e) {
        let { id } = e.currentTarget.dataset
        wx.navigateTo({
            url: '/pages/product_detail/index?id=' + id,
        })
    },
    onClose () {
        this.setData({
            show: false
        })
    },
    onOpen () {
        this.setData({
            show: true
        })
    },
    onSelect (e) {
        var that = this
        if (this.data.click_flag) {
            return
        }
        wx.showLoading({
            title: '发起支付',
        })
        this.data.click_flag = true
        this.onClose()
        if (app.globalData.userInfo) {
            if (app.globalData.userInfo.phone) {
                if (e.detail.type == 1) { // 微信支付
                    wx.hideLoading()
                    var options = {
                        package_id: this.data.orderId,
                        pay_channel: 3,
                        remarks: ''
                    }
                    var url = 'applet/package/purchase'
                    app.ajax('post', url, options).then(res => {
                        if (res.status == 200) {
                            wx.requestPayment({
                                timeStamp: res.data.timeStamp,
                                nonceStr: res.data.nonceStr,
                                package: res.data.package,
                                signType: res.data.signType,
                                paySign: res.data.paySign,
                                success(response) {
                                    // TODO
                                    wx.showToast({
                                        title: '支付成功',
                                        icon: 'none'
                                    })
                                    wx.navigateTo({
                                        url: '/pages/allorder/allorder?order_type=0&order_state=2',
                                    })
                                    that.data.click_flag = false
                                },
                                fail() {
                                    wx.showToast({
                                        title: '支付失败',
                                        icon: 'none'
                                    })
                                    wx.navigateTo({
                                        url: '/pages/allorder/allorder?order_type=0&order_state=1',
                                    })
                                    that.data.click_flag = false
                                }
                            })
                        }
                    })
                } else { // 余额支付
                    // TODO
                    wx.hideLoading()
                    this.pay_by_balance()
                    this.data.click_flag = false
                }
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
    pay_by_balance () {
        app.ajax('post', 'applet/package/purchase', {
            package_id: this.data.orderId,
            pay_channel: 4,
            remarks: ''
        }).then(res => {
            if (res.status == 200) {
                this.setData({
                    order_detail: res.data,
                    order_id: res.order_id,
                    popup: true
                })
            }
        }).catch(error => {
            // this.cancel_pay()
            // TODO
        })
    },
    getcode() {
        if (this.data.code_flag) {
            return
        }
        app.ajax('post', '/applet/package/code').then(res => {
            if(res.status == 200) {
                wx.showToast({
                    title: '验证码已发送',
                    icon: 'none'
                })
                this.setData({
                    code_flag: true,
                    code_text: '59s'
                })
                this.data.timer = setInterval(() => {
                    if (parseInt(this.data.code_text) == 0) {
                        clearInterval(this.data.timer)
                        this.data.timer = null
                        this.setData({
                            code_text: '获取验证码',
                            code_flag: false
                        })
                        return
                    }
                    this.setData({
                        code_text: parseInt(this.data.code_text) - 1 + 's'
                    })
                }, 1000)
            }
        })
    },
    pay_order () {
        if (this.data.sms.length == 0) {
            return
        }
        if (this.data.click_flag) {
            return
        }
        this.data.click_flag = true
        app.ajax('post', '/applet/package/pay', {
            out_trade_no: this.data.order_detail.out_trade_no,
            code: this.data.sms
        }).then(res => {
            this.data.click_flag = false
            if (res.status == 200) {
                wx.showToast({
                    title: '支付成功',
                    icon: 'none'
                })
                wx.navigateTo({
                    url: '/pages/allorder/allorder?order_type=0&order_state=2',
                })
            } else {
                wx.showToast({
                    title: res.msg,
                    icon: 'none'
                })
                this.setData({
                    popup: false
                })
            }
        })
    },
    cancel_pay () {
        // wx.showToast({
        //     title: '取消支付',
        //     icon: 'none'
        // })
        this.setData({
            popup: false
        })
        app.ajax('post', 'applet/order/cancel', {
            order_id: this.data.order_id
        }).then(res => {
            // TODO
        })
    },
    onCodeChange (e) {
        this.setData({
            sms: e.detail
        })
    },
    goMall: function() {
        wx.switchTab({
            url: '../index/index',
        })
    },
    bugNow: function(e) {
        this.onOpen()
    },
    loadingData: function(that) {
        let options = {
            package_id: that.data.orderId
        }
        let url = 'applet/package/details'
        app.ajax('post', url, options).then(res => {
            // console.log(res)
            that.setData({
                pdData: res.data
            })
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
    onShareAppMessage: function(options) {
        let gbid = this.data.orderId;
        return {
            title: '分享',
            path: '/pages/cardMore/cardMore?id=' + gbid,
            imageUrl: this.data.pdData.image_src, //用户分享出去的自定义图片大小为5:4,
            success: function(res) {
                // 转发成功
                wx.showToast({
                    title: "分享成功",
                    icon: 'success',
                    duration: 2000
                })
            }
        }
    },
    onUnload () {
        if (this.data.timer) {
            clearInterval(this.data.timer)
            this.data.timer = null
        }
    }
})