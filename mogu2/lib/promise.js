Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./system")), n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, o = function(e, t) {
    return t = {
        exports: {}
    }, e(t, t.exports), t.exports;
}(function(t) {
    !function(n) {
        function o() {}
        function i(e, t) {
            return function() {
                e.apply(t, arguments);
            };
        }
        function r(e) {
            if (!(this instanceof r)) throw new TypeError("Promises must be constructed via new");
            if ("function" != typeof e) throw new TypeError("not a function");
            this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], 
            a(e, this);
        }
        function f(e, t) {
            for (;3 === e._state; ) e = e._value;
            0 !== e._state ? (e._handled = !0, r._immediateFn(function() {
                var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                if (null !== n) {
                    var o;
                    try {
                        o = n(e._value);
                    } catch (e) {
                        return void c(t.promise, e);
                    }
                    u(t.promise, o);
                } else (1 === e._state ? u : c)(t.promise, e._value);
            })) : e._deferreds.push(t);
        }
        function u(t, n) {
            try {
                if (n === t) throw new TypeError("A promise cannot be resolved with itself.");
                if (n && ("object" === (void 0 === n ? "undefined" : e(n)) || "function" == typeof n)) {
                    var o = n.then;
                    if (n instanceof r) return t._state = 3, t._value = n, void s(t);
                    if ("function" == typeof o) return void a(i(o, n), t);
                }
                t._state = 1, t._value = n, s(t);
            } catch (e) {
                c(t, e);
            }
        }
        function c(e, t) {
            e._state = 2, e._value = t, s(e);
        }
        function s(e) {
            2 === e._state && 0 === e._deferreds.length && r._immediateFn(function() {
                e._handled || r._unhandledRejectionFn(e._value);
            });
            for (var t = 0, n = e._deferreds.length; t < n; t++) f(e, e._deferreds[t]);
            e._deferreds = null;
        }
        function l(e, t, n) {
            this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, 
            this.promise = n;
        }
        function a(e, t) {
            var n = !1;
            try {
                e(function(e) {
                    n || (n = !0, u(t, e));
                }, function(e) {
                    n || (n = !0, c(t, e));
                });
            } catch (e) {
                if (n) return;
                n = !0, c(t, e);
            }
        }
        var d = setTimeout;
        r.prototype.catch = function(e) {
            return this.then(null, e);
        }, r.prototype.then = function(e, t) {
            var n = new this.constructor(o);
            return f(this, new l(e, t, n)), n;
        }, r.all = function(t) {
            return new r(function(n, o) {
                function i(t, u) {
                    try {
                        if (u && ("object" === (void 0 === u ? "undefined" : e(u)) || "function" == typeof u)) {
                            var c = u.then;
                            if ("function" == typeof c) return void c.call(u, function(e) {
                                i(t, e);
                            }, o);
                        }
                        r[t] = u, 0 == --f && n(r);
                    } catch (e) {
                        o(e);
                    }
                }
                if (!t || void 0 === t.length) throw new TypeError("Promise.all accepts an array");
                var r = Array.prototype.slice.call(t);
                if (0 === r.length) return n([]);
                for (var f = r.length, u = 0; u < r.length; u++) i(u, r[u]);
            });
        }, r.resolve = function(t) {
            return t && "object" === (void 0 === t ? "undefined" : e(t)) && t.constructor === r ? t : new r(function(e) {
                e(t);
            });
        }, r.reject = function(e) {
            return new r(function(t, n) {
                n(e);
            });
        }, r.race = function(e) {
            return new r(function(t, n) {
                for (var o = 0, i = e.length; o < i; o++) e[o].then(t, n);
            });
        }, r._immediateFn = "function" == typeof setImmediate && function(e) {
            setImmediate(e);
        } || function(e) {
            d(e, 0);
        }, r._unhandledRejectionFn = function(e) {
            "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e);
        }, r._setImmediateFn = function(e) {
            r._immediateFn = e;
        }, r._setUnhandledRejectionFn = function(e) {
            r._unhandledRejectionFn = e;
        }, t.exports ? t.exports = r : n.Promise || (n.Promise = r);
    }(n);
}), i = Promise, r = t.default.getSync("systemInfo");

try {
    /iOS\s*(8|10\.0)/i.test(r.system) && (Promise = i = o, Object.defineProperty(Promise, "__polyfill__", {
        value: !0
    }));
} catch (e) {
    console.warn("fail to detect Promise version");
}

var f = i;

exports.default = f;