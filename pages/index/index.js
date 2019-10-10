//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../../utils/img/1568777964097.jpg',
      '../../utils/img/1568777964097.jpg',
      '../../utils/img/1568777964097.jpg'
    ],
    header: {
      title: '美肌工坊',
      hiddenBlock: '',
      homeCapsule: '',
    },
    indicatorDots:true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    showNav:false,
    navData:[
      { text: "皮表层管理",}, { text: "中胚层管理"}, { text: "痘痘肌管理"}, { text: "局部专项管理"},
    ],
    activeName: ['active','','','' ],
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
  }
})
