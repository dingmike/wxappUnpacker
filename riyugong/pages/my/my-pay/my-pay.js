var a = getApp();

Page({
    data: {
        choiceData: [ {
            name: "课程1",
            type: "21天口语达人养成计划",
            img: "/images/item/ly.png",
            bgimg: "/image/b2.jpg"
        }, {
            name: "课程1",
            type: "21天口22语达人养成计划",
            img: "/images/item/ly.png",
            bgimg: "/image/b2.jpg"
        } ]
    },
    onLoad: function(t) {
        var e = a.globalData.openid;
        this.getPayList(e);
    },
    getPayList: function(t) {
        var e = this;
        wx.request({
            url: a.globalData.url + "api/Jporder/getPayData",
            data: {
                uid: t
            },
            success: function(a) {
                console.log(a.data), 0 == a.data.length && e.setData({
                    showDatasNull: !0
                }), e.setData({
                    choiceDatas: a.data
                });
            }
        });
    },
    choiceTapType: function(t) {
        var e = t.currentTarget.dataset.type;
        console.log(e);
        var n = t.currentTarget.dataset.bgimg, o = t.currentTarget.dataset.coimg;
        a.globalData.type = e, a.globalData.bgimg = n, a.globalData.coimg = o, wx.navigateTo({
            url: "../../index/index"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});