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
        imgUrls: [],
        icon_rank: [ "https://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/first.png", "https://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/second.png", "https://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/thirdly.png" ],
        tabs: 0,
        poem_list: [ {} ],
        uid: "",
        current_poem_url: "",
        getData_url: "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=record_list",
        options: "",
        rule: "",
        dialog: !1,
        page: 1,
        share: ""
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.setData({
            poem_list: [],
            page: 1
        });
        var t = this.getData;
        e.checkSession(t);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getData();
    },
    onShareAppMessage: function(t) {
        return console.log(t), "menu" === t.from || "share_btn" === t.target.dataset.form ? {
            title: this.data.share.share_title,
            path: "pages/index/index?uid=" + this.data.uid,
            imageUrl: this.data.share.share_img
        } : "button" == t.from ? {
            title: t.target.dataset.title,
            path: "pages/poem/poem?type=record&id=" + t.target.dataset.id + "&uid=" + this.data.uid,
            imageUrl: t.target.dataset.img
        } : void 0;
    },
    tabs_change: function(t) {
        this.setData({
            poem_list: [],
            page: 1
        }), this.data.tabs !== Number(t.currentTarget.dataset.tabs) && (this.setData({
            tabs: Number(t.currentTarget.dataset.tabs)
        }), 0 === Number(t.currentTarget.dataset.tabs) && this.setData({
            getData_url: "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=record_list"
        }), 1 === Number(t.currentTarget.dataset.tabs) && this.setData({
            getData_url: "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=record_friend"
        }), this.getData());
    },
    heart: function(i) {
        var s = this;
        if (0 !== this.data.tabs) {
            var r = "poem_list[" + i.currentTarget.dataset.index + "].is_like", n = "poem_list[" + i.currentTarget.dataset.index + "].dig_num";
            if (!(this.data.poem_list[i.currentTarget.dataset.index].is_like || Number(i.currentTarget.dataset.has_dig) > 0)) {
                var o = a.globalData.url + "/index.php?m=Mini&c=Poetry&a=dig&id=" + i.currentTarget.dataset.id, d = {};
                e.request_post(o, d, function(a) {
                    if (a.data.code > 0) {
                        var e;
                        s.setData((e = {}, t(e, r, !0), t(e, n, ++s.data.poem_list[i.currentTarget.dataset.index].dig_num), 
                        e));
                    } else wx.showModal({
                        title: "提示",
                        content: a.data.msg,
                        showCancel: !1
                    });
                });
            }
        }
    },
    getData: function() {
        var t = this, a = this.data.getData_url + "&page=" + this.data.page, i = {};
        e.request_post(a, i, function(i) {
            if (t.data.uid.length > 0) {
                var s = "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=help&uid=" + t.data.uid;
                e.request_post(s, {}, {}, 1);
            }
            t.setData({
                poem_list: t.data.poem_list.concat(i.data.list),
                uid: i.data.uid,
                page: ++t.data.page
            }), i.data.share && t.setData({
                share: i.data.share
            }), a.indexOf("a=record_list") >= 0 && a.indexOf("page=1") >= 0 && t.setData({
                imgUrls: i.data.recommends,
                rule: i.data.rule
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