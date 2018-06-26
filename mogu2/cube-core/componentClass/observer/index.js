function r(r, e) {
    if (!(r instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(r, e) {
    r.__proto__ = e;
}

function t(r, e, t) {
    for (var o = 0, n = t.length; o < n; o++) {
        var a = t[o];
        (0, u.def)(r, a, e[a]);
    }
}

function o(r, e, t) {
    if ((0, u.isObject)(r)) {
        var o = void 0;
        return (0, u.hasOwn)(r, "__ob__") && r.__ob__ instanceof v ? o = r.__ob__ : p.shouldConvert && (Array.isArray(r) || (0, 
        u.isPlainObject)(r)) && Object.isExtensible(r) && !r._isVue && (o = new v(r, e, t)), 
        o;
    }
}

function n(r, e, t, n) {
    var s = new i.default(), _ = Object.getOwnPropertyDescriptor(r, e);
    if (!_ || !1 !== _.configurable) {
        var f = _ && _.get, p = _ && _.set, l = void 0;
        (0, u.hasOwn)(r, "__ob__") && r.__ob__ instanceof v && (l = r.__ob__);
        var c = o(t, l.vm, l.rootProps ? l.rootProps : e);
        Object.defineProperty(r, e, {
            enumerable: !0,
            configurable: !0,
            get: function() {
                var e = f ? f.call(r) : t;
                return i.default.target && (s.depend(), c && c.dep.depend(), Array.isArray(e) && a(e)), 
                e;
            },
            set: function(n) {
                var a = f ? f.call(r) : t;
                if (n !== a && (n === n || a === a)) {
                    p ? p.call(r, n) : t = n;
                    var i = void 0;
                    (0, u.hasOwn)(r, "__ob__") && r.__ob__ instanceof v && (i = r.__ob__), i.vm._vx_dirtyData.push(i.rootProps ? i.rootProps : e), 
                    c = o(n, i.vm, i.rootProps ? i.rootProps : e), s.notify();
                }
            }
        });
    }
}

function a(r) {
    for (var e, t = 0, o = r.length; t < o; t++) (e = r[t]) && e.__ob__ && e.__ob__.dep.depend(), 
    Array.isArray(e) && a(e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Observer = exports.observerState = void 0;

var s = function() {
    function r(r, e) {
        for (var t = 0; t < e.length; t++) {
            var o = e[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(r, o.key, o);
        }
    }
    return function(e, t, o) {
        return t && r(e.prototype, t), o && r(e, o), e;
    };
}();

exports.observe = o, exports.defineReactive = n, exports.set = function(r, e, t) {
    if (Array.isArray(r) && "number" == typeof e) return r.length = Math.max(r.length, e), 
    r.splice(e, 1, t), t;
    if ((0, u.hasOwn)(r, e)) return r[e] = t, t;
    var o = r.__ob__;
    return o ? (n(o.value, e, t), o.vm._vx_dirtyData.push(o.rootProps ? o.rootProps : e), 
    o.dep.notify(), t) : (r[e] = t, t);
}, exports.del = function(r, e) {
    if (Array.isArray(r) && "number" == typeof e) r.splice(e, 1); else {
        var t = r.__ob__;
        (0, u.hasOwn)(r, e) && (delete r[e], t && (t.vm._vx_dirtyData.push(t.rootProps ? t.rootProps : e), 
        t.dep.notify()));
    }
};

var i = function(r) {
    return r && r.__esModule ? r : {
        default: r
    };
}(require("./dep")), _ = require("./array"), u = require("../utils/index"), f = Object.getOwnPropertyNames(_.arrayMethods), p = exports.observerState = {
    shouldConvert: !0,
    isSettingProps: !1
}, v = exports.Observer = function() {
    function a(o, n, s) {
        r(this, a), this.value = o, this.dep = new i.default(), this.vm = n, this.rootProps = s, 
        (0, u.def)(o, "__ob__", this), Array.isArray(o) ? ((u.hasProto ? e : t)(o, _.arrayMethods, f), 
        this.observeArray(o, this.rootProps)) : this.walk(o);
    }
    return s(a, [ {
        key: "walk",
        value: function(r) {
            for (var e = Object.keys(r), t = 0; t < e.length; t++) n(r, e[t], r[e[t]]);
        }
    }, {
        key: "observeArray",
        value: function(r, e) {
            for (var t = 0, n = r.length; t < n; t++) o(r[t], this.vm, e);
        }
    } ]), a;
}();