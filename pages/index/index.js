//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
    imgUrls: [
      '../../utils/img/1568777964097.jpg'
    ],
    header: {
      title: '美肌商城',
      hiddenBlock: '',
      homeCapsule: '',
    },
    indicatorDots:true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    showNav:false,
    cardData:null,
    scrollTopNum:null,
    showDav:true,
    version: 0
  },
  onLoad:function(){
    var self = this
    setTimeout(function(){
      if (app.globalData.userInfo) {
        self.setData({
          showDav: true
        })
      } else {
        self.setData({
          showDav: false
        })
      }
    },2000)
    
    // if(!app.globalData.userInfo){
    //   wx.login({
    //     success: res => {
    //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //       var code = res.code
    //       app.globalData.code = res.code
    //       if (code) {
    //         wx.getSetting({
    //           success: res => {
    //             if (res.authSetting['scope.userInfo']) {
    //               // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //               wx.getUserInfo({
    //                 success: res => {
    //                   // 可以将 res 发送给后台解码出 unionId
    //                   wx.request({
    //                     url: 'https://ttwx.169kang.com/applet/auth/message',
    //                     method: 'POST',
    //                     data: {
    //                       code: code,
    //                       encryptedData: res.encryptedData,
    //                       iv: res.iv
    //                     },
    //                     success: res => {
    //                       app.globalData.unionid = res.data.data.unionid
    //                       wx.request({
    //                         url: 'https://ttwx.169kang.com/applet/user/details',
    //                         header: { unionid: app.globalData.unionid },
    //                         success: res => {
    //                           app.globalData.userInfo = res.data.data
    //                           self.setData({
    //                             showDav: true
    //                           })
    //                         }
    //                       })
    //                     }
    //                   })
    //                   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //                   // 所以此处加入 callback 以防止这种情况
    //                   if (self.userInfoReadyCallback) {
    //                     self.userInfoReadyCallback(res)
    //                   }
    //                 }
    //               })
    //             } else {
    //               app.globalData.userInfo = null
    //               self.setData({
    //                 showDav: false
    //               })
    //             }
    //           }
    //         })
    //       }
    //     }
    //   })
    // }
    // wx.request({
    //   url: 'https://ttwx.169kang.com/applet/product/invests',
    //   method:'post',
    //   success:res=>{
    //     this.setData({
    //       cardData:res.data.data
    //     })
    //   app.globalData.cardData = res.data.data
    //   }
    // })
  },
  // onPageScroll: function (e) {
    //   if (e.scrollTop < 300) {
    //     this.setData({ showNav: false })
    //   }
    //   if(e.scrollTop>=300){
    //     this.setData({showNav:true})
    //   }
    //   if (e.scrollTop >= 300 && e.scrollTop < 1300) {
    //     this.setData({ activeName: ['active', '', '', ''] })
    //   }
    //   if (e.scrollTop >= 1300 && e.scrollTop < 2100){
    //     this.setData({ activeName: ['', 'active', '', '']})
    //   }
    //   if (e.scrollTop >= 2100 && e.scrollTop < 2900) {
    //     this.setData({ activeName: ['', '', 'active', ''] })
    //   }
    //   if (e.scrollTop >= 2900) {
    //     this.setData({ activeName: ['', '', '', 'active'] })
    //   }
    // },
  moveNav:function(e){
    console.log(e)
  },
  handleAppointe:function(){
    wx.navigateTo({
      url: '../appointServe/appointServe'
    })
  },
  handleDeposit:function(e){
    var invest_amount = e.currentTarget.dataset.invest_amount
    var give_amount = e.currentTarget.dataset.give_amount
    var index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '../deposit/deposit?invest_amount=' + invest_amount + '&give_amount=' + give_amount + '&index=' + index
      })
  },
  hiddenAdv:function(){
    this.setData({
      showDav: true
    })
  },
  goNewGift:function(){
    console.log(111)
  },
  goNewGift:function(){
    wx.navigateTo({
      url: "../newVip/newVip",
    })
  },
  godeposit: function () {
    wx.navigateTo({
      url: "../deposit/deposit",
    })
  },
})
