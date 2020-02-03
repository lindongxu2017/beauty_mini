// components/navBar/navBar.js
const app = getApp()
Component({

    properties: {
        header: {
            type: Object,
            value: {
                title: "",
                hiddenBlock: '',
                homeCapsule: '',
                tubiao: true,
                background: "",
                backURL: ""
            }
        },
        customBackReturn: {
            type: Boolean,
            value: false
        }
    },
    data: {
        navheight: 0
    },
    methods: {
        backClick() {
            // console.log(getCurrentPages())
            if (this.data.customBackReturn) {
                this.triggerEvent("customBackReturn")
            } else {
                // if (getCurrentPages().length > 1) {
                //     if (getCurrentPages()[getCurrentPages().length - 2].route == 'pages/allorder/allorder') {
                //         console.log(11111)
                //         wx.navigateBack()
                //         return
                //     }
                // }
                if (getCurrentPages().length == 1) {
                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                } else {
                    // console.log(this.data.header.backURL)
                    if (this.data.header.backURL) {
                        if (this.data.header.backURL == '/pages/index/index' || this.data.header.backURL == '/pages/mine/mine' || this.data.header.backURL == '/pages/verification/index') {
                            wx.switchTab({
                                url: this.data.header.backURL,
                            })
                        } else {
                            wx.navigateTo({
                                url: this.data.header.backURL,
                            })
                        }
                    } else {
                        wx.navigateBack({
                            delta: 1
                        })

                    }
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
                    navHeight: isIos ? 44 : 48,
                    navheight: res.statusBarHeight + (isIos ? 44 : 48)
                })
                app.globalData.navgationHeight = self.data.navheight
            }
        })
    }
})