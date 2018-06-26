function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a) {
    return function() {
        var b = a.apply(this, arguments);
        return new Promise(function(c, d) {
            function f(a, e) {
                try {
                    var g = b[a](e), h = g.value;
                } catch (a) {
                    return void d(a);
                }
                return g.done ? void c(h) : Promise.resolve(h).then(function(a) {
                    f("next", a);
                }, function(a) {
                    f("throw", a);
                });
            }
            return f("next");
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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), i = require("./../common/api.js"), j = require("./../common/global.js"), k = a(j), l = function(a) {
    function j() {
        var f, e, g, a;
        c(this, j);
        for (var l = arguments.length, m = Array(l), n = 0; n < l; n++) m[n] = arguments[n];
        return e = g = d(this, (f = j.__proto__ || Object.getPrototypeOf(j)).call.apply(f, [ this ].concat(m))), 
        g.config = {
            navigationBarTitleText: "订单详情",
            backgroundColor: "#f2f2f2"
        }, g.data = {
            order_id: "",
            order: {},
            m_time: !1,
            serviceData: {
                is_zhuiyi: 1
            }
        }, g.methods = {
            clickProduct: function(b) {
                if (3 != this.order.summary_info.order_type || 3 != this.order.summary_info.group_info.activity_status) {
                    var c = b.currentTarget.dataset.id, d = b.currentTarget.dataset.activitystatus, e = b.currentTarget.dataset.activityid, a = "commodity?item_id=" + c, f = "pages/commodity";
                    d && (a = 3 == d || 4 == d ? "commodity?item_id=" + c : "groupon?id=" + e, f = 3 == d || 4 == d ? "pages/commodity" : "pages/groupon");
                    var g, h = !1, j = getCurrentPages().length;
                    getCurrentPages().forEach(function(a, b) {
                        a.route == f && (h = !0, g = j - (b + 1));
                    }), h ? wx.navigateBack({
                        delta: g
                    }) : wx.redirectTo({
                        url: a
                    });
                }
            },
            gotoContact: function() {
                if (!this.serviceData.is_zhuiyi) {
                    var a = this.serviceData.qrc_img ? JSON.stringify(this.serviceData) : "";
                    h.default.navigateTo({
                        url: "service?str_service_config=" + a
                    });
                }
            },
            clickRepay: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function b(c) {
                    var d, f, a, g;
                    return regeneratorRuntime.wrap(function(b) {
                        for (;;) switch (b.prev = b.next) {
                          case 0:
                            return d = c.currentTarget.dataset.id, f = c.currentTarget.dataset.isgrouponorder, 
                            a = k.default.getDeviceType(), g = {
                                device_type: a,
                                out_trade_no: d
                            }, b.prev = 4, b.next = 7, (0, i.seePost)("cart_pay/wxCartOrderPay", g, function(a) {
                                var b = a.data;
                                if (b.result) {
                                    var c = b.data;
                                    c.isSendWaitMsg = !1, f && (c.isGrouponOrder = f), (0, i.wxPay)(c);
                                } else h.default.showModal({
                                    title: "提示",
                                    confirmColor: "#FE3B2E",
                                    content: b.msg,
                                    showCancel: !1
                                });
                            });

                          case 7:
                            b.next = 11;
                            break;

                          case 9:
                            b.prev = 9, b.t0 = b.catch(4);

                          case 11:
                          case "end":
                            return b.stop();
                        }
                    }, b, this, [ [ 4, 9 ] ]);
                }));
                return a;
            }()
        }, g.freightFormat = function(a) {
            return null == a || void 0 == a ? "" : 0 >= a ? "包邮" : (0, i.currencyFormat)(a);
        }, g.shipTaxFormat = function(a) {
            return null == a || void 0 == a ? "" : 0 >= a ? "暂不缴税" : (0, i.currencyFormat)(a);
        }, a = e, d(g, a);
    }
    return f(j, a), g(j, [ {
        key: "onUnload",
        value: function() {
            this.order_id = "", this.order = {}, this.serviceData = {}, clearInterval(this.m_time);
        }
    }, {
        key: "getStatus",
        value: function(a) {
            switch (a = parseInt(a)) {
              case 10001:
                return [ "未支付", "#999", "order-status-needpay" ];

              case 2e4:
                return [ "进行中", "#F33950", "order-status-sending" ];

              case 20001:
                return [ "进行中 - 待发货", "#F33950", "order-status-needsend" ];

              case 20002:
              case 20003:
                return [ "进行中 - 待收货", "#F33950", "order-status-sending" ];

              case 20004:
                return [ "售后 - 退款中", "#FB9D23", "order-status-refunding" ];

              case 20005:
                return [ "售后 - 商家待收货", "#FB9D23", "order-status-returning" ];

              case 20006:
                return [ "进行中 - 待发货", "#F33950", "order-status-sending" ];

              case 20007:
                return [ "需要缴纳关锐", "#F33950", "order-status-needtax" ];

              case 20008:
                return [ "售后 - 待商家退款", "#FB9D23", "order-status-refunding" ];

              case 3e4:
                return [ "已完成", "#32B363", "order-status-finished" ];

              case 30001:
                return [ "交易完成", "#32B363", "order-status-finished" ];

              case 30002:
                return [ "售后 - 退款完成", "#9C27B0", "order-status-refunded" ];

              case 30003:
                return [ "售后 - 退货完成", "#FB9D23", "order-status-returned" ];

              case 30004:
                return [ "自动收货", "#32B363", "order-status-finished" ];

              case 40001:
                return [ "交易关闭", "#303030", "order-status-closeed" ];
            }
            return "";
        }
    }, {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function a(b) {
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        this.order_id = b.order_id, this.refresh();

                      case 2:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return a;
        }()
    }, {
        key: "refresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function b() {
                var c, d, f, a, g;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return c = this, b.prev = 1, d = {
                            order_id: c.order_id,
                            type: 101
                        }, b.next = 5, (0, i.seeGet)("cart_pay/getOrderDetail", d);

                      case 5:
                        f = b.sent, a = f.data, c.order = a, c.order.summary_info.total_ship_fee = c.freightFormat(c.order.summary_info.total_ship_fee), 
                        c.order.summary_info.total_ship_tax = c.shipTaxFormat(c.order.summary_info.total_ship_tax), 
                        c.order.summary_info.coupon_price = (0, i.currencyFormat)(c.order.summary_info.coupon_price), 
                        c.order.summary_info.total_fee = (0, i.currencyFormat)(c.order.summary_info.total_fee), 
                        c.order.summary_info.premary_total_fee = (0, i.currencyFormat)(c.order.summary_info.premary_total_fee), 
                        c.order.summary_info.status_str = 3 == c.order.summary_info.order_type ? "抽奖团订单" : c.getStatus(this.order.summary_info.status)[0], 
                        c.order.summary_info.status_class = c.getStatus(c.order.summary_info.status)[2], 
                        c.order.list.forEach(function(a, b) {
                            c.order.list[b].base_info.ship_fee = c.freightFormat(c.order.list[b].base_info.ship_fee), 
                            c.order.list[b].base_info.ship_tax = c.shipTaxFormat(c.order.list[b].base_info.ship_tax), 
                            c.order.list[b].data[0].buy_price = (0, i.currencyFormat)(c.order.list[b].data[0].buy_price), 
                            c.order.list[b].base_info.total_fee = (0, i.currencyFormat)(c.order.list[b].base_info.total_fee), 
                            c.order.list[b].base_info.show_bottom = b != c.order.list.length - 1;
                        }), c.$apply(), b.next = 22;
                        break;

                      case 19:
                        b.prev = 19, b.t0 = b.catch(1), console.error(b.t0.stack);

                      case 22:
                        return clearInterval(c.m_time), c.order.summary_info.remain_second_str = "", c.m_time = setInterval(function() {
                            c.reduceSecond(c);
                        }, 1e3), b.next = 27, (0, i.seeGet)("info/getXcxConfig");

                      case 27:
                        g = b.sent, g.result ? c.serviceData = g.data : c.serviceData.is_zhuiyi = 1, c.$apply();

                      case 30:
                      case "end":
                        return b.stop();
                    }
                }, b, this, [ [ 1, 19 ] ]);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    }, {
        key: "reduceSecond",
        value: function(a) {
            if (a.order && a.order.summary_info) {
                if (0 < --a.order.summary_info.remain_second) {
                    var b = Math.floor(a.order.summary_info.remain_second / 60);
                    if (0 < b) {
                        var c = a.order.summary_info.remain_second - 60 * b;
                        a.order.summary_info.remain_second_str = "还剩:" + b + "分" + c + "秒";
                    } else a.order.summary_info.remain_second_str = "还剩:" + a.order.summary_info.remain_second + "秒";
                } else a.order.summary_info.remain_second_str = "";
                a.$apply();
            }
        }
    }, {
        key: "onPullDownRefresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        h.default.stopPullDownRefresh();

                      case 1:
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
            return k.default.getShareDefault();
        }
    } ]), j;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(l, "pages/orderDetail"));