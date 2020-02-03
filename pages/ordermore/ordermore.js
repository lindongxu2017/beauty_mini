// pages/ordermore/ordermore.js
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
            background: '',
            tubiao: true,
            backURL: ""
        },
        orderData: {},
        order_id: '',
        result: []
    },
    onLoad: function(options) {
        this.data.order_id = options.id || 16
        this.getdetail()
    },
    getdetail () {
        app.ajax('post', 'applet/user/card', {
            order_package_id: this.data.order_id
        }).then(res => {
            if(res.status == 200) {
                this.setData({
                    orderData: res.data
                })
            }
        })
    },
    onChange(event) {
        this.setData({
            result: event.detail
        });
    },
    toggle(event) {
        const { index } = event.currentTarget.dataset;
        const checkbox = this.selectComponent(`.checkboxes-${index}`);
        checkbox.toggle();
    },
    pay () {
        var that = this
        wx.request({
            url: app.bash_url + 'applet/purchase/respread',
            method: 'post',
            header: { unionid: app.globalData.unionid },
            data: {
                order_id: that.data.order_id
            },
            success: res => {
                const resData = res.data.data
                console.log(res)
                wx.requestPayment({
                    timeStamp: resData.timeStamp,
                    nonceStr: resData.nonceStr,
                    package: resData.package,
                    signType: resData.signType,
                    paySign: resData.paySign,
                    success(res) {
                        if (res.errMsg == "requestPayment:ok") {
                            wx.setStorageSync('isPay', 1)
                            wx.redirectTo({
                                url: '/pages/ordermore/ordermore?id=' + that.data.order_id
                            })
                        }
                    },
                    fail(res) { }
                })

            }
        })
    },
    handleShow: function(e) {
        if (e.currentTarget.dataset.state == 0) {
            if (this.data.flagNum == e.currentTarget.dataset.index) {
                this.setData({
                    flagNum: -1
                })
            } else {
                this.setData({
                    flagNum: e.currentTarget.dataset.index
                })
            }
        }
    },
    go_appoint () {
        if (this.data.result.length == 0) {
            wx.showToast({
                title: '至少选择一个服务项目',
                icon: 'none'
            })
            return
        }
        var services = this.data.result.join(',')
        wx.navigateTo({
            url: `/pages/service_time/index?title=${this.data.orderData.title}&type=4&services=${services}&order_id=${this.data.orderData.order_id}` ,
        })
    },
})