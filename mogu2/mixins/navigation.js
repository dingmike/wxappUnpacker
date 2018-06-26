function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (t.ptpC || t.ptpD) {
        var n = e.split(".");
        return n[2] = t.ptpC || "0", n[3] = t.ptpD || "0", t.ptp = n.join("."), m(t, "ptpC", "ptpD");
    }
    return t.ptp = e, t;
}

function n(t, e) {
    var n = t.split("?"), a = {};
    return 2 === n.length && (a = v(n[1])), e = Object.keys(e).reduce(function(t, n) {
        return void 0 !== e[n] && "" !== e[n] && (t[n] = e[n]), t;
    }, {}), a = Object.assign(a, e), t = n[0] + "?" + h(a);
}

function a(t, e) {
    t(n(y, e), function() {
        throw new Error("没有404页面，请升级navigation sdk！");
    });
}

function r(t) {
    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), a = 1; a < e; a++) n[a - 1] = arguments[a];
    return Object.keys(t).map(function(e) {
        /^log[A-Z]/.test(e) ? n.push(e) : "" !== t[e] && void 0 !== t[e] || n.push(e);
    }), m(t, n);
}

function i(t) {
    var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2] ? d.redirect : d.navigate, c = void 0;
    if ("object" === (void 0 === t ? "undefined" : s(t))) {
        c = t.currentTarget.dataset;
        var f = this.$getPtpData(c);
        if (f.acm && (c.acm = f.acm), c = e(c, f.ptp_cnt), Object.assign(c, b), c.href) {
            var u = c.href;
            c = r(c, "href"), u = n(u, c), o(u, function() {
                a(o, Object.assign(c, {
                    url: u
                }));
            });
        } else {
            if (!c.page) throw new Error("$navigate回调需要指定data-href或data-page参数");
            var l = c.page, g = p.default[l];
            c = r(c, "page"), g ? o(g(c)) : a(o, Object.assign(c, {
                page: l,
                msg: "不存在指定page"
            }));
        }
    } else {
        if ("string" != typeof t) throw new Error("$navigate参数异常，请指定跳转页");
        var v = this.$getPtpData(i);
        v.acm && (i.acm = v.acm), i = e(i, v.ptp_cnt), Object.assign(i, b);
        var h = r(i);
        if (t in p.default) {
            var m = p.default[t];
            "function" == typeof m && o(m(h));
        } else {
            var y = n(t, h);
            o(y, function() {
                a(o, Object.assign(h, {
                    url: y
                }));
            });
        }
    }
}

function o(t) {
    var a = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    "object" === (void 0 === t ? "undefined" : s(t)) && (t = (i = t.currentTarget.dataset).href || "");
    var o = i, c = o.appId, u = o.fallback, p = o.errMsg, d = r(i, "appId", "href", "fallback", "errMsg"), g = this.$canLaunch();
    d = e(d, this.ptpData.ptp_cnt), c === l.default.get("APPID") ? this.$navigate(t, d) : g ? (d.__mgjuuid = f.System.getSync("deviceId"), 
    t = n(t, d), wx.navigateToMiniProgram({
        appId: c,
        path: t,
        extraData: d,
        success: function(t) {
            a.$logE("016000177", {
                suc: !0
            }), console.log(t);
        },
        fail: function() {
            a.$logE("016000177", {
                suc: !1,
                fallback: u
            }), u && a.$navigate(u, d, !0), !u && p && wx.showModal({
                title: "唤起失败",
                content: p,
                showCancel: !1
            });
        }
    })) : (u && this.$navigate(u, d, !0), !u && p && wx.showModal({
        title: "唤起失败",
        content: p,
        showCancel: !1
    }));
}

function c(t, e) {
    if (!t) return !1;
    for (var n = t.split("."), a = e.split("."), r = 0; r < 5; r++) if (parseInt(n[r]) > parseInt(a[r])) return !0;
    return !1;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.initPersistentParams = function(t) {
    t && Object.keys(b).map(function(e) {
        t[e] && (b[e] = t[e]);
    });
};

var f = require("../common/m"), u = t(f), l = t(require("../common/utils/cache")), p = t(require("../common/service/url")), d = require("../common/service/route"), g = u.default.qs, v = g.parse, h = g.stringify, m = u.default.fn.omit, y = "/pages/404/index", b = {
    mlf: "",
    f: "",
    f2: "",
    _fu: ""
}, j = u.default.fn.debounce(i, 1e3, !0), w = u.default.fn.debounce(o, 1e3, !0);

f.System.get("systemInfo").then(function(t) {
    t && "ios" === t.platform && (j = u.default.fn.debounce(i, 300, !0), w = u.default.fn.debounce(o, 300, !0));
});

var $ = void 0;

exports.default = {
    methods: {
        $redirect: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], a = getCurrentPages().length > 1;
            try {
                (e.forceRedirect || t.currentTarget.dataset.forceRedirect) && (a = !0);
            } catch (t) {}
            n ? i.call(this, t, e, a) : j.call(this, t, e, a);
        },
        $navigate: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2] ? i.call(this, t, e) : j.call(this, t, e);
        },
        $canLaunch: function() {
            if (void 0 === $ && ($ = !1, wx.navigateToMiniProgram)) {
                var t = f.System.getSync("systemInfo");
                "android" === t.platform && c(t.version, "6.5.9") ? $ = !0 : "ios" === t.platform && c(t.version, "6.5.8") && ($ = !0);
            }
            return $;
        },
        $launch: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2] ? o.call(this, t, e) : w.call(this, t, e);
        }
    }
};