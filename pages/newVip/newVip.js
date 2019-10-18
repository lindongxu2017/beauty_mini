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
        var arr=res.data.data
        for(var i=0;i<arr.length;i++){
          arr[i].original_price = ((arr[i].original_price - 0) / 100).toFixed(2)
          arr[i].current_price = ((arr[i].current_price - 0) / 100).toFixed(2)
        }
        this.setData({
          pdInfo:arr
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