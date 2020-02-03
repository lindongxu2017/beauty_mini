// var base_url = 'https://ttwx.169kang.com/'
module.exports = {
    ajax: function(method, url, data) {
        const app = getApp()
        return new Promise((resolve, reject) => {
            wx.request({
                header: {
                    unionid: app.globalData.unionid || 'ouImPxIv6ClZwNepZCfa0hoMPiBw'
                },
                method: method ? method : 'POST',
                data,
                url: app.base_url + url,
                success(res) {
                    // console.log(res)
                    if (res.data.status == 200) {
                        resolve(res.data)
                    } else {
                        wx.showModal({
                            title: '提示',
                            content: res.data.msg,
                            showCancel: false
                        })
                        reject(res)
                    }
                }
            })
        })
    }
}