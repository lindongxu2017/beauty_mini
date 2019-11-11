// pages/personal/personal.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '设置',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao: true
    },
    array: [ '男', '女'],
    handleFocus: false,//控制输入框的获取焦点
    showModify:false,//控制修改页面的展示
    userName:'',
    showInput:false,//控制input框的展示
    birthday:"",//生日时间
    index:1,//性别选择器index
    sex:'',
  },
  onLoad:function(options){
    if (app.globalData.userInfo.gender==1){
      this.setData({
        sex:'男'
      })
    } else if (app.globalData.userInfo.gender == 2) {
      this.setData({
        sex: '女'
      })
    }
    this.setData({
      //userName: app.globalData.userInfo.nickname,
      birthday: app.globalData.userInfo.birthday,
      index: app.globalData.userInfo.gender-1,
    })
  },
  modifyData:function(){
    this.setData({
      showModify:true
    })
  },
  modifyName:function(){
      this.setData({
        showInput:true,
        handleFocus:true
      })
  },
  //失去焦点
  finishInput:function(e){
    this.setData({
      userName: e.detail.value,
      showInput:false
    })
  },
  //选择时间的控制
  bindTimeChange: function (e){
    this.setData({
      birthday: e.detail.value
    })
  },
  //性别修改
  bindSexChange:function(e){
        this.setData({
          index: e.detail.value-0+1
        })
    if (this.data.index == 1) {
      this.setData({
        sex: '男'
      })
    } else {
      this.setData({
        sex: '女'
      })
    }
  },
  storeData:function(){
   
    var num=0
    if(this.data.sex=="女"){
      num=2
    }else{
      num = 1
    }
    wx.request({
      url: app.bash_url + 'applet/user/edit',
      method:'post',
      header: { unionid: app.globalData.unionid},
      data:{
        nickname: app.globalData.userInfo.nickname,
        gender: num,
        birthday: this.data.birthday,
      },
      success:res=>{
        if(res.data.status==200){
          wx.request({
            url: app.bash_url + 'applet/user/details',
            header: { unionid: app.globalData.unionid },
            success:res=>{
              app.globalData.userInfo = res.data.data
            }
          })
        }
        wx.switchTab({
          url: '../mine/mine',
        })
      }
   })
  }
})