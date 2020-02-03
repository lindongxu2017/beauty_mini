// pages/comment_details/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '评论详情',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
        active: -1,
        score: [
            { value: 1, name: '很差' },
            { value: 2, name: '一般' },
            { value: 3, name: '满意' },
            { value: 4, name: '非常满意' },
            { value: 5, name: '无可挑剔' }
        ],
        options: [],
        content: '',
        reserve_id: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.type == 1) {
            this.data.reserve_id = options.reserve_id
        }
        this.getdetail()
    },

    getdetail () {
        app.ajax('post', 'applet/evaluate/sdetails', { reserve_id: this.data.reserve_id }).then(res => {
            if(res.status == 200) {
                this.setData({
                    active: res.data.score - 1,
                    options: res.data.tags,
                    content: res.data.content
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