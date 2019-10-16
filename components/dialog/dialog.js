// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dialog:{
      type:Object,
      value:{
        title: '提示',
        content: '',
        confirmText: '确定',
        cancelText: '取消',
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showDialog: false,
    showLoginBtn:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show(option) {
      if(option=="login"){
        this.setData({
          showDialog: true,
          showLoginBtn: true
        })
      }else{
        this.setData({
          showDialog: true
        })
      } 
    },
    hide(option) {
      if (option == "login") {
        this.setData({
          showDialog: false,
          showLoginBtn: false
        })
      } else {
        this.setData({
          showDialog: false
        })
      } 
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    onGotUserInfo(){
      this.triggerEvent("confirm");
    },
    _cancel() {
      //触发取消回调
      this.triggerEvent("cancel")
    },
    _confirm() {
      //触发成功回调
      this.triggerEvent("confirm");
    }
  }
})
