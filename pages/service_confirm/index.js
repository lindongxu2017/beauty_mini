// pages/service_confirm/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '确认预约',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
        status_height: 64,
        is_arrge: true,
        service_id: '',
        staff_id: '',
        staff_name: '',
        avatar: '',
        date: '',
        interval: '',
        segment: 0,
        phone: '',
        detail: {},
        expires: '0:00',
        type: '',
        timer: null,
        is_passed: false,
        remarks: '',
        order_id: '',
        // expires: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            order_id: options.order_id,
            service_id: options.service_id,
            staff_id: options.staff_id,
            staff_name: options.staff_name,
            avatar: options.avatar,
            date: options.date,
            segment: options.segment,
            interval: options.interval,
            type: options.type,
            phone: app.globalData.userInfo ? app.globalData.userInfo.phone : '',
            // expires: options.expires
        })
        // var time = (new Date().getTime() + 15 * 60 * 1000) / 1000
        // console.log(time)
        this.reduce_expires(options.expires)
        this.getdetail()
        if (options.title) {
            this.setData({
                'header.title': options.title
            })
        }
        if (app.globalData.navgationHeight) {
            this.setData({
                status_height: app.globalData.navgationHeight
            })
        }
    },

    confirm_unlock () {
        var that = this
        wx.showModal({
            title: '提示',
            content: '是否取消预约？',
            success(res) {
                if (res.confirm) {
                    // console.log('用户点击确定')
                    app.ajax('post', 'applet/reserve/unlock', {
                        service_ids: that.data.service_id.split(','),
                        staff_id: that.data.staff_id,
                        date: that.data.date,
                        interval: that.data.interval,
                        segment: that.data.segment,
                    }).then(res => {
                        if (res.status == 200) {
                            // TODO
                            // wx.navigateBack()
                        }
                    })
                    wx.navigateBack()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    getdetail () {
        app.ajax('post', 'applet/service/details', { service_id: this.data.service_id}).then(res => {
            // console.log(res)
            if(res.status == 200) {
                this.setData({
                    detail: res.data
                })
            }
        })
    },
    
    reduce_expires(endDateStr) {
        var that = this
        var expires_timestamp = endDateStr * 1000
        var current_timestamp = new Date().getTime()
        if (expires_timestamp - current_timestamp > 0) {
            // TODO
            var reduce_sec = Math.floor((expires_timestamp - current_timestamp) / 1000)
            var minutes = Math.floor(reduce_sec / 60)
            var seconds = reduce_sec % 60
            this.setData({
                expires: minutes + ":" + seconds
            })
            this.data.timer = setTimeout(() => {
                this.reduce_expires(endDateStr);
            }, 1000)
        } else {
            clearTimeout(this.data.timer)
            that.setData({
                is_passed: true,
                timer: null
            })
            wx.showModal({
                title: '提示',
                content: '预约订单已超时支付',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        wx.navigateBack()
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    },

    arrge () {
        this.setData({
            is_arrge: !this.data.is_arrge
        })
    },

    show_protrol () {
        wx.navigateTo({
            url: '/pages/protrol/index',
        })
    },

    inputremarks (e) {
        this.setData({
            remarks: e.detail.value
        })
    },

    pay () {
        wx.showLoading({
            title: '正在处理',
        })
        if (this.data.is_arrge) {
            var url = 'applet/reserve/service'
            var options = {
                staff_id: this.data.staff_id,
                date: this.data.date,
                segment: this.data.segment,
                interval: this.data.interval,
                remarks: this.data.remarks
            }
            if (this.data.type == 1) {
                options.service_id = this.data.service_id
            }
            if (this.data.type == 4) {
                url = 'applet/reserve/package'
                options.service_ids = this.data.service_id.split(',')
                options.order_id = this.data.order_id
            }
            app.ajax('post', url, options).then(res => {
                wx.hideLoading()
                if(res.status == 200) {
                    if (this.data.type == 4) {
                        wx.showToast({
                            title: '预约成功',
                            icon: 'none'
                        })
                        setTimeout(() => {
                            wx.navigateTo({
                                url: '/pages/allorder/allorder?order_type=2&order_state=2',
                            })
                        }, 1000)
                    } else {
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
                                    url: '/pages/allorder/allorder?order_type=2&order_state=2',
                                })
                            },
                            fail() {
                                wx.showToast({
                                    title: '支付失败',
                                    icon: 'none'
                                })
                                wx.navigateTo({
                                    url: '/pages/allorder/allorder?order_type=2&order_state=1',
                                })
                            }
                        })
                    }
                }
            })
        } else {
            wx.hideLoading()
            wx.showToast({
                title: '需同意平台服务协议',
                icon: 'none'
            })
        }
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        clearTimeout(this.data.timer)
        this.data.timer = null
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        clearTimeout(this.data.timer)
        this.data.timer = null
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})