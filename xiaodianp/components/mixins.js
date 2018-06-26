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

var g = function() {
    function a(a, b) {
        for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
        c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), i = require("./coupon-list.js"), j = a(i), k = require("./lottery-group.js"), l = a(k), m = require("./group-list.js"), p = a(m), n = require("./seckill-list.js"), q = a(n), o = require("./banner.js"), u = a(o), r = require("./swiper.js"), v = a(r), s = require("./normal.js"), w = a(s), t = require("./recommend.js"), x = a(t), y = require("./../common/api.js"), z = require("./../common/global.js"), A = a(z), B = function(a) {
    function k() {
        var b, e, f, g;
        c(this, k);
        for (var h = arguments.length, i = Array(h), a = 0; a < h; a++) i[a] = arguments[a];
        return e = f = d(this, (b = k.__proto__ || Object.getPrototypeOf(k)).call.apply(b, [ this ].concat(i))), 
        f.$repeat = {
            items: {
                com: "normal",
                props: "recommendProduct.sync"
            }
        }, f.$props = {
            swiperBanner: {
                "xmlns:wx": {
                    value: "",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                },
                "xmlns:v-bind": {
                    value: "",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                },
                "v-bind:actBannerList.sync": {
                    value: "item.data",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                }
            },
            banner: {
                "v-bind:banner.sync": {
                    value: "item.data",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                }
            },
            coupon: {
                "v-bind:couponList.sync": {
                    value: "item.data",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                },
                "v-bind:moduleId.sync": {
                    value: "item.id",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                }
            },
            lotteryGroup: {
                "v-bind:groupData.sync": {
                    value: "item",
                    type: "item",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                },
                "v-bind:moduleId.sync": {
                    value: "item.id",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                }
            },
            commonGroup: {
                "v-bind:groupData.sync": {
                    value: "item",
                    type: "item",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                }
            },
            seckill: {
                "v-bind:seckillData.sync": {
                    value: "item",
                    type: "item",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                },
                "v-bind:moduleId.sync": {
                    value: "item.id",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                },
                "v-bind:column.sync": {
                    value: "item.column",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                }
            },
            recommend: {
                "v-bind:recommendProduct.sync": {
                    value: "item",
                    type: "item",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                }
            },
            normal: {
                "v-bind:categoryList.sync": {
                    value: "categoryList",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                },
                "v-bind:autoLoadNormalData.once": {
                    value: "autoLoadNormalData",
                    for: "items",
                    item: "item",
                    index: "index",
                    key: "index"
                }
            }
        }, f.$events = {}, f.components = {
            swiperBanner: v.default,
            banner: u.default,
            coupon: j.default,
            lotteryGroup: l.default,
            superGroup: p.default,
            commonGroup: p.default,
            seckill: q.default,
            recommend: x.default,
            normal: w.default
        }, f.props = {
            items: {}
        }, f.events = {
            "refreshCouponList-emit": function() {
                f.refreshCouponList(0 >= arguments.length ? void 0 : arguments[0], 1 >= arguments.length ? void 0 : arguments[1]);
            },
            "refreshSeckillList-emit": function() {
                f.refreshSeckillList(0 >= arguments.length ? void 0 : arguments[0]);
            }
        }, f.watch = {
            items: function(a) {
                var b = this, c = new RegExp(/^\d{4}-((0?[1-9])|(1[0-2]))-((0?[1-9])|([12]\d)|(3[01])) (([01]?\d)|(2[0-3])):[0-5]\d:[0-5]\d$/);
                this.items.forEach(function(d, e) {
                    12 == d.type ? (b.categoryList = d.data, b.autoLoadNormalData = e + 1 === a.length) : 33 == d.type && d.data.map(function(a) {
                        return a.startTime = c.test(a.startTime) ? new Date(a.startTime.replace(/-/g, "/")).format("MM月dd日hh:mm") : a.startTime, 
                        d;
                    });
                }), this.$apply();
            }
        }, f.data = {
            categoryList: [],
            autoLoadNormalData: !1
        }, g = e, d(f, g);
    }
    return f(k, a), g(k, [ {
        key: "refreshCouponList",
        value: function(a, b) {
            var c = this;
            (0, y.seeGet)("ng/couponv3/get", {
                couponId: a
            }, function(a) {
                a.data.result ? (c.refresh(b, 31), h.default.showToast({
                    title: "领取成功",
                    icon: "success",
                    duration: 800
                })) : h.default.showModal({
                    title: "提示",
                    confirmColor: "#FE3B2E",
                    content: a.data.msg,
                    showCancel: !1
                });
            });
        }
    }, {
        key: "refreshSeckillList",
        value: function(a) {
            this.refresh(a, 33);
        }
    }, {
        key: "refresh",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function a(b, c) {
                var d, f, g = this;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return d = {
                            deviceType: A.default.config.device_type,
                            fId: A.default.getFid(),
                            mock: 0,
                            moduleId: b,
                            type: c
                        }, a.next = 3, (0, y.seeGet)("ng/module/get", d);

                      case 3:
                        f = a.sent, f.data && (this.items.forEach(function(a, d) {
                            a.id === b && a.type === c && (g.items[d] = f.data[0]);
                        }), this.$apply());

                      case 5:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return a;
        }()
    } ]), k;
}(h.default.component);

exports.default = B;