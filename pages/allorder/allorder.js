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
    pagenum:1,
    header: {
      title: '全部订单',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao: true,
      backURL:"/pages/mine/mine"
    },
    flagArr:true,
    datalist:[],
    waitPay:false,
    navHeight: 0
  },
  onLoad:function(options){
    if (options.flag){
        this.setData({
            flag: options.flag
        })
    }
    var that=this
    if(app.globalData.unionid){
      that.getdatalist()
      that.setData({
        navHeight: app.globalData.navgationHeight
      })
    }else{
      setTimeout(function(){
        if (app.globalData.unionid){
          that.getdatalist()
          that.setData({
            navHeight: app.globalData.navgationHeight
          })
        }
      },2000)
    }
  },
  flagFun: function (e) { //切换点击事件
    this.setData({
      flag: e.currentTarget.dataset.flagindex,
      datalist:[],
      waitPay:false,
      pagenum:1,
      flagArr:true
    });
    if (e.currentTarget.dataset.flagindex==1){
      this.setData({
        waitPay: true
      })
    }
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
      url: app.bash_url + 'applet/user/orders',
      data: {
        state: this.data.flag-1,
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
        for (var i = 0; i < arr2.length; i++) {
          arr2[i].original_price = (arr2[i].original_price / 100).toFixed(2)
          arr2[i].total_fee = (arr2[i].total_fee / 100).toFixed(2)
          if (arr2[i].state == -1) {
            arr2[i].state = '全部'
          } else if (arr2[i].state == 0) {
            arr2[i].state = '待支付'
          } else if (arr2[i].state == 1) {
            arr2[i].state = '已支付'
          } else if (arr2[i].state == 2) {
            arr2[i].state = '已完成'
          }
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
  onReachBottom: function () { //触底开始下一页
    var that = this;
    if (that.data.flagArr){
      var pagenum = that.data.pagenum + 1; //获取当前页数并+1
      that.setData({
        pagenum: pagenum, //更新当前页数
      })
      that.getdatalist();//重新调用请求获取下一页数据
    }
  },
  //继续付款
  continuePay:function(e){
    var that=this
    wx.request({
      url: app.bash_url + 'applet/purchase/respread',
      method:'post',
      header: { unionid: app.globalData.unionid },
      data:{
        order_id: e.currentTarget.dataset.id
      },
      success: res => {
        const resData = res.data.data
        wx.requestPayment({
          timeStamp: resData.timeStamp,
          nonceStr: resData.nonceStr,
          package: resData.package,
          signType: resData.signType,
          paySign: resData.paySign,
          success(res) {
            if (res.errMsg == "requestPayment:ok") {
              var arrList=that.data.datalist
              for (var i = 0; i < arrList.length;i++){
                if (arrList[i].id == e.currentTarget.dataset.id){
                  arrList.splice(i,1)
                }
              }
              that.setData({
                datalist:arrList
              })
            }
          },
          fail(res) { }
        })

      }
    })
  }
})