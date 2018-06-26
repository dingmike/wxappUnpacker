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

var e = require("./../npm/wepy/lib/wepy.js"), f = a(e), g = require("./../common/global.js"), h = a(g), i = function(a) {
    function g() {
        var d, e, j, k;
        b(this, g);
        for (var m = arguments.length, l = Array(m), a = 0; a < m; a++) l[a] = arguments[a];
        return e = j = c(this, (d = g.__proto__ || Object.getPrototypeOf(g)).call.apply(d, [ this ].concat(l))), 
        j.props = {
            banner: {}
        }, j.methods = {
            bigBannerClick: function(a, b) {
                h.default.advoiceTapTwice(b) && f.default.navigateTo({
                    url: a
                });
            }
        }, k = e, c(j, k);
    }
    return d(g, a), g;
}(f.default.component);

exports.default = i;