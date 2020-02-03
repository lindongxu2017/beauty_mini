// pages/order_detail/index.js
import wxbarcode from '../../utils/index.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '订单详情',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true,
            backURL: ""
        },
        status_height: 64,
        show_code: false,
        order_id: '',
        reserve_id: '',
        order_type: '', // 订单类型
        order_state: '', // 订单状态
        expires: '0:00',
        timer: null,
        is_passed: false,
        score: -1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
        if (options.order_type) {
            this.setData({
                order_type: options.order_type,
                order_id: options.order_id,
                order_state: options.order_state,
                reserve_id: options.reserve_id || ''
            })
        }
        if (app.globalData.navgationHeight) {
            this.setData({
                status_height: app.globalData.navgationHeight
            })
        }
    },

    change() {
        this.setData({
            show_code: !this.data.show_code
        })
    },

    gohome() {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    get_service() {
        app.ajax('post', 'applet/order/reserve', {
            reserve_id: this.data.reserve_id
        }).then(res => {
            if (res.status == 200) {
                this.setData({
                    detail: res.data,
                    order_state: res.data.state
                })
                wxbarcode.barcode('barcode', res.data.code, 540, 164);
                // console.log(res.data.state)
                if (res.data.state == 1) {
                    this.reduce_expires(res.data.expires)
                }
                if (res.data.state == 4) {
                    this.get_comment()
                }
            }
        })
    },

    get_detail() {
        app.ajax('post', 'applet/order/product', {
            order_id: this.data.order_id,
            order_type: this.data.order_type
        }).then(res => {
            if (res.status == 200) {
                this.setData({
                    detail: res.data
                })
                wxbarcode.barcode('barcode', res.data.code, 540, 164);
            }
        })
    },
    get_package() {
        app.ajax('post', 'applet/order/package', {
            order_id: this.data.order_id
        }).then(res => {
            if (res.status == 200) {
                this.setData({
                    detail: res.data
                })
            }
            // wxbarcode.barcode('barcode', res.data.code, 540, 164);
        })
    },

    get_comment() {
        app.ajax('post', 'applet/evaluate/sdetails', {
            reserve_id: this.data.reserve_id
        }).then(res => {
            // console.log(res)
            this.setData({
                score: res.data.score - 1
            })
        })
    },

    gocomment_product() {
        var id = ''
        if (this.data.order_type == 1) {
            id = this.data.reserve_id
        } else {
            id = this.data.order_id
        }
        wx.navigateTo({
            url: `/pages/comment_product/index?order_id=${id}&type=${this.data.order_type}`,
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
            that.setData({
                is_passed: true
            })
            wx.showModal({
                title: '提示',
                content: '预约订单已超时支付',
                showCancel: false
            })
        }
    },

    cancel() {
        wx.showLoading({
            title: '正在处理...',
        })
        app.ajax('post', 'applet/order/cancel', {
            order_id: this.data.order_id
        }).then(res => {
            if (res.status == 200) {
                setTimeout(() => {
                    wx.showToast({
                        title: '取消成功',
                        icon: 'none'
                    })
                    wx.hideLoading()
                    if (this.data.order_type == 1) {
                        // 预约订单
                        this.get_service()
                    } else {
                        // 卡项/产品订单
                        this.get_detail()
                    }
                })
            }
        })
    },

    pay() {
        if (this.data.is_passed) {
            wx.showModal({
                title: '提示',
                content: '预约订单已超时支付',
                showCancel: false
            })
            return
        }
        const that = this
        wx.showLoading({
            title: '正在支付...',
        })
        var url = 'applet/order/repay'
        if (this.data.order_type == 4) {
            url = 'applet/package/repurchase'
        }
        setTimeout(() => {
            wx.hideLoading()
        }, 500)
        app.ajax('post', url, {
            order_id: this.data.order_id
        }).then(res => {
            if (res.status == 200) {
                wx.requestPayment({
                    timeStamp: res.data.timeStamp,
                    nonceStr: res.data.nonceStr,
                    package: res.data.package,
                    signType: res.data.signType,
                    paySign: res.data.paySign,
                    success(res) {
                        // console.log(res)
                        that.setData({
                            'detail.state': 2
                        })
                    }
                })
            }
        })
    },

    gocomment() {
        var data = this.data.detail
        if (this.data.order_type == 1) {
            wx.navigateTo({
                url: `/pages/comment/index?type=1&reserve_id=${data.reserve_id}&service_id=${data.service_id}`,
            })
        } else {
            // 卡项/产品订单
            wx.navigateTo({
                url: `/pages/comment/index?type=2&order_id=${data.order_id}&product_id=${data.product_id}`,
            })
        }
    },

    godetail() {
        wx.navigateTo({
            url: `/pages/comment_details/index?type=1&reserve_id=${this.data.reserve_id}`,
        })
    },

    call() {
        wx.makePhoneCall({
            phoneNumber: '19926540972'
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
        if (this.data.order_type == 1) {
            // 预约订单
            this.get_service()
        } else if (this.data.order_type == 4) {
            // 套餐
            this.get_package()
        } else {
            //产品订单
            this.get_detail()
        }
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
        clearTimeout(this.data.timer)
        this.data.timer = null
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