function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}

function c(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return b && ("object" == typeof b || "function" == typeof b) ? b : a;
}

function d(a, b) {
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

var f = function() {
    function a(a, b) {
        for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
        c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), g = a(e), h = require("./../common/global.js"), i = a(h), j = function(a) {
    function g() {
        var d, e, f, h;
        b(this, g);
        for (var j = arguments.length, i = Array(j), a = 0; a < j; a++) i[a] = arguments[a];
        return e = f = c(this, (d = g.__proto__ || Object.getPrototypeOf(g)).call.apply(d, [ this ].concat(i))), 
        f.props = {
            loopText: String
        }, f.events = {
            "loopWording-broadcast": function() {
                f.loop(!0);
            },
            "loopWordingLoad-broadcast": function() {
                f.loadData();
            }
        }, f.data = {
            speed: 1,
            currentDistance: 0,
            size: 14,
            length: 0,
            windowWidth: 0,
            timeInterval: !1
        }, f.methods = {}, h = e, c(f, h);
    }
    return d(g, a), f(g, [ {
        key: "loop",
        value: function(a) {
            var b = this;
            a ? (b.currentDistance = 0, clearInterval(b.timeInterval), b.$apply(), console.log("轮播器关闭")) : b.timeInterval = setInterval(function() {
                -b.currentDistance < b.length ? b.currentDistance -= b.speed : b.currentDistance = 0, 
                b.$apply();
            }, 30);
        }
    }, {
        key: "loadData",
        value: function() {
            var a = this;
            this.length = this.loopText.length * this.size, this.windowWidth = wx.getSystemInfoSync().windowWidth, 
            this.$apply(), this.length > this.windowWidth - 35 && setTimeout(function() {
                a.loop(!1);
            }, 1e3);
        }
    } ]), g;
}(g.default.component);

exports.default = j;