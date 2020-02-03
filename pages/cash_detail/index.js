// pages/cash_detail/index.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '明细详情',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
        order_no: '',
        type: '',
        detail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options)
        this.data.order_no = options.order_no
        this.data.type = options.type
        this.getdetail()
    },

    getdetail () {
        app.ajax('post', 'applet/user/balance', {
            order_no: this.data.order_no,
            type: this.data.type
        }).then(res => {
            if(res.status == 200) {
                this.setData({
                    detail: res.data
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