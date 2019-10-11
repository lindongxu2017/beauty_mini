// pages/mine/mine.js
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
    zhanghao:111111,
    yue:1000,
    id:'',
  },
  onLoad: function (options){
    if (app.globalData.userInfo){
      this.setData({
        id: app.globalData.userInfo
      })
    }
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
  },
  goSet:function(){
    wx.navigateTo({
      url: '../setPage/setPage'
    })
  }
})