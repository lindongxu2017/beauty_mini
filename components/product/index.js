// components/product/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            value: null,
            type: Object,
            observer: function(newVal, oldVal, changePath) {
                // console.log(newVal, oldVal, changePath)
            }
        },
        type: {
            value: 0,
            type: Number,
            observer: function(newVal, oldVal, changePath) {
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
        goForLook: function() {
            var url = '/pages/service_detail/index?id=' + this.data.item.service_id
            if (this.data.type == 1) {
                url = '/pages/cardMore/cardMore?id=' + this.data.item.package_id
            }
            wx.navigateTo({ url })
        }
    }
})