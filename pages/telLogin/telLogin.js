// pages/telLogin/telLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '手机号登录',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao: true
    },
    tel:'',
    code:''
  },
  getTel:function(e){
    var reg = new RegExp("^[0-9]*$");
    if (reg.test(e.detail.value)){
      this.setData({
        tel: e.detail.value
      })
    }
  },
  getCode:function(e){
    var reg = new RegExp("^[0-9]*$");
    if (reg.test(e.detail.value)) {
      this.setData({
        code: e.detail.value
      })
    }
  },
  submit:function(){
    if(this.data.tel&&this.data.code){
      wx.switchTab({
        url: '../mine/mine?id=1',
      })
    }
  }
})