// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardArr:[
      { imgurl:"../../utils/img/1562663373427.jpg"},
      { imgurl: "../../utils/img/1562663578590.jpg" },
      { imgurl: "../../utils/img/1562911353027.jpg" },
    ],
    header: {
      title: '个人中心',
      hiddenBlock: '',
      homeCapsule: '',
      background:'#f4f4f2'
    },
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
  }
})