// pages/telLogin/telLogin.js
const app = getApp()
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
    //验证手机号
    testPhone:false,
    timeChange:false,
    testCode:false,
    tel:'',
    code:'',
    getText2:'获取验证码'
  },
  //验证手机号
  getTel:function(e){
    this.setData({
      tel: e.detail.value
    })
    if (!(/^1[34578]\d{9}$/.test(this.data.tel))){
      this.setData({
        testPhone: false
      })
      if (this.data.tel.length >= 11) {
        wx.showToast({
          title: '手机号有误',
          icon: 'none',
          duration: 1000
        })
      }
    }else{
      this.setData({
        testPhone:true
      })
    }
  },
  //验证code输入
  getCode:function(e){
    var reg = new RegExp("^[0-9]*$");
    var code = e.detail.value
    if (reg.test(code)) {
      if(code.length==6){
        this.setData({
          testCode:true,
          code:code
        })
      }else{
        this.setData({
          testCode: false
        })
      }
    }else{
      this.setData({
        testCode: false
      })
    }
  },
  //点击获取验证码按钮
  getCodeBtn:function(){
    if (!this.data.testPhone){
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 1000
      })
    }else{
      if(!this.data.timeChange){
        this.setData({
          timeChange:true
        })
        wx.request({
          url: 'https://ttwx.169kang.com/applet/auth/code',
          data:{
            phone:this.data.tel,
            flag:'replace'
          },
          success:res=>{
            if (res.data.status==200){
              let timeGo = setInterval(function () {
                this.setData({
                  timeChange: false
                })
              }, 600000);
            }  
          }
        })
      }
    }
  },
  submit:function(){
    if(this.data.testCode&&this.data.testPhone){
      wx.request({
        url: 'https://ttwx.169kang.com/applet/user/account',
        header: { unionid: app.globalData.unionid},
        method:'post',
        data:{
          phone:this.data.tel,
          code:this.data.code
        },
        success:res=>{
          if (res.data.status==200){
            app.globalData.userInfo.phone = this.data.tel
            wx.navigateTo({
              url: '../indexindex',
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        },
      }) 
    }
  }
})