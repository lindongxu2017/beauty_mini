// components/product/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            value: null,
            type: Object,
            obverse: function (newVal, oldVal, changePath) {
                // console.log(newVal, oldVal, changePath)
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        goForLook: function (e) {
            wx.navigateTo({
                url: '/pages/product_detail/index?id=' + this.data.item.product_id
            })
        },
        join () {
            // console.log(this.data.item.product_id)
            var id = this.data.item.product_id
            app.ajax('post', 'applet/cart/add', { product_id: id }).then(res => {
                // console.log(res)
                if (res.status == 200) {
                    wx.showToast({
                        title: '添加购物车成功',
                        icon: 'none'
                    })
                    this.triggerEvent('join', id)
                }
            })
        }
    }
})
