function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a) {
    return function() {
        var b = a.apply(this, arguments);
        return new Promise(function(c, d) {
            function e(a, f) {
                try {
                    var g = b[a](f), h = g.value;
                } catch (a) {
                    return void d(a);
                }
                return g.done ? void c(h) : Promise.resolve(h).then(function(a) {
                    e("next", a);
                }, function(a) {
                    e("throw", a);
                });
            }
            return e("next");
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
        for (var d, a = 0; a < c.length; a++) d = c[a], d.enumerable = d.enumerable || !1, 
        d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(b, d.key, d);
    }
    return function(c, d, e) {
        return d && b(c.prototype, d), e && b(c, e), c;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), j = require("./../common/api.js"), i = require("./../common/global.js"), k = a(i), l = require("./../common/wxParse/wxParse.js"), m = a(l), n = require("./../common/da.js"), o = a(n), p = require("./../components/sku-select.js"), q = a(p), r = require("./../components/counter-down.js"), u = a(r), s = require("./../components/coupon-list.js"), v = a(s), t = function(a) {
    function l() {
        var b, e, f, a;
        c(this, l);
        for (var g = arguments.length, i = Array(g), p = 0; p < g; p++) i[p] = arguments[p];
        return e = f = d(this, (b = l.__proto__ || Object.getPrototypeOf(l)).call.apply(b, [ this ].concat(i))), 
        f.config = {
            navigationBarTitleText: "商品详情",
            enablePullDownRefresh: !1,
            backgroundColor: "#ffffff"
        }, f.$repeat = {}, f.$props = {
            skuSelect: {
                "xmlns:v-bind": "",
                "v-bind:itemId.sync": "item_id"
            },
            counterDown: {
                "xmlns:v-bind": "",
                "v-bind:time.sync": "time"
            },
            CouponList: {
                "v-bind:couponList.sync": "couponData",
                "v-bind:moduleId.sync": "moduleId"
            }
        }, f.$events = {}, f.components = {
            skuSelect: q.default,
            counterDown: u.default,
            CouponList: v.default
        }, f.data = {
            item_id: 0,
            pay_disabled: !1,
            pay_status_str: "立即购买",
            userInfo: {},
            item: {},
            props: [],
            is_getting: !0,
            isSelectedSKU: !1,
            isScroll: !0,
            time: 0,
            windowHeight: wx.getSystemInfoSync().windowHeight,
            serviceData: {
                is_zhuiyi: 1
            },
            tabbarChoose: !0,
            animationShadow: {},
            animationData: {},
            isIpx: k.default.isIPhoneX,
            couponData: [],
            moduleId: 0,
            showCoupon: !1
        }, f.methods = {
            wxParseImgLoad: function() {
                m.default.wxParseImgLoad.bind(this);
            },
            wxParseImgTap: function() {
                m.default.wxParseImgTap.bind(this);
            },
            tabbarChoose: function() {
                this.tabbarChoose = !this.tabbarChoose, this.$apply();
            },
            goToBuyIt: function() {
                this.item.id ? (k.default.addStartAnimation(this), this.isScroll = !1, this.item.activity && "seckill" === this.item.activity.type ? this.$broadcast("sku-broadcast", this.item.id, this.item.activity.id, 1, !1, 2) : this.$broadcast("sku-broadcast", this.item.id, 0, 0, !1, 0)) : console.log("没有获取itemID");
            },
            goToAddCart: function() {
                this.item.id ? (k.default.addStartAnimation(this), this.isScroll = !1, this.item.activity && "seckill" === this.item.activity.type ? this.$broadcast("sku-broadcast", this.item.id, this.item.activity.id, 1, !0, 2) : this.$broadcast("sku-broadcast", this.item.id, 0, 0, !0, 0)) : console.log("没有获取itemID");
            },
            gotoCollection: function() {
                h.default.switchTab({
                    url: "collection"
                });
            },
            goToActivity: function() {
                h.default.redirectTo({
                    url: "activity?ex_id=" + this.item.expressId + "&seller_id=" + this.item.sellerId
                });
            },
            gotoContact: function() {
                if (!this.serviceData.is_zhuiyi) {
                    var a = this.serviceData.qrc_img ? JSON.stringify(this.serviceData) : "";
                    h.default.navigateTo({
                        url: "service?str_service_config=" + a
                    });
                }
            },
            closeSku: function() {
                var a = this;
                k.default.addEndAnimation(this), setTimeout(function() {
                    a.isSelectedSKU = !1, a.isScroll = !0, a.$apply();
                }, 400);
            },
            setRemind: function(b, c, d, f) {
                if (b) console.log("已提醒"); else {
                    var a = {
                        activityType: c,
                        activityId: d,
                        formId: f.detail.formId
                    };
                    this.item.activity.remind = !b, o.default.report(131, 124, this.item_id, "", "", k.default.getFid()), 
                    (0, j.seePost)("ng/reminder/open-activity-reminder", a, function(a) {
                        wx.showToast({
                            title: a.data.data,
                            icon: "none"
                        });
                    });
                }
            },
            switchToCart: function() {
                o.default.report(131, 7, this.item_id, "", "", k.default.getFid()), wx.switchTab({
                    url: "/pages/cart"
                });
            }
        }, f.events = {
            "cart-emit": function(a) {
                f.isScroll = !a, f.isSelectedSKU = a;
            },
            "closeCounterDown-emit": function() {
                f.$broadcast("closeCounterDown-broadcast"), f.item.activity && (0 == f.item.activity.status ? (f.item.activity.status = 1, 
                f.time = f.item.activity.surplusTime - f.item.activity.surplusTimeToStart, f.$apply(), 
                f.$broadcast("startCounterDown-broadcast")) : f.refresh());
            }
        }, a = e, d(f, a);
    }
    return f(l, a), g(l, [ {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(c) {
                var d, e;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (k.default.initAppOpenInfo(), !(d = wx.getStorageSync("Xcx-Token"))) {
                            a.next = 6;
                            break;
                        }
                        (0, j.init)(), a.next = 8;
                        break;

                      case 6:
                        return a.next = 8, (0, j.init)();

                      case 8:
                        this.isSelectedSKU = !1, e = c.f_id || k.default.getFid(), e && k.default.setShareFid(e, k.default.config.is_share || 0), 
                        c.id && 0 < c.id && k.default.setCollectionId(c.id), this.item_id = c.item_id, this.refresh();

                      case 14:
                      case "end":
                        return a.stop();
                    }
                }, b, this);
            }));
            return a;
        }()
    }, {
        key: "refresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.next = 2, Promise.all([ this.loadItemInfo(), this.loadServiceData(), this.loadCouponInfo() ]);

                      case 2:
                        this.checkCoupon(), this.is_getting = !1, this.$broadcast("startCounterDown-broadcast", this.time), 
                        h.default.setNavigationBarTitle({
                            title: this.item.name
                        }), this.$apply(), this.$broadcast("couponList-broadcast"), this.item.activity ? o.default.report(131, 101, this.item_id, 0, this.item.activity.id, k.default.getFid()) : o.default.report(131, 101, this.item_id, "", "", k.default.getFid());

                      case 9:
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
        key: "checkCoupon",
        value: function() {
            var a = !1;
            this.couponData.every(function(b) {
                return !!b.receiveFlag || (a = !0, !1);
            }), this.showCoupon = this.item.activity ? a && 0 < this.item.activity.surplusTimeToStart : a;
        }
    }, {
        key: "loadItemInfo",
        value: function() {
            var a = b(regeneratorRuntime.mark(function b() {
                var c, d, e, a, f;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return b.next = 2, (0, j.seeGet)("ng/product/detail", {
                            deviceType: k.default.getDeviceType(),
                            is_from_kol: 1,
                            productId: this.item_id,
                            f_id: k.default.getFid()
                        });

                      case 2:
                        if (c = b.sent, d = c.data, e = c.result) {
                            for (a in this.item = d, this.item.price = (0, j.currencyFormat)(this.item.price), 
                            this.item.oriPrice = (0, j.currencyFormat)(this.item.oriPrice), null != this.item.desc.match(/<img/) && (this.item.imageUrls = []), 
                            this.props = [ {
                                name: "品牌",
                                value: this.item.brandName || ""
                            }, {
                                name: "物流公司",
                                value: this.item.transportName || ""
                            }, {
                                name: "预计发货时长",
                                value: this.item.sendDaysMin + "~" + this.item.sendDaysMax + "个工作日"
                            }, {
                                name: "预计到货时长",
                                value: this.item.receiveDaysMin + "~" + this.item.receiveDaysMax + "个工作日"
                            } ], this.item.attrs) f = {
                                name: a,
                                value: this.item.attrs[a].toString()
                            }, this.props.push(f);
                            m.default.wxParse("article", "html", this.item.desc, this, 5), this.pay_status_str = "立即购买", 
                            this.item.activity ? 1 == this.item.activity.status ? (this.time = this.item.activity.surplusTime, 
                            0 == this.item.activity.surplus ? (this.pay_status_str = "已售罄", this.pay_disabled = !0) : this.pay_status_str = "马上抢") : 0 == this.item.activity.status ? (this.time = this.item.activity.surplusTimeToStart, 
                            this.item.activity.startTime = new Date(this.item.activity.startTime.replace(/-/g, "/")).format("MM月dd日 hh:mm")) : 3 == this.item.activity.status && (this.time = this.item.activity.surplusTime, 
                            this.pay_status_str = "已售罄", this.pay_disabled = !0) : 1 == this.item.status ? (this.pay_status_str = "已下架", 
                            this.pay_disabled = !0) : 2 == this.item.status && (this.pay_status_str = "已售罄", 
                            this.pay_disabled = !0);
                        }

                      case 6:
                      case "end":
                        return b.stop();
                    }
                }, b, this);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    }, {
        key: "loadCouponInfo",
        value: function() {
            var a = b(regeneratorRuntime.mark(function b() {
                var c, d, e;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.next = 2, (0, j.seeGet)("ng/module/couponList", {
                            deviceType: k.default.getDeviceType()
                        });

                      case 2:
                        c = a.sent, d = c.data, e = c.result, e && (this.couponData = d[0].data, this.moduleId = d[0].id);

                      case 6:
                      case "end":
                        return a.stop();
                    }
                }, b, this);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    }, {
        key: "loadServiceData",
        value: function() {
            var a = b(regeneratorRuntime.mark(function b() {
                var c, d, e;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.next = 2, (0, j.seeGet)("info/getXcxConfig");

                      case 2:
                        c = a.sent, d = c.data, e = c.result, e ? this.serviceData = d : this.serviceData.is_zhuiyi = 1;

                      case 6:
                      case "end":
                        return a.stop();
                    }
                }, b, this);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    }, {
        key: "onShareAppMessage",
        value: function() {
            return {
                title: this.item.activity ? "【惊喜秒杀】" + this.item.name : this.item.name,
                path: "/pages/commodity?item_id=" + this.item_id + "&f_id=" + k.default.getFid() + "&id=" + k.default.getCollectionId() + "&is_share=" + k.default.config.is_share,
                imageUrl: this.item.mainImageUrls[0] + "?imageView2/5/w/430/h/336/q/70"
            };
        }
    }, {
        key: "onUnload",
        value: function() {
            this.props.length = 0, this.item = {}, this.pay_disabled = !1, this.pay_status_str = "立即购买", 
            this.is_getting = !0, this.isSelectedSKU = !1, this.userInfo = {}, this.item_id = 0, 
            this.isScroll = !0, this.isSelectedSKU = !1, this.time = 0, this.$broadcast("closeCounterDown-broadcast"), 
            this.serviceData = {}, this.tabbarChoose = !0, this.couponData = [], this.moduleId = 0, 
            this.showCoupon = !1;
        }
    } ]), l;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(t, "pages/commodity"));