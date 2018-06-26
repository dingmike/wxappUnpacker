function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a) {
    return function() {
        var b = a.apply(this, arguments);
        return new Promise(function(c, d) {
            function a(e, f) {
                try {
                    var g = b[e](f), h = g.value;
                } catch (a) {
                    return void d(a);
                }
                return g.done ? void c(h) : Promise.resolve(h).then(function(b) {
                    a("next", b);
                }, function(b) {
                    a("throw", b);
                });
            }
            return a("next");
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
    function b(b, c) {
        for (var d, f = 0; f < c.length; f++) d = c[f], d.enumerable = d.enumerable || !1, 
        d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(b, d.key, d);
    }
    return function(c, d, a) {
        return d && b(c.prototype, d), a && b(c, a), c;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), j = require("./../common/api.js"), i = require("./../common/global.js"), k = a(i), l = require("./../common/da.js"), m = a(l), n = require("./../components/coupon-model.js"), p = a(n), o = require("./../components/mixins.js"), q = a(o), r = function(a) {
    function s() {
        var b, e, f, a;
        c(this, s);
        for (var g = arguments.length, i = Array(g), j = 0; j < g; j++) i[j] = arguments[j];
        return e = f = d(this, (b = s.__proto__ || Object.getPrototypeOf(s)).call.apply(b, [ this ].concat(i))), 
        f.config = {
            backgroundColor: "#ffffff",
            enablePullDownRefresh: !0,
            usingComponents: {
                "wxc-countdown": "../../packages/@minui/wxc-countdown/dist/index"
            }
        }, f.data = {
            items: [],
            headBanner: [],
            categoryList: [],
            availableCouponList: [],
            kolInfo: {},
            toView: "",
            isShow: !1,
            isFixed: !1,
            windowHeight: wx.getSystemInfoSync().windowHeight,
            showFoot: !0,
            autoLoadNormalData: !1
        }, f.$repeat = {}, f.$props = {
            couponModel: {
                "xmlns:v-bind": "",
                "v-bind:availableCouponList.sync": "availableCouponList"
            },
            mixins: {
                "v-bind:items.sync": "items"
            }
        }, f.$events = {}, f.components = {
            couponModel: p.default,
            mixins: q.default
        }, f.events = {
            "closeCouponModel-emit": function(a) {
                a ? (f.availableCouponList = [], f.$apply()) : f.getData(!1);
            },
            "finishNormalData-emit": function(a) {
                f.showFoot = a, f.$apply();
            },
            "lotteryGroup-emit": function() {
                f.getData(!1);
            },
            "tabClick-emit": function(b, c, d) {
                f.toView = b, f.showFoot = c, f.isFixed = d, f.$apply();
            }
        }, f.methods = {
            scroll: function(a) {
                this.autoLoadNormalData && this.getAllRects(a.detail.scrollTop);
            },
            toSearchPage: function() {
                h.default.navigateTo({
                    url: "search"
                });
            },
            loadMore: function(a) {
                this.autoLoadNormalData && k.default.advoiceTapTwice(a) && (this.showFoot || this.$broadcast("normalLoadMore-broadcast"));
            },
            bigBannerClick: function(a) {
                k.default.advoiceTapTwice(a) && (m.default.report(164, 11, "-1", "", "", k.default.getFid()), 
                h.default.navigateTo({
                    url: this.headBanner[0].linkUrl + "&from=banner"
                }));
            }
        }, a = e, d(f, a);
    }
    return f(s, a), g(s, [ {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(c) {
                var d, a;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return k.default.initAppOpenInfo(), b.next = 3, (0, j.init)();

                      case 3:
                        d = this, a = c.f_id || k.default.getFid(), a && k.default.setShareFid(a, k.default.config.is_share || 0), 
                        c.id && (k.default.setCollectionId(c.id), k.default.config.collection_dev = k.default.config.collection_pro = c.id, 
                        k.default.config.default_mall_id = c.id), this.getData(!0);

                      case 8:
                      case "end":
                        return b.stop();
                    }
                }, b, this);
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
                        this.getData(!1), wx.stopPullDownRefresh();

                      case 2:
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
        key: "getData",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(c) {
                var d, a, f, g, h = this;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return d = {
                            deviceType: k.default.config.device_type,
                            fId: k.default.getFid(),
                            mock: 0
                        }, k.default.getFid() && (a = k.default.getFid().split(","), k.default.config.is_share || 10 != a.length || (a.pop(), 
                        k.default.setFid(a.toString(), !0))), 0 == k.default.config.default_mall_id && (k.default.config.default_mall_id = k.default.getCollectionId()), 
                        b.next = 5, (0, j.seeGet)("ng/module/getAll", d);

                      case 5:
                        f = b.sent, f.data && (g = !0, f.data.forEach(function(a, b) {
                            1 == a.type ? (h.kolInfo = a.data, h.headBanner = a.data.links) : 12 == a.type ? (h.showFoot = 7 >= a.data[0].itemVOList.length || a.data[0].itemVOList.length == a.data[0].total, 
                            h.autoLoadNormalData = b + 1 === f.data.length, h.categoryList = a.data) : 30 == a.type ? h.availableCouponList = a.data : 34 == a.type || 32 == a.type ? a.data.map(function(a) {
                                return a.hasOwnProperty("widthHeight") && "" != a.widthHeight ? (a.widthHeight = a.widthHeight.split(",") || [], 
                                a.width = parseInt(416 * a.widthHeight[0] / a.widthHeight[1])) : a.width = 706, 
                                a;
                            }) : 31 == a.type ? (a.data.forEach(function(a) {
                                if (!a.receiveFlag) return void (g = !1);
                            }), g && (f.data[b].data = [])) : 33 == a.type && (1 == a.data.length ? a.column = 1 : a.column = 2);
                        })), this.items = f.data, this.isShow = !0, this.setUpDefaultData(), this.$apply(), 
                        c && m.default.report(164, 101, "-1", "", "", k.default.getFid());

                      case 12:
                      case "end":
                        return b.stop();
                    }
                }, b, this);
            }));
            return a;
        }()
    }, {
        key: "setUpDefaultData",
        value: function() {
            h.default.setNavigationBarTitle({
                title: this.kolInfo.titleList ? this.kolInfo.titleList.homePageTitle : "小电铺"
            }), this.kolInfo.titleList && (k.default.config.shareTitle = this.kolInfo.titleList.shareTitle), 
            this.availableCouponList && this.availableCouponList.length && m.default.report(164, 12, "-1", "", "", k.default.getFid()), 
            this.$broadcast("couponList-broadcast");
        }
    }, {
        key: "onShareAppMessage",
        value: function() {
            return {
                title: k.default.config.share_title,
                path: "/pages/mall?f_id=" + k.default.getFid() + "&id=" + k.default.config.default_mall_id + "&is_share=" + k.default.config.is_share
            };
        }
    }, {
        key: "getAllRects",
        value: function() {
            var b = this, c = wx.createSelectorQuery();
            1 < this.categoryList.length && c.select(".nav-link").boundingClientRect(function(a) {
                0 > a.top ? b.normalNavBarFixed() : b.normalNavBarRelative();
            }).exec();
        }
    }, {
        key: "normalNavBarFixed",
        value: function() {
            this.isFixed && (this.$broadcast("normalNavBarFixed-broadcast"), this.isFixed = !1, 
            this.$apply());
        }
    }, {
        key: "normalNavBarRelative",
        value: function() {
            this.isFixed || (this.$broadcast("normalNavBarRelative-broadcast"), this.isFixed = !0, 
            this.$apply());
        }
    }, {
        key: "onUnload",
        value: function() {
            this.global = {}, this.categoryList = [], this.availableCouponList = [], this.shopUrlList = [], 
            this.kolInfo = {}, this.toView = "", this.isShow = !1, this.isFixed = !1, this.showFoot = !0;
        }
    } ]), s;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(r, "pages/mall"));