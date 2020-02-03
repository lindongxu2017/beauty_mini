// components/comment_item/index.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        item: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal, changePath) {
                // console.log(newVal, oldVal, changePath)
                if (newVal) {
                    this.setData({
                        active: newVal.score - 1
                    })
                }
            }
        },
        ordertype: {
            type: String,
            value: ''
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        score: [
            { value: 1, name: '很差' },
            { value: 2, name: '一般' },
            { value: 3, name: '满意' },
            { value: 4, name: '非常满意' },
            { value: 5, name: '无可挑剔' }
        ],
        active: -1,
        content: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        star (e) {
            let { index } = e.currentTarget.dataset
            if (this.data.item.state == 1) {
                return
            }
            this.setData({
                active: index
            })
        },
        input (e) {
            let {value} = e.detail
            this.data.content = value
        },
        submit () {
            if (this.data.active == -1) {
                wx.showToast({
                    title: '请完善评价星级！',
                    icon: 'none'
                })
                return
            }
            if (this.data.content == '') {
                wx.showToast({
                    title: '请完善评论内容！',
                    icon: 'none'
                })
                return
            }
            wx.showLoading({
                title: '正在处理...',
            })
            var url = ''
            if (this.data.ordertype == 1){
                url = 'applet/evaluate/service'
            } else {
                url = 'applet/evaluate/product'
            }
            app.ajax('post', url, {
                order_details_id: this.data.item.order_details_id,
                score: this.data.active + 1,
                content: this.data.content
            }).then(res => {
                // console.log()
                wx.hideLoading()
                setTimeout(() => {
                    wx.showToast({
                        title: '评论成功！',
                        icon: 'none'
                    })
                    this.triggerEvent("comment")
                }, 500)
            }).catch(error => {
                wx.hideLoading()
            })
        }
    }
})
