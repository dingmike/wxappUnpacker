var t = getApp(), a = require("../../utils/util.js");

Page({
    data: {
        getData_url: "",
        options: "",
        poem: "",
        scene: "",
        auto: ""
    },
    onLoad: function(t) {
        t.scene && this.setData({
            scene: decodeURIComponent(t.scene)
        }), "record" === t.type && this.setData({
            getData_url: "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=record_info&id=" + t.id
        }), "text" === t.type && this.setData({
            getData_url: "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=poetry_info&poetry_id=" + t.id
        }), "record" === this.data.scene.split("&")[0].split("=")[1] && (this.setData({
            getData_url: "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=record_info&id=" + this.data.scene.split("&")[1].split("=")[1]
        }), t.id = this.data.scene.split("&")[1].split("=")[1], t.type = this.data.scene.split("&")[0].split("=")[1]), 
        this.setData({
            options: t
        });
        var i = this.getData;
        a.checkSession(i);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.stopAccelerometer();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log(this.data.options.id), {
            title: this.data.poem.share.share_title,
            imageUrl: this.data.poem.share.share_img,
            path: "pages/poem/poem?type=" + this.data.options.type + "&id=" + this.data.options.id + "&uid=" + this.data.poem.uid
        };
    },
    getData: function() {
        var t = this, i = this.data.getData_url;
        a.request_post(i, {}, function(i) {
            if (t.setData({
                poem: i.data,
                auto: !0
            }), t.data.scene.length > 0) {
                var e = "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=help&uid=" + t.data.scene.split("&")[2].split("=")[1];
                console.log(e), a.request_post(e, {}, function() {});
            }
            if (t.data.options.uid) {
                var o = "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=help&uid=" + t.options.uid;
                a.request_post(o, {}, {}, 1);
            }
        }, 0);
    },
    navigateTo: function(t) {
        a.navigateTo(t);
    },
    like: function() {
        var i = this;
        if (!(this.data.poem.data.has_dig > 0 || "rank" == this.data.options.from)) {
            var e = "https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=dig&id=" + this.data.poem.data.id;
            a.request_post(e, {}, function(a) {
                if (a.data.code > 0) {
                    var e = [];
                    e.push({
                        headimgurl: t.globalData.userInfo.avatarUrl
                    }), i.setData({
                        "poem.data.has_dig": 2,
                        "poem.data.dig_num": ++i.data.poem.data.dig_num,
                        "poem.list": e.concat(i.data.poem.list)
                    });
                }
                a.data.code < 0 && wx.showToast({
                    title: a.data.msg,
                    icon: "none"
                });
            });
        }
    },
    listen: function(t) {
        "record" !== this.data.options.type && this.navigateTo(t);
    }
});