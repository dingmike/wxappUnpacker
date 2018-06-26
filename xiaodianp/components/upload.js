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
    function f() {
        var a, d, e, g;
        b(this, f);
        for (var h = arguments.length, j = Array(h), i = 0; i < h; i++) j[i] = arguments[i];
        return d = e = c(this, (a = f.__proto__ || Object.getPrototypeOf(f)).call.apply(a, [ this ].concat(j))), 
        e.props = {
            showFoot: {}
        }, g = d, c(e, g);
    }
    return d(f, a), f;
}(f.default.component);

exports.default = i;