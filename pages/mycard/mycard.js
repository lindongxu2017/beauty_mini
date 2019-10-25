// pages/mycard/mycard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '我的卡包',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao: true
    },
    typeNav: [{ "name": '正常' }, { "name": '已用完/退款' },{ "name": '已过期' }],
    flagNav:0,
    datalist: [], //.wxml文件需要绑定的列表，我这里用的数据类型是数组
    pagenum: 1, //初始页默认值为1
    navHeight:0,
    flagArr:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navHeight: app.globalData.navgationHeight
    })
    wx.request({
      url: 'https://skin.169kang.com/applet/user/cards',
      header: { unionid: app.globalData.unionid},
      method: 'POST',
      data:{
        'type': this.data.flagNav,
        'page':1,
        'pagesize':6
      },
      success:res=>{
        this.setData({
          datalist:res.data.data
        })
      }
    })
  },
  getdatalist: function () { //可在onLoad中设置为进入页面默认加载
    var that = this;
    wx.request({
      url: 'https://skin.169kang.com/applet/user/cards',
      data: {
        type: this.data.flagNav,
        page: that.data.pagenum, //从数据里获取当前页数
        pagesize: 6, //每页显示条数
      },
      method: "POST",
      header: { unionid: app.globalData.unionid },
      success: function (res) {
        var arr1 = that.data.datalist; //从data获取当前datalist数组
        var arr2 = res.data.data; //从此次请求返回的数据中获取新数组
        if(arr2.length==0){
          that.setData({
            flagArr:false
          })
        }
        arr1 = arr1.concat(arr2); //合并数组
        that.setData({
          datalist: arr1 //合并后更新datalist
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  handleNav: function (e) {
    this.setData({
      flagNav: e.currentTarget.dataset.flagindex,
      datalist:[],
      pagenum:1,
      flagArr:true
    });
   this.getdatalist()
  },
  onReachBottom: function () { //触底开始下一页
    var that = this;
    if(that.data.flagArr){
      var pagenum = that.data.pagenum + 1; //获取当前页数并+1
      that.setData({
        pagenum: pagenum, //更新当前页数
      })
      that.getdatalist();//重新调用请求获取下一页数据
    }
  },
})