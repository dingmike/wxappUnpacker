function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
    return function(t) {
        for (var n = t.split("?")[1] || "", i = s(n), a = arguments.length, l = Array(a > 1 ? a - 1 : 0), o = 1; o < a; o++) l[o - 1] = arguments[o];
        for (var u = 0, c = r.length; u < c; u++) i[r[u]] = l[u];
        return l[r.length] && (i = Object.assign(s(l[r.length]), i)), e(i);
    };
}

function r(e) {
    var t = o.default.get("TABS");
    return e = e.split("?")[0], {
        isTab: e in t,
        url: e
    };
}

function n(e) {
    return c.some(function(t) {
        return !!t.test.test(e) && (e = e.replace(t.test, t.replacer), !0);
    }), e;
}

function i(e) {
    console.error(e), a.default.fn.sendMsg(new Error(e));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.transform = n, exports.navigate = function(e, t) {
    var a = r(e = n(e));
    a.isTab ? ((0, u.nextPeventOnShow)(!0), wx.switchTab({
        url: a.url,
        fail: function(e) {
            (0, u.nextPeventOnShow)(!1), i("[SwitchTab]:" + e.errMsg), t && t();
        }
    })) : wx.navigateTo({
        url: e,
        fail: function(r) {
            console.error("[Navigate]:", r.errMsg), wx.redirectTo({
                url: e,
                fail: function(e) {
                    i("[Redirect]:" + e.errMsg), t && t();
                }
            });
        }
    });
}, exports.redirect = function(e, t) {
    var a = r(e = n(e));
    a.isTab ? ((0, u.nextPeventOnShow)(!0), wx.switchTab({
        url: a.url,
        fail: function(e) {
            (0, u.nextPeventOnShow)(!1), i("[SwitchTab]:" + e.errMsg), t && t();
        }
    })) : wx.redirectTo({
        url: e,
        fail: function(e) {
            i("[Redirect]:" + e.errMsg), t && t();
        }
    });
};

var a = e(require("../m")), l = e(require("./url")), o = e(require("../utils/cache")), u = require("../../mixins/logger/index"), s = a.default.qs.parse, c = [ {
    test: /^https?:\/\/h5\.mogujie\.com\/detail-normal\/index.html\?itemId=([0-9a-z]+).*$/,
    replacer: t(l.default.detail, "itemId")
}, {
    test: /^mgj:\/\/detail\?iid=([0-9a-z]+)(?:&(.*))?$/,
    replacer: t(l.default.detail, "itemId")
}, {
    test: /^https?:\/\/shop\.mogujie\.com\/detail\/([0-9a-z]+).*$/,
    replacer: t(l.default.detail, "itemId")
} ];