// pages/ordermore/ordermore.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '订单详情',
      hiddenBlock: '',
      homeCapsule: '',
      background: '',
      tubiao: true
    },
    orderData:{}
  },
  onLoad:function(options){
    wx.request({
      url: 'https://ttwx.169kang.com/applet/user/order',
      method: "POST",
      header: { unionid: app.globalData.unionid },
      data: {
        order_id: options.id
      },
      success:res=>{
        var obj=res.data.data
        obj.original_price = (obj.original_price / 100).toFixed(2)
        obj.total_fee = (obj.total_fee / 100).toFixed(2)
        if (obj.state == 0) {
          obj.state = '全部'
        } else if (obj.state == 1) {
          obj.state = '待支付'
        } else if (obj.state == 2) {
          obj.state = '已支付'
        } else if (obj.state == 3) {
          obj.state = '已完成'
        } 
        this.setData({
          orderData:res.data.data
        })
      }
    })
  }
  
})