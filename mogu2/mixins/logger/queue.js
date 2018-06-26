function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    m || (m = setTimeout(function() {
        (0, l.getCfg)("pause") || r({
            force: !0
        });
    }, 2e3));
}

function n() {
    f.default.read().splitLog && (d = 1, v = g.default.logger.vipUrl || "https://log.mogujie.com/spot?web=1");
}

function o() {
    clearTimeout(m), m = null;
}

function u() {
    s.length + p.length > 50 && !E && (E = !0, x = 3);
    try {
        wx.setStorage({
            key: "pendingLogQueue",
            data: {
                QUEUE: s,
                PENDING_QUEUE: p
            }
        });
    } catch (e) {}
}

function c() {
    if (s.length >= d) return s.splice(0, d);
    var e = s.splice(0, s.length), t = p.splice(0, d - s.length);
    return e.concat(t);
}

function i(e) {
    p = p.concat(e), u(), wx.getNetworkType({
        success: function(e) {
            w = "none" === e.networkType;
        }
    });
}

function r(e) {
    if (!(h >= x || w)) if (!e.force && s.length + p.length < d) s.length + p.length && t(); else {
        var n = c();
        if (n.length) {
            u();
            var f = Date.now();
            o(), h++, a.default.requestManager.sendRequest({
                url: v,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: {
                    v: 2,
                    pt: f,
                    pf: (0, l.getCfg)("platform"),
                    data: n.join("\n")
                },
                success: function(e) {
                    200 != e.statusCode && i(n);
                },
                complete: function() {
                    h--, (0, l.getCfg)("pause") || r({});
                },
                fail: function() {
                    i(n);
                }
            });
        }
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.iQueue = function() {
    f.default.$on("update", function() {
        n();
    }), n(), wx.getStorage({
        key: "pendingLogQueue",
        success: function(e) {
            var t = e.data;
            p = p.concat(t.PENDING_QUEUE), p = p.concat(t.QUEUE);
        }
    });
}, exports.pushQueue = function(e, t) {
    t.force ? s.unshift(e) : s.push(e), u(), r(t);
};

var a = e(require("../../common/m")), f = e(require("../../common/utils/debug")), l = require("./config"), g = e(require("../../common/config")), s = [], p = [], d = 10, h = 0, m = void 0, w = !1, E = !1, v = g.default.logger.url || "https://log.mogujie.com/log?web=1", x = 2;

wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
    w = !1 === e.isConnected;
});