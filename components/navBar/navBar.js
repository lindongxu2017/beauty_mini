// components/navBar/navBar.js
Component({
 
  properties: {
    header: {
      type: Object,
      value: {
        title: "",
        hiddenBlock: false,
        homeCapsule:false,
      }
    },
    customBackReturn: {
      type: Boolean,
      value: false
    }
  },
  data: {

  },
  methods: {
    backClick() {
      if (this.data.customBackReturn) {
        this.triggerEvent("customBackReturn")
      } else {
        if (getCurrentPages().length == 1) {
          wx.switchTab({
            url: '/pages/index/index',
          })
        } else {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    },
    homeClick() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
  },
  attached() {
    var self = this;
    wx.getSystemInfo({
      success(res) {
        var isIos = res.system.indexOf('iOS') > -1;
        self.setData({
          statusHeight: res.statusBarHeight,
          navHeight: isIos ? 44 : 48
        })
      }
    })
  }
})