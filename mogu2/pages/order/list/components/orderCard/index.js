function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../shopItem/index")), r = require("../../../common/base.js"), o = e(require("../../../../../common/service/url.js")), a = e(require("../../../../../common/utils/cache.js")), s = e(require("../../../../../common/m.js")).default.MWP, i = !1;

exports.default = {
    name: "orderCard",
    components: {
        shopItem: t.default
    },
    data: function() {
        return {};
    },
    onLoad: function() {},
    onReady: function() {},
    methods: {
        pintuanDetail: function(e, t) {
            this.$parent.$navigate(o.default.pinshare({
                tuanId: e,
                itemId: t
            }));
        },
        pintuanRed: function(e, t) {
            this.$parent.$navigate(o.default.pintuanRed({
                tuanId: e,
                itemId: t
            }));
        },
        lotteryResult: function(e, t) {
            this.$parent.$navigate("/pages/pintuan/lotteryresult/index", {
                activityId: e,
                orderId: t
            });
        },
        gotoDetail: function(e) {
            var t = e.currentTarget.dataset, r = t.iswaitpay ? t.payorderid : t.shoporderid;
            this.$parent.$navigate(o.default.orderDetail({
                orderId: r
            }));
        },
        logisticsOpt: function(e) {
            this.$parent.$navigate(o.default.logisticsList({
                orderId: e,
                shopOrderId: e,
                type: "order"
            }));
        },
        orderRateOpt: function(e) {
            a.default.put("Order_Detail_Operate", "orderRateOpt"), this.$parent.$navigate(o.default.rateAdd({
                orderId: e
            }));
        },
        orderAddRateOpt: function(e) {
            a.default.put("Order_Detail_Operate", "orderRateOpt"), this.$parent.$navigate(o.default.rateAppend({
                orderId: e
            }));
        },
        operateClick: function(e) {
            var t = this, a = e.currentTarget.dataset, n = e.detail && e.detail.formId, d = this.$parent.$toast, c = a.operationname || "", p = a.shoplist || {}, u = a.ischannel;
            switch (c) {
              case "opt_pay_order":
              case "opt_prepay_order":
              case "opt_tailpay_order":
                if (this.$root.$logForm(n, 1), i) return;
                i = !0, setTimeout(function() {
                    i = !1;
                }, 3e3), this.$root.$loading.show(), (0, r.payOrderOpt)(this.$root.$cashier, p.payOrderId, this.$root.$loading, {
                    successCb: function() {
                        var e = this;
                        i = !1, d.show("支付成功", 2e3, function() {
                            e.$emit("reloadPage"), u ? e.$parent.$navigate(o.default.pinshare({
                                tuanId: p.tuanId,
                                itemId: p.itemIdEsc
                            })) : e.$parent.$navigate(o.default.payresult({
                                payOrderId: p.payOrderId
                            }));
                        });
                    }.bind(this),
                    cancelCb: function() {
                        i = !1, d.show("您已取消支付");
                    }
                });
                break;

              case "opt_show_delivery_order":
                this.logisticsOpt(p.shopOrderId);
                break;

              case "opt_confirm_order":
              case "opt_confirm_use_virtual_order":
                this.$root.$logForm(n, 1);
                var h = p.orderTags && p.orderTags.indexOf("BEAUTYCLINIC") >= 0;
                wx.showModal({
                    title: "提示",
                    confirmColor: "#ff5777",
                    content: "请您在" + (h ? "享受服务时" : "收到货后") + "再点击“确定”，否则可能钱货两空",
                    success: function(e) {
                        e.confirm && (0, r.orderConfirmOpt)(p.shopOrderId, p.shopOrderIdEsc).then(function(e) {
                            e.success ? d.show(e.message || (h ? "确认使用成功" : "确认收货成功"), function() {
                                t.orderRateOpt(p.shopOrderIdEsc);
                            }) : d.show(e.message || "确认收货失败，请稍后再试");
                        });
                    }
                });
                break;

              case "opt_rate_order":
                this.orderRateOpt(p.shopOrderIdEsc);
                break;

              case "opt_append_rate_order":
                this.orderAddRateOpt(p.shopOrderIdEsc);
                break;

              case "opt_cancel_order":
                this.$root.$logForm(n, 1), wx.showModal({
                    title: "",
                    confirmColor: "#ff5777",
                    content: "这么好的宝贝，确定不要了吗？",
                    success: function(e) {
                        e && e.confirm && (0, r.cancelOrderOpt)(p.payOrderId || p.shopOrderId).then(function(e) {
                            e.success ? (d.show(e.message || "取消订单成功"), t.$emit("reloadPage")) : d.show(e.message || "取消订单失败，请稍后再试");
                        });
                    }
                });
                break;

              case "opt_remind_ship_order":
                this.$root.$logForm(n, 1), (0, r.orderRemindOpt)(p.shopOrderId).then(function(e) {
                    e.success ? d.show(e.message || "提醒商家发货成功") : d.show(e.message || "提醒失败，请稍后再试");
                });
                break;

              case "opt_pintuan_detail":
              case "opt_invite_pintuan":
                this.pintuanDetail(p.tuanId, p.itemIdEsc);
                break;

              case "opt_pintuan_detail_red":
              case "opt_invite_pintuan_red":
                this.pintuanRed(p.tuanId, p.itemId);
                break;

              case "opt_choujiang_detail":
                this.lotteryResult(p.activityId, p.shopOrderId);
                break;

              case "opt_delay_receive":
                this.$root.$logForm(n, 1), wx.showModal({
                    title: "",
                    confirmColor: "#ff5777",
                    content: "延后3天确认收货，仅限延长一次",
                    success: function(e) {
                        e && e.confirm && s.request("mwp.OrderManagement.delayReceivedByUserAction", "1", {
                            orderId: p.shopOrderId
                        }).then(s.filterResult).then(function() {
                            d.show("已成功延长收货3天"), t.$emit("reloadPage");
                        }).catch(function(e) {
                            d.show(e.message);
                        });
                    }
                });
            }
        },
        showMoreProducts: function(e) {
            var t = e.currentTarget.dataset, r = t.orderindex, o = t.shopindex;
            this.$emit("showMore", r, o);
        }
    }
};