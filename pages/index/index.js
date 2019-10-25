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
    interval: 3000,
    duration: 1000,
    showNav:false,
    cardData:null,
    scrollTopNum:null,
    showDav:false,
    version: 0,
  },
  onLoad:function(){
    var self = this
    if(app.globalData.userInfo){
      //从别的页面进来的
      self.setData({
        showDav: false,
        version:1
      })
     wx.request({
      url: 'https://skin.169kang.com/applet/product/spreads',
      header: { 'content-type': 'json' },
      success: res => {
        var arr = res.data.data
        for (var i = 0; i < arr.length; i++) {
          arr[i].original_price = ((arr[i].original_price - 0) / 100).toFixed(2)
          arr[i].current_price = ((arr[i].current_price - 0) / 100).toFixed(2)
        }
        self.setData({
          pdInfo: arr
        })
        setTimeout(function(){
          self.loadingSelf = self.selectComponent('#loadingSelf')
          self.loadingSelf.closeLoading()
        },1000)
      }
    })
    }else{
      app.wxlogin().then(res => {
        self.setData({
          version: app.globalData.advSwitch
        })
        if (app.globalData.userInfo) {
          self.setData({
            showDav: false
          })
          setTimeout(function () {
            self.loadingSelf = self.selectComponent('#loadingSelf')
            self.loadingSelf.closeLoading()
          }, 1000)
        } else {
          self.setData({
            showDav: true
          })
          setTimeout(function () {
            self.loadingSelf = self.selectComponent('#loadingSelf')
            self.loadingSelf.closeLoading()
          }, 1000)
        }
        wx.request({
          url: 'https://skin.169kang.com/applet/product/spreads',
          header: { 'content-type': 'json' },
          success: res => {
            // self.loadingSelf = self.selectComponent('#loadingSelf')
            // self.loadingSelf.closeLoading()
            var arr = res.data.data
            for (var i = 0; i < arr.length; i++) {
              arr[i].original_price = ((arr[i].original_price - 0) / 100).toFixed(2)
              arr[i].current_price = ((arr[i].current_price - 0) / 100).toFixed(2)
            }
            self.setData({
              pdInfo: arr
            })
          }
        })
      })
    }
  },
  handleDeposit:function(e){
    var invest_amount = e.currentTarget.dataset.invest_amount
    var give_amount = e.currentTarget.dataset.give_amount
    var index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '../deposit/deposit?invest_amount=' + invest_amount + '&give_amount=' + give_amount + '&index=' + index
      })
  },
  bindGetUserInfo:function(res){
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
        wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var code = res.code
          app.globalData.code = res.code
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      wx.request({
                        url: 'https://skin.169kang.com/applet/auth/message',
                        method: 'POST',
                        data: {
                          code: code,
                          encryptedData: res.encryptedData,
                          iv: res.iv
                        },
                        success: res => {
                          app.globalData.unionid = res.data.data.unionid
                          wx.request({
                            url: 'https://skin.169kang.com/applet/user/details',
                            header: { unionid: app.globalData.unionid },
                            success: res => {
                              app.globalData.userInfo = res.data.data
                              that.setData({
                                showDav: false
                              })
                            }
                          })
                        }
                      })
                     
                    }
                  })
                }
        })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }

      });
    }
  },
  onShow:function(){
    if(app.globalData.userInfo){
      this.setData({
        showDav: false
      })
    }
  },
  goForLook: function (e) {
    wx.navigateTo({
      url: '../cardMore/cardMore?id=' + e.currentTarget.dataset.id,
    })
  }
})
