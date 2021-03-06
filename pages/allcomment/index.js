// pages/allcomment/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        id: '',
        type: '',
        header: {
            title: '评价列表',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.id = options.id
        this.data.type = options.type
        this.getlist()
    },

    getlist (){
        var url = ''
        var options = {
            page: Math.ceil(this.data.list.length / 10) + 1
        }
        if (this.data.type == 1) {
            url = '/applet/service/evaluates'
            options.service_id = this.data.id
        } else {
            url = '/applet/product/evaluates'
            options.product_id = this.data.id
        }
        app.ajax('post', url, options).then(res => {
            if(res.status == 200) {
                this.setData({
                    list: this.data.list.concat(res.data)
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