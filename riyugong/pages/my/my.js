var e = getApp();

Page({
    data: {
        myBtnData: [ {
            title: "个人信息",
            imgPath: "/image/mon.png",
            clickEvent: "getUserInfo"
        }, {
            title: "打卡记录",
            imgPath: "/image/cache.png",
            clickEvent: "cardrecord"
        }, {
            title: "常见问题",
            imgPath: "/image/faq.png",
            clickEvent: "getFaq"
        }, {
            title: "联系客服",
            imgPath: "/images/kefu.png",
            clickEvent: "getUserLook"
        } ]
    },
    onLoad: function(o) {
        wx.showLoading({
            title: "加载中"
        });
        var a = this;
        wx.getUserInfo({
            success: function(o) {
                console.log(o), e.globalData.userInfo = o.userInfo, a.setData({
                    userInfo: o.userInfo,
                    load: !0
                }), wx.hideLoading();
            },
            fail: function(e) {
                console.log(e);
                var o = {
                    nickName: "游客",
                    avatarUrl: "/image/1.png"
                };
                a.setData({
                    userInfo: o,
                    load: !0
                }), wx.hideLoading();
            }
        });
    },
    myItems: function(e) {
        console.log(e);
        var o = e.currentTarget.dataset.method;
        "getUserInfo" == o && this.getUserInfo(), "getUserPay" == o && this.getUserPay(), 
        "getUserLook" == o && this.getUserLook(), "cardrecord" == o && this.cardrecord(), 
        "getFaq" == o && this.getFaq();
    },
    getFaq: function() {
        console.log("getFaq"), wx.navigateTo({
            url: "/pages/my/my-faq/my-faq"
        });
    },
    getUserInfo: function() {
        console.log("getUserInfo方法"), wx.navigateTo({
            url: "/pages/my/my-info/my-info"
        });
    },
    getUserPay: function() {
        console.log("getUserPay方法"), wx.navigateTo({
            url: "/pages/my/my-pay/my-pay"
        });
    },
    getUserLook: function() {
        console.log("进入客服会话"), wx.navigateTo({
            url: "my-look/my-look"
        });
    },
    cardrecord: function() {
        console.log("cardrecord方法"), wx.navigateTo({
            url: "/pages/my/my-card/my-card"
        });
    }
});