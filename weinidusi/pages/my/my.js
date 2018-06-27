function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp(), e = require("../../utils/util.js");

Page({
    data: {
        icon_rank: [ "https://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/first.png", "https://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/second.png", "https://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/thirdly.png" ],
        tabs: 0,
        poem_list: [],
        write_list: [],
        getData_url: "",
        current_poem_url: "",
        userInfo: "",
        rule: "",
        uid: "",
        shareInfo: ""
    },
    onLoad: function(t) {
        this.setData({
            options: t
        }), t.uid && this.setData({
            uid: t.uid
        }), "write" == t.type && this.setData({
            getData_url: "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=poetry_my",
            tabs: 1
        }), "record" == t.type && this.setData({
            getData_url: "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=record_my",
            tabs: 0
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this.getData;
        e.checkSession(t);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        return console.log(this.data.shareInfo), "menu" === t.from ? {
            title: this.data.shareInfo.share_title,
            path: "pages/index/index?uid=" + this.data.uid,
            imageUrl: this.data.shareInfo.share_img
        } : "button" == t.from ? {
            title: t.target.dataset.title,
            path: "pages/poem/poem?type=record&id=" + t.target.dataset.id + "&uid=" + this.data.uid,
            imageUrl: t.target.dataset.avatar
        } : void 0;
    },
    tabs_change: function(t) {
        this.setData({
            poem_list: []
        }), this.data.tabs !== Number(t.currentTarget.dataset.tabs) && (0 === Number(t.currentTarget.dataset.tabs) && this.setData({
            getData_url: "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=record_my"
        }), 1 === Number(t.currentTarget.dataset.tabs) && this.setData({
            getData_url: "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=poetry_my"
        }), this.getData("noShareInfo"), this.setData({
            tabs: t.currentTarget.dataset.tabs
        }));
    },
    heart: function(a) {
        var e = "poem_list[" + a.currentTarget.dataset.index + "].is_like";
        this.setData(t({}, e, !0));
    },
    getData: function(i) {
        var s = this;
        e.request_post(this.data.getData_url, {}, function(o) {
            if (s.data.uid.length > 0) {
                var r = "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=help&uid=" + s.data.uid;
                e.request_post(r, {}, {}, 1);
            }
            "noShareInfo" == i ? s.setData({
                poem_list: o.data,
                userInfo: a.globalData.userInfo,
                uid: o.data.uid
            }) : s.setData({
                poem_list: o.data,
                userInfo: a.globalData.userInfo,
                uid: o.data.uid,
                shareInfo: o.data.share
            });
            for (var n = 0; n < o.data.list.length; n++) {
                var u = "poem_list.list[" + n + "].status";
                s.setData(t({}, u, Number(o.data.list[n].status)));
            }
            "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=record_my" === s.data.getData_url && s.setData({
                rule: o.data.rule
            });
        }, 0);
    },
    select_poem: function(t) {
        this.setData({
            current_poem_url: t.currentTarget.dataset.url
        });
    },
    dialog: function(t) {
        0 === Number(t.currentTarget.dataset.show) && this.setData({
            dialog: !1
        }), 1 === Number(t.currentTarget.dataset.show) && this.setData({
            dialog: !0
        });
    },
    navigateTo: function(t) {
        e.navigateTo(t);
    }
});