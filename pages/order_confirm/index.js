// pages/order_confirm/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '确认订单',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
        is_arrge: false,
        num: 0,
        id: '',
        show: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        this.data.id = options.id
    },

    arrge() {
        this.setData({
            is_arrge: !this.data.is_arrge
        })
    },

    show_protrol(e) {
        let {
            type
        } = e.currentTarget.dataset
        wx.navigateTo({
            url: '/pages/protrol/index?type=' + type,
        })
    },

    pay() {
        if (!this.data.is_arrge) {
            wx.showToast({
                title: '请勾选同意平台协议',
                icon: 'none'
            })
            return
        }
        this.setData({
            show: true
        })
        // wx.showLoading({
        //     title: '发起支付',
        // })
        // app.ajax('post', 'applet/purchase/product', {
        //     product_id: this.data.id
        // }).then(res => {
        //     wx.hideLoading()
        //     if (res.status == 200) {
        //         wx.requestPayment({
        //             timeStamp: res.data.timeStamp,
        //             nonceStr: res.data.nonceStr,
        //             package: res.data.package,
        //             signType: res.data.signType,
        //             paySign: res.data.paySign,
        //             success(res) {
        //                 wx.showToast({
        //                     title: '支付成功',
        //                     icon: 'none'
        //                 })
        //                 wx.navigateTo({
        //                     url: '/pages/allorder/allorder?order_type=1&order_state=2',
        //                 })
        //             },
        //             fail(res) {
        //                 wx.showToast({
        //                     title: '支付失败',
        //                     icon: 'none'
        //                 })
        //                 wx.navigateTo({
        //                     url: '/pages/allorder/allorder?order_type=1&order_state=1',
        //                 })
        //             }
        //         })
        //     }
        // }).catch(error => {
        //     wx.showToast({
        //         title: res.data.msg,
        //         icon: 'none',
        //         duration: 1000
        //     })
        // })
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