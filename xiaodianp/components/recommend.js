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

var e = require("./../npm/wepy/lib/wepy.js"), f = a(e), g = require("./../common/global.js"), h = a(g), i = require("./tips.js"), j = a(i), k = require("./../common/api.js"), l = function(a) {
    function g() {
        var d, e, k, l;
        b(this, g);
        for (var m = arguments.length, i = Array(m), a = 0; a < m; a++) i[a] = arguments[a];
        return e = k = c(this, (d = g.__proto__ || Object.getPrototypeOf(g)).call.apply(d, [ this ].concat(i))), 
        k.props = {
            recommendProduct: {},
            isphp: Boolean
        }, k.$repeat = {}, k.$props = {
            tips: {
                "xmlns:v-bind": "",
                "v-bind:text.once": "text",
                "v-bind:color.once": "color",
                "v-bind:position.once": "position"
            }
        }, k.$events = {}, k.components = {
            tips: j.default
        }, k.data = {
            text: "HOT",
            color: "#ff3b30",
            position: "relative"
        }, k.methods = {
            clickProduct: function(a) {
                if (h.default.advoiceTapTwice(a)) {
                    var b = a.currentTarget.dataset.id;
                    h.default.getDeviceType(), h.default.getFid(), f.default.navigateTo({
                        url: "commodity?item_id=" + b
                    });
                }
            },
            clickCart: function(a) {
                var b = a.currentTarget.dataset.id;
                parseInt(a.currentTarget.dataset.insale) && a.currentTarget.dataset.stock && this.$emit("itemId-emit", b);
            }
        }, l = e, c(k, l);
    }
    return d(g, a), g;
}(f.default.component);

exports.default = l;