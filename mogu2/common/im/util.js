Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./sdk/api")), t = function(e) {
    var t = e ? new Date(Number(e)) : new Date(r.default.now());
    return {
        y: t.getFullYear(),
        m: t.getMonth() + 1,
        d: t.getDate(),
        h: t.getHours(),
        i: t.getMinutes(),
        s: t.getSeconds(),
        q: Math.floor((t.getMonth() + 3) / 3),
        S: t.getMilliseconds()
    };
}, n = function(e) {
    return "星期" + [ "日", "一", "二", "三", "四", "五", "六" ][(e ? new Date(Number(e)) : new Date()).getDay()];
}, i = function(e) {
    return Number(e) > 9 ? "" + e : "0" + e;
}, a = function(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "Y-m-d H:i:s", n = t(e);
    return r.replace(/hh/gi, i(n.h)).replace(/ii/gi, i(n.i)).replace(/ss/gi, i(n.s)).replace(/y/gi, n.y % 100).replace(/m/gi, n.m).replace(/d/gi, n.d).replace(/h/gi, n.h).replace(/i/gi, n.i).replace(/s/gi, n.s);
};

exports.default = {
    formtTime: a,
    escapeHtml: function(e) {
        return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&quot;").replace(/'/g, "&#039;");
    },
    clone: function r(t) {
        var n, i, a;
        n = Array.isArray(t) ? [] : {};
        for (a in t) i = t[a], n[a] = "object" === (void 0 === i ? "undefined" : e(i)) ? r(i) : i;
        return n;
    },
    dayTime: function(e, r) {
        var i = t(), o = t(e);
        if (i.Y === o.Y) {
            if (i.m === o.m) {
                if (i.d === o.d) return a(e, "hh:ii");
                if (i.d - o.d == 1) return r ? "昨天" : a(e, "昨天 hh:ii");
                if (i.d - o.d <= 7) {
                    var u = n(e);
                    return r ? u : u + " " + a(e, "hh:ii");
                }
            }
            if (1 === i.d && i.m - o.m == 1) {
                var c = new Date();
                if (c = new Date(c.setDate(c.getDate() - 1)).getDate(), o.d === c) return r ? "昨天" : a(e, "昨天 hh:ii");
                if (o.d >= c - 6) {
                    var f = n(e);
                    return r ? f : f + " " + a(e, "hh:ii");
                }
            }
        }
        return r ? a(e, "y/m/d") : a(e, "y/m/d hh:ii");
    },
    objPick: function(e, r) {
        var t = [], n = {};
        return r.map(function(r) {
            e[r] ? n[r] = e[r] : t.push(r);
        }), {
            leftKeys: t,
            pickObj: n
        };
    },
    getCache: function(e) {
        return wx.getStorageSync(e);
    },
    setCache: function(e, r) {
        try {
            return wx.setStorageSync(e, r);
        } catch (e) {
            console.log(e);
        }
    },
    queryString: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = [];
        for (var t in e) r.push(t + "=" + e[t]);
        return r.join("&");
    },
    url2id: function e(r, t) {
        if (t || (t = !1), 24 === r.length && r.match(/^[0-9a-f]+$/)) return r;
        if (r instanceof Array) {
            for (var n = 0; n < r.length; n++) {
                var i = r[n];
                r[n] = e(i);
            }
            return r;
        }
        if (r.indexOf(",") > 0) {
            r = r.split(",");
            for (var a = 0; a < r.length; a++) {
                var o = r[a];
                o ? r[a] = e(o) : delete r[a];
            }
            return r.join(",");
        }
        if (t && r.match(/^(null|undefined)$/i)) return !1;
        var u = 0;
        switch (parseInt(r.substr(0, 1))) {
          case 1:
            u = (parseInt(parseInt(r.substr(1) + "", 36).toString(10)) - 56) / 2;
            break;

          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            u = 0;
            break;

          default:
            u = r;
        }
        return 0 < u ? parseInt(u) : 0;
    },
    mixUint32: function(e, r) {
        if (e <= 0) return "" + r;
        for (var t = ""; ;) {
            var n = e % 10 * 4294967296 + r;
            if (e = Math.floor(e / 10), r = Math.floor(n / 10), t = (n % 10).toString(10) + t, 
            !e && !r) break;
        }
        return t;
    },
    buildQuery: function(e) {
        var r = [];
        for (var t in e) r.push(t + "=" + e[t]);
        return r.join("&");
    }
};