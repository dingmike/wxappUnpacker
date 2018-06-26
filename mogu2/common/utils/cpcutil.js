function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (!e) return null;
    var t = [], n = !0, s = !1, o = void 0;
    try {
        for (var u, a = Object.keys(r)[Symbol.iterator](); !(n = (u = a.next()).done); n = !0) {
            var i = u.value;
            t.push(i + "=" + r[i]);
        }
    } catch (e) {
        s = !0, o = e;
    } finally {
        try {
            !n && a.return && a.return();
        } finally {
            if (s) throw o;
        }
    }
    return e + "?" + t.join("&");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.requestCparam = void 0;

var t = e(require("../../common/service/user")), n = require("../../common/m"), s = e(n), o = s.default.fn.sendMsg;

exports.requestCparam = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return new s.default.Promise(function(u) {
        var a = e.itemId, i = e.cparam, c = e.acm, l = e.businessStyle, d = e.custom;
        if (!a || !i) return o(new Error("cpc打点参数缺失"), {
            _author: "changsheng",
            threshold: 1
        }), void u({
            result: "noParam",
            msg: "required param not found"
        });
        var m = n.System.getSync("deviceId"), f = t.default.uid, p = getCurrentPages().slice(-2)[0] || null, g = p && r(p.route, p.options) || "", h = {
            cparam: i,
            acm: c,
            businessStyle: l,
            custom: d,
            clickUserId: f,
            timestamp: +new Date(),
            tradeItemId: a,
            uuid: m,
            refUrl: g,
            platform: 2,
            web: 0,
            _platform: 57
        };
        s.default.requestManager.sendRequest({
            url: "https://log.mogujie.com/unionlog.php",
            method: "GET",
            data: {
                cpcparam: JSON.stringify(h)
            },
            success: function(e) {
                u({
                    result: "success",
                    response: e
                });
            },
            error: function(e) {
                o(new Error("计费打点请求失败!!!"), {
                    _author: "changsheng",
                    threshold: "1"
                }), u({
                    result: "error",
                    errorMessage: e.message
                });
            }
        });
    });
};