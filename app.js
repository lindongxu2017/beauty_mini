//app.js

var appId = "wx6fcef9e5c43a13b3";
var secret = '09056f9a15c46869c2dbaf6b211196ca';
// var base_url = 'https://ttwx.169kang.com/' // 测试环境
var base_url = 'https://skin.169kang.com/' // 正式环境
var api = require('./utils/api.js')
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        var slef = this
        //登录
        // wx.login({
        //   success: res => {
        //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //     var code = res.code
        //     slef.globalData.code = res.code
        //     if (code) {
        //       wx.getSetting({
        //         success: res => {
        //           if (res.authSetting['scope.userInfo']) {
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             wx.getUserInfo({
        //               success: res => {
        //                 // 可以将 res 发送给后台解码出 unionId
        //                 wx.request({
        //                   url: 'https://skin.169kang.com/applet/auth/message',
        //                   method: 'POST',
        //                   data: {
        //                     code: code,
        //                     encryptedData: res.encryptedData,
        //                     iv: res.iv
        //                   },
        //                   success: res => {
        //                     slef.globalData.unionid = res.data.data.unionid
        //                     wx.request({
        //                       url: 'https://skin.169kang.com/applet/user/details',
        //                       header: { unionid: slef.globalData.unionid },
        //                       success: res => {
        //                         slef.globalData.userInfo = res.data.data
        //                       }
        //                     })

        //                   }
        //                 })
        //               }
        //             })
        //           } 
        //           else  { 
        //            slef.globalData.userInfo=null

        //           }
        //         }
        //       })
        //     }
        //   }
        // })
        wx.request({
            url: base_url + '/applet/config',
            success: res => {
                slef.globalData.advSwitch = res.data.data.new_people
            }
        })

    },
    globalData: {
        checkLogin: false,
        userInfo: null,
        unionid: null,
        code: null,
        cardData: null,
        navgationHeight: 0,
        advSwitch: 0
        // openId:null,
        // encryptedData:null
    },
    ajax: api.ajax,
    base_url: base_url,
    wxlogin: function() {
        let slef = this
        return new Promise((resolve, reject) => {
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
                                                url: base_url + '/applet/auth/message',
                                                method: 'POST',
                                                data: {
                                                    code: code,
                                                    encryptedData: res.encryptedData,
                                                    iv: res.iv
                                                },
                                                success: res => {
                                                    slef.globalData.unionid = res.data.data.unionid
                                                    wx.request({
                                                        url: base_url + '/applet/user/details',
                                                        header: {
                                                            unionid: slef.globalData.unionid
                                                        },
                                                        success: res => {
                                                            slef.globalData.userInfo = res.data.data
                                                            resolve()
                                                        }
                                                    })

                                                }
                                            })
                                        }
                                    })
                                } else {
                                    slef.globalData.userInfo = null
                                    resolve()
                                }
                            }
                        })
                    }
                }
            })
        })
    },
    wxswitch: function() {
        let slef = this
        return new Promise((resolve, reject) => {
            wx.request({
                url: base_url + '/applet/config',
                success: res => {
                    slef.globalData.advSwitch = res.data.data.new_people
                    resolve()
                }
            })
        })
    }
})