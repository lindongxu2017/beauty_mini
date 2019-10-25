// components/loading/loading.js
Component({
  
  /**
   * 页面的初始数据
   */
  data: {
    IsShow:true
  },
  methods: {
    closeLoading () {
      this.setData({
        IsShow: false
      })
    },
  }
})