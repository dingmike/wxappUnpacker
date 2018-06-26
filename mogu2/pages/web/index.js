function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/base/createPage")), i = e(require("../../components/loading/index")), n = require("../../common/m"), o = e(n), r = e(require("../../common/service/user.js")), a = require("../../common/utils/cache"), s = e(require("../../common/config")), u = o.default.MWP, f = o.default.qs, l = {
    100065: "meilishuo",
    100060: "mgj",
    100063: "mgj"
}, h = null, d = null;

exports.default = (0, t.default)({
    components: {
        loading: i.default
    },
    data: {
        src: null,
        defaultShareConfig: {
            title: "买女装，就来蘑菇街",
            success: function() {},
            fail: function() {}
        },
        customShareConfig: {},
        hash: ""
    },
    onLoad: function(e) {
        var t = this;
        null === h && (h = new a.PersistentStorage("web")), null === d && (d = new a.MemoryStorage("web"));
        var i = e.src, o = e.title, f = e.titleColor, c = e.bgColor, g = e.share;
        if (this.setNavigationBar(o, f, c), "true" === g ? wx.showShareMenu({
            withShareTicket: !0
        }) : wx.hideShareMenu(), i) {
            i.indexOf("%") >= 0 && (i = decodeURIComponent(i));
            var m = s.default.logger.platform || "";
            if (!m) throw new Error("无platform配置，请升级脚手架至最新版");
            var p = {
                _mgjuuid: n.System.getSync("deviceId"),
                ptp: e.ptp,
                mlf: m
            };
            if (this.needLogin(e.login)) {
                var v = h.get("time") || 0;
                if (!d.get("entered") || this.diffUid() || Date.now() - v > 12e5) return this.$loading.show(), 
                void u.request("mwp.apollo.jump.getCrossToken", "1").then(u.filterResult).then(function(e) {
                    t.$loading.hide(), h.put("time", Date.now()), h.put("uid", r.default.uid), d.put("entered", !0, {
                        keep: !0
                    });
                    var n = l[u.AppKey] || "mgj";
                    p = Object.assign(p, {
                        redirect_url: i,
                        token: e.token,
                        source: n
                    }), "meilishuo" === n ? t.jumpWeb("https://h5.meilishuo.com/mgj-webview-transfer/home.html", p) : t.jumpWeb("https://h5.mogujie.com/webview-transfer/home.html", p);
                }).catch(function() {
                    t.resetLoginTime(), wx.navigateBack({});
                });
            }
            this.jumpWeb(i, p);
        }
    },
    onHide: function() {
        this.resetLoginTime();
    },
    resetLoginTime: function() {
        h.put("time", 0);
    },
    diffUid: function() {
        return h.get("uid") !== r.default.uid;
    },
    setNavigationBar: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "加载中", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "#000000", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "#ffffff";
        wx.setNavigationBarTitle({
            title: decodeURIComponent(e)
        }), wx.setNavigationBarColor({
            frontColor: decodeURIComponent(t),
            backgroundColor: decodeURIComponent(i)
        });
    },
    needLogin: function(e) {
        if (void 0 === e) return !0;
        if ("true" === e) return !0;
        if ("false" === e) return !1;
        var t = parseInt(e, 10);
        return isNaN(t) || Boolean(t);
    },
    jumpWeb: function(e, t) {
        e = (e = this.extractHash(e)).indexOf("?") >= 0 ? e + "&" + f.stringify(t) : e + "?" + f.stringify(t), 
        this.data.hash && (e = e + "#" + this.data.hash), this.setData({
            src: e
        });
    },
    extractHash: function(e) {
        if (-1 !== e.indexOf("#")) {
            var t = e.split("#");
            return this.setData({
                hash: t[1]
            }), t[0];
        }
        return e;
    },
    messageListener: function(e) {
        var t = this, i = e.detail;
        i.data && i.data.forEach(function(e) {
            !0 === e.loginFail && t.resetLoginTime(), !0 === e.setShare && t.setData({
                customShareConfig: e
            });
        });
    },
    getShareConfig: function(e) {
        var t = e.webViewUrl, i = Object.assign({}, {
            path: "/pages/web/index?share=true&login=true&src=" + encodeURIComponent(t)
        }, this.data.customShareConfig);
        return this.setData({
            defaultShareConfig: i
        }), this.data.defaultShareConfig;
    },
    onShareAppMessage: function(e) {
        var t = e.webViewUrl;
        return this.getShareConfig({
            webViewUrl: t
        });
    }
});