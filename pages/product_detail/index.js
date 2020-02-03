// pages/product_detail/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '产品详情',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
        id: '',
        comment: [],
        show: false,
        num: 1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.id = options.id || 25
        this.getdetail()
        this.getcomments()
    },

    home () {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    getdetail() {
        app.ajax('POST', 'applet/product/details', { product_id: this.data.id }).then(res => {
            this.setData({
                detail: res.data
            })
            // console.log(this.data.detail)
        })
    },

    getcomments() {
        app.ajax('post', '/applet/product/evaluates', {
            product_id: this.data.id,
            page: 1
        }).then(res => {
            // console.log(res)
            if (res.status == 200) {
                this.setData({
                    comment: res.data
                })
            }
        })
    },

    checkmore() {
        wx.navigateTo({
            url: `/pages/allcomment/index?id=${this.data.id}&type=2`,
        })
    },

    appointment () {
        app.ajax('post', 'applet/cart/add', { product_id: this.data.id }).then(res => {
            // console.log(res)
            if (res.status == 200) {
                wx.showToast({
                    title: '添加购物车成功',
                    icon: 'none'
                })
            }
        })
    },

    purchase () {
        // wx.showLoading({
        //     title: '发起支付',
        // })
        let id = this.data.id
        if (app.globalData.userInfo) {
            if (app.globalData.userInfo.phone) {
                wx.navigateTo({
                    url: `/pages/order_confirm/index?id=${id}&num=${this.data.num}&type=2`,
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

    onOpen () {
        this.setData({
            show: true
        })
    },

    onClose () {
        this.setData({
            show: false
        })
    },

    change_num (e) {
        let { type } = e.currentTarget.dataset
        let num = this.data.num
        if (num == 1 && type == -1) {
            return
        }
        if (type == -1) {
            this.setData({
                num: num - 1
            })
        } else {
            this.setData({
                num: num + 1
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