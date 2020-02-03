// pages/service_time/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        header: {
            title: '选择预约时间',
            hiddenBlock: '',
            homeCapsule: '',
            tubiao: true
        },
        id: '',
        date: [],
        date_active: 0,
        staff_active: 0,
        shifts_active: 0,
        schedule_active: -1,
        dates: [],
        shifts: [],
        staffs: [],
        schedule: [],
        options_date: [],
        services: [],
        type: '',
        order_id: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            title: options.title,
            type: options.type,
            services: options.services.split(',')
        })
        if (options.type == 4) {
            this.setData({
                order_id: options.order_id,
            })
        }
        this.getdata()
    },

    getdata () {
        app.ajax('post', 'applet/service/schedule').then(res => {
            var date_arr = JSON.parse(JSON.stringify(res.data.dates))
            res.data.dates.map((item, index) => {
                var arr = item.date.split('-')
                item.date = arr[1] + '.' + arr[2]
            })
            this.setData({
                dates: res.data.dates,
                shifts: res.data.shifts,
                staffs: res.data.staffs,
                options_date: date_arr
            }, () => {
                this.getschedule()
            })
        })
    },

    getschedule () {
        app.ajax('post', '/applet/service/arrange', {
            staff_id: this.data.staffs[this.data.staff_active].staff_id,
            date: this.data.options_date[this.data.date_active].date,
            segment: this.data.shifts[this.data.shifts_active].segment
        }).then(res => {
            // console.log(res)
            this.setData({
                schedule: res.data
            })
        })
    },

    switchchange (e) {
        // console.log(e)
        let {current} = e.detail
        this.setData({
            staff_active: current,
            date_active: 0,
            schedule_active: -1
        })
        this.getschedule()
    },

    select_date (e) {
        let {index} = e.currentTarget.dataset
        this.setData({
            date_active: index,
            shifts_active: 0
        })
        this.getschedule()
    },

    select_shifts(e) {
        let { index } = e.currentTarget.dataset
        this.setData({
            shifts_active: index,
            schedule_active: -1
        })
        this.getschedule()
    },

    select_shecdule (e) {
        let { index, allow, is_reserve } = e.currentTarget.dataset
        if (is_reserve == 0 && allow == 1) {
            this.setData({
                schedule_active: index
            })
        }
        // this.getschedule()
    },

    next () {
        if (this.data.schedule_active > -1) {
            let staff_id = this.data.staffs[this.data.staff_active].staff_id
            let staff_name = this.data.staffs[this.data.staff_active].name
            let avatar = this.data.staffs[this.data.staff_active].image_src
            let date = this.data.options_date[this.data.date_active].date
            let segment = this.data.shifts[this.data.shifts_active].segment
            let interval = this.data.schedule[this.data.schedule_active].interval

            app.ajax('post', 'applet/reserve/lock', {
                service_ids: this.data.services,
                staff_id,
                date,
                interval,
                segment
            }).then(res => {
                if (res.status == 200) {
                    wx.navigateTo({
                        url: `/pages/service_confirm/index?service_id=${this.data.services}&staff_id=${staff_id}&date=${date}&segment=${segment}&interval=${interval}&staff_name=${staff_name}&avatar=${avatar}&type=${this.data.type}&order_id=${this.data.order_id}&expires=${res.expires}`
                    })
                }
            })
        } else {
            wx.showToast({
                title: '请选择排班时间',
                icon: 'none'
            })
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