// pages/comment/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '评价',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
        active: -1,
        score: [
            {value: 1, name: '很差'},
            {value: 2, name: '一般'},
            {value: 3, name: '满意'},
            {value: 4, name: '非常满意'},
            {value: 5, name: '无可挑剔'}
        ],
        options: [
            [
                {is_check: false, name: '态度很差'},
                {is_check: false, name: '不专业'},
                {is_check: false, name: '环境很差'},
                {is_check: false, name: '不认真'},
                {is_check: false, name: '强行推销'},
                {is_check: false, name: '效果不好'},
            ],
            [
                { is_check: false, name: '态度很差' },
                { is_check: false, name: '不专业' },
                { is_check: false, name: '环境很差' },
                { is_check: false, name: '不认真' },
                { is_check: false, name: '强行推销' },
                { is_check: false, name: '效果不好' },
            ],
            [
                { is_check: false, name: '态度很好' },
                { is_check: false, name: '认真仔细' },
                { is_check: false, name: '很负责任' },
                { is_check: false, name: '环境很好' },
            ],
            [
                { is_check: false, name: '性价比高' },
                { is_check: false, name: '环境优雅' },
                { is_check: false, name: '态度非常好' },
                { is_check: false, name: '高大上' },
                { is_check: false, name: '体验很棒' },
                { is_check: false, name: '干净整洁' },
                { is_check: false, name: '服务专业' },
                { is_check: false, name: '无推销' },
            ],
            [
                { is_check: false, name: '服务热情' },
                { is_check: false, name: '环境优雅' },
                { is_check: false, name: '态度非常好' },
                { is_check: false, name: '效果赞' },
                { is_check: false, name: '体验很棒' },
                { is_check: false, name: '干净整洁' },
                { is_check: false, name: '服务专业' },
                { is_check: false, name: '无推销' },
            ],
        ],
        postdata: {
            score: '',
            content: '',
            tags: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.type == 1) {
            this.setData({
                reserve_id: options.reserve_id,
                service_id: options.service_id
            })
            // 'applet/evaluate/service'
        } else {
            this.setData({
                order_id: options.order_id,
                product_id: options.product_id
            })
            // applet/evaluate/product
        }
        this.setData({
            type: options.type
        })
    },

    inputValue (e) {
        // console.log(e)
        this.data.postdata.content = e.detail.value
    },

    set_comment () {
        var options = {}
        var url = ''
        if (this.data.type == 1) {
            url = 'applet/evaluate/service'
            options.reserve_id = this.data.reserve_id
            options.service_id = this.data.service_id
        } else {
            url = 'applet/evaluate/product'
            options.order_id = this.data.order_id
            options.product_id = this.data.product_id
        }
        this.data.postdata.score = this.data.active + 1
        var arr = []
        this.data.options[this.data.active].map(item => {
            if (item.is_check) {
                arr.push(item.name)
            }
        })
        this.data.postdata.tags = arr
        app.ajax('post', url, {...options, ...this.data.postdata}).then(res => {
            if (res.status == 200) {
                wx.showToast({
                    title: '评论成功',
                    icon: 'none'
                })
                setTimeout(() => {
                    wx.navigateBack()
                }, 1000)
            }
        })
    },

    star (e) {
        let { index } = e.currentTarget.dataset
        this.setData({
            active: index
        })
        this.data.options[index].map((item, order) => {
            let key = `options[${index}][${order}].is_check`
            this.setData({
                [key]: false
            })
        })
    },

    select (e) {
        let { index } = e.currentTarget.dataset
        let key = 'options[' + this.data.active + '][' + index +'].is_check'
        this.setData({
            [key]: !this.data.options[this.data.active][index].is_check
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