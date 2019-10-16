// pages/newVip/newVip.js
var template = require('../../components/tabbar/tabbar.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '新人专享',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao: true
    },
    pdInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
    wx.request({
      url: 'https://ttwx.169kang.com/applet/product/spreads',
      success:res=>{
        console.log(res)
        this.setData({
          pdInfo:res.data.data
        })
      }
    })
  },
  goForLook:function(e){
    wx.navigateTo({
      url: '../cardMore/cardMore?id=' + e.currentTarget.dataset.id,
    })
  }
})