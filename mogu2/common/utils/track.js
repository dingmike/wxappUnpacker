function e(e, t) {
    var n = e.indexOf(t);
    "-1" != n && e.splice(n, 1);
}

function t(t, n) {
    if (!n) return t;
    var r = Object.keys(n);
    if (-1 == t.indexOf("?")) {
        var i = r[0];
        t = t + "?" + i + "=" + n[i], e(r, i);
    }
    return 0 != r.length && r.forEach(function(e) {
        t = t + "&" + e + "=" + n[e];
    }), t;
}

function n(e) {
    var t = "";
    return Array.isArray(e) && e.forEach(function(e, n) {
        e && !e.isDefault && e.expCode && e.buketResult && (n > 0 && (t += ";"), t = t + e.expCode + ":" + e.buketResult);
    }), t;
}

module.exports = {
    formatAbinfoWithAlternative: n,
    stainPageUrl: function(e, r) {
        var i = n(r);
        return i && (e = t(e, {
            abinfo: i
        })), e;
    },
    stainNextPageUrl: function(e, n) {
        if (n && n.expCode) {
            var r = {};
            r.referExpCode = n.expCode, e = t(e, r);
        }
        return e;
    },
    statinEvent: function(e, t) {
        var r = Object.assign({}, e), i = n(t);
        return i && (r.abinfo = i), r;
    }
};