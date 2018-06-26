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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), j = require("./../common/api.js"), i = require("./../common/global.js"), k = a(i), l = function(a) {
    function l() {
        var f, e, g, a;
        c(this, l);
        for (var m = arguments.length, n = Array(m), i = 0; i < m; i++) n[i] = arguments[i];
        return e = g = d(this, (f = l.__proto__ || Object.getPrototypeOf(l)).call.apply(f, [ this ].concat(n))), 
        g.config = {
            navigationBarTitleText: "订单确认",
            enablePullDownRefresh: !1,
            backgroundColor: "#f4f4f4"
        }, g.data = {
            num_coupon_can_user: 0,
            isShow: !1,
            gId: 0,
            aId: 0,
            itemList: [],
            summaryInfo: {},
            addrInfo: {},
            sku_list: [],
            defaultFee: 0,
            couponMessage: "",
            couponInfo: {},
            skuBuyInfoList: [],
            isChooseDefultAddr: !1,
            IdCard: 0,
            isEditIdCard: !0,
            params: {},
            expressDesc: "",
            showExpressDesc: !1
        }, g.methods = {
            editIdCard: function(a) {
                this.IdCard = a.detail.value;
            },
            saveIdCard: function() {
                var a = this;
                setTimeout(function() {
                    if (a.isEditIdCard) a.isEditIdCard && (a.addrInfo.idcard_no = ""), a.isEditIdCard = !a.isEditIdCard; else {
                        if (!1 === /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(a.IdCard)) return void h.default.showModal({
                            title: "提示",
                            confirmColor: "#FE3B2E",
                            content: "请填写正确的身份证号",
                            showCancel: !1
                        });
                        var b = {
                            idcard_no: a.IdCard,
                            name: a.addrInfo.name
                        };
                        (0, j.seePost)("pay/modifyIdcardNo", b, function(b) {
                            var c = b.data;
                            c.result ? (wx.showToast({
                                title: "设置成功",
                                icon: "success",
                                duration: 800
                            }), a.isEditIdCard = !a.isEditIdCard, a.addrInfo.idcard_no = c.data, a.$apply()) : h.default.showModal({
                                title: "提示",
                                confirmColor: "#FE3B2E",
                                content: b.data.msg,
                                showCancel: !1
                            });
                        });
                    }
                    a.$apply();
                }, 500);
            },
            selectAddr: function() {
                if (0 == k.default.weixin_auth_deny.chooseAddress) this.chooseAddress(); else {
                    var a = this.addrInfo.addr ? "addressManager" : "addressAdd";
                    this.isChooseDefultAddr = !0, h.default.navigateTo({
                        url: a
                    });
                }
            },
            pageCouponChoice: function() {
                h.default.navigateTo({
                    url: "coupon?is_choice=1&coupon_id=" + k.default.config.coupon_id + "&skuBuyInfoList=" + JSON.stringify(this.skuBuyInfoList)
                });
            },
            iconCheck: function() {
                wx.showModal({
                    content: "我们将根据商品的供货商与发货地情况来进行包裹的拆分",
                    showCancel: !1,
                    confirmColor: "#FE3B2E",
                    success: function() {}
                });
            },
            expressDesc: function(a) {
                this.expressDesc = a, this.showExpressDesc = !0, this.$apply();
            },
            closeOrder: function() {
                this.showExpressDesc = !1, this.$apply();
            },
            saveComment: function(a, b, c) {
                "" != c.detail.value && (this.itemList[a].lit_order_list[b].comment = c.detail.value);
            },
            formSubmit: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function b(g) {
                    var l, m, a, n, o, p, q, d, r, c;
                    return regeneratorRuntime.wrap(function(b) {
                        for (;;) switch (b.prev = b.next) {
                          case 0:
                            if (l = this, l.addrInfo.addr) {
                                b.next = 4;
                                break;
                            }
                            return h.default.showModal({
                                title: "提示",
                                confirmColor: "#FE3B2E",
                                showCancel: !1,
                                content: "请先添加收货地址"
                            }).then(function(a) {
                                a.confirm && h.default.navigateTo({
                                    url: "addressAdd"
                                });
                            }), b.abrupt("return");

                          case 4:
                            if ((l.isEditIdCard || 1 != l.summaryInfo.need_idcard) && (1 != l.summaryInfo.need_idcard || "" != l.addrInfo.idcard_no)) {
                                b.next = 7;
                                break;
                            }
                            return h.default.showModal({
                                title: "提示",
                                confirmColor: "#FE3B2E",
                                showCancel: !1,
                                content: l.isEditIdCard ? "请先填写身份证号" : "请先保存身份证号"
                            }), b.abrupt("return");

                          case 7:
                            if (!k.default.advoiceTapTwice(g)) {
                                b.next = 32;
                                break;
                            }
                            return m = [], a = null, l.itemList && l.itemList.forEach(function(a) {
                                m = m.concat(a.lit_order_list.map(function(b) {
                                    return {
                                        sku_id: b.sku.sku_id,
                                        comment: b.comment || "",
                                        buy_num: b.buy_num,
                                        f_id: b.f_id,
                                        ex_id: a.express.ex_id,
                                        activity_type: b.activity_type,
                                        activity_id: b.activity_id
                                    };
                                }));
                            }), n = this.addrInfo.user_info_id, o = '{"user_info_id":' + n + ',"device_type":' + k.default.getDeviceType() + ',"coupon_id": ' + k.default.config.coupon_id + "}", 
                            p = JSON.stringify(m), q = {
                                common_info: o,
                                sku_list: p
                            }, d = {
                                common_info: o,
                                sku_list: p,
                                grouponOrder: !0,
                                grouponHead: 0 == l.gId,
                                grouponId: l.gId,
                                grouponActivityId: l.aId
                            }, b.prev = 15, b.next = 18, (0, j.seePost)("ng/cart_pay/wxCartPrePay", l.aId ? d : q);

                          case 18:
                            if (!(r = b.sent)) {
                                b.next = 28;
                                break;
                            }
                            return c = r.data, c.formId = g.detail.formId, c.grouponHead = 0 == l.gId, c.isSendWaitMsg = !0, 
                            c.isGrouponOrder = !!l.aId, c.activityId = l.aId || 0, b.next = 28, (0, j.wxPay)(c);

                          case 28:
                            b.next = 32;
                            break;

                          case 30:
                            b.prev = 30, b.t0 = b.catch(15);

                          case 32:
                          case "end":
                            return b.stop();
                        }
                    }, b, this, [ [ 15, 30 ] ]);
                }));
                return a;
            }()
        }, a = e, d(g, a);
    }
    return f(l, a), g(l, [ {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(c) {
                var d, f, a, g, l, i;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return d = this, d.sku_list = h.default.getStorageSync("sku_list"), f = {}, b.next = 5, 
                        (0, j.seeGet)("pay/getDefaultAddr");

                      case 5:
                        return a = b.sent, f = a.data, f.user_info_id ? (k.default.config.user_info_id = f.user_info_id, 
                        d.addrInfo = f, d.$apply()) : (d.addrInfo = !1, d.chooseAddress()), d.params = {
                            sku_list: JSON.stringify(d.sku_list),
                            recv_addr_Id: d.addrInfo.user_info_id ? d.addrInfo.user_info_id : 0,
                            deviceType: k.default.config.device_type
                        }, c.aId && (d.gId = c.gId, d.aId = c.aId, d.params.grouponActivityId = c.aId, d.params.grouponId = c.gId), 
                        b.prev = 10, b.next = 13, (0, j.seePost)("ng/cart_pay/orderConfirm", d.params, function(a) {
                            return 1 === a.data.result ? a.data : void (a.data.hasOwnProperty("msg") && ("no right" === a.data.msg.trim() || /登录|登陆/.test(a.data.msg)) ? (k.default.config.first_open = !0, 
                            k.default.config.pop_login_num = 1) : ("" != a.data.msg && h.default.showModal({
                                title: "提示",
                                confirmColor: "#FE3B2E",
                                content: a.data.msg,
                                showCancel: !1
                            }).then(function() {
                                "pages/pay" == getCurrentPages()[0].route ? wx.redirectTo({
                                    url: "groupon?id=" + c.aId
                                }) : wx.navigateBack();
                            }), Promise.reject(a)));
                        });

                      case 13:
                        if (g = b.sent, g && (this.isShow = !0, this.itemList = g.data.mid_order_list, this.summaryInfo = g.data.summary_info, 
                        this.defaultFee = this.summaryInfo.total_fee), l = [], d.sku_list.map(function(a) {
                            var b = {
                                buyCount: a.buy_num,
                                skuId: a.sku_id,
                                activityType: c.aId ? 2 : a.activity_type,
                                activityId: a.activity_id
                            };
                            l.push(b);
                        }), d.skuBuyInfoList = l, c.aId) {
                            b.next = 23;
                            break;
                        }
                        return b.next = 21, (0, j.seePost)("/ng/couponv3/ordering/default", {
                            skuBuyInfoList: JSON.stringify(l),
                            deviceType: k.default.config.device_type
                        });

                      case 21:
                        i = b.sent, i.data.availableCount && (d.couponInfo = i.data.couponV3VO, d.couponMessage = d.getCouponInfo(i.data.couponV3VO.denomination, i.data.couponV3VO.limitMoney), 
                        d.num_coupon_can_user = i.data.availableCount, d.summaryInfo.total_fee = (this.defaultFee - parseFloat(i.data.couponV3VO.denomination)).toFixed(2), 
                        0 >= this.summaryInfo.total_fee && (this.summaryInfo.total_fee = .01.toFixed(2)), 
                        k.default.config.coupon_id = i.data.couponV3VO.id, k.default.config.coupon_denomination = i.data.couponV3VO.denomination, 
                        k.default.config.coupon_limitMoney = i.data.couponV3VO.limitMoney);

                      case 23:
                        "" == d.addrInfo.idcard_no && (d.isEditIdCard = !1), d.$apply(), b.next = 30;
                        break;

                      case 27:
                        b.prev = 27, b.t0 = b.catch(10), console.error(b.t0.stack);

                      case 30:
                      case "end":
                        return b.stop();
                    }
                }, b, this, [ [ 10, 27 ] ]);
            }));
            return a;
        }()
    }, {
        key: "chooseAddress",
        value: function() {
            var a = this;
            wx.chooseAddress({
                success: function(b) {
                    a.saveWeixinData(a, b), a.isChooseDefultAddr = !1;
                },
                fail: function() {
                    if (0 == k.default.weixin_auth_deny.chooseAddress) {
                        var b = a.addrInfo.addr ? "addressManager" : "addressAdd";
                        a.isChooseDefultAddr = !0, h.default.navigateTo({
                            url: b
                        });
                    }
                    k.default.weixin_auth_deny.chooseAddress = 1;
                },
                complete: function() {}
            });
        }
    }, {
        key: "saveWeixinData",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(c, d) {
                var f, a;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        if (!d) {
                            b.next = 11;
                            break;
                        }
                        return f = {
                            is_weixin_addr: 1,
                            is_defaut_addr: 1,
                            addr: d.provinceName + "-|-" + d.cityName + "-|-" + d.countyName,
                            detail_addr: d.detailInfo,
                            mobile: d.telNumber,
                            name: d.userName
                        }, b.prev = 2, b.next = 5, (0, j.seePost)("pay/wexinAddAddrInfo", f);

                      case 5:
                        a = b.sent, a.result && (c.addrInfo = a.data, c.isEditIdCard = !!c.addrInfo.idcard_no, 
                        c.refresh(), c.$apply()), b.next = 11;
                        break;

                      case 9:
                        b.prev = 9, b.t0 = b.catch(2);

                      case 11:
                      case "end":
                        return b.stop();
                    }
                }, b, this, [ [ 2, 9 ] ]);
            }));
            return a;
        }()
    }, {
        key: "refresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                var b;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (b = this, !k.default.config.paySuccess) {
                            a.next = 4;
                            break;
                        }
                        return k.default.config.paySuccess = !1, a.abrupt("return");

                      case 4:
                        return b.params.recv_addr_Id = b.addrInfo.user_info_id ? b.addrInfo.user_info_id : 0, 
                        a.next = 7, (0, j.seePost)("ng/cart_pay/orderConfirm", b.params, function(a) {
                            var c = a.data;
                            (c && (b.itemList = c.data.mid_order_list, b.summaryInfo = c.data.summary_info, 
                            b.defaultFee = b.summaryInfo.total_fee), 0 < k.default.config.coupon_id) ? (b.couponMessage = b.getCouponInfo(k.default.config.coupon_denomination, k.default.config.coupon_limitMoney), 
                            k.default.config.coupon_id, b.summaryInfo.total_fee = (b.defaultFee - k.default.config.coupon_denomination).toFixed(2)) : (k.default.config.coupon_id, 
                            b.couponMessage = "", b.summaryInfo.total_fee = (+b.defaultFee).toFixed(2)), 0 >= b.summaryInfo.total_fee && (b.summaryInfo.total_fee = .01), 
                            b.$apply();
                        });

                      case 7:
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
            this.num_coupon_can_user = 0, this.isShow = !1, this.couponv2 = {}, this.itemList = {}, 
            this.sku_list = [], this.summaryInfo = {}, this.addrInfo = {}, this.defaultFee = 0, 
            this.couponMessage = "", this.couponInfo = {}, this.gId = 0, this.aId = 0, this.isChooseDefultAddr = !1, 
            this.IdCard = 0, this.isEditIdCard = !0, this.params = {}, this.showExpressDesc = !1, 
            this.expressDesc = "", k.default.config.coupon_id = 0, k.default.config.coupon_denomination = "", 
            k.default.config.coupon_limitMoney = "";
        }
    }, {
        key: "getCouponInfo",
        value: function(a, b) {
            return "0" == b ? a + "元直减" : "满" + b + "减" + a + "元";
        }
    }, {
        key: "onShow",
        value: function() {
            var a = b(regeneratorRuntime.mark(function b() {
                var c, d, f, a, g, h;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        if (c = this, !c.isChooseDefultAddr) {
                            b.next = 16;
                            break;
                        }
                        if (k.default.config.user_info_id == c.addrInfo.user_info_id) {
                            b.next = 10;
                            break;
                        }
                        return d = k.default.config.user_info_id, b.next = 6, (0, j.seeGet)("pay/getAddrList");

                      case 6:
                        f = b.sent, f.data && f.data.length ? f.data.map(function(a) {
                            a.user_info_id == d && (c.addrInfo = a);
                        }) : c.addrInfo = {}, b.next = 14;
                        break;

                      case 10:
                        return b.next = 12, (0, j.seeGet)("pay/getDefaultAddr");

                      case 12:
                        a = b.sent, a && (c.addrInfo = a.data, k.default.config.user_info_id = c.addrInfo.user_info_id);

                      case 14:
                        c.isEditIdCard = !!c.addrInfo.idcard_no, c.refresh();

                      case 16:
                        0 < k.default.config.coupon_id ? (this.couponMessage = c.getCouponInfo(k.default.config.coupon_denomination, k.default.config.coupon_limitMoney), 
                        g = k.default.config.coupon_id, this.summaryInfo.total_fee = (this.defaultFee - k.default.config.coupon_denomination).toFixed(2)) : (h = k.default.config.coupon_id, 
                        this.couponMessage = "", this.summaryInfo.total_fee = (+this.defaultFee).toFixed(2)), 
                        0 >= this.summaryInfo.total_fee && (this.summaryInfo.total_fee = .01), c.isChooseDefultAddr = !0, 
                        c.$apply();

                      case 20:
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
        key: "onShareAppMessage",
        value: function() {
            return k.default.getShareDefault();
        }
    } ]), l;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(l, "pages/pay"));