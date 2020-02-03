// components/pay_module/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        balance_pay: {
            type: Boolean,
            value: true
        },
        type: {
            type: String,
            value: ''
        },
        params: {
            type: Object,
            value: {}
        },
        order_detail: {
            type: Object,
            value: {
                out_trade_no: 'EDU202001132157654',
                total_amount: '499.00',
                phone: '135****4545'
            }
        },
        show: {
            type: Boolean,
            value: false,
            observer: function (newVal, oldVal, changePath) {
                console.log(newVal, oldVal, changePath)
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        actions: [{
                name: '微信支付',
                type: 1
            },
            {
                name: '余额支付',
                type: 2
            },
        ],
        sms: '',
        code_flag: false,
        code_text: '获取验证码',
        popup: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        cancel_pay () {
            this.setData({
                popup: false
            })
        },
        onClose() {
            this.setData({
                show: false
            })
        },
        onCodeChange(e) {
            this.setData({
                sms: e.detail
            })
        },
        onSelect (e) {
            wx.showLoading({
                title: '发起支付',
            })
            if (e.detail.type == 1) { // 微信支付
                wx.hideLoading()
                console.log('微信支付')
                this.onClose()
                // var options = {
                //     package_id: this.data.orderId,
                //     pay_channel: 3,
                //     remarks: ''
                // }
                // var url = 'applet/package/purchase'
                // app.ajax('post', url, options).then(res => {
                //     if (res.status == 200) {
                //         wx.requestPayment({
                //             timeStamp: res.data.timeStamp,
                //             nonceStr: res.data.nonceStr,
                //             package: res.data.package,
                //             signType: res.data.signType,
                //             paySign: res.data.paySign,
                //             success(response) {
                //                 // TODO
                //                 wx.showToast({
                //                     title: '支付成功',
                //                     icon: 'none'
                //                 })
                //                 wx.navigateTo({
                //                     url: '/pages/allorder/allorder?order_type=0&order_state=2',
                //                 })
                //             },
                //             fail() {
                //                 wx.showToast({
                //                     title: '支付失败',
                //                     icon: 'none'
                //                 })
                //                 wx.navigateTo({
                //                     url: '/pages/allorder/allorder?order_type=0&order_state=1',
                //                 })
                //             }
                //         })
                //     }
                // })
            } else { // 余额支付
                // TODO
                wx.hideLoading()
                this.setData({
                    popup: true
                })
                // this.pay_by_balance()
            }
        },
        getcode() {
            if (this.data.code_flag) {
                return
            }
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
            // app.ajax('post', '/applet/package/code').then(res => {
            //     if (res.status == 200) {
            //         wx.showToast({
            //             title: '验证码已发送',
            //             icon: 'none'
            //         })
            //         this.setData({
            //             code_flag: true,
            //             code_text: '59s'
            //         })
            //         this.data.timer = setInterval(() => {
            //             if (parseInt(this.data.code_text) == 0) {
            //                 clearInterval(this.data.timer)
            //                 this.data.timer = null
            //                 this.setData({
            //                     code_text: '获取验证码',
            //                     code_flag: false
            //                 })
            //                 return
            //             }
            //             this.setData({
            //                 code_text: parseInt(this.data.code_text) - 1 + 's'
            //             })
            //         }, 1000)
            //     }
            // })
        },
        pay_order() {
            if (this.data.sms.length == 0) {
                return
            }
            console.log('支付成功')
            // app.ajax('post', '/applet/package/pay', {
            //     out_trade_no: this.data.order_detail.out_trade_no,
            //     code: this.data.sms
            // }).then(res => {
            //     if (res.status == 200) {
            //         wx.showToast({
            //             title: '支付成功',
            //             icon: 'none'
            //         })
            //         wx.navigateTo({
            //             url: '/pages/allorder/allorder?order_type=0&order_state=2',
            //         })
            //     } else {
            //         wx.showToast({
            //             title: res.msg,
            //             icon: 'none'
            //         })
            //         this.setData({
            //             popup: false
            //         })
            //     }
            // })
        },
    }
})