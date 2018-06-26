function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("../../../../common/m")), t = e(require("../../../../common/service/user")), r = require("../../../../mixins/logger/index"), n = e(require("../../../../common/service/url")), i = e(require("../../../cashier/index")), o = e(require("../../../../common/utils/cache")), s = a.default.MWP;

exports.default = {
    data: function() {
        return {
            isPresale: !1,
            lock: !1
        };
    },
    components: {
        cashier: i.default
    },
    onLoad: function() {},
    methods: {
        formSubmitHandler: function(e) {
            var a = e.detail.formId;
            this.$root.$logForm(a, 2), this.callClickSubOrder(e.detail);
        },
        callCashier: function(e) {
            var a = this, t = e.payId, r = e.isChannelPinTuan, n = e.callBackUrl, i = e.msg, o = e.pinTuanTag, s = e.pinTuanUrl, c = e.noPintuan, l = e.stagingNum;
            this.$cashier.show({
                payId: t,
                stagingNum: l,
                successCb: function() {
                    a.$parent.$emit("paySuccess", {
                        noPintuan: c,
                        callBackUrl: n,
                        pinTuanTag: o,
                        pinTuanUrl: s,
                        msg: i
                    }), "normal" != a.$parent.data.type ? (a.$parent.close(), a.setData({
                        lock: !1
                    })) : a.navigateAfaterPay({
                        isChannelPinTuan: r,
                        callBackUrl: n
                    });
                },
                cancelCb: function() {
                    a.$parent.$emit("payCancel", {
                        pinTuanTag: o,
                        pinTuanUrl: s,
                        msg: i
                    }), "normal" != a.$parent.data.type ? (a.$parent.close(), a.setData({
                        lock: !1
                    })) : a.navigatePayCancel({
                        isChannelPinTuan: r
                    });
                },
                failCb: function() {
                    wx.showModal({
                        title: "支付失败",
                        content: "支付失败了，是否要重新支付？",
                        cancelText: "放弃支付",
                        confirmText: "重新支付",
                        confirmColor: "#ff5777",
                        success: function(t) {
                            if (t.confirm) a.callCashier(e); else {
                                if ("normal" == a.$parent.data.type) return void a.navigatePayCancel({
                                    isChannelPinTuan: r
                                });
                                a.$parent.close(), a.setData({
                                    lock: !1
                                });
                            }
                        }
                    });
                }
            });
        },
        tipCallBack: function(e) {
            var a = this, t = this.data.type, r = e.payId, n = e.res, i = e.isChannelPinTuan, o = e.callBackUrl, s = e.noPinTuan, c = e.pinTuanTag, l = e.pinTuanUrl, u = e.itemTag, d = e.stagingNum;
            if (r) this.callCashier({
                payId: r,
                isChannelPinTuan: i,
                msg: n.msg,
                callBackUrl: o,
                noPinTuan: s,
                pinTuanTag: c,
                pinTuanUrl: l,
                stagingNum: d
            }); else {
                if (this.setData({
                    lock: !1
                }), ("ASSIST" === c || "PT" === c) && "ZERO" === u) return void ("normal" === t ? this.$root.$redirect(o) : this.$root.$navigate(o));
                wx.showModal({
                    title: "支付失败",
                    content: "呜~支付失败了，是否要重新支付？",
                    cancelText: "暂不支付",
                    confirmText: "重新支付",
                    confirmColor: "#ff5777",
                    success: function(e) {
                        if (e.confirm) a.navigatePayCancel({
                            isChannelPinTuan: i
                        }), a.$parent.close(); else {
                            if ("normal" == a.$parent.data.type) return void wx.navigateBack();
                            a.$parent.close();
                        }
                    }
                });
            }
        },
        callClickSubOrder: function() {
            var e = this, a = {}, i = this.$parent, c = i.data, l = i.$virtualBox.data, u = c.$address, d = this.data.lock, p = "", h = this.$parent.dp;
            if (this.$root.$logE("016000501"), u.addressId || c.virtualChargeAccount || c.addPhoneNumber) if (this.data.isPresale) i.$toast.show("请到蘑菇街PC或APP上购买预售商品"); else {
                var g = (a = h.getCreateOrderParams()).repayStageReqDTO && a.repayStageReqDTO.num || 0, m = s.getContext("mwp.TradeWebBuy.createOrderActionlet", "1", {
                    method: "POST"
                }), T = m.getCookies();
                if (a.extensions.cps = T.__cps || "", a.extensions.cpsUnion = T.__cps_union || "", 
                a.extensions.dot = (0, r.getFromId)() + "_" + (0, r.getScene)(), c.virtualChargeAccount || c.addPhoneNumber) {
                    var f = l.tip, $ = l.chargeNumber;
                    if (!(f && f.isCorrect && $)) return void i.$toast.show("请填写正确的号码！");
                    c.virtualChargeAccount && (a.createOrderShopGroupReqDTOList[0].extensions.virtualChargeAccount = $), 
                    c.addPhoneNumber && (a.createOrderShopGroupReqDTOList[0].extensions.account = $);
                }
                if (p = JSON.stringify({
                    createOrderRequestStr: JSON.stringify(a),
                    marketType: "market_mogujie"
                }), !d) {
                    this.$parent.$loading.show(), this.setData({
                        lock: !0
                    });
                    var O = o.default.get("local.number") || {};
                    if (c.virtualChargeAccount && l.chargeNumber) {
                        var v = l.virtualChargeInfo;
                        O[v.accountType + v.leafCid] = l.chargeNumber;
                    }
                    o.default.put("local.number", O), m.request(p).then(function(a) {
                        var t = e.$parent.data.type;
                        if (e.$parent.$loading.hide(), a && a.data) {
                            o.default.remove("tick.recommend");
                            var r = a.data, i = r.payId, s = r.payOrderId, c = h.channel, l = r && r.createOrderShopOrderResDTOList && r.createOrderShopOrderResDTOList, u = l[0] && l[0].orderTag && l[0].orderTag.inputTag, d = "PT" === u && "channel_pintuan" === c, p = r && r.createOrderShopOrderResDTOList && r.createOrderShopOrderResDTOList[0] && r.createOrderShopOrderResDTOList[0].orderTag && r.createOrderShopOrderResDTOList[0].orderTag.itemTag, m = l && l[0] && l[0].pinTuanResDTO && l[0].pinTuanResDTO.tuanId || r.createOrderShopOrderResDTOList[0].shopOrderId, T = e.$root.query.acm, f = e.$root.query.cparam, $ = e.$root.query.liveParams, O = n.default.pinshare({
                                tuanId: m
                            }), v = !0, C = d ? O : n.default.payresult({
                                payOrderId: s
                            });
                            e.$parent.$loading.hide(), T && (C += "&acm=" + T), f && (C += "&cparam=" + f), 
                            $ && (C += "&liveParams=" + $), l.length && l.forEach(function(e) {
                                return "PT" != (e.orderTag && e.orderTag.inputTag) || (v = !1, !1);
                            });
                            var P = {
                                payId: i,
                                res: r,
                                isChannelPinTuan: d,
                                callBackUrl: C,
                                noPinTuan: v,
                                pinTuanTag: u,
                                pinTuanUrl: O,
                                itemTag: p,
                                stagingNum: g
                            };
                            if (l[0] && l[0].pinTuanResDTO && l[0].pinTuanResDTO.tuanMessage) return void e.$parent.$toast.show(l[0].pinTuanResDTO.tuanMessage, 2500, e.tipCallBack(P));
                            e.tipCallBack(P);
                        } else {
                            if (e.$parent.$loading.hide(), e.setData({
                                lock: !1
                            }), "FAIL_BIZ_BIZ_FREE_COUPON_USED" == a.ret) return void wx.showModal({
                                title: "异常提示",
                                content: a.msg,
                                showCancel: !1,
                                confirmText: "确定",
                                confirmColor: "#ff5777",
                                success: function(a) {
                                    a.confirm && ("normal" == t ? wx.navigateBack() : e.$parent.close());
                                }
                            });
                            e.$parent.$toast.show(a.msg || "系统异常");
                        }
                    }).catch(function(a) {
                        e.$parent.$loading.hide(), t.default.showUserError(a) || e.$parent.$toast.show(a.message);
                    }), console.log(a);
                }
            } else i.$toast.show("请添加收货地址！");
        },
        navigateAfaterPay: function(e) {
            var a = this.$parent.data.type, t = e.callBackUrl;
            "normal" == a ? this.$root.$redirect(t) : this.$root.$navigate(t);
        },
        navigatePayCancel: function(e) {
            "normal" == this.$parent.data.type && (e.isChannelPinTuan ? this.$root.$redirect(n.default.pintuanOrderList({
                orderStatus: "all"
            })) : this.$root.$redirect(n.default.orderList({
                orderStatus: "all"
            })));
        }
    }
};