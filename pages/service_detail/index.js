// pages/service_detail/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '服务详情',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
        id: '',
        detail: {},
        comment: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.id = options.id
        this.getdetail()
        this.getcomments()
    },

    message () {
        wx.showToast({
            title: '院装产品仅供皮肤管家护理使用，不支持购买',
            icon: 'none'
        })
    },

    getdetail () {
        app.ajax('POST', '/applet/service/details', {service_id: this.data.id}).then(res => {
            this.setData({
                detail: res.data
            })
            // console.log(this.data.detail)
        })
    },

    getcomments () {
        app.ajax('post', '/applet/service/evaluates', {
            service_id: this.data.id,
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
            url: `/pages/allcomment/index?id=${this.data.id}&type=1`,
        })
    },

    home() {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    appointment () {
        let id = this.data.id
        // console.log(id)
        if (app.globalData.userInfo) {
            if (app.globalData.userInfo.phone) {
                wx.navigateTo({
                    url: '/pages/service_time/index?services=' + id + '&title=' + this.data.detail.title + '&type=1',
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