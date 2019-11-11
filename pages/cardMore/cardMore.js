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
      tubiao: true,
      // backURL: "/pages/index/index"
    },
    pdData:{},
    orderId:null,
    version:0,
    showDav:false,
    showL:false
  },
  onLoad: function (options) {
    var that=this
    that.setData({
      orderId: options.id
    })
    if(app.globalData.userInfo){
      //首页进来
      that.loadingData(that)
    }else{
      //分享进来,先判断开关是否打开
      app.wxswitch().then(res=>{
        if (app.globalData.advSwitch){
          //开着，表示正常运行，用户使用状态
          that.setData({
            version:1,
            showL:true
          })
          app.wxlogin().then(res => {
            if (app.globalData.userInfo) {
              //进入有注册过的用户
              that.loadingData(that)
              that.setData({
                showDav:false
              })
              that.loadingSelf = that.selectComponent('#loadingSelf')
              that.loadingSelf.closeLoading()
            } else {
              //进入无注册过的用户
              that.loadingData(that)
              that.setData({
                showDav: true
              })
              that.loadingSelf = that.selectComponent('#loadingSelf')
              that.loadingSelf.closeLoading()
            }
          })
        }else{
          that.loadingData(that)
        }
      })
    }
  },
  goMall:function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  bugNow:function(e){
    if (app.globalData.userInfo){
      if (app.globalData.userInfo.phone) {
        wx.request({
          url: app.bash_url + 'applet/purchase/spread',
          method: 'post',
          header: { unionid: app.globalData.unionid },
          data: { package_id: e.currentTarget.dataset.id },
          success: res => {
            if (res.data.status !== 200) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1000
              })
            } else {
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
          }
        })
      } else {
        wx.showToast({
          title: '您还没有绑定手机号，为了更好的为您服务，请绑定手机后购买!',
          icon: 'none'
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../telLogin/telLogin',
          })
        }, 1000)
      }
    }else{
      wx.showToast({
        title: '您还没有授权，请授权后购买!',
        icon: 'none'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../promiseLogin/promiseLogin',
        })
      }, 1000)
    }
    
  },
  loadingData:function(that){
    wx.request({
      url: app.bash_url + 'applet/product/spread?id=' + that.data.orderId,
      success: res => {
        let data = res.data.data
        data.original_price = ((data.original_price - 0) / 100).toFixed(2)
        data.current_price = ((data.current_price - 0) / 100).toFixed(2)
        for (var i = 0; i < data.sub_projects.length; i++) {
          data.sub_projects[i].price = ((data.sub_projects[i].price - 0) / 100).toFixed(2)
        }
        that.setData({
          pdData: data
        })
      }
    })
  },
  bindGetUserInfo: function (res) {
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
                url: app.bash_url + 'applet/auth/message',
                method: 'POST',
                data: {
                  code: code,
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                success: res => {
                  app.globalData.unionid = res.data.data.unionid
                  wx.request({
                    url: app.bash_url + 'applet/user/details',
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