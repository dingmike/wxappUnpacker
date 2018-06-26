var n = getApp();

Page({
    data: {},
    onLoad: function(n) {},
    formSubmit: function(o) {
        console.log(o);
        var e = n.globalData.userInfo;
        console.log(e);
        var a = new Object();
        o.detail.value.phone, o.detail.value.weixin, e.nickName;
        wx.request({
            url: n.globalData.url + "Formapi/addUserForm",
            data: {
                phone: a.phone,
                weixin: a.weixin,
                nickname: a.nickName,
                uid: n.globalData.openid
            },
            success: function(n) {
                console.log(n), n.data && wx.showToast({
                    title: "提交成功",
                    success: function() {
                        wx.reLaunch({
                            url: "/pages/index/index"
                        });
                    }
                });
            },
            fail: function() {
                wx.showToast({
                    title: "提交失败",
                    icon: "none"
                });
            }
        }), console.log(a);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});