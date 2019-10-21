//app.js

var appId = "wx6fcef9e5c43a13b3";
var secret = '09056f9a15c46869c2dbaf6b211196ca';
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var slef=this
    //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        slef.globalData.code = res.code
        if (code) {
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    // 可以将 res 发送给后台解码出 unionId
                    wx.request({
                      url: 'https://ttwx.169kang.com/applet/auth/message',
                      method: 'POST',
                      data: {
                        code: code,
                        encryptedData: res.encryptedData,
                        iv: res.iv
                      },
                      success: res => {
                        slef.globalData.unionid = res.data.data.unionid
                        wx.request({
                          url: 'https://ttwx.169kang.com/applet/user/details',
                          header: { unionid: slef.globalData.unionid },
                          success: res => {
                            slef.globalData.userInfo = res.data.data
                          }
                        })
                      }
                    })
                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                    // 所以此处加入 callback 以防止这种情况
                    if (slef.userInfoReadyCallback) {
                      slef.userInfoReadyCallback(res)
                    }
                  }
                })
              } else {
                slef.globalData.userInfo = null
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    unionid:null,
    code:null,
    cardData:null,
    navgationHeight:0,
    // openId:null,
    // encryptedData:null
  },
})