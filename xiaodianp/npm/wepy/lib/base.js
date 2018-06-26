function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var b = require("./event.js"), g = a(b), c = require("./util.js"), d = a(c), f = [ "onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll", "onTabItemTap" ], h = [ "onLaunch", "onShow", "onHide", "onError" ], i = function b(h, j, e) {
    j.$prefix = d.default.camelize(e || ""), Object.getOwnPropertyNames(j.components || {}).forEach(function(d) {
        var a = j.components[d], f = new a();
        f.$initMixins(), f.$name = d;
        var g = e ? e + f.$name + "$" : "$" + f.$name + "$";
        j.$com[d] = f, b(h, f, g);
    }), Object.getOwnPropertyNames(j.constructor.prototype || []).forEach(function(a) {
        "constructor" !== a && -1 === f.indexOf(a) && (h[a] = function() {
            j.constructor.prototype[a].apply(j, arguments), j.$apply();
        });
    });
    var c = Object.getOwnPropertyNames(j.methods || []);
    return j.$mixins.forEach(function(a) {
        c = c.concat(Object.getOwnPropertyNames(a.methods || []));
    }), c.forEach(function(b) {
        h[j.$prefix + b] = function(e) {
            for (var k = arguments.length, m = Array(1 < k ? k - 1 : 0), a = 1; a < k; a++) m[a - 1] = arguments[a];
            var o = new g.default("system", this, e.type);
            o.$transfor(e);
            var i, n, f, q = [], c = 0;
            if (e.currentTarget && e.currentTarget.dataset) {
                for (i = e.currentTarget.dataset; void 0 !== i["wpy" + b.toLowerCase() + (n = String.fromCharCode(65 + c++))]; ) q.push(i["wpy" + b.toLowerCase() + n]);
                void 0 !== i.comIndex && (f = i.comIndex);
            }
            if (void 0 !== f) {
                f = ("" + f).split("-");
                for (var p = f.length, l = p; 0 < p--; ) {
                    l = p;
                    for (var h = j; 0 < l--; ) h = h.$parent;
                    h.$setIndex(f.shift());
                }
            }
            m = m.concat(q);
            var r, d, s = j.methods[b];
            return s && (r = s.apply(j, m.concat(o))), j.$mixins.forEach(function(a) {
                a.methods[b] && (d = a.methods[b].apply(j, m.concat(o)));
            }), j.$apply(), s ? r : d;
        };
    }), h;
};

exports.default = {
    $createApp: function(a, b) {
        var c = {}, d = new a();
        return this.$instance || (d.$init(this, b), this.$instance = d, this.$appConfig = b), 
        2 === arguments.length && !0 === arguments[1] && (c.$app = d), d.$wxapp = getApp(), 
        h = h.concat(b.appEvents || []), f = f.concat(b.pageEvents || []), h.forEach(function(b) {
            c[b] = function() {
                for (var c = arguments.length, e = Array(c), f = 0; f < c; f++) e[f] = arguments[f];
                var a;
                return !d.$wxapp && (d.$wxapp = getApp()), d[b] && (a = d[b].apply(d, e)), a;
            };
        }), c;
    },
    $createPage: function(b, c) {
        var d = this, g = {}, h = new b();
        return "string" == typeof c && (this.$instance.$pages["/" + c] = h), h.$initMixins(), 
        ("boolean" == typeof c && c || 3 === arguments.length && !0 === arguments[2]) && (g.$page = h), 
        g.onLoad = function() {
            for (var a = arguments.length, f = Array(a), e = 0; e < a; e++) f[e] = arguments[e];
            h.$name = b.name || "unnamed", h.$init(this, d.$instance, d.$instance);
            var g = d.$instance.__prevPage__, i = {};
            i.from = g || void 0, g && 0 < Object.keys(g.$preloadData).length && (i.preload = g.$preloadData, 
            g.$preloadData = {}), h.$prefetchData && 0 < Object.keys(h.$prefetchData).length && (i.prefetch = h.$prefetchData, 
            h.$prefetchData = {}), f.push(i), [].concat(h.$mixins, h).forEach(function(a) {
                a.onLoad && a.onLoad.apply(h, f);
            }), h.$apply();
        }, g.onShow = function() {
            for (var a = arguments.length, b = Array(a), e = 0; e < a; e++) b[e] = arguments[e];
            d.$instance.__prevPage__ = h, [].concat(h.$mixins, h).forEach(function(a) {
                a.onShow && a.onShow.apply(h, b);
            });
            var f = getCurrentPages(), g = f[f.length - 1].__route__, i = f[f.length - 1].__wxWebviewId__;
            d.$instance.__wxWebviewId__ !== i && (h.$wxpage = this, d.$instance.__route__ = g, 
            d.$instance.__wxWebviewId__ = i, [].concat(h.$mixins, h).forEach(function(a) {
                a.onRoute && a.onRoute.apply(h, b);
            })), h.$apply();
        }, f.forEach(function(a) {
            "onLoad" !== a && "onShow" !== a && (g[a] = function() {
                for (var b = arguments.length, c = Array(b), d = 0; d < b; d++) c[d] = arguments[d];
                var e;
                return "onShareAppMessage" === a ? (h[a] && (e = h[a].apply(h, c)), e) : ([].concat(h.$mixins, h).forEach(function(b) {
                    b[a] && b[a].apply(h, c);
                }), "onPageScroll" != a && h.$apply(), e);
            });
        }), h.onShareAppMessage || delete g.onShareAppMessage, -1 === [].concat(h.$mixins, h).findIndex(function(a) {
            return a.onPageScroll;
        }) && delete g.onPageScroll, i(g, h, "");
    }
};