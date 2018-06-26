function e(e, t) {
    return t = t.split("#")[0], new RegExp("(^|\\?|&)" + e + "=([^&]*)(\\s|&|$)", "i").test(t) ? RegExp.$2.replace(/\+/g, " ") : "";
}

function t(e) {
    var t = getCurrentPages();
    return e[t[t.length - 1].route];
}

function n(e, t) {
    return e.logMod && "string" == typeof e.logMod && (t = e.logMod), t && "string" == typeof t ? (t = t.split("_"), 
    {
        modId: t[0] || "",
        acmTotal: t[1] || 1
    }) : {
        modId: "",
        acmTotal: 1
    };
}

function o(e, t, n, o) {
    var r = [];
    return e && -1 === t.indexOf("wx_") && (e = e.split("."), t ? (r = t.split("."))[6] = r[6] ? r[6] + "-" + e[6] : e[6] : r = e), 
    r[6] && (r[6] += "-idx_" + n), r[6] && (r[6] += "-mfs_" + (o || 1)), r.join(".") || t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.acmExt = function(i, u) {
    var a = t(r.default.logger && r.default.logger.pages || {}), d = n(i, u), f = d.modId, l = d.acmTotal, g = i.href, s = i.acm, c = i.logIndex, x = i.logBtype, m = g && -1 != g.indexOf("acm="), p = s || "", _ = c || 0;
    return m && !p && (p = e("acm", g)), p && (p.indexOf("wx_") >= 0 || p.indexOf("-wx") >= 0) ? p : p && p.indexOf("mf_") >= 0 ? p + "-wx" : !f || !a || parseInt(f.toString().substring(0, 5)) < 1e4 ? p : (p = o("3.mf.1_0_0.0.0.0.wx_" + a + "_" + f, p, _, l)) && x ? p + "-" + x : p;
};

var r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/config"));