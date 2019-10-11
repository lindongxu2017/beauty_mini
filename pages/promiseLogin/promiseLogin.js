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
    dialog: {
      title: '提示',
      content: '',
      confirmText: '确定',
      cancelText: '取消'
    },
    opacityNum1: 1,
    opacityNum2:0.5,
    handleBtn1:false,
    handleBtn2: true,
    promiseWords1:'授权',
    promiseWords2: '授权',
    showTel:true,
    comFunction:'handleConfirmDialog1',
    canFunction: 'handleCancelDialog'
  },
  onReady: function () {
    // 获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },

  wxPromise: function () {
    this.setData({
      dialog: {
        content: "是否确定授权微信登录？", title: '提示',
        confirmText: '确定',
        cancelText: '取消'
      }
    });
    this.dialog.show()
  },
  handleCancelDialog() {
    this.dialog.hide()
  },
  // 点击了弹出框的确认
  handleConfirmDialog1() {
    this.dialog.hide()
    this.setData({
      opacityNum2:1,
      opacityNum1: 0.5,
      handleBtn1:true,
      handleBtn2:false,
      promiseWords1:'已授权',
      showTel:false,
      comFunction: 'handleConfirmDialog2',
    })
    // 这里一般都是与后台交互过程
  },
  handleConfirmDialog2() {
    this.dialog.hide()
    this.setData({
      opacityNum2: 0.5,
      opacityNum1: 0.5,
      handleBtn1: true,
      handleBtn2: true,
      promiseWords1: '已授权',
      promiseWords2: '已授权',
      showTel: false
    })
    app.globalData.userInfo = 111111
    // 这里一般都是与后台交互过程
    wx.switchTab({
      url: '../mine/mine?id=11111'
    })
  },
  telPromise:function(){
    this.setData({
      dialog: {
        content: "是否确定授权手机登录？", title: '提示',
        confirmText: '确定',
        cancelText: '取消'
      }
    });
    this.dialog.show()
  }
})