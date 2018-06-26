function t(t) {
    return "function" == typeof t ? t() : t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        var r = [], n = !0, o = !1, i = void 0;
        try {
            for (var u, a = t[Symbol.iterator](); !(n = (u = a.next()).done) && (r.push(u.value), 
            !e || r.length !== e); n = !0) ;
        } catch (t) {
            o = !0, i = t;
        } finally {
            try {
                !n && a.return && a.return();
            } finally {
                if (o) throw i;
            }
        }
        return r;
    }
    return function(e, r) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

exports.getCfg = function(e) {
    return e ? t(n[e]) : n;
}, exports.setCfg = function(t) {
    Object.assign(n, t);
}, exports.getNetworkVal = function(t) {
    return o[t] ? o[t] : 0;
}, exports.setFid = function(t) {
    if (t.ptp) {
        var e = t.ptp.match(/^_qd\.\w+?(\d+)(\.[^.]+){3}$/);
        e && (i = Date.now(), u = e[1], r.default.put(a, i + "::" + u, {
            persistent: !0
        }));
    }
}, exports.getFid = function() {
    if (void 0 === u) {
        var t = (r.default.get(a) || "").split("::"), n = e(t, 2), o = n[0];
        i = void 0 === o ? 0 : o;
        var s = n[1];
        u = void 0 === s ? "" : s;
    }
    return u ? Date.now() - parseInt(i, 10) <= f ? u : (u = "0", r.default.remove(a, {
        persistent: !0
    }), u) : "0";
};

var r = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/utils/cache")), n = {
    pause: !1,
    uuid: "",
    platform: "57",
    uid: "",
    cpsinfo: "",
    cpsparam: "",
    scene: "9999"
}, o = {
    wifi: 4,
    "2g": 1,
    "3g": 2,
    unknown: 0,
    none: -1
}, i = void 0, u = void 0, a = "_fromId", f = 864e5;