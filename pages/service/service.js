// pages/service/service.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '商城',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
        isfocus: false,
        inputValue: '',
        list: [],
        list2: [],
        active: 0,
        category: [],
        category2: [],
        category_id: '',
        category_id2: '',
        status_height: 64,
        enter: {
            service: 0,
            product: 0
        },
        type: '',
        nums: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.type = options.type
        // this.getcategory()
        // this.getcategory2()
        // this.getdata()
        // this.getdata2()
        if (app.globalData.navgationHeight) {
            this.setData({
                status_height: app.globalData.navgationHeight
            })
        }
        this.get_config()
        // this.getshoppingcart()
    },

    get_config () {
        app.ajax('post', 'applet/home').then(res => {
            this.setData({
                enter: res.data.enter
            })
            if (res.data.enter.service) {
                this.getcategory()
                this.getdata()
            }
            if (res.data.enter.product) {
                this.getcategory2()
                this.getdata2()
            }
            if (res.data.enter.service && res.data.enter.product) {
                this.setData({
                    active: this.data.type
                })
            } else {
                this.setData({
                    active: 0
                })
            }
        })
    },

    join (e) {
        // console.log(e)
        var nums = this.data.nums + 1
        this.setData({
            nums: nums
        })
    },

    // getshoppingcart () {
    //     app.ajax('post', '/applet/cart/lists').then(res => {
    //         console.log(res)
    //         this.setData({
    //             nums: res.data.length
    //         })
    //     })
    // },

    getcategory() {
        app.ajax('POST', 'applet/service/categorys').then(res => {
            // console.log(res)
            res.data.unshift({
                "cid": '',
                "name": "全部"
            })
            this.setData({ category: res.data })
        })
    },

    getcategory2() {
        app.ajax('POST', 'applet/product/categorys').then(res => {
            // console.log(res)
            res.data.unshift({
                "cid": '',
                "name": "全部"
            })
            this.setData({ category2: res.data })
        })
    },

    select(e) {
        let { type, id } = e.currentTarget.dataset
        console.log(type, id)
        if (type == 1) {
            this.setData({ category_id: id, list: [] })
            this.getdata()
        } else {
            this.setData({ category_id2: id, list2: [] })
            this.getdata2()
        }
    },

    getdata() {
        app.ajax('POST', 'applet/service/lists', {
            page: Math.ceil(this.data.list.length / 10) + 1,
            category_id: this.data.category_id,
            keyword: this.data.inputValue
        }).then(res => {
            res.data.map(obj => {
                let key = 'list['+this.data.list.length+']'
                this.setData({
                    [key]: obj
                })
            })
            wx.stopPullDownRefresh()
            // this.setData({ list: res.data })
        })
    },

    getdata2() {
        app.ajax('POST', 'applet/product/lists', {
            page: Math.ceil(this.data.list2.length / 10) + 1,
            category_id: this.data.category_id2,
            keyword: this.data.inputValue
        }).then(res => {
            res.data.map(obj => {
                let key = 'list2[' + this.data.list2.length + ']'
                this.setData({
                    [key]: obj
                })
            })
            wx.stopPullDownRefresh()
            // this.setData({ list2: res.data })
        })
    },

    focus() {
        this.setData({
            isfocus: true
        })
    },

    blur() {
        if (this.data.inputValue.length == 0) {
            this.setData({
                isfocus: false
            })
        }
    },

    print(e) {
        let value = e.detail.value
        this.setData({
            inputValue: value
        })
    },

    search() {
        if (this.data.inputValue) {
            // TODO search
            if (this.data.active == 0) {
                this.setData({
                    list: []
                })
                this.getdata()
            } else {
                this.setData({
                    list2: []
                })
                this.getdata2()
            }
        }
    },

    onChange(e) {
        this.setData({
            active: e.detail.index,
            inputValue: ''
        })
        if (this.data.active == 0) {
            this.setData({
                list2: []
            })
            this.getdata2()
        } else {
            this.setData({
                list: []
            })
            this.getdata()
        }
    },

    goshoppingcart () {
        wx.navigateTo({
            url: '/pages/shoppingcart/index',
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
        app.ajax('post', '/applet/cart/amount').then(res => {
            this.setData({
                nums: res.data.amount
            })
        })
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
        if (this.data.active == 0) {
            this.setData({
                list: []
            })
            this.getdata()
        } else {
            this.setData({
                list2: []
            })
            this.getdata2()
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (this.data.active == 0) {
            this.getdata()
        } else {
            this.getdata2()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})