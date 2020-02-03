// pages/shoppingcart/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '购物车',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
        list: [],
        is_all: false,
        total: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getdata()
    },

    getdata () {
        app.ajax('post', 'applet/cart/lists').then(res => {
            // console.log(res)
            if (res.status == 200) {
                res.data.map(item => {
                    item.is_select = false
                })
                this.setData({
                    list: res.data
                })
            }
        })
    },

    select (e) {
        let { index } = e.currentTarget.dataset
        let key = "list["+ index +"].is_select"
        this.setData({
            [key]: !this.data.list[index].is_select
        })
        this.checkout()
    },

    select_all () {
        var bool = this.data.is_all
        this.setData({
            is_all: !bool
        })
        if (this.data.is_all) {
            this.check_all()
        } else {
            this.cancel_all()
        }
    },

    check_all () {
        this.data.list.map((item, index) => {
            if (item.state == 1) {
                let key = "list["+index+"].is_select"
                this.setData({
                    [key]: true
                })
            }
        })
        this.sum_total()
    },

    cancel_all () {
        this.data.list.map((itme, index) => {
            let key = "list[" + index + "].is_select"
            this.setData({
                [key]: false
            })
        })
        this.sum_total()
    },

    checkout () {
        var num = 0
        this.data.list.map((item, index) => {
            if (item.is_select) {
                num++
            }
        })
        if (num == this.data.list.length) {
            this.setData({
                is_all: true
            })
        } else {
            this.setData({
                is_all: false
            })
        }
        this.sum_total()
    },

    change_num (e) {
        let {index, type} = e.currentTarget.dataset
        let id = this.data.list[index].cart_id
        let num = this.data.list[index].amount
        let amount = 'list[' + index+'].amount'
        if (num == 1 && type == -1) {
            return
        }
        app.ajax('post', '/applet/cart/num', {
            cart_id: id,
            num: type
        }).then(res => {
            if (res.status == 200) {
                if (type == -1) {
                    this.setData({
                        [amount]: num - 1
                    })
                } else {
                    this.setData({
                        [amount]: num + 1
                    })
                }
                this.sum_total()
            }
        })
    },

    sum_total () {
        var total = 0
        this.data.list.map((item, index) => {
            if (item.is_select) {
                total = total + item.amount * item.price
            }
        })
        this.setData({
            total: total.toFixed(2)
        })
    },

    del (e) {
        // console.log(e)
        const self = this
        let {index, id} = e.currentTarget.dataset
        // console.log(index, id)
        wx.showModal({
            title: '提示',
            content: '是否从购物车移除该商品？',
            success(res) {
                if (res.confirm) {
                    wx.showToast({
                        title: '正在处理...',
                        icon: 'loading'
                    })
                    setTimeout(() => {
                        app.ajax('post', 'applet/cart/delete', { cart_id: id }).then(res => {
                            if (res.status == 200) {
                                var list = JSON.parse(JSON.stringify(self.data.list))
                                list.splice(index, 1)
                                self.setData({ list })
                                wx.hideToast()
                                self.sum_total()
                            }
                        })
                    }, 500)
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    submit () {
        let cart_ids = []
        this.data.list.map(item => {
            if(item.is_select) {
                cart_ids.push(item.cart_id)
            }
        })
        if (cart_ids.length == 0) {
            wx.showToast({
                title: '请勾选结算商品！',
                icon: 'none'
            })
            return
        }
        if (app.globalData.userInfo) {
            if (app.globalData.userInfo.phone) {
                app.ajax('post', '/applet/cart/purchase', { cart_ids }).then(res => {
                    // console.log(res)
                    if (res.status == 200) {
                        wx.requestPayment({
                            timeStamp: res.data.timeStamp,
                            nonceStr: res.data.nonceStr,
                            package: res.data.package,
                            signType: res.data.signType,
                            paySign: res.data.paySign,
                            success(response) {
                                // TODO
                                wx.navigateTo({
                                    url: '/pages/allorder/allorder?order_type=1&order_state=2',
                                })
                            },
                            fail() {
                                wx.navigateTo({
                                    url: '/pages/allorder/allorder?order_type=1&order_state=1',
                                })
                            }
                        })
                    }
                })
            } else {
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