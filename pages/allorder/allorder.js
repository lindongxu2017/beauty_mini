const app = getApp()
Page({

    data: {
        header: {
            title: '全部订单',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true,
            backurl: ''
        },
        tab_active: 0,
        package_active: 0,
        type_active: 0,
        appoint_active: 0,
        cate: ['全部', '待支付', '待消耗', '已消耗', '已评价', '已取消', '已退款', '已付定金'],
        cate_2: ['全部', '待支付', '待提货', '已提货', '已评价', '已取消', '已退款', '已付定金'],
        cate_3: ['全部', '待支付', '待使用', '已使用', '已评价', '已取消', '已退款', '已付定金'],
        package_list: [[], [], [], [], [], []],
        product_list: [[], [], [], [], [], []],
        appoint_list: [[], [], [], [], [], []]
    },

    onLoad: function(options) {
        this.setData({
            tab_active: options.order_type,
            'header.backURL': '/pages/mine/mine'
        })
        if (options.order_type == 2) {
            this.setData({
                appoint_active: options.order_state,
                
            })
        }
        if (options.order_type == 1) {
            this.setData({
                type_active: options.order_state
            })
        }
        if (options.order_type == 0) {
            this.setData({
                package_active: options.order_state
            })
        }
    },

    onChange (e) {
        // console.log(e.detail)
        this.setData({
            tab_active: e.detail.index
        })
    },

    package_onChange (e) {
        var index = e.detail.index
        this.setData({
            package_active: e.detail.index
        })
        let key = 'package_list[' + index + ']'
        this.setData({
            [key]: []
        })
        this.get_package_list()
    },

    product_onChange (e) {
        var index = e.detail.index
        this.setData({
            type_active: e.detail.index
        })
        let key = 'product_list['+index+']'
        this.setData({
            [key]: []
        })
        this.get_product_list()
    },

    appoint_onChange(e) {
        var index = e.detail.index
        this.setData({
            appoint_active: e.detail.index
        })
        let key = 'appoint_list[' + index + ']'
        this.setData({
            [key]: []
        })
        this.get_appoint_list()
    },

    get_package_list () {
        wx.showLoading({
            title: '正在加载...',
        })
        var active = this.data.package_active
        app.ajax('post', 'applet/order/packages', {
            state: active,
            page: Math.ceil(this.data.package_list[active].length / 10) + 1
        }).then(res => {
            wx.hideLoading()
            if (res.status == 200) {
                if (res.data.length) {
                    var arr = 'package_list[' + active + ']'
                    var list = this.data.package_list[active].concat(res.data)
                    this.setData({
                        [arr]: list
                    })
                } else {
                    // todo
                }
            }
        })
    },

    get_product_list () {
        wx.showLoading({
            title: '正在加载...',
        })
        var active = this.data.type_active
        app.ajax('post', 'applet/order/products', {
            state: active,
            page: Math.ceil(this.data.product_list[active].length / 10) + 1
        }).then(res => {
            wx.hideLoading()
            if (res.status == 200) {
                if(res.data.length) {
                    var arr = 'product_list[' + active + ']'
                    var list = this.data.product_list[active].concat(res.data)
                    this.setData({
                        [arr]: list
                    })
                } else {
                    // todo
                }
            }
        })
    },

    get_appoint_list() {
        wx.showLoading({
            title: '正在加载...',
        })
        var active = this.data.appoint_active
        app.ajax('post', 'applet/order/reserves', {
            state: active,
            page: Math.ceil(this.data.appoint_list[active].length / 10) + 1
        }).then(res => {
            wx.hideLoading()
            if (res.status == 200) {
                if (res.data.length) {
                    var arr = 'appoint_list[' + active + ']'
                    var list = this.data.appoint_list[active].concat(res.data)
                    this.setData({
                        [arr]: list
                    })
                } else {
                    // todo
                }
            }
        })
    },

    package_cancel (e) {
        let { index, order } = e.currentTarget.dataset
        let arr = JSON.parse(JSON.stringify(this.data.package_list[index]))
        arr.splice(order, 1)
        let key = 'package_list[' + index + ']'
        this.setData({
            [key]: arr
        })
        wx.hideLoading()
    },

    product_cancel (e) {
        let { index, order } = e.currentTarget.dataset
        let arr = JSON.parse(JSON.stringify(this.data.product_list[index]))
        arr.splice(order, 1)
        let key = 'product_list['+index+']'
        this.setData({
            [key]: arr
        })
        wx.hideLoading()
    },

    appoint_cancel (e) {
        let { index, order } = e.currentTarget.dataset
        let arr = JSON.parse(JSON.stringify(this.data.appoint_list[index]))
        arr.splice(order, 1)
        let key = 'appoint_list[' + index + ']'
        this.setData({
            [key]: arr
        })
        wx.hideLoading()
    },

    onShow: function() {
        this.setData({
            package_list: [[], [], [], [], [], []],
            product_list: [[], [], [], [], [], []],
            appoint_list: [[], [], [], [], [], []]
        })
        this.get_package_list()
        this.get_product_list()
        this.get_appoint_list()
    },

    onUnload: function() {

    },

    onPullDownRefresh: function() {

    },

    onReachBottom: function() {
        if (this.data.tab_active == 0) {
            this.get_package_list()
        } else if (this.data.tab_active == 1) {
            this.get_product_list()
        } else {
            this.get_appoint_list()
        }
    },
})