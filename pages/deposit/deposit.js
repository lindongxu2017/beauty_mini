// pages/deposit/deposit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '充值',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao:true
    },
    info: {},
    moneyActive:0,
    cardData: [],
    chooseMoney: { invest_amount: 2000, give_amount:200}
  },
  handleMoney:function(e){
    this.setData({
      moneyActive: e.currentTarget.dataset.index,
      chooseMoney:{
        invest_amount: e.currentTarget.dataset.invest_amount,
        give_amount: e.currentTarget.dataset.give_amount
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cardData: app.globalData.cardData,
      info: app.globalData.userInfo
    })
    console.log(options)
    if (options.invest_amount && options.give_amount){
      this.setData({
        moneyActive: options.index-0,
        chooseMoney: {
          invest_amount: options.invest_amount-0,
          give_amount: options.give_amount-0
        }
      })
    }
  },
  addmoney:function(){
    if(app.globalData.unionid){
      wx.request({
        url: 'https://ttwx.169kang.com/applet/purchase/invest',
        method: 'post',
        header: { unionid: app.globalData.unionid },
        data: { product_id: this.data.moneyActive - 0 + 1 },
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
                wx.switchTab({
                  url: '../mine/mine?page=deposit',
                })
                app.globalData.userInfo.sum_balance = app.globalData.userInfo.sum_balance + this.data.chooseMoney.invest_amount + this.data.chooseMoney.give_amount
              }
            },
            fail(res) { }
          })

        }
      })
    }else{
      wx.showToast({
        title: '您还没有登录，请授权后购买',
        icon: '',
      })
      setInterval(function(){
        wx.navigateTo({
          url: '../promiseLogin/promiseLogin',
        })
      },1500)
    }   
  }
})