// components/order_product/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    attached () {
        // console.log(this.data.item)
    },

    /**
     * 组件的方法列表
     */
    methods: {
        godetail () {
            // console.log(this.data.item)
            wx.navigateTo({
                url: `/pages/order_detail/index?order_id=${this.data.item.order_id}&order_type=${this.data.item.order_type}&order_state=${this.data.item.state}`,
            })
        },
        pay () {
            wx.showLoading({
                title: '正在支付...',
            })
            var that = this
            var url = '/applet/order/repay'
            if (this.data.item.order_type == 4) {
                url = '/applet/package/repurchase'
            }
            app.ajax('post', url, { order_id: this.data.item.order_id }).then(res => {
                if(res.status == 200) {
                    wx.requestPayment({
                        timeStamp: res.data.timeStamp,
                        nonceStr: res.data.nonceStr,
                        package: res.data.package,
                        signType: res.data.signType,
                        paySign: res.data.paySign,
                        success () {
                            wx.hideLoading()
                            that.setData({
                                'item.state': 2
                            }, () => {
                                that.godetail()
                            })
                        },
                        fail () {
                            wx.showToast({
                                title: '取消支付',
                                icon: 'none'
                            })
                        }
                    })
                }
            })
        },
        cancel () {
            var that = this
            wx.showModal({
                title: '提示',
                content: '是否取消该订单？',
                success(res) {
                    if (res.confirm) {
                        wx.showLoading({
                            title: '正在取消...',
                        })
                        app.ajax('post', '/applet/order/cancel', { order_id: that.data.item.order_id }).then(res => {
                            if (res.status == 200) {
                                that.triggerEvent('cancel')
                                wx.showToast({
                                    title: '取消成功',
                                    icon: 'none'
                                })
                            }
                        })
                    } else if (res.cancel) {
                        console.log('用户点击取消')
                    }
                }
            })
        }
    }
})
