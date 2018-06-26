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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), j = require("./../common/api.js"), i = require("./../common/global.js"), k = a(i), l = require("./../common/da.js"), m = a(l), n = require("./../components/sku-select.js"), p = a(n), o = require("./../components/wepy-com-toast.js"), q = a(o), r = function(a) {
    function l() {
        var e, f, g, r;
        c(this, l);
        for (var a = arguments.length, i = Array(a), o = 0; o < a; o++) i[o] = arguments[o];
        return f = g = d(this, (e = l.__proto__ || Object.getPrototypeOf(l)).call.apply(e, [ this ].concat(i))), 
        g.config = {
            navigationBarTitleText: "我的购物车",
            backgroundColor: "#f4f4f4"
        }, g.$repeat = {}, g.$props = {
            skuSelect: {
                "xmlns:v-bind": "",
                "v-bind:itemId.sync": "itemId"
            }
        }, g.$events = {}, g.components = {
            skuSelect: p.default,
            toast: q.default
        }, g.data = {
            isAllChoice: !1,
            total_fee: 0,
            count_choice: 0,
            isShow: !1,
            list_normal: [],
            list_expried: [],
            is_getting: !0,
            delBtnWidth: 100,
            isSelectedSKU: !1,
            itemId: 0,
            delItemIndex: -1,
            timeData: [],
            timeInterval: !1,
            animationShadow: {},
            animationData: {}
        }, g.events = {
            "cart-emit": function(a) {
                g.isSelectedSKU = a, a || (g.counterDown(!1), g.refresh());
            }
        }, g.methods = {
            radioChange: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function b(c, d) {
                    var e, f, a;
                    return regeneratorRuntime.wrap(function(b) {
                        for (;;) switch (b.prev = b.next) {
                          case 0:
                            return e = this, f = {
                                check_type: parseInt(d.check_type) ? 0 : 1,
                                sku_id: d.sku_id
                            }, e.list_normal[c].list_item.forEach(function(b, f) {
                                b.sku_id == d.sku_id && ("0" == b.check_type ? e.list_normal[c].list_item[f].check_type = 1 : e.list_normal[c].list_item[f].check_type = 0);
                            }), e.refreshChoice(), e.checkActivityRadio(c), b.next = 7, (0, j.seePost)("shop_cartv2/selectOrCancelSimgleSku", f);

                          case 7:
                            a = b.sent, a.data && (e.list_normal = e.setUpData(a.data.list_normal), e.list_expried = e.setUpData(a.data.list_expried), 
                            e.$apply());

                          case 9:
                          case "end":
                            return b.stop();
                        }
                    }, b, this);
                }));
                return a;
            }(),
            activityRadioChange: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function b(c, d) {
                    var e, f, g, h;
                    return regeneratorRuntime.wrap(function(b) {
                        for (;;) switch (b.prev = b.next) {
                          case 0:
                            return e = this, f = "", e.list_normal[c].act_info.check_type = d ? 0 : 1, 1 == d ? e.list_normal[c].list_item.forEach(function(b) {
                                b && (b.check_type = 0, f += b.sku_id + ","), g = {
                                    sku_id: f,
                                    check_type: 0
                                };
                            }) : e.list_normal[c].list_item.forEach(function(b) {
                                b && (b.check_type = 1, f += b.sku_id + ","), g = {
                                    sku_id: f,
                                    check_type: 1
                                };
                            }), e.refreshChoice(), b.next = 7, (0, j.seePost)("shop_cartv2/selectOrCancelSimgleSku", g);

                          case 7:
                            h = b.sent, h.data && (e.list_normal = e.setUpData(h.data.list_normal), e.list_expried = e.setUpData(h.data.list_expried), 
                            e.$apply());

                          case 9:
                          case "end":
                            return b.stop();
                        }
                    }, b, this);
                }));
                return a;
            }(),
            radioChangeAll: function() {
                var a = b(regeneratorRuntime.mark(function a() {
                    var b, c, d;
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            return b = this, b.list_normal.forEach(function(a) {
                                a.act_info.check_type = b.isAllChoice ? 0 : 1, a.list_item.forEach(function(a) {
                                    a.check_type = b.isAllChoice ? 0 : 1;
                                });
                            }), c = {
                                check_type: b.isAllChoice ? 0 : 1
                            }, b.$apply(), b.refreshChoice(), a.next = 7, (0, j.seePost)("shop_cartv2/selectOrCancelAllSku", c);

                          case 7:
                            d = a.sent, d.data && (b.list_normal = b.setUpData(d.data.list_normal), b.list_expried = b.setUpData(d.data.list_expried));

                          case 9:
                          case "end":
                            return a.stop();
                        }
                    }, a, this);
                }));
                return function() {
                    return a.apply(this, arguments);
                };
            }(),
            clickClear: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function a() {
                    var c;
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            c = this, h.default.showModal({
                                title: "提示",
                                confirmColor: "#ff5500",
                                content: "确定清空失效宝贝吗，宝贝可能还会补货噢"
                            }).then(function() {
                                var a = b(regeneratorRuntime.mark(function a(b) {
                                    var d;
                                    return regeneratorRuntime.wrap(function(a) {
                                        for (;;) switch (a.prev = a.next) {
                                          case 0:
                                            if (!b.confirm) {
                                                a.next = 5;
                                                break;
                                            }
                                            return a.next = 3, (0, j.seeGet)("shop_cartv2/clearInvalidSku", []);

                                          case 3:
                                            d = a.sent, d.data && (c.list_normal = c.setUpData(d.data.list_normal), c.list_expried = c.setUpData(d.data.list_expried), 
                                            c.refreshChoice(), c.$apply());

                                          case 5:
                                          case "end":
                                            return a.stop();
                                        }
                                    }, a, this);
                                }));
                                return function() {
                                    return a.apply(this, arguments);
                                };
                            }());

                          case 2:
                          case "end":
                            return a.stop();
                        }
                    }, a, this);
                }));
                return a;
            }(),
            del: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function a(c) {
                    var d;
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            d = this, h.default.showModal({
                                title: "提示",
                                confirmColor: "#ff5500",
                                content: "确认删除该商品？"
                            }).then(function() {
                                var a = b(regeneratorRuntime.mark(function b(f) {
                                    var g, a;
                                    return regeneratorRuntime.wrap(function(b) {
                                        for (;;) switch (b.prev = b.next) {
                                          case 0:
                                            if (!f.confirm) {
                                                b.next = 8;
                                                break;
                                            }
                                            return g = {
                                                sku_id: c
                                            }, b.next = 4, (0, j.seePost)("shop_cartv2/delFromShopCart", g);

                                          case 4:
                                            a = b.sent, a.data && (d.list_normal = d.setUpData(a.data.list_normal), d.list_expried = d.setUpData(a.data.list_expried), 
                                            d.refreshChoice(), d.$apply()), b.next = 9;
                                            break;

                                          case 8:
                                            d.cleanCancelMove(d);

                                          case 9:
                                          case "end":
                                            return b.stop();
                                        }
                                    }, b, this);
                                }));
                                return function() {
                                    return a.apply(this, arguments);
                                };
                            }()), m.default.report(165, 116, "-1", c, "", k.default.getFid());

                          case 3:
                          case "end":
                            return a.stop();
                        }
                    }, a, this);
                }));
                return a;
            }(),
            closeSku: function() {
                var a = this;
                k.default.addEndAnimation(this), setTimeout(function() {
                    a.isSelectedSKU = !1, a.$apply();
                }, 400);
            },
            clickCart: function(a) {
                var b = a.currentTarget.dataset.item, c = b.item_id;
                m.default.report(165, 302, "-1", c, "", k.default.getFid()), h.default.navigateTo({
                    url: "commodity?item_id=" + c
                });
            },
            goToActivity: function(a, b) {
                h.default.navigateTo({
                    url: "activity?ex_id=" + a + "&seller_id=" + b
                });
            },
            clickGoods: function(a) {
                var b = a.currentTarget.dataset.item;
                "0" == b.is_expire ? (m.default.report(165, 2, "-1", b.sku_id, "", k.default.getFid()), 
                b.item_id && (k.default.addStartAnimation(this), this.$broadcast("sku-broadcast", b.item_id, b.sku_id, b.buy_num, !0, 0))) : (m.default.report(165, 302, "-1", b.item_id, "", k.default.getFid()), 
                h.default.navigateTo({
                    url: "commodity?item_id=" + b.item_id
                }));
            },
            clickPay: function() {
                var a = this;
                if (1 > a.count_choice) wx.showToast({
                    title: "请选择商品",
                    duration: 2e3
                }); else {
                    var b = [];
                    a.list_normal.forEach(function(a) {
                        a.list_item.forEach(function(a) {
                            "1" == a.check_type && b.push({
                                sku_id: a.sku_id,
                                buy_num: a.buy_num,
                                f_id: a.f_id,
                                activity_type: a.activity_type,
                                activity_id: a.activity_id
                            });
                        });
                    }), h.default.setStorageSync("sku_list", b), m.default.report(165, 1, "-1", "", "", k.default.getFid()), 
                    h.default.navigateTo({
                        url: "pay?_=" + new Date().getTime()
                    });
                }
            },
            touchS: function(a) {
                this.cleanCancelMove(this), 1 == a.touches.length && (this.startX = a.touches[0].clientX);
            },
            touchM: function(b) {
                if (b.touches.length = 1) {
                    var c = b.changedTouches[0].clientX, d = this.startX - c, e = this.delBtnWidth, f = d > e / 2 ? "left:-" + e + "rpx" : "left:0px", a = b.currentTarget.dataset.cartindex, g = b.currentTarget.dataset.activityindex;
                    "1" == b.currentTarget.dataset.is_expire ? this.list_expried[g].list_item[a].txtStyle = f : this.list_normal[g].list_item[a].txtStyle = f, 
                    this.list_normal;
                }
            },
            getEleWidth: function(a) {
                try {
                    var b = wx.getSystemInfoSync().windowWidth;
                    return n(b / (375 / (a / 2)));
                } catch (a) {
                    return !1;
                }
            },
            initEleWidth: function() {
                var a = this.getEleWidth(this.data.delBtnWidth);
                this.setData({
                    delBtnWidth: a
                });
            }
        }, r = f, d(g, r);
    }
    var n = Math.floor;
    return f(l, a), g(l, [ {
        key: "onHide",
        value: function() {
            this.list_normal = [], this.list_expried = [], this.is_getting = !0, this.counterDown(!1);
        }
    }, {
        key: "onShow",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function a() {
                var b;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        b = this, m.default.report(165, 101, "-1", "", "", k.default.getFid()), b.refresh();

                      case 3:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return a;
        }()
    }, {
        key: "onRoute",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                var b, c;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return b = this, a.next = 3, (0, j.seeGet)("pay/getDefaultAddr");

                      case 3:
                        c = a.sent, c.data && (b.$preload("list", c), b.$apply());

                      case 5:
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
        key: "onUnload",
        value: function() {
            this.isAllChoice = !1, this.total_fee = 0, this.count_choice = 0, this.isShow = !1, 
            this.list_normal = [], this.list_expried = [], this.is_getting = !0, this.delBtnWidth = 100, 
            this.isSelectedSKU = !1, this.itemId = 0, this.delItemIndex = -1, this.timeData = [], 
            clearInterval(this.timeInterval);
        }
    }, {
        key: "onPullDownRefresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                var b;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (b = this, !b.isSelectedSKU) {
                            a.next = 5;
                            break;
                        }
                        return h.default.hideNavigationBarLoading(), h.default.stopPullDownRefresh(), a.abrupt("return");

                      case 5:
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
        key: "collectTotalGoods",
        value: function(a) {
            var b = [];
            return a.forEach(function(a) {
                a.list_item.forEach(function(a) {
                    a && b.push(a);
                });
            }), b;
        }
    }, {
        key: "refreshChoice",
        value: function() {
            var a = this;
            this.total_fee = 0, this.isAllChoice = !0, this.count_choice = 0, this.collectTotalGoods(this.list_normal).forEach(function(b) {
                1 == b.check_type && 0 == b.is_expire ? (a.count_choice++, a.total_fee = parseFloat(parseFloat(a.total_fee) + parseFloat(b.sku_price) * b.buy_num).toFixed(2)) : a.isAllChoice = !1;
            });
        }
    }, {
        key: "checkActivityRadio",
        value: function(a) {
            var b = this;
            if (void 0 != a) {
                var c = this.list_normal[a];
                this.list_normal[a].act_info.check_type = 1, c.list_item.forEach(function(c) {
                    1 != c.check_type && (b.list_normal[a].act_info.check_type = 0);
                });
            }
        }
    }, {
        key: "refresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                var b, c;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return b = this, b.is_getting = !0, a.next = 4, (0, j.seeGet)("shop_cartv2/getUserShopCart");

                      case 4:
                        c = a.sent, c.data && (b.list_normal = b.setUpData(c.data.list_normal), b.list_expried = b.setUpData(c.data.list_expried)), 
                        b.is_getting = !1, b.isShow = !0, b.refreshChoice(), b.counterDown(!0), b.$apply();

                      case 11:
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
        key: "setUpData",
        value: function(a) {
            return a.forEach(function(a) {
                a.list_item.forEach(function(a) {
                    a && (a.txtStyle = "", a.seckill_info.start_time && (a.seckill_info.start_time = new Date(a.seckill_info.start_time.replace(/-/g, "/")).format("MM月dd日 hh:mm")));
                });
            }), a;
        }
    }, {
        key: "cleanCancelMove",
        value: function(a) {
            a.list_expried.forEach(function(a) {
                a.list_item.forEach(function(a) {
                    a.txtStyle = "";
                });
            }), a.list_normal.forEach(function(a) {
                a.list_item.forEach(function(a) {
                    a.txtStyle = "";
                });
            }), a.$apply();
        }
    }, {
        key: "onShareAppMessage",
        value: function() {
            return k.default.getShareDefault();
        }
    }, {
        key: "counterDown",
        value: function(a) {
            var b = this;
            this.setUpTimeData(), a ? (clearInterval(this.timeInterval), this.timeData.length && (this.timeInterval = setInterval(function() {
                b.timeData.map(function(a) {
                    a.map(function(a) {
                        a.countDown--, 0 <= a.countDown ? (b.dateFormat(a), b.$apply()) : 2 == a.status && b.refresh();
                    });
                });
            }, 1e3))) : (clearInterval(this.timeInterval), this.timeData = []);
        }
    }, {
        key: "setUpTimeData",
        value: function() {
            var a = this;
            this.timeData = [], this.list_normal.forEach(function(b, c) {
                a.timeData[c] = [], b.list_item.forEach(function(b) {
                    var d = b.seckill_info.now_to_end_time, e = {
                        sku: b.sku_id,
                        status: b.seckill_info.status,
                        day: ("0" + n(d / 3600 / 24)).substr(-2),
                        hr: ("0" + n(d / 60 / 60 % 24)).substr(-2),
                        min: ("0" + n(d / 60 % 60)).substr(-2),
                        sec: ("0" + n(d % 60)).substr(-2),
                        countDown: d
                    };
                    a.timeData[c].push(e);
                });
            });
        }
    }, {
        key: "dateFormat",
        value: function(a) {
            a.day = ("0" + n(a.countDown / 3600 / 24)).substr(-2), a.hr = ("0" + n(a.countDown / 60 / 60 % 24)).substr(-2), 
            a.min = ("0" + n(a.countDown / 60 % 60)).substr(-2), a.sec = ("0" + n(a.countDown % 60)).substr(-2);
        }
    } ]), l;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(r, "pages/cart"));