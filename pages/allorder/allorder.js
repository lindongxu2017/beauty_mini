// pages/allorder/allorder.js
const app=getApp()
Page({

  data: {
    // typeNav: [{ "name": '卡项/产品订单' }, { "name": '预约订单' }],
    flagNav: 0,
    // typePD: [
    //   { "name": '全部' }, { "name": '待支付' }, { "name": '待自取' }, { "name": '待评价' }, { "name": '已完成/退款' }
    // ],
    typeApp: [
      { "name": '全部' }, { "name": '待支付' }, { "name": '已支付' }, { "name": '已完成/退款' }
    ],
    flag: 0,
    pagenum:0,
    header: {
      title: '全部订单',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao: true
    },
    datalist:[]
  },
  onLoad:function(){
    this.getdatalist()
  },
  flagFun: function (e) { //切换点击事件
    this.setData({
      flag: e.currentTarget.dataset.flagindex,
      datalist:[]
    });
    this.getdatalist()
  },
  
  // handleNav:function(e){
  //   this.setData({
  //     flag: e.currentTarget.dataset.flagindex
  //   });
    
  // },
  goOrderMore:function(e){
    wx.navigateTo({
      url: '../ordermore/ordermore?id='+e.currentTarget.dataset.id,
    })
  },
  getdatalist: function () { //可在onLoad中设置为进入页面默认加载
    var that = this;
    wx.request({
      url: 'https://ttwx.169kang.com/applet/user/orders',
      data: {
        type: this.data.flag,
        page: that.data.pagenum, //从数据里获取当前页数
        pagesize: 6, //每页显示条数
      },
      method: "POST",
      header: { unionid: app.globalData.unionid },
      success: function (res) {
        var arr1 = that.data.datalist; //从data获取当前datalist数组
        var arr2 = res.data.data; //从此次请求返回的数据中获取新数组
        arr1 = arr1.concat(arr2); //合并数组
        for(var i=0;i<arr1.length;i++){
          arr1[i].original_price = (arr1[i].original_price/100).toFixed(2)
          arr1[i].total_fee = (arr1[i].total_fee / 100).toFixed(2)
          if (arr1[i].state==0){
            arr1[i].state='全部'
          } else if (arr1[i].state == 1) {
            arr1[i].state = '待支付'
          } else if (arr1[i].state == 2) {
            arr1[i].state = '已支付'
          } else if (arr1[i].state == 3) {
            arr1[i].state = '已完成'
          } 
        }
        that.setData({
          datalist: arr1 //合并后更新datalist
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  onReachBottom: function () { //触底开始下一页
    var that = this;
    var pagenum = that.data.pagenum + 1; //获取当前页数并+1
    that.setData({
      pagenum: pagenum, //更新当前页数
    })
    that.getdatalist();//重新调用请求获取下一页数据
  },
})