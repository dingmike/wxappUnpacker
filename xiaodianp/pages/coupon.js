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
});

var g = function() {
    function a(a, b) {
        for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
        c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), j = require("./../common/api.js"), i = require("./../common/global.js"), k = a(i), l = function(a) {
    function l() {
        var b, e, f, g;
        c(this, l);
        for (var j = arguments.length, i = Array(j), a = 0; a < j; a++) i[a] = arguments[a];
        return e = f = d(this, (b = l.__proto__ || Object.getPrototypeOf(l)).call.apply(b, [ this ].concat(i))), 
        f.config = {
            navigationBarTitleText: "优惠券",
            backgroundColor: "#f4f4f4"
        }, f.data = {
            navTab: [ "未使用", "已过期", "已使用" ],
            type: 0,
            listCoupon: [],
            is_getting: !0,
            is_choice: 0,
            choice_id: 0,
            skuBuyInfoList: []
        }, f.methods = {
            clickCoupon: function(a) {
                var b = this;
                if (0 != b.is_choice && 0 == b.type && a.currentTarget.dataset.available) {
                    if (k.default.config.coupon_id == a.currentTarget.dataset.id) return k.default.config.coupon_id = 0, 
                    this.choice_id = 0, void h.default.navigateBack();
                    var c = a.currentTarget.dataset.id;
                    this.choice_id = k.default.config.coupon_id = c, k.default.config.coupon_denomination = a.currentTarget.dataset.denomination, 
                    k.default.config.coupon_limitMoney = a.currentTarget.dataset.limitmoney, h.default.navigateBack();
                }
            },
            switchTab: function(a) {
                var b = this;
                b.type = a.currentTarget.dataset.idx, b.refresh();
            }
        }, g = e, d(f, g);
    }
    return f(l, a), g(l, [ {
        key: "onUnload",
        value: function() {
            this.type = 0, this.listCoupon = [], this.is_getting = !0, this.is_choice = 0, this.choice_id = 0, 
            this.skuBuyInfoList = [];
        }
    }, {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function a(b) {
                var c;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        c = this, c.is_choice = b.is_choice || 1, c.skuBuyInfoList = b.skuBuyInfoList, c.choice_id = b.coupon_id, 
                        c.refresh();

                      case 5:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return a;
        }()
    }, {
        key: "onPullDownRefresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        ({
                            device_type: k.default.config.device_type
                        });
                        try {
                            this.refresh(), this.$apply(), h.default.showToast({
                                title: "刷新成功",
                                icon: "success",
                                duration: 800
                            });
                        } catch (a) {
                            console.error(a.stack);
                        }
                        h.default.hideNavigationBarLoading(), h.default.stopPullDownRefresh();

                      case 4:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    }, {
        key: "refresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                var b, c, d, f, g;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (b = this, b.is_getting = !0, b.listCoupon = [], a.prev = 3, 1 != b.is_choice || 0 != b.type) {
                            a.next = 11;
                            break;
                        }
                        return a.next = 7, (0, j.seePost)("/ng/couponv3/ordering/unused", {
                            skuBuyInfoList: b.skuBuyInfoList,
                            deviceType: k.default.config.device_type
                        });

                      case 7:
                        c = a.sent, c && (b.listCoupon = c.data.couponV3VOList), a.next = 17;
                        break;

                      case 11:
                        return d = b.chooseCouponUrl(), f = {
                            deviceType: k.default.config.device_type
                        }, a.next = 15, (0, j.seeGet)(d, f);

                      case 15:
                        g = a.sent, g && (b.listCoupon = g.data.list);

                      case 17:
                        a.next = 21;
                        break;

                      case 19:
                        a.prev = 19, a.t0 = a.catch(3);

                      case 21:
                        b.is_getting = !1, b.$apply();

                      case 23:
                      case "end":
                        return a.stop();
                    }
                }, a, this, [ [ 3, 19 ] ]);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    }, {
        key: "chooseCouponUrl",
        value: function() {
            switch (this.type) {
              case 0:
                return "/ng/couponv3/unused";

              case 1:
                return "/ng/couponv3/expired";

              case 2:
                return "/ng/couponv3/used";
            }
            return "";
        }
    }, {
        key: "onShareAppMessage",
        value: function() {
            return k.default.getShareDefault();
        }
    } ]), l;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(l, "pages/coupon"));