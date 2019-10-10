// pages/deposit/deposit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '充值',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao:true
    },
    info: { id: 100001, remain: 100 },
    moneyActive:0,
    moneyInfo: [
      { money: 2000, depositMoney: 200},{ money: 3000, depositMoney: 500 }, { money: 5000, depositMoney: 1000 }, { money: 8000, depositMoney: 2000 }, { money: 10000, depositMoney: 3000 }, { money: 20000, depositMoney: 7000 }
    ],
    chooseMoney:{money:2000,depositMoney:200}
  },
  handleMoney:function(e){
    this.setData({
      moneyActive: e.currentTarget.dataset.index,
      chooseMoney:{
        money: e.currentTarget.dataset.money,
        depositMoney: e.currentTarget.dataset.depositmoney
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.money && options.depositMoney){
      this.setData({
        moneyActive: options.index-0,
        chooseMoney: {
          money: options.money-0,
          depositMoney: options.depositMoney-0
        }
      })
    }
  },
})