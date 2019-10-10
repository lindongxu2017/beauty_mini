// pages/allorder/allorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:[
      { "name": '全部' }, { "name": '待支付' }, { "name": '待付尾款' }, { "name": '待评价' }, { "name": '已完成/退款'}
    ],
    flag: 0,
    test:[{pname:'pdt痘痘·光疗管理次卡等1件商品',payway:'微信小程序支付',time:'2019-10-09',status:'待支付',minite:'14:47:37',money:'1990'}],
    header: {
      title: '全部订单',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao:true
    },
    dialog:{
      title: '提示',
      content: '',
      confirmText: '确定',
      cancelText: '取消'
    }
  },
  onReady: function () {
    // 获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },
  flagFun: function (e) { //切换点击事件
    this.setData({
      flag: e.currentTarget.dataset.flagindex
    });
  },
  continuePay:function(){
    this.setData({
      dialog: {
        content: "是否确定要继续付款?", title: '提示',
        confirmText: '确定',
        cancelText: '取消'}
    });
    this.dialog.show()
  },
  cancelOrder:function(){
    this.setData({
      dialog: {
        content: "是否确定要取消订单?", title: '提示',
        confirmText: '确定',
        cancelText: '取消' }
    });
    this.dialog.show()
  },
  handleCancelDialog() {
    this.dialog.hide()
  },
  // 点击了弹出框的确认
  handleConfirmDialog() {
    this.dialog.hide()

    // 这里一般都是与后台交互过程

  }
})