function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
    }
    return t;
}, a = t(require("../../common/m")), s = t(require("../toast/index")), i = t(require("../loading/index")), o = t(require("./components/header/index")), n = t(require("./common/router")), d = t(require("./common/weChat")), r = t(require("./mockPages/home/index")), l = t(require("./mockPages/installment/index")), h = t(require("./mockPages/message/index")), u = t(require("./mockPages/pwd/index")), p = t(require("./mockPages/result/index")), c = t(require("./config")), m = a.default.MWP, y = !0;

exports.default = {
    data: function() {
        return {
            isShow: !1,
            showConfig: {
                home: !0
            }
        };
    },
    methods: {
        show: function(t) {
            var e = this;
            t.payId && (t.stagingNum || (t.stagingNum = 0), this.getIsShowSimpleCashier().then(function() {
                e.showCashier(t);
            }, function() {
                new d.default(t).exec();
            }));
        },
        getIsShowSimpleCashier: function() {
            var t = this;
            return new Promise(function(e, a) {
                c.default.isShowSimpleCashier ? !c.default.isShowSimpleCashier || c.default.isCheckBfm ? (t.$loading.show(), 
                m.request("mwp.pay_mailo.getmailouserinfo", 1, {}).then(function(s) {
                    t.$loading.hide(), "SUCCESS" === s.ret && s.data && "NORMAL" === s.data.userStatus ? (t.$loading.show(), 
                    m.request("mwp.pay_mailo.getmailoswitchinfo", 1, {}).then(function(s) {
                        t.$loading.hide(), "SUCCESS" === s.ret && s.data.isOpenCashier ? e() : a();
                    })) : (t.$loading.hide(), a());
                }, function() {
                    t.$loading.hide();
                })) : e() : a();
            });
        },
        showCashier: function(t) {
            var e = this;
            this.$loading.show(), this.reSetAllData(), m.request("mwp.pay_cashier.cashierRender", 1, {
                payId: t.payId,
                stagingNum: t.stagingNum
            }).then(function(a) {
                if (e.$loading.hide(), "SUCCESS" === a.ret) {
                    var s = {}, i = [], o = [], n = (a = a.data).itemList[0];
                    n.forEach(function(t) {
                        t.data.isChecked && (s = t), "mailoPay" === t.payType && i.push(t), "weChatPay" === t.payType && o.push(t);
                    }), c.default.isShowBfm || (n = o), c.default.isShowBfm && !i.length && n.push({
                        payType: "mailoPay",
                        data: {
                            title: "白付美",
                            isDisabled: !0,
                            isChecked: !1,
                            desc: "该支付方式暂不可用",
                            icon: "https://s10.mogucdn.com/mlcdn/c45406/170930_02kc845d7cfj6dg54a4l6i0fabhgj_80x80.png"
                        }
                    }), t.stagingNum && i.length && !i[0].data.isDisabled ? m.request("mwp.pay_cashier.stagingRender", 1, {
                        payId: t.payId,
                        stagingNum: t.stagingNum,
                        commodityStaging: !0
                    }).then(function(t) {
                        if ("SUCCESS" === t.ret) {
                            var a = t.data.installmentList;
                            e.$installment.setInstallmentData(a);
                            var i = "不分期", o = s.data.price, n = 0;
                            a.forEach(function(t) {
                                t.checked && (i = t.number, o = t.totalPrice, n = t.installmentId);
                            }), e.setSelectMethod({
                                payType: s.payType,
                                data: s.data,
                                price: "mailoPay" === s.payType ? o : s.data.price,
                                hongbaoUse: s.data.hongbaoUse,
                                installmentDesc: i,
                                installmentPrice: o,
                                installmentId: n
                            });
                        } else e.$toast.show(t.msg || "网络错误");
                    }) : e.setSelectMethod({
                        payType: s.payType,
                        data: s.data,
                        price: s.data.price,
                        hongbaoUse: s.data.hongbaoUse,
                        installmentDesc: s.data.installmentDesc
                    }), e.$home.setHomeData({
                        payMethods: n,
                        topbanner: a.topbanner && a.topbanner.list || [],
                        selectedMethod: e.data.selectedMethod
                    });
                    var d = i[0] && i[0].data && i[0].data.phone;
                    d && "string" == typeof d && e.$message.setData({
                        phoneNumTail: d.substr(-4)
                    }), e.setData({
                        params: t,
                        payMethods: n,
                        isShow: !0
                    }), e.$root.$logE("001010040", {
                        payId: t.payId,
                        isAPISucceed: !0,
                        defultPayMethod: s.payType
                    });
                } else e.$toast.show(a.msg || "网络错误");
            });
        },
        hide: function() {
            this.reSetAllData(), this.$root.$logE("001010016", {
                payId: this.data.params.payId,
                payMethod: this.data.selectedMethod.payType
            }), this.data.params.cancelCb && this.data.params.cancelCb();
        },
        routeGo: function(t, e) {
            var a = (0, n.default)(t), s = a.page, i = a.showConfig;
            this.setData({
                showConfig: i
            }), this.$header.setTitle(s, e);
        },
        setHeaderTitle: function(t) {
            this.$header.setData({
                title: t
            });
        },
        setSelectMethod: function(t) {
            this.setData({
                selectedMethod: e({}, this.data.selectedMethod, t)
            }), this.$home.setData({
                selectedMethod: this.data.selectedMethod
            }), this.$installment.setData({
                selectedMethod: this.data.selectedMethod
            });
        },
        paySubmit: function() {
            if (this.canClickFn()) if (this.$root.$logE("001010001", {
                payId: this.data.params.payId,
                payMethod: this.data.selectedMethod.payType,
                installmentId: this.data.selectedMethod.installmentId
            }), "weChatPay" !== this.data.selectedMethod.payType) {
                if ("mailoPay" === this.data.selectedMethod.payType) {
                    var t = this.data.payMethods.filter(function(t) {
                        return "mailoPay" === t.payType;
                    })[0];
                    return !this.data.showConfig.home || t.data.canUseFixAmount || this.data.selectedMethod.installmentId ? void this.goPwd() : (this.$toast.show("您的固定额度不足，请选用分期支付"), 
                    void this.goInstallment());
                }
            } else {
                var a = e({}, this.data.params, {
                    cancelCb: function() {},
                    failCb: function() {}
                });
                new d.default(a).exec();
            }
        },
        mailoPay: function(t) {
            var a = this, s = e({
                payId: this.data.params.payId,
                payType: "mailoPay",
                extraInfo: this.data.selectedMethod.data.extraInfo || "",
                installmentId: this.data.selectedMethod.installmentId || 0,
                pwd: this.$pwd.data.hasVerifyPwd
            }, t);
            this.$loading.show(), m.request("mwp.pay_cashier.maibeiPay", 1, s).then(function(t) {
                if ("SUCCESS" !== t.ret) return a.$toast.show(t.msg || "网络错误"), a.$message.setData({
                    numHasInput: [],
                    numHasInputStr: ""
                }), "FAIL_BIZ_230028" === t.ret ? void a.$loading.hide() : (a.$root.$logE("001010007", {
                    payId: a.data.params.payId,
                    payMethod: a.data.selectedMethod.payType
                }), a.$result.setData({
                    isPaySuccess: "FAIL_BIZ_231006" === t.ret
                }), a.$loading.hide(), void a.routeGo("result"));
                a.payResult(t.data);
            });
        },
        goPwd: function() {
            var t = this;
            m.request("mwp.pay_cashier.passwordSet", 1, {}).then(function(e) {
                "SUCCESS" === e.ret ? (t.$pwd.reSetData(e.data.isSet), t.routeGo("pwd"), e.data.isSet || t.setHeaderTitle("设置支付密码")) : t.$toast.show(e.msg || "网络错误");
            });
        },
        afterPwd: function() {
            var t = this.data.payMethods.filter(function(t) {
                return "mailoPay" === t.payType;
            })[0];
            if (t.data.isNeedSmsVerify || t.data.isNeedSignProtocol) return this.$message.setData({
                isNeedSignProtocol: t.data.isNeedSignProtocol
            }), void this.routeGo("message");
            this.mailoPay();
        },
        payResult: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                maxQueryDelay: 10,
                queryDelay: 1
            };
            this.$loading.show();
            !function a() {
                e.maxQueryDelay -= 1, m.request("mwp.pay_cashier.bfmResultQuery", 1, {
                    payId: t.data.params.payId
                }).then(function(s) {
                    if ("SUCCESS" === s.ret && 2 === s.data.status) return t.$root.$logE("001010006", {
                        payId: t.data.params.payId,
                        payMethod: t.data.selectedMethod.payType
                    }), t.$result.setData({
                        isPaySuccess: !0
                    }), t.$loading.hide(), t.routeGo("result"), t.data.params.successCb && t.data.params.successCb(), 
                    void setTimeout(function() {
                        t.reSetAllData();
                    }, 2e3);
                    e.maxQueryDelay > 0 && t.data.isShow && t.data.showConfig.result ? setTimeout(function() {
                        a();
                    }, 1e3 * e.queryDelay) : e.maxQueryDelay <= 0 && t.$toast.show("支付结果查询失败");
                });
            }();
        },
        goInstallment: function() {
            var t = this;
            m.request("mwp.pay_cashier.stagingRender", 1, {
                payId: this.data.params.payId,
                stagingNum: this.data.params.stagingNum,
                commodityStaging: !0
            }).then(function(e) {
                "SUCCESS" === e.ret ? (t.$installment.setInstallmentData(e.data.installmentList), 
                t.routeGo("installment", e.data.repaymentDate)) : t.$toast.show(e.msg || "网络错误");
            });
        },
        reSetAllData: function() {
            this.routeGo("home"), this.setData({
                isShow: !1
            }), this.$home.reSetAllData(), this.$installment.reSetAllData(), this.$pwd.reSetAllData(), 
            this.$message.reSetAllData();
        },
        canClickFn: function() {
            return !!y && (y = !1, setTimeout(function() {
                y = !0;
            }, 1e3), !0);
        }
    },
    components: {
        header: o.default,
        loading: i.default,
        home: r.default,
        installment: l.default,
        message: h.default,
        pwd: u.default,
        result: p.default,
        toast: s.default
    }
};