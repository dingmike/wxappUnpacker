(function() {
    !function(q) {
        "use strict";
        function z(b, d, g, e) {
            var h = d && d.prototype instanceof B ? d : B, i = Object.create(h.prototype), a = new f(e || []);
            return i._invoke = C(b, g, a), i;
        }
        function A(a, b, c) {
            try {
                return {
                    type: "normal",
                    arg: a.call(b, c)
                };
            } catch (a) {
                return {
                    type: "throw",
                    arg: a
                };
            }
        }
        function B() {}
        function e() {}
        function n() {}
        function i(a) {
            [ "next", "throw", "return" ].forEach(function(b) {
                a[b] = function(a) {
                    return this._invoke(b, a);
                };
            });
        }
        function a(b) {
            function c(d, e, f, g) {
                var a = A(b[d], b, e);
                if ("throw" !== a.type) {
                    var i = a.arg, j = i.value;
                    return j && "object" == typeof j && v.call(j, "__await") ? Promise.resolve(j.__await).then(function(a) {
                        c("next", a, f, g);
                    }, function(a) {
                        c("throw", a, f, g);
                    }) : Promise.resolve(j).then(function(a) {
                        i.value = a, f(i);
                    }, g);
                }
                g(a.arg);
            }
            "object" == typeof q.process && q.process.domain && (c = q.process.domain.bind(c));
            var a;
            this._invoke = function(b, d) {
                function f() {
                    return new Promise(function(a, e) {
                        c(b, d, a, e);
                    });
                }
                return a = a ? a.then(f, f) : f();
            };
        }
        function C(a, b, d) {
            var e = D;
            return function(f, g) {
                if (e === E) throw new Error("Generator is already running");
                if (e === H) {
                    if ("throw" === f) throw g;
                    return p();
                }
                for (d.method = f, d.arg = g; ;) {
                    var h = d.delegate;
                    if (h) {
                        var c = o(h, d);
                        if (c) {
                            if (c === k) continue;
                            return c;
                        }
                    }
                    if ("next" === d.method) d.sent = d._sent = d.arg; else if ("throw" === d.method) {
                        if (e === D) throw e = H, d.arg;
                        d.dispatchException(d.arg);
                    } else "return" === d.method && d.abrupt("return", d.arg);
                    e = E;
                    var i = A(a, b, d);
                    if ("normal" === i.type) {
                        if (e = d.done ? H : j, i.arg === k) continue;
                        return {
                            value: i.arg,
                            done: d.done
                        };
                    }
                    "throw" === i.type && (e = H, d.method = "throw", d.arg = i.arg);
                }
            };
        }
        function o(a, b) {
            var c = a.iterator[b.method];
            if (c === u) {
                if (b.delegate = null, "throw" === b.method) {
                    if (a.iterator.return && (b.method = "return", b.arg = u, o(a, b), "throw" === b.method)) return k;
                    b.method = "throw", b.arg = new TypeError("The iterator does not provide a 'throw' method");
                }
                return k;
            }
            var d = A(c, a.iterator, b.arg);
            if ("throw" === d.type) return b.method = "throw", b.arg = d.arg, b.delegate = null, 
            k;
            var e = d.arg;
            return e ? e.done ? (b[a.resultName] = e.value, b.next = a.nextLoc, "return" !== b.method && (b.method = "next", 
            b.arg = u), b.delegate = null, k) : e : (b.method = "throw", b.arg = new TypeError("iterator result is not an object"), 
            b.delegate = null, k);
        }
        function c(a) {
            var b = {
                tryLoc: a[0]
            };
            1 in a && (b.catchLoc = a[1]), 2 in a && (b.finallyLoc = a[2], b.afterLoc = a[3]), 
            this.tryEntries.push(b);
        }
        function h(a) {
            var b = a.completion || {};
            b.type = "normal", delete b.arg, a.completion = b;
        }
        function f(a) {
            this.tryEntries = [ {
                tryLoc: "root"
            } ], a.forEach(c, this), this.reset(!0);
        }
        function s(a) {
            if (a) {
                var b = a[m];
                if (b) return b.call(a);
                if ("function" == typeof a.next) return a;
                if (!isNaN(a.length)) {
                    var c = -1, d = function b() {
                        for (;++c < a.length; ) if (v.call(a, c)) return b.value = a[c], b.done = !1, b;
                        return b.value = u, b.done = !0, b;
                    };
                    return d.next = d;
                }
            }
            return {
                next: p
            };
        }
        function p() {
            return {
                value: u,
                done: !0
            };
        }
        var u, r = Object.prototype, v = r.hasOwnProperty, g = "function" == typeof Symbol ? Symbol : {}, m = g.iterator || "@@iterator", t = g.asyncIterator || "@@asyncIterator", w = g.toStringTag || "@@toStringTag", x = "object" == typeof module, b = q.regeneratorRuntime;
        if (b) return void (x && (module.exports = b));
        b = q.regeneratorRuntime = x ? module.exports : {}, b.wrap = z;
        var D = "suspendedStart", j = "suspendedYield", E = "executing", H = "completed", k = {}, G = {};
        G[m] = function() {
            return this;
        };
        var I = Object.getPrototypeOf, J = I && I(I(s([])));
        J && J !== r && v.call(J, m) && (G = J);
        var K = n.prototype = B.prototype = Object.create(G);
        e.prototype = K.constructor = n, n.constructor = e, n[w] = e.displayName = "GeneratorFunction", 
        b.isGeneratorFunction = function(a) {
            var b = "function" == typeof a && a.constructor;
            return !!b && (b === e || "GeneratorFunction" === (b.displayName || b.name));
        }, b.mark = function(a) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(a, n) : (a.__proto__ = n, w in a || (a[w] = "GeneratorFunction")), 
            a.prototype = Object.create(K), a;
        }, b.awrap = function(a) {
            return {
                __await: a
            };
        }, i(a.prototype), a.prototype[t] = function() {
            return this;
        }, b.AsyncIterator = a, b.async = function(c, d, e, f) {
            var g = new a(z(c, d, e, f));
            return b.isGeneratorFunction(d) ? g : g.next().then(function(a) {
                return a.done ? a.value : g.next();
            });
        }, i(K), K[w] = "Generator", K[m] = function() {
            return this;
        }, K.toString = function() {
            return "[object Generator]";
        }, b.keys = function(a) {
            var b = [];
            for (var c in a) b.push(c);
            return b.reverse(), function c() {
                for (;b.length; ) {
                    var d = b.pop();
                    if (d in a) return c.value = d, c.done = !1, c;
                }
                return c.done = !0, c;
            };
        }, b.values = s, f.prototype = {
            constructor: f,
            reset: function(a) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = u, this.done = !1, this.delegate = null, 
                this.method = "next", this.arg = u, this.tryEntries.forEach(h), !a) for (var b in this) "t" === b.charAt(0) && v.call(this, b) && !isNaN(+b.slice(1)) && (this[b] = u);
            },
            stop: function() {
                this.done = !0;
                var a = this.tryEntries[0], b = a.completion;
                if ("throw" === b.type) throw b.arg;
                return this.rval;
            },
            dispatchException: function(b) {
                function d(a, c) {
                    return h.type = "throw", h.arg = b, f.next = a, c && (f.method = "next", f.arg = u), 
                    !!c;
                }
                if (this.done) throw b;
                for (var f = this, e = this.tryEntries.length - 1; 0 <= e; --e) {
                    var g = this.tryEntries[e], h = g.completion;
                    if ("root" === g.tryLoc) return d("end");
                    if (g.tryLoc <= this.prev) {
                        var i = v.call(g, "catchLoc"), j = v.call(g, "finallyLoc");
                        if (i && j) {
                            if (this.prev < g.catchLoc) return d(g.catchLoc, !0);
                            if (this.prev < g.finallyLoc) return d(g.finallyLoc);
                        } else if (!i) {
                            if (!j) throw new Error("try statement without catch or finally");
                            if (this.prev < g.finallyLoc) return d(g.finallyLoc);
                        } else if (this.prev < g.catchLoc) return d(g.catchLoc, !0);
                    }
                }
            },
            abrupt: function(a, b) {
                for (var c, d = this.tryEntries.length - 1; 0 <= d; --d) if (c = this.tryEntries[d], 
                c.tryLoc <= this.prev && v.call(c, "finallyLoc") && this.prev < c.finallyLoc) {
                    var e = c;
                    break;
                }
                e && ("break" === a || "continue" === a) && e.tryLoc <= b && b <= e.finallyLoc && (e = null);
                var f = e ? e.completion : {};
                return f.type = a, f.arg = b, e ? (this.method = "next", this.next = e.finallyLoc, 
                k) : this.complete(f);
            },
            complete: function(a, b) {
                if ("throw" === a.type) throw a.arg;
                return "break" === a.type || "continue" === a.type ? this.next = a.arg : "return" === a.type ? (this.rval = this.arg = a.arg, 
                this.method = "return", this.next = "end") : "normal" === a.type && b && (this.next = b), 
                k;
            },
            finish: function(a) {
                for (var b, c = this.tryEntries.length - 1; 0 <= c; --c) if (b = this.tryEntries[c], 
                b.finallyLoc === a) return this.complete(b.completion, b.afterLoc), h(b), k;
            },
            catch: function(a) {
                for (var b, c = this.tryEntries.length - 1; 0 <= c; --c) if (b = this.tryEntries[c], 
                b.tryLoc === a) {
                    var d = b.completion;
                    if ("throw" === d.type) {
                        var e = d.arg;
                        h(b);
                    }
                    return e;
                }
                throw new Error("illegal catch attempt");
            },
            delegateYield: function(a, b, c) {
                return this.delegate = {
                    iterator: s(a),
                    resultName: b,
                    nextLoc: c
                }, "next" === this.method && (this.arg = u), k;
            }
        };
    }("object" == typeof global ? global : "object" == typeof window ? window : "object" == typeof self ? self : this);
})();