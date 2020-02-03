//初始化数据
function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/index/index",
      "iconPath": "../../utils/img/shangcheng.png",
      "selectedIconPath": "../../utils/img/shangcheng1.png",
      "text": "美肌商城"
    },
    {
        "current": 0,
        "pagePath": "/pages/veriffication/index",
        "iconPath": "../../utils/img/time-o.png",
        "selectedIconPath": "../../utils/img/time.png",
        "text": "预约"
    },
    {
      "current": 0,
      "pagePath": "/pages/mine/mine",
      "iconPath": "../../utils/img/gerenzhongxin.png",
      "selectedIconPath": "../../utils/img/gerenzhongxin1.png",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}