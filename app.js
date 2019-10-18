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
    
  },
  globalData: {
    userInfo: null,
    unionid:null,
    code:null,
    cardData:null
    // openId:null,
    // encryptedData:null
  },
})