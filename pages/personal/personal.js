// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '设置',
      hiddenBlock: '',
      homeCapsule: '',
      tubiao: true
    },
    array: ['', '女', '男'],
    handleFocus: false,//控制输入框的获取焦点
    showModify:false,//控制修改页面的展示
    userName:'DIKS',
    showInput:false,//控制input框的展示
    date:"1990-01-01",//生日时间
    index:0,//性别选择器index
    sex:'男',
  },
  onLoad:function(options){
    for(var i=0;i<this.data.array.length;i++){
      if(this.data.sex==this.data.array[i]){
        this.setData({
          index:i
        })
      }
    }
  },
  modifyData:function(){
    this.setData({
      showModify:true
    })
  },
  modifyName:function(){
      this.setData({
        showInput:true,
        handleFocus:true
      })
  },
  //失去焦点
  finishInput:function(e){
    this.setData({
      userName: e.detail.value,
      showInput:false
    })
  },
  //选择时间的控制
  bindTimeChange: function (e){
    this.setData({
      date: e.detail.value
    })
  },
  //性别修改
  bindSexChange:function(e){
    for (var i = 0; i < this.data.array.length; i++) {
      if (e.detail.value == i) {
        this.setData({
          sex: this.data.array[i]
        })
      }
    }
  },
  storeData:function(){
    
  }
})