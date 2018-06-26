function t(t) {
    return r(t) === s;
}

function r(t) {
    return c.call(t);
}

function e(t) {
    if (null === t) return t;
    var o = void 0 === t ? "undefined" : l(t);
    if ("number" === o || "string" === o || "boolean" === o || "undefined" === o) return t;
    switch (r(t)) {
      case f:
        return new Date(t);

      case p:
        return t.map(e);

      case s:
        return n({}, t);

      default:
        return t;
    }
}

function n(r) {
    for (var o = [], u = 1; u < arguments.length; u++) o[u - 1] = arguments[u];
    if (0 === o.length) return r;
    for (var l = 0, c = o.length; l < c; l++) {
        var i = o[l];
        if (i && i !== r) for (var f in i) if (a.call(i, f)) {
            var p = i[f];
            t(r[f]) ? r[f] = n(r[f], p) : r[f] = e(p);
        }
    }
    return r;
}

function o(t) {
    return t.reduce(function(t, r) {
        return b(r) ? t.concat(r) : (t.push(r), t);
    }, []);
}

function u(t, r) {
    for (var e = {}, n = 0, o = r.length; n < o; n++) {
        var u = r[n];
        a.call(t, u) && (e[u] = t[u]);
    }
    return e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = Object.prototype.hasOwnProperty, c = Object.prototype.toString, i = Array.prototype.slice, f = "[object Date]", p = "[object Array]", s = "[object Object]", y = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
}, v = /([&<>"`'])/g, b = Array.isArray;

exports.escapeHtml = function(t) {
    return t ? t.replace(v, function(t) {
        return y[t];
    }) : "";
}, exports.apply = function(t, r, e) {
    switch (e.length) {
      case 0:
        return t.call(r);

      case 1:
        return t.call(r, e[0]);

      case 2:
        return t.call(r, e[0], e[1]);

      case 3:
        return t.call(r, e[0], e[1], e[2]);

      default:
        return t.apply(r, e);
    }
}, exports.toArray = function(t, r, e) {
    return i.call(t, r, e);
}, exports.clone = e, exports.merge = n, exports.flatten = o, exports.pick = function(t) {
    for (var r = [], e = 1; e < arguments.length; e++) r[e - 1] = arguments[e];
    return u(t, o(r));
}, exports.omit = function(t) {
    for (var r = [], e = 1; e < arguments.length; e++) r[e - 1] = arguments[e];
    return r = o(r), u(t, Object.keys(t).filter(function(t) {
        return r.indexOf(t) < 0;
    }));
}, exports.setAt = function(t, r, e) {
    var n, o, u = t.replace(/\[([^\]]+)]/g, ".$1").split("."), l = r;
    for (n = 0, o = u.length - 1; n < o; n++) try {
        l = l[u[n]];
    } catch (r) {
        return void console.error('fail to set value on path "%s"', t);
    }
    l[u[n]] = e;
}, exports.throttle = function(t, r, e) {
    var n, o, u, l = null, a = 0;
    e || (e = {});
    var c = function() {
        a = !1 === e.leading ? 0 : Date.now(), l = null, u = t.apply(n, o), l || (n = o = null);
    };
    return function() {
        var i = Date.now();
        a || !1 !== e.leading || (a = i);
        var f = r - (i - a);
        return n = this, o = arguments, f <= 0 || f > r ? (clearTimeout(l), l = null, a = i, 
        u = t.apply(n, o), l || (n = o = null)) : l || !1 === e.trailing || (l = setTimeout(c, f)), 
        u;
    };
}, exports.debounce = function(t, r, e) {
    var n, o, u, l, a, c = function c() {
        var i = Date.now() - l;
        i < r && i > 0 ? n = setTimeout(c, r - i) : (n = null, e || (a = t.apply(u, o), 
        n || (u = o = null)));
    };
    return function() {
        u = this, o = arguments, l = Date.now();
        var i = e && !n;
        return n || (n = setTimeout(c, r)), i && (a = t.apply(u, o), u = o = null), a;
    };
};