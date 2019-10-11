// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '账户明细',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao:true
    },
    zhanghao:1111111,
    yue:100,
    idData:[
      { time: '2019-01-01', moreTime: '12:00:00', money: 100 }, { time: '2019-02-01', moreTime: '12:00:00', money: 200 }, { time: '2019-10-01', moreTime: '18:30:00', money: 1000 }
    ]
  },
  handleAccount:function(){
    wx.navigateTo({
      url: '../detailmore/detailmore',
    })
  }
  
})