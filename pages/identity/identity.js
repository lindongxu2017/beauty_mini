// pages/identity/identity.js
const app=getApp()
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '设置',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao: true
    },
    tel:''
  },
  modifyTel:function(){
    wx.navigateTo({
      url: '../telLogin/telLogin',
    })
  },
  onLoad:function(){
    if (app.globalData.userInfo){
      this.setData({
        tel: app.globalData.userInfo.phone
      })
    } 
  }
})