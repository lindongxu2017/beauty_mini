// pages/setPage/setPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '设置',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao:true
    },
  },
  personal:function(){
    wx.navigateTo({
      url: '../personal/personal'
    })
  },
  identity: function () {
    wx.navigateTo({
      url: '../identity/identity'
    })
  }
})