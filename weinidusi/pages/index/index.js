var t = getApp(), a = require("../../utils/util.js");

Page({
    data: {
        poem: "",
        current_poem_url: "",
        share: "",
        uid: ""
    },
    onLoad: function(t) {
        t.uid && this.setData({
            uid: t.uid
        });
        var e = this.getData;
        a.checkSession(e);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.share.share_title,
            imageUrl: this.data.share.share_img,
            path: "pages/index/index?uid=" + this.data.uid
        };
    },
    getData: function() {
        var e = this, i = t.globalData.url + "/index.php?m=Mini&c=Poetry&a=index", n = {};
        a.request_post(i, n, function(t) {
            if (e.data.uid.length > 0) {
                var i = "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=help&uid=" + e.data.uid;
                a.request_post(i, {}, {}, 1);
            }
            e.setData({
                poem: t.data.list,
                share: t.data.share,
                uid: t.data.uid
            });
        }, 0);
    },
    navigateTo: function(t) {
        a.navigateTo(t);
    },
    select_poem: function(t) {
        this.setData({
            current_poem_url: t.currentTarget.dataset.url
        });
    }
});