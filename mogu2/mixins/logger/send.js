function e() {
    if ("number" != typeof u) {
        var e = r.default.get("logId", {
            persistent: !0
        }) || "", n = e.split("::"), i = t(n, 2), f = i[0], d = i[1], l = void 0 === d ? "0" : d;
        e && o === f ? o === f && (u = parseInt(l, 10) + 1) : u = 1;
    } else if (u++, 3 === ++a) {
        a = 0;
        var s = Date.format(new Date(), "MMdd");
        s !== o && (o = s, u = 1);
    }
    return r.default.put("logId", o + "::" + u, {
        persistent: !0
    }), u;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        var r = [], n = !0, i = !1, u = void 0;
        try {
            for (var o, a = e[Symbol.iterator](); !(n = (o = a.next()).done) && (r.push(o.value), 
            !t || r.length !== t); n = !0) ;
        } catch (e) {
            i = !0, u = e;
        } finally {
            try {
                !n && a.return && a.return();
            } finally {
                if (i) throw u;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

exports.sendLog = function(t, r) {
    var u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, o = [ e(), (0, 
    i.getCfg)("uuid"), t, JSON.stringify(r) ];
    "p" === t && (u.force = !0), "n" === t && (u.pending = !0), (0, n.pushQueue)(o.join("\t"), u);
};

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/utils/cache")), n = require("./queue"), i = require("./config"), u = void 0, o = Date.format(new Date(), "MMdd"), a = 0;