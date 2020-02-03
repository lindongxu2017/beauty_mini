// pages/comment_product/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '评论',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
        order_id: '',
        type: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.order_id = options.order_id
        this.setData({
            type: options.type
        })
        this.getlist()
    },

    getlist () {
        var options = {}
        var url = ''
        if (this.data.type == 1) {
            url = 'applet/evaluate/sdetails'
            options.reserve_id = this.data.order_id
        } else if (this.data.type == 2) {
            url = 'applet/evaluate/pdetails'
            options.order_id = this.data.order_id
        } else {}
        app.ajax('post', url, options).then(res => {
            if (res.status == 200) {
                this.setData({
                    list: res.data
                })
            }
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