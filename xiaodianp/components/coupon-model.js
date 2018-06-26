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

var e = require("./../npm/wepy/lib/wepy.js"), f = a(e), g = require("./../common/global.js"), h = a(g), i = require("./../common/api.js"), j = function(a) {
    function g() {
        var a, d, e, h;
        b(this, g);
        for (var j = arguments.length, k = Array(j), l = 0; l < j; l++) k[l] = arguments[l];
        return d = e = c(this, (a = g.__proto__ || Object.getPrototypeOf(g)).call.apply(a, [ this ].concat(k))), 
        e.props = {
            availableCouponList: {}
        }, e.methods = {
            clickGetCoupon: function() {
                var a = this, b = this, c = [];
                b.availableCouponList.forEach(function(a, b) {
                    c[b] = a.id;
                }), (0, i.seeGet)("/ng/couponv3/getAll", {
                    couponIds: c
                }, function(b) {
                    b.data.result ? (wx.showToast({
                        title: "领取成功",
                        icon: "success",
                        duration: 800
                    }), a.$emit("closeCouponModel-emit", !0)) : f.default.showModal({
                        title: "提示",
                        confirmColor: "#FE3B2E",
                        content: b.data.msg,
                        showCancel: !1
                    });
                });
            },
            closeModel: function() {
                this.$emit("closeCouponModel-emit", !0);
            },
            handleTap2: function() {}
        }, h = d, c(e, h);
    }
    return d(g, a), g;
}(f.default.component);

exports.default = j;