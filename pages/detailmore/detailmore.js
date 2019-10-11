// pages/detailmore/detailmore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '账户明细',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao: true
    },
    total:0,
    time:'2019-01-01',
    moreTime:'20:00:00',
    projectItem: [{ name: "韩式小气泡", num: 1, money: 99 }, { name: "修复精华液", num: 1, money: 199 }
    ]
  },
  onLoad:function(options){
    var numTotal=0
    for(var i=0;i<this.data.projectItem.length;i++){
      numTotal += this.data.projectItem[i].money
    }
    console.log(numTotal)
    this.setData({
      total: numTotal
    })
   
  }
  
})