// pages/promiseLogin/promiseLogin.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '登录',
      hiddenBlock: '',
      background: '',
      tubiao:true
    },
    opacityNum1: 1,
    opacityNum2:0.5,
    handleBtn1:false,
    handleBtn2: true,
    promiseWords1:'授权',
    promiseWords2: '授权',
    showTel:true,
  },
  // 点击了弹出框的确认
  onGotUserInfo() {
    var self=this
    wx.login({
      success: res => {
        var code = res.code
        app.globalData.code = res.code
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  wx.request({
                    url: 'https://ttwx.169kang.com/applet/auth/message',
                    method: 'POST',
                    data: {
                      code: app.globalData.code,
                      encryptedData: res.encryptedData,
                      iv: res.iv
                    },
                    success: res => {
                      app.globalData.unionid = res.data.data.unionid
                      wx.request({
                        url: 'https://ttwx.169kang.com/applet/user/details',
                        header: { unionid: app.globalData.unionid },
                        success: res => {
                          app.globalData.userInfo = res.data.data
                        }
                      })
                      self.setData({
                        opacityNum2: 1,
                        opacityNum1: 0.5,
                        handleBtn1: true,
                        handleBtn2: false,
                        promiseWords1: '已授权',
                        showTel: false,
                      })
                    }
                  })
                }
              })
            } else {
              console.log('您拒绝了授权')
            }
          }
        })
      }
    })
  },
  onGotTel:function(e) {
    var self=this
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.login({
        success: res => {
          var code = res.code
          app.globalData.code = res.code
          wx.request({
            url: 'https://ttwx.169kang.com/applet/auth/phone',
            data: {
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              code:app.globalData.code
            },
            method: "post",
            success: function (res) {
              app.globalData.userInfo.phone=res.data.data.phone
              self.setData({
                opacityNum2: 0.5,
                opacityNum1: 0.5,
                handleBtn1: true,
                handleBtn2: true,
                promiseWords1: '已授权',
                promiseWords2: '已授权',
                showTel: false
              })
              // 这里一般都是与后台交互过程
              wx.switchTab({
                url: '../index.index',
              })
            }
          })
        }
      })
    }
  },
  goTel:function(){
    wx.navigateTo({
      url: '../telLogin/telLogin',
    })
  }
})