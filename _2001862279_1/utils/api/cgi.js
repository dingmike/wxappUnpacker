function e(e) {}

function n(e, n) {
    for (var o in n) e += -1 === e.indexOf("?") ? "?" + o + "=" + n[o] : "&" + o + "=" + n[o];
    return e;
}

function o(e) {
    wx.login({
        success: function(n) {
            n.code ? e(n.code) : (console.warn("login: no code"), a.loading(!1));
        },
        fail: function() {
            console.warn("login: fail"), a.loading(!1);
        }
    });
}

function t() {
    var e = u && l && f;
    return u && u.indexOf(" ") > -1 && (e = !1), e;
}

function i(e) {
    e.ts = +new Date(), wx.setStorageSync("_session", e), u = e._data_ticket, l = e._fake_id, 
    f = e._sid_ticket, p = e._sid_expire;
}

function r(c, _) {
    var g = {}, x = c.success || a.noop, w = c.fail || a.noop, y = c.error || a.noop, h = c.complete || a.noop;
    if (g.success = function(n) {
        if (a.loading(!1), e(n), !n.data) return console.warn("request: no data[" + n.statusCode + "]"), 
        void w(n);
        n.data.base_resp.session && i(n.data.base_resp.session);
        var t = 1 * n.data.base_resp.ret;
        if (0 !== t) return console.warn("request: ret = " + t), void (200003 === t ? o(function(e) {
            return r(c, e);
        }) : w(n.data));
        x(n.data);
    }, g.fail = function(e) {
        a.loading(!1), console.warn("request: fail", e), y(e);
    }, g.complete = h, c.retryWxLogin = c.retryWxLogin || 5, c.retryWxLogin--, 0 == c.retryWxLogin && !t()) return g.fail(), 
    void g.complete();
    if (_ || t() && !(+new Date() > 1e3 * p)) {
        if (!c.url) throw new Error("request: no url");
        g.url = d.BASE_URL + c.url, g.data = c.data || {}, t() && (g.url = n(g.url, {
            _data_ticket: u,
            _fake_id: l,
            _sid_ticket: f
        })), _ && (g.url = n(g.url, {
            _code: _
        })), s.openid && (g.url = n(g.url, {
            mallopenid: s.openid
        })), g.header = c.header, g.method = c.method, g.dataType = c.dataType || "json", 
        e(g), wx.request(g);
    } else o(function(e) {
        return r(c, e);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.get = function(e) {
    e.method = "GET", e.header = {
        "content-type": "application/json"
    }, e.hideLoading || a.loading(!0, e.loadingText), r(e);
}, exports.post = function(e) {
    e.method = "POST", e.header = {
        "content-type": "application/x-www-form-urlencoded"
    }, e.hideLoading || a.loading(!0, e.loadingText), r(e);
};

getApp();

var a = require("../utils.js"), d = require("../../config.js").config, s = wx.getExtConfigSync ? wx.getExtConfigSync() : {};

s && s.appid && s.openid || (s = {
    appid: "wx02afb2630b4d2959",
    openid: "ozaxYtxLXzUGOjAkMQrt3I49ZfXM"
}), console.debug("extJson:", s);

var c = wx.getStorageSync("_session") || {}, u = c._data_ticket, l = c._fake_id, f = c._sid_ticket, p = c._sid_expire;