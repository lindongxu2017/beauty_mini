// pages/identity/identity.js
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
  }
})