// pages/mine/mine.js
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
    zhanghao:111111,
    yue:1000
  },
  goCardCase:function(){
    wx.navigateTo({
      url: '../cardcase/cardcase'
    })
  },
  goAllOrder: function () {
    wx.navigateTo({
      url: '../allorder/allorder'
    })
  },
  promiseLogin:function(){
    wx:wx.navigateTo({
      url: '../promiseLogin/promiseLogin'
    })
  },
  depositBtn:function(){
    wx.navigateTo({
      url: '../deposit/deposit'
    })
  }
})