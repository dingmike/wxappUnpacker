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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), i = require("./../common/api.js"), j = require("./../common/global.js"), k = a(j), l = require("./../common/da.js"), m = a(l), n = require("./../components/recommend.js"), p = a(n), o = require("./../components/normal.js"), q = a(o), r = require("./../components/sku-select.js"), s = a(r), t = require("./../components/simTabBar.js"), u = a(t), v = function(a) {
    function j() {
        var b, e, f, g;
        c(this, j);
        for (var a = arguments.length, m = Array(a), i = 0; i < a; i++) m[i] = arguments[i];
        return e = f = d(this, (b = j.__proto__ || Object.getPrototypeOf(j)).call.apply(b, [ this ].concat(m))), 
        f.config = {
            backgroundColor: "#ffffff"
        }, f.data = {
            global: {},
            collection_id: 0,
            collection_data: {
                collection_info: !1,
                list_item_normal: [],
                list_item_recommend: [],
                big_banner: {}
            },
            normalData: [],
            recommendData: {},
            isShow: !1,
            itemID: 0,
            isSelectedSKU: !1,
            windowHeight: wx.getSystemInfoSync().windowHeight,
            isScroll: !0,
            couponData: [],
            isphp: !0,
            isIpx: k.default.isIPhoneX
        }, f.$repeat = {}, f.$props = {
            recommend: {
                "xmlns:v-bind": "",
                "v-bind:recommendProduct.sync": "recommendData",
                "v-bind:isphp.once": "isphp"
            },
            normal: {
                "v-bind:normalData.sync": "normalData",
                "v-bind:isphp.once": "isphp"
            }
        }, f.$events = {}, f.components = {
            recommend: p.default,
            normal: q.default,
            simTabBar: u.default,
            skuSelect: s.default
        }, f.methods = {
            bigBannerClick: function(a) {
                k.default.advoiceTapTwice(a) && h.default.navigateTo({
                    url: a.currentTarget.dataset.url
                });
            }
        }, g = e, d(f, g);
    }
    return f(j, a), g(j, [ {
        key: "onUnload",
        value: function() {
            this.collection_id = 0, this.collection_data = {
                collection_info: !1,
                list_item_normal: [],
                list_item_recommend: []
            }, this.normalData = [], this.recommendData = {}, this.isShow = !1, this.isSelectedSKU = !1, 
            this.isScroll = !0, this.couponData = [], this.isphp = !0;
        }
    }, {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(c) {
                var d, f, g;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (this.global = k.default, k.default.initAppOpenInfo(), !(d = wx.getStorageSync("Xcx-Token"))) {
                            a.next = 7;
                            break;
                        }
                        (0, i.init)(), a.next = 9;
                        break;

                      case 7:
                        return a.next = 9, (0, i.init)();

                      case 9:
                        f = c.f_id || k.default.getFid(), f && "banner" != c.from && k.default.setShareFid(f, k.default.config.is_share || 0), 
                        g = this, g.collection_id = c.id || 0, 0 < g.collection_id && k.default.setCollectionId(g.collection_id), 
                        g.collection_id = k.default.getCollectionId(), k.default.config.collection_dev = k.default.config.collection_pro = g.collection_id, 
                        this.getData(!0);

                      case 17:
                      case "end":
                        return a.stop();
                    }
                }, b, this);
            }));
            return a;
        }()
    }, {
        key: "getData",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(c) {
                var d, f, g, a;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return d = this, f = {
                            device_type: k.default.config.device_type
                        }, b.next = 4, (0, i.seePost)("collection/getCollection?id=" + d.collection_id, f);

                      case 4:
                        g = b.sent, g && (a = g.data.coupon_list.length, d.collection_data = g.data, d.normalData = g.data.list_item_normal, 
                        d.recommendData = {
                            title: "爆款商品",
                            item_list: g.data.list_item_recommend
                        }, d.isShow = !0, h.default.setNavigationBarTitle({
                            title: d.collection_data.xiaochengxu.title
                        }), d.$apply()), c && m.default.report(164, 101, k.default.getCollectionId(), "", "", k.default.getFid());

                      case 7:
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
                var b;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        b = this;
                        try {
                            b.getData(!1), h.default.showToast({
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
        key: "onShareAppMessage",
        value: function() {
            var a = "";
            return this.collection_data.xiaochengxu.share_title && (a = this.collection_data.xiaochengxu.share_title), 
            {
                title: a,
                path: "/pages/collection?f_id=" + k.default.getFid() + "&id=" + k.default.getCollectionId() + "&is_share=" + k.default.config.is_share
            };
        }
    } ]), j;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(v, "pages/collection"));