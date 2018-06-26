function b(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}

function c(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return b && ("object" == typeof b || "function" == typeof b) ? b : a;
}

function a(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a;
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
}, f = function() {
    function a(a, b) {
        for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
        c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), g = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(e), h = function(h) {
    function j() {
        var d, e, f, g;
        b(this, j);
        for (var h = arguments.length, i = Array(h), k = 0; k < h; k++) i[k] = arguments[k];
        return e = f = c(this, (d = j.__proto__ || Object.getPrototypeOf(j)).call.apply(d, [ this ].concat(i))), 
        f.data = {
            reveal: !1,
            icon: !0,
            config: {
                type: "success",
                size: 45,
                color: "green"
            },
            animationData: "",
            imgClassName: "",
            imgMode: "scaleToFill",
            title: "载入中...",
            titleClassName: ""
        }, g = e, c(f, g);
    }
    return a(j, h), f(j, [ {
        key: "onLoad",
        value: function() {
            this.hasPromise = void 0 !== ("undefined" == typeof Promise ? "undefined" : d(Promise));
        }
    }, {
        key: "show",
        value: function() {
            var a = this, b = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            for (var c in this.reveal = !0, b) this[c] = b[c];
            if (this.$apply(), clearTimeout(this.__timeout), setTimeout(function() {
                var b = g.default.createAnimation();
                b.opacity(1).step(), a.animationData = b.export(), a.reveal = !0, a.$apply();
            }, 30), 0 === b.duration) {
                if (this.hasPromise) return new Promise(function(a) {
                    setTimeout(function() {
                        a(b);
                    }, 430);
                });
                setTimeout(function() {
                    return "function" == typeof b.success ? b.success(b) : b;
                }, 430);
            } else {
                if (this.hasPromise) return new Promise(function(c) {
                    a.__timeout = setTimeout(function() {
                        a.toast(), c(b);
                    }, (b.duration || 1500) + 400);
                });
                this.__timeout = setTimeout(function() {
                    a.toast(), "function" == typeof b.success && b.success(b);
                }, (b.duration || 1500) + 400);
            }
        }
    }, {
        key: "toast",
        value: function(a) {
            var b = !1;
            try {
                a ? this.show(a) : this.hide();
            } catch (a) {
                b = a;
            }
            return this.hasPromise ? new Promise(function(c, d) {
                b ? d(a) : c(a);
            }) : void (b ? "function" == typeof a.fail && a.fail(a) : "function" == typeof a.success && a.success(a));
        }
    }, {
        key: "hide",
        value: function() {
            clearTimeout(this.__timeout), this.reveal = !1;
            var a = g.default.createAnimation();
            return a.opacity(0).step(), this.animationData = a.export(), this.$apply(), this.hasPromise ? new Promise(function(a) {
                a();
            }) : "function" == typeof data.success ? data.success(data) : void 0;
        }
    } ]), j;
}(g.default.component);

exports.default = h;