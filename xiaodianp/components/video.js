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
}(), e = require("./../npm/wepy/lib/wepy.js"), g = a(e), h = require("./../common/global.js"), i = a(h), j = require("./../common/da.js"), k = a(j), l = function(a) {
    function h() {
        var d, e, f, j;
        b(this, h);
        for (var m = arguments.length, a = Array(m), n = 0; n < m; n++) a[n] = arguments[n];
        return e = f = c(this, (d = h.__proto__ || Object.getPrototypeOf(h)).call.apply(d, [ this ].concat(a))), 
        f.props = {
            videoList: {}
        }, f.methods = {
            gotoVideo: function(a, b) {
                i.default.advoiceTapTwice(b) && (k.default.report(164, 10, "-1", a, "", i.default.getFid()), 
                g.default.navigateTo({
                    url: "video?video_ori_url=" + a
                }));
            }
        }, j = e, c(f, j);
    }
    return d(h, a), f(h, [ {
        key: "onLoad",
        value: function() {}
    } ]), h;
}(g.default.component);

exports.default = l;