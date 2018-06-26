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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), j = require("./../common/api.js"), i = require("./../common/global.js"), k = a(i), l = require("./../components/see-tips.js"), m = a(l), n = require("./../components/upload.js"), p = a(n), o = function(a) {
    function l() {
        var f, e, g, n;
        c(this, l);
        for (var a = arguments.length, o = Array(a), i = 0; i < a; i++) o[i] = arguments[i];
        return e = g = d(this, (f = l.__proto__ || Object.getPrototypeOf(l)).call.apply(f, [ this ].concat(o))), 
        g.config = {
            navigationBarTitleText: "我的订单",
            backgroundColor: "#ffffff"
        }, g.$repeat = {}, g.$props = {
            upload: {
                "xmlns:v-bind": "",
                "v-bind:showFoot.sync": "showFoot"
            }
        }, g.$events = {}, g.components = {
            tips: m.default,
            upload: p.default
        }, g.data = {
            isShow: !1,
            navTab: [ "全部", "待付款", "进行中", "已完成", "售后" ],
            page: 1,
            type: 0,
            listOrder: [],
            is_getting: !0,
            hiddenModal: !0,
            order_id: "",
            refund: {
                show_type: 0,
                options: [],
                reason: "",
                otherReason: ""
            },
            windowHeight: wx.getSystemInfoSync().windowHeight + 50,
            reduceTimeInterval: !1,
            loadList: !1,
            showFoot: !1,
            templateData: {}
        }, g.methods = {
            clickRepay: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function b(c) {
                    var d, f, g, a, l;
                    return regeneratorRuntime.wrap(function(b) {
                        for (;;) switch (b.prev = b.next) {
                          case 0:
                            return d = this, f = c.currentTarget.dataset.id, g = c.currentTarget.dataset.isgrouponorder, 
                            a = k.default.getDeviceType(), l = {
                                device_type: a,
                                out_trade_no: f
                            }, this.templateData.goodsName = c.currentTarget.dataset.name || "", this.templateData.goodsPrice = c.currentTarget.dataset.total || "", 
                            b.prev = 7, b.next = 10, (0, j.seePost)("cart_pay/wxCartOrderPay", l, function(a) {
                                var b = a.data;
                                if (b.result) {
                                    var c = b.data;
                                    c.isSendWaitMsg = !1, g && (c.isGrouponOrder = g), (0, j.wxPay)(c);
                                } else h.default.showModal({
                                    title: "提示",
                                    confirmColor: "#FE3B2E",
                                    content: b.msg,
                                    showCancel: !1
                                });
                            });

                          case 10:
                            b.next = 14;
                            break;

                          case 12:
                            b.prev = 12, b.t0 = b.catch(7);

                          case 14:
                          case "end":
                            return b.stop();
                        }
                    }, b, this, [ [ 7, 12 ] ]);
                }));
                return a;
            }(),
            loadList: function() {
                this.getOrderList();
            },
            clickConfirm: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function a(c) {
                    var d, f;
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            d = this, f = c.currentTarget.dataset.id, h.default.showModal({
                                title: "是否确认收货？",
                                showCancel: !0,
                                confirmColor: "#FE3B2E",
                                content: "确认收货前，请确保您已收到货品"
                            }).then(function() {
                                var a = b(regeneratorRuntime.mark(function b(c) {
                                    var g, a;
                                    return regeneratorRuntime.wrap(function(b) {
                                        for (;;) switch (b.prev = b.next) {
                                          case 0:
                                            if (!c.confirm) {
                                                b.next = 13;
                                                break;
                                            }
                                            return g = {
                                                order_id: f
                                            }, b.prev = 2, b.next = 5, (0, j.seePost)("cart_pay/confirmOrder?order_id=" + f, g);

                                          case 5:
                                            a = b.sent, a && d.refresh(), b.next = 11;
                                            break;

                                          case 9:
                                            b.prev = 9, b.t0 = b.catch(2);

                                          case 11:
                                            b.next = 13;
                                            break;

                                          case 13:
                                          case "end":
                                            return b.stop();
                                        }
                                    }, b, this, [ [ 2, 9 ] ]);
                                }));
                                return function() {
                                    return a.apply(this, arguments);
                                };
                            }());

                          case 3:
                          case "end":
                            return a.stop();
                        }
                    }, a, this);
                }));
                return a;
            }(),
            clickRefund: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function a(c) {
                    var d, f;
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            if (!k.default.advoiceTapTwice(c)) {
                                a.next = 13;
                                break;
                            }
                            return d = this, d.order_id = c.currentTarget.dataset.id, a.prev = 3, a.next = 6, 
                            (0, j.seeGet)("cart_pay/getRefundInfo", {
                                order_id: d.order_id
                            });

                          case 6:
                            f = a.sent, f && (d.refund = {
                                show_type: +f.data.show_type,
                                options: f.data.options,
                                checked: !1,
                                reason: 1 == f.data.show_type ? f.data.options[0] : ""
                            }), a.next = 12;
                            break;

                          case 10:
                            a.prev = 10, a.t0 = a.catch(3);

                          case 12:
                            0 == d.refund.show_type ? h.default.showModal({
                                title: "提示",
                                confirmColor: "#FE3B2E",
                                content: "退款后订单无法恢复哦，确定要退款吗？"
                            }).then(function() {
                                var a = b(regeneratorRuntime.mark(function a(b) {
                                    return regeneratorRuntime.wrap(function(a) {
                                        for (;;) switch (a.prev = a.next) {
                                          case 0:
                                            b.confirm && d.confirmRefund();

                                          case 1:
                                          case "end":
                                            return a.stop();
                                        }
                                    }, a, this);
                                }));
                                return function() {
                                    return a.apply(this, arguments);
                                };
                            }()) : (d.hiddenModal = !1, d.$apply());

                          case 13:
                          case "end":
                            return a.stop();
                        }
                    }, a, this, [ [ 3, 10 ] ]);
                }));
                return a;
            }(),
            toGroupInfo: function(a) {
                if (k.default.advoiceTapTwice(a)) {
                    var b = a.currentTarget.dataset.id;
                    wx.navigateTo({
                        url: "/pages/grouponDetail?id=" + b
                    });
                }
            },
            listenerCancel: function() {
                this.refund.options.length = 0, this.hiddenModal = !0, this.$apply();
            },
            listenerConfirm: function() {
                var a = b(regeneratorRuntime.mark(function a() {
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            this.confirmRefund();

                          case 1:
                          case "end":
                            return a.stop();
                        }
                    }, a, this);
                }));
                return function() {
                    return a.apply(this, arguments);
                };
            }(),
            radioChange: function(a) {
                var b = a.detail.value;
                this.refund.reason = b, this.$apply();
            },
            setOtherReason: function(a) {
                this.refund.otherReason = a.detail.value, this.$apply();
            },
            clickTransInfo: function(a) {
                var b = a.currentTarget.dataset.id;
                k.default.advoiceTapTwice(a) && h.default.navigateTo({
                    url: "orderDetail?order_id=" + b
                });
            },
            clickOrder: function(a) {
                var b = a.currentTarget.dataset.id;
                k.default.advoiceTapTwice(a) && h.default.navigateTo({
                    url: "orderDetail?order_id=" + b
                });
            },
            switchTab: function(a) {
                var b = this;
                b.type = a.currentTarget.dataset.idx, b.page = 1, b.refresh();
            }
        }, n = e, d(g, n);
    }
    return f(l, a), g(l, [ {
        key: "onUnload",
        value: function() {
            this.page = 1, this.type = 0, this.listOrder = [], this.is_getting = !0, this.loadList = !1, 
            this.showFoot = !1, this.templateData = {}, clearInterval(this.reduceTimeInterval);
        }
    }, {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function a() {
                var b;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        b = this, clearInterval(b.reduceTimeInterval), b.refresh(), b.reduceTimeInterval = setInterval(function() {
                            b.reduceSecond(b);
                        }, 1e3);

                      case 4:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return a;
        }()
    }, {
        key: "onReachBottom",
        value: function() {
            this.getOrderList();
        }
    }, {
        key: "confirmRefund",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                var b, c, d;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (b = this, c = "其他" == b.refund.reason ? "其他" + b.refund.otherReason : b.refund.reason, 
                        d = 0 == b.refund.show_type ? "退款申请已成功发起，系统会在1-2个工作日内完成退款" : "你好，退款申请已发出，距离下单已超过1个小时，需等待买手同意，请耐心等待…", 
                        0 != b.refund.show_type && !c) {
                            a.next = 13;
                            break;
                        }
                        return a.prev = 4, a.next = 7, (0, j.seePost)("cart_pay/applyRefund", {
                            order_id: b.order_id,
                            refund_reason: c
                        }, function(a) {
                            b.hiddenModal = !0, b.refund.options.length = 0, b.refund.otherReason = "", h.default.showModal({
                                title: "提示",
                                confirmColor: "#FE3B2E",
                                content: a.data.result ? d : a.data.msg,
                                showCancel: !1
                            }), b.$apply(), b.refresh();
                        });

                      case 7:
                        a.next = 11;
                        break;

                      case 9:
                        a.prev = 9, a.t0 = a.catch(4);

                      case 11:
                        a.next = 14;
                        break;

                      case 13:
                        b.$invoke("tips", "show", {
                            title: "请选择退款理由"
                        });

                      case 14:
                      case "end":
                        return a.stop();
                    }
                }, a, this, [ [ 4, 9 ] ]);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    }, {
        key: "reduceSecond",
        value: function(a) {
            if (a.listOrder && 0 < a.listOrder.length) {
                for (var b = 0; b < a.listOrder.length; b++) if (0 < --a.listOrder[b].summary_info.remain_second) {
                    var c = Math.floor(a.listOrder[b].summary_info.remain_second / 60);
                    if (0 < c) {
                        var d = a.listOrder[b].summary_info.remain_second - 60 * c;
                        a.listOrder[b].summary_info.remain_second_str = "还剩:" + c + "分" + d + "秒";
                    } else a.listOrder[b].summary_info.remain_second_str = "还剩:" + a.listOrder[b].summary_info.remain_second + "秒";
                } else a.listOrder[b].summary_info.remain_second_str = "";
                a.$apply();
            }
        }
    }, {
        key: "getOrderList",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                var b, c, d;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (b = this, b.loadList || b.showFoot) {
                            a.next = 11;
                            break;
                        }
                        return b.page++, b.loadList = !0, console.log(b.page), c = {
                            p: b.page,
                            type: b.type
                        }, a.next = 8, (0, j.seeGet)("cart_pay/getOrderList", c);

                      case 8:
                        d = a.sent, d && (b.listOrder = b.listOrder.concat(d.data.list), b.showFoot = !(0 < d.data.list.length)), 
                        setTimeout(function() {
                            b.loadList = !1, b.$apply();
                        }, 500);

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
                var b, c, d;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return b = this, b.is_getting = !0, b.listOrder = [], a.prev = 3, c = {
                            p: 1,
                            type: b.type
                        }, a.next = 7, (0, j.seeGet)("cart_pay/getOrderList", c);

                      case 7:
                        d = a.sent, d && (b.listOrder = d.data.list), a.next = 13;
                        break;

                      case 11:
                        a.prev = 11, a.t0 = a.catch(3);

                      case 13:
                        b.isShow = !0, b.is_getting = !1, b.$apply();

                      case 16:
                      case "end":
                        return a.stop();
                    }
                }, a, this, [ [ 3, 11 ] ]);
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
    } ]), l;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(o, "pages/order"));