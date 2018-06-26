function e(e, t, o) {
    var i = null, r = -1;
    return t && t.length > 0 && t.map(function(t, n) {
        t.promotionKey === e && (i = t, r = n);
    }), i && (i.desc = o), -1 !== r && t.splice(r, 1), i && (i.startTime = n(i.startTime)), 
    i && (i.endTime = n(i.endTime)), i;
}

function t(e) {
    return e < 10 ? "0" + e : e;
}

function n(e) {
    var n = new Date(1e3 * e), o = n.getFullYear(), i = n.getMonth() + 1, r = n.getDate(), a = n.getHours(), u = n.getMinutes();
    return o + "." + t(i) + "." + t(r) + " " + t(a) + ":" + t(u);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t, o, i, r) {
    var a = !0, u = [], s = [], m = [];
    return t && t.length > 0 && t.map(function(t) {
        var n = e(t.promotionKey, i);
        !!n && u.push(n);
    }), u.length > 0 && u.map(function(e) {
        e.promotionKey === r && (a = !1);
    }), "empty_0_0" === r && (a = !1), o && o.length > 0 && o.map(function(t) {
        if (t.params.needMoney) {
            var n = e(t.promotionKey, i, t.unUsableSuggestion);
            !!n && s.push(n);
        }
    }), i.map(function(e) {
        var t = e.promotionKey;
        o.map(function(o) {
            o.promotionKey === t && (e.desc = o.unUsableSuggestion, e.startTime = n(e.startTime), 
            e.endTime = n(e.endTime), m.push(e));
        });
    }), {
        needClose: a,
        availableList: u,
        addOnList: s,
        unAvailableList: m
    };
};