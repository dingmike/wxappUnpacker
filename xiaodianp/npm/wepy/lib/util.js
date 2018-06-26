Object.defineProperty(exports, "__esModule", {
    value: !0
});

var b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a;
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
};

exports.default = {
    $isEmpty: function(a) {
        return 0 === Object.keys(a).length;
    },
    $isEqual: function(a, c, d, f) {
        if (a === c) return 0 !== a || 1 / a == 1 / c;
        if (a !== a) return c !== c;
        if (!a || !c) return a === c;
        var g = void 0 === a ? "undefined" : b(a);
        return ("function" === g || "object" === g || "object" === (void 0 === c ? "undefined" : b(c))) && this.$isDeepEqual(a, c, d, f);
    },
    $isDeepEqual: function(d, g, h, j) {
        var k = this, m = toString.call(d);
        if (m !== toString.call(g)) return !1;
        switch (m) {
          case "[object RegExp]":
          case "[object String]":
            return "" + d == "" + g;

          case "[object Number]":
            return +d == +d ? 0 == +d ? 1 / +d == 1 / g : +d == +g : +g != +g;

          case "[object Date]":
          case "[object Boolean]":
            return +d == +g;

          case "[object Symbol]":
            var i = "undefined" == typeof Symbol ? null : Symbol.prototype;
            return i.valueOf.call(d) === i.valueOf.call(g);
        }
        var c = "[object Array]" === m;
        if (!c) {
            if ("object" !== (void 0 === d ? "undefined" : b(d)) || "object" !== (void 0 === g ? "undefined" : b(g))) return d === g;
            var n = d.constructor, o = g.constructor;
            if (n !== o && !("function" == typeof n && n instanceof n && "function" == typeof o && o instanceof o) && "constructor" in d && "constructor" in g) return !1;
        }
        h = h || [], j = j || [];
        for (var q = h.length; q--; ) if (h[q] === d) return j[q] === g;
        if (h.push(d), j.push(g), c) {
            if ((q = d.length) !== g.length) return !1;
            for (;q--; ) if (!k.$isEqual(d[q], g[q], h, j)) return !1;
        } else {
            var r, l = Object.keys(d);
            if (q = l.length, Object.keys(g).length !== q) return !1;
            for (;q--; ) if (r = l[q], !k.$has(g, r) || !k.$isEqual(d[r], g[r], h, j)) return !1;
        }
        return h.pop(), j.pop(), !0;
    },
    $has: function(a, b) {
        if ("[object Array]" !== toString.call(b)) return a && hasOwnProperty.call(a, b);
        for (var c, d = b.length, e = 0; e < d; e++) {
            if (c = b[e], !a || !hasOwnProperty.call(a, c)) return !1;
            a = a[c];
        }
        return !!d;
    },
    $extend: function() {
        var d, g, e, h, j, k, i = arguments[0] || {}, l = 1, m = arguments.length, a = !1, f = this;
        for ("boolean" == typeof i && (a = i, i = arguments[l] || {}, l++), "object" !== (void 0 === i ? "undefined" : b(i)) && "function" != typeof i && (i = {}), 
        l === m && (i = this, l--); l < m; l++) if (d = arguments[l]) for (g in d) e = i[g], 
        h = d[g], i !== h && (a && h && (f.$isPlainObject(h) || (j = Array.isArray(h))) ? (j ? (j = !1, 
        k = e && Array.isArray(e) ? e : []) : k = e && f.$isPlainObject(e) ? e : {}, i[g] = f.$extend(a, k, h)) : i[g] = h);
        return i;
    },
    $copy: function(a) {
        var c = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
        return Array.isArray(a) ? this.$extend(c, [], a) : "null" == "" + a ? a : "object" === (void 0 === a ? "undefined" : b(a)) ? this.$extend(c, {}, a) : a;
    },
    $isPlainObject: function(a) {
        var b, c;
        return a && "[object Object]" === Object.prototype.toString.call(a) && (!(b = Object.getPrototypeOf(a)) || "function" == typeof (c = Object.prototype.hasOwnProperty.call(b, "constructor") && b.constructor) && Object.prototype.hasOwnProperty.toString.call(c) === Object.prototype.hasOwnProperty.toString.call(Object));
    },
    $resolvePath: function(a, b) {
        if (!b) return a;
        if ("/" === b[0]) return b = b.substr(1), this.$resolvePath("", b);
        if ("." !== b[0]) return this.$resolvePath(a, "./" + b);
        var c = a.split("/");
        return "." === b[0] && "/" === b[1] ? (b = b.substr(2), "." === b[0] ? this.$resolvePath(c.join("/"), b) : (c.length ? c[c.length - 1] = b : c = [ b ], 
        1 === c.length ? "/" + c[0] : c.join("/"))) : "." === b[0] && "." === b[1] && "/" === b[2] ? (b = b.replace(/^\.*/gi, ""), 
        c.pop(), this.$resolvePath(c.join("/"), "." + b)) : "." === b[0] ? this.$resolvePath(a, b.substr(1)) : void 0;
    },
    $getParams: function(a) {
        var b = {}, c = a.indexOf("?");
        if (-1 !== c) {
            var d, e = a.substr(c + 1);
            e.split("&").forEach(function(a) {
                d = a.split("="), b[d[0]] = decodeURIComponent(d[1]);
            });
        }
        return b;
    },
    hyphenate: function(a) {
        return a.replace(/([^-])([A-Z])/g, "$1-$2").replace(/([^-])([A-Z])/g, "$1-$2").toLowerCase();
    },
    camelize: function(a) {
        return a.replace(/-(\w)/g, function(a, b) {
            return b ? b.toUpperCase() : "";
        });
    }
};