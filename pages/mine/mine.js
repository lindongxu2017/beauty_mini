// pages/mine/mine.js
var template = require('../../components/tabbar/tabbar.js');
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        header: {
            title: '个人中心',
            hiddenBlock: '',
            homeCapsule: '',
            background: ''
        },
        userInfo: '',
        allMoney: 0,
        nums: 0
    },
    onLoad: function() {
        template.tabbar("tabBar", 2, this) //0表示第一个tabbar
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                allMoney: app.globalData.userInfo.balance
            })
        }
    },
    onShow: function(options) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                // allMoney: app.globalData.userInfo.balance
            })
            app.ajax('post', 'applet/user/details').then(res => {
                this.setData({
                    allMoney: res.data.balance
                })
                app.globalData.userInfo = res.data
            })
            app.ajax('post', 'applet/cart/amount').then(res => {
                this.setData({
                    nums: res.data.amount
                })
            })
        }
    },

    promiseLogin: function() {
        wx: wx.navigateTo({
            url: '../promiseLogin/promiseLogin'
        })
    },
    depositBtn: function() {
        // let cardData = app.globalData.cardData
        // wx.navigateTo({
        //     url: '../deposit/deposit?invest_amount=' + cardData[0].invest_amount + '&give_amount=' + cardData[0].give_amount + '&index=0'
        // })
        wx.navigateTo({
            url: '/pages/recharge/recharge',
        })
    },
    goSet: function() {
        wx.navigateTo({
            url: '../setPage/setPage'
        })
    },
    goAccount: function() {
        wx.navigateTo({
            url: '../detail/detail',
        })
    },
    goAllOrder: function() {
        wx.navigateTo({
            url: '../allorder/allorder',
        })
    },
    goCardCase: function() {
        wx.navigateTo({
            url: '../mycard/mycard',
        })
    },
    godetail () {
        wx.navigateTo({
            url: '/pages/recharge_detail/index',
        })
    },
    goShoppingcart () {
        wx.navigateTo({
            url: '/pages/shoppingcart/index',
        })
    }
})