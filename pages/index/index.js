//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../../utils/img/1568777964097.jpg'
    ],
    header: {
      title: '美肌商城',
      hiddenBlock: '',
      homeCapsule: '',
    },
    indicatorDots:true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    showNav:false,
    cardType:[
      { money: 2000, depositMoney: 200 }, { money: 3000, depositMoney: 500 }, { money: 5000, depositMoney: 1000 }, { money: 8000, depositMoney: 2000 }, { money: 10000, depositMoney: 3000 }, { money: 20000, depositMoney: 7000 }
    ],
    scrollTopNum:null
  },
  onPageScroll: function (e) {
    if (e.scrollTop < 300) {
      this.setData({ showNav: false })
    }
    if(e.scrollTop>=300){
      this.setData({showNav:true})
    }
    if (e.scrollTop >= 300 && e.scrollTop < 1300) {
      this.setData({ activeName: ['active', '', '', ''] })
    }
    if (e.scrollTop >= 1300 && e.scrollTop < 2100){
      this.setData({ activeName: ['', 'active', '', '']})
    }
    if (e.scrollTop >= 2100 && e.scrollTop < 2900) {
      this.setData({ activeName: ['', '', 'active', ''] })
    }
    if (e.scrollTop >= 2900) {
      this.setData({ activeName: ['', '', '', 'active'] })
    }
  },
  moveNav:function(e){
    console.log(e)
  },
  handleAppointe:function(){
    wx.navigateTo({
      url: '../appointServe/appointServe'
    })
  },
  handleDeposit:function(e){
    var money = e.currentTarget.dataset.money
    var depositmoney = e.currentTarget.dataset.depositmoney
    var index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '../deposit/deposit?money=' + money + '&depositMoney=' + depositmoney + '&index=' + index
      })
  }
})
