function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    return Math.floor(new Date().getTime() / 1e3);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.cacheControl = exports.arrToObj = void 0;

e(require("../../../../common/m.js"));

var r = e(require("../../../../common/utils/cache.js")), o = {
    setH5Cache: function(e) {
        localStorage.setItem("popupRemind_" + e, t());
    },
    setXcxCache: function(e) {
        r.default.put("popupRemind_" + e, t(), {
            persistent: !0
        });
    },
    getH5Cache: function(e, r) {
        var a = localStorage.getItem("spaceTime_" + r);
        a && a != e && (localStorage.setItem("spaceTime_" + r, e), o.clearH5Cache(r));
        var c = localStorage.getItem("popupRemind_" + r);
        if (c) {
            var n = t() - c;
            return console.log("timeLength::" + n), !(n >= e) || (o.clearH5Cache(r), !1);
        }
        return !1;
    },
    getXcxCache: function(e, a) {
        var c = r.default.get("spaceTime_" + a);
        (!c || c && c != e) && (r.default.put("spaceTime_" + a, e, {
            persistent: !0
        }), o.clearXcxCache(a));
        var n = r.default.get("popupRemind_" + a);
        return !!n && (!(t() - n >= e) || (o.clearXcxCache(a), !1));
    },
    clearH5Cache: function(e) {
        localStorage.removeItem("popupRemind_" + e);
    },
    clearXcxCache: function(e) {
        r.default.remove("popupRemind_" + e);
    }
};

exports.arrToObj = function(e) {
    for (var t = {}, r = e.length - 1; r >= 0; r--) t[e[r].giftType] = e[r];
    return t;
}, exports.cacheControl = o;