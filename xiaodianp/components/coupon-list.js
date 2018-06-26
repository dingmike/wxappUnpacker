function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a) {
    return function() {
        var b = a.apply(this, arguments);
        return new Promise(function(c, a) {
            function d(e, f) {
                try {
                    var g = b[e](f), h = g.value;
                } catch (b) {
                    return void a(b);
                }
                return g.done ? void c(h) : Promise.resolve(h).then(function(a) {
                    d("next", a);
                }, function(a) {
                    d("throw", a);
                });
            }
            return d("next");
        });
    };
}

function c(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}

function d(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return b && ("object" == typeof b || "function" == typeof b) ? b : a;
}

function f(a, b) {
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

var e = require("./../npm/wepy/lib/wepy.js"), g = a(e), h = require("./../common/global.js"), i = a(h), j = require("./../common/api.js"), k = function(a) {
    function h() {
        var f, e, k, l;
        c(this, h);
        for (var m = arguments.length, i = Array(m), a = 0; a < m; a++) i[a] = arguments[a];
        return e = k = d(this, (f = h.__proto__ || Object.getPrototypeOf(h)).call.apply(f, [ this ].concat(i))), 
        k.props = {
            couponList: {},
            moduleId: {}
        }, k.events = {
            "couponList-broadcast": function() {
                k.$apply();
            }
        }, k.methods = {
            clickGetCoupon: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function a(b, c) {
                    var d, f, h;
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            if (1 != c.currentTarget.dataset.receiveflag) {
                                a.next = 3;
                                break;
                            }
                            return g.default.showToast({
                                title: "已领取，别太贪心哦！",
                                icon: "none",
                                duration: 800
                            }), a.abrupt("return");

                          case 3:
                            if (!this.couponList) {
                                a.next = 12;
                                break;
                            }
                            return a.next = 6, (0, j.seeGet)("ng/couponv3/get", {
                                couponId: c.currentTarget.dataset.id
                            });

                          case 6:
                            d = a.sent, f = d.data, h = d.result, h ? (g.default.showToast({
                                title: "领取成功",
                                icon: "success",
                                duration: 800
                            }), this.couponList.map(function(a) {
                                if (a.id == f.couponId) return a.receiveFlag = f.gettable ? 0 : 1, a;
                            }), this.$apply()) : g.default.showModal({
                                title: "提示",
                                confirmColor: "#FE3B2E",
                                content: f.msg,
                                showCancel: !1
                            }), a.next = 13;
                            break;

                          case 12:
                            this.$emit("refreshCouponList-emit", c.currentTarget.dataset.id, b);

                          case 13:
                          case "end":
                            return a.stop();
                        }
                    }, a, this);
                }));
                return a;
            }()
        }, l = e, d(k, l);
    }
    return f(h, a), h;
}(g.default.component);

exports.default = k;