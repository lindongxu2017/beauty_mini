// pages/cardMore/cardMore.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '卡项详情',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao: true
    },
    pdData:{},
    orderId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.id
    })
    wx.request({
      url: 'https://ttwx.169kang.com/applet/product/spread?id='+options.id,
      success:res=>{
        let data = res.data.data
        data.original_price = ((data.original_price-0)/100).toFixed(2)
        data.current_price = ((data.current_price - 0)/100).toFixed(2)
        for (var i = 0; i < data.sub_projects.length;i++){
          data.sub_projects[i].price = (data.sub_projects[i].price - 0).toFixed(2)
        }
        this.setData({
          pdData:data
        })
      }
    })
  },
  goMall:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  bugNow:function(e){
    if (app.globalData.unionid) {
      wx.request({
        url: 'https://ttwx.169kang.com/applet/purchase/spread',
        method: 'post',
        header: { unionid: app.globalData.unionid },
        data: { package_id: e.currentTarget.dataset.id },
        success: res => {
          const resData = res.data.data
          wx.requestPayment({
            timeStamp: resData.timeStamp,
            nonceStr: resData.nonceStr,
            package: resData.package,
            signType: resData.signType,
            paySign: resData.paySign,
            success(res) {
              if (res.errMsg == "requestPayment:ok") {
                wx.navigateTo({
                  url: '../index/index',
                })
               // app.globalData.userInfo.sum_balance = app.globalData.userInfo.sum_balance + this.data.chooseMoney.invest_amount + this.data.chooseMoney.give_amount
              }
            },
            fail(res) { }
          })

        }
      })
    } else {
      wx.showToast({
        title: '您还没有登录，请授权后购买!',
        icon:'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../promiseLogin/promiseLogin',
        })
      }, 1500)
    }
  },
  onShareAppMessage:function(options){
    let gbid = this.data.orderId;
    return {
      title: '分享',
      path: '/pages/cardMore/cardMore?id=' + gbid,
      imageUrl: this.data.pdData.img_url,  //用户分享出去的自定义图片大小为5:4,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 2000
        })
      }
    }
  },
})