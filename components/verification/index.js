// components/verification/index.js
// import wxbarcode from '../../utils/index.js'
var barcode = require('../../utils/barcode');
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        is_show: false
    },

    /**
     * 组件的方法列表
     */
    lifetimes: {
        attached() {
            barcode.code128(wx.createCanvasContext('barcode', this), this.data.item.code, 540, 164)
        }
    },
    

    methods: {
        change () {
            this.setData({
                is_show: !this.data.is_show
            })
        },
        godetail() {
            wx.navigateTo({
                url: `/pages/order_detail/index?order_id=${this.data.item.order_id}&order_type=1&reserve_id=${this.data.item.reserve_id}`,
            })
        },
        call () {
            wx.makePhoneCall({
                phoneNumber: '19926540972'
            })
        },
        location () {
            wx.openLocation({
                latitude: 22.5284770000,
                longitude: 114.0273230000,
                name: '深圳市福田区kkone京基滨河时代广场A座1807（地铁下沙站B口出）'
            })
        }
    }
})
