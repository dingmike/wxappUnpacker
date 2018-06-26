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
        for (var j = arguments.length, a = Array(j), k = 0; k < j; k++) a[k] = arguments[k];
        return e = f = c(this, (d = g.__proto__ || Object.getPrototypeOf(g)).call.apply(d, [ this ].concat(a))), 
        f.props = {
            moreGroupData: []
        }, f.methods = {
            goToGroupon: function(a) {
                if (i.default.advoiceTapTwice(a)) {
                    var b = a.currentTarget.dataset.id, c = !1, d = 0;
                    getCurrentPages().map(function(a, b) {
                        "pages/groupon" == a.route && (c = !0, d = getCurrentPages().length - (b + 1));
                    }), c ? (i.default.config.activityId = b, wx.navigateBack({
                        delta: d
                    })) : wx.navigateTo({
                        url: "groupon?id=" + b
                    });
                }
            }
        }, h = e, c(f, h);
    }
    return d(g, a), f(g, [ {
        key: "onLoad",
        value: function() {}
    } ]), g;
}(g.default.component);

exports.default = j;