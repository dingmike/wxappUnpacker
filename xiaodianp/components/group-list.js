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

var e = require("./../npm/wepy/lib/wepy.js"), f = a(e), g = require("./../common/global.js"), h = a(g), i = require("./../common/da.js"), j = a(i), k = function(a) {
    function g() {
        var d, e, k, m;
        b(this, g);
        for (var a = arguments.length, n = Array(a), l = 0; l < a; l++) n[l] = arguments[l];
        return e = k = c(this, (d = g.__proto__ || Object.getPrototypeOf(g)).call.apply(d, [ this ].concat(n))), 
        k.props = {
            groupData: {},
            fromListPage: Boolean
        }, k.data = {
            global: h.default,
            color: "#FE3B2E",
            position: "relative"
        }, k.methods = {
            clickProduct: function(a) {
                if (h.default.advoiceTapTwice(a)) {
                    var b = a.currentTarget.dataset.id, c = a.currentTarget.dataset.type;
                    this.fromListPage ? j.default.report(524, 302, "-1", b, "", h.default.getFid()) : j.default.report(2 == c ? 525 : 164, [ "", "9", "302", "6", "8" ][c], "-1", b, "", h.default.getFid()), 
                    f.default.navigateTo({
                        url: "groupon?id=" + b
                    });
                }
            }
        }, m = e, c(k, m);
    }
    return d(g, a), g;
}(f.default.component);

exports.default = k;