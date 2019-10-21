// pages/mine/mine.js
var template = require('../../components/tabbar/tabbar.js');
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    header: {
      title: '个人中心',
      hiddenBlock: '',
      homeCapsule: '',
      background:''
    },
    userInfo:'',
    allMoney:0
  },
  onLoad:function(){
    template.tabbar("tabBar", 1, this)//0表示第一个tabbar
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        allMoney: ((app.globalData.userInfo.give_balance + app.globalData.userInfo.invest_balance)/100).toFixed(2)
      })
    }
  },
  onShow: function (options){
    if (app.globalData.userInfo){
       this.setData({
         userInfo: app.globalData.userInfo,
         allMoney: ((app.globalData.userInfo.give_balance + app.globalData.userInfo.invest_balance) / 100).toFixed(2)
       })
    }
  },
  promiseLogin:function(){
    wx:wx.navigateTo({
      url: '../promiseLogin/promiseLogin'
    })
  },
  depositBtn:function(){
    let cardData = app.globalData.cardData
    wx.navigateTo({
      url: '../deposit/deposit?invest_amount=' + cardData[0].invest_amount + '&give_amount=' + cardData[0].give_amount + '&index=0'
    })
  },
  goSet:function(){
    wx.navigateTo({
      url: '../setPage/setPage'
    })
  },
  goAccount:function(){
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  goAllOrder:function(){
    wx.navigateTo({
      url: '../allorder/allorder',
    })
  },
  goCardCase: function () {
    wx.navigateTo({
      url: '../mycard/mycard',
    })
  }
})