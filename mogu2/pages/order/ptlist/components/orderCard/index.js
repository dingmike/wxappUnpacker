function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../shopItem/index")), r = require("../../../common/base.js"), a = e(require("../../../../../common/service/url.js")), o = e(require("../../../../../common/utils/cache.js")), i = !1;

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
        gotoDetail: function(e) {
            var t = e.currentTarget.dataset, r = t.iswaitpay ? t.payorderid : t.shoporderid;
            this.$parent.$navigate(a.default.orderDetail({
                orderId: r
            }));
        },
        lotteryResult: function(e, t) {
            this.$parent.$navigate("/pages/pintuan/lotteryresult/index", {
                activityId: e,
                orderId: t
            });
        },
        logisticsOpt: function(e) {
            this.$parent.$navigate(a.default.logisticsList({
                orderId: e,
                shopOrderId: e,
                type: "order"
            }));
        },
        orderRateOpt: function(e) {
            o.default.put("PT_Detail_Operate", "orderRateOpt"), this.$parent.$navigate(a.default.rateAdd({
                orderId: e
            }));
        },
        orderAddRateOpt: function(e) {
            o.default.put("PT_Detail_Operate", "orderAddRateOpt"), this.$parent.$navigateRed(a.default.rateAppend({
                orderId: e
            }));
        },
        pintuanDetail: function(e, t) {
            this.$parent.$navigate(a.default.pinshare({
                tuanId: e,
                itemId: t
            }));
        },
        pintuanRed: function(e, t) {
            this.$parent.$navigate(a.default.pintuanRed({
                tuanId: e,
                itemId: t
            }));
        },
        operateClick: function(e) {
            var t = this, o = e.currentTarget.dataset, d = e.detail && e.detail.formId, s = this.$parent.$toast, n = o.operationname || "", p = o.shoplist || {};
            switch (n) {
              case "opt_pay_order":
              case "opt_prepay_order":
              case "opt_tailpay_order":
                if (this.$root.$logForm(d, 1), i) return;
                i = !0, setTimeout(function() {
                    i = !1;
                }, 3e3), this.$root.$loading.show(), (0, r.payOrderOpt)(this.$root.$cashier, p.payOrderId, this.$root.$loading, {
                    successCb: function() {
                        var e = this;
                        i = !1, s.show("支付成功", function() {
                            e.$emit("reloadPage"), e.$parent.$navigate(a.default.pinshare({
                                tuanId: p.tuanId,
                                itemId: p.itemIdEsc
                            }));
                        });
                    }.bind(this),
                    cancelCb: function() {
                        i = !1, s.show("您已取消支付");
                    }
                });
                break;

              case "opt_show_delivery_order":
                this.logisticsOpt(p.shopOrderId);
                break;

              case "opt_confirm_order":
                this.$root.$logForm(d, 1), wx.showModal({
                    title: "提示",
                    confirmColor: "#ff5777",
                    content: "请您收到货后再点击“确定”，否则可能钱货两空！",
                    success: function(e) {
                        var t = this;
                        e.confirm && (0, r.orderConfirmOpt)(p.shopOrderId, p.shopOrderIdEsc).then(function(e) {
                            e.success ? s.show(e.message || "确认收货成功", function() {
                                t.orderRateOpt(p.shopOrderIdEsc);
                            }) : s.show(e.message || "确认收货失败，请稍后再试");
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
                this.$root.$logForm(d, 1), wx.showModal({
                    title: "",
                    confirmColor: "#ff5777",
                    content: "这么好的宝贝，确定不要了吗？",
                    success: function(e) {
                        e && e.confirm && (0, r.cancelOrderOpt)(p.payOrderId || p.shopOrderId).then(function(e) {
                            e.success ? (t.$emit("reloadPage"), s.show(e.message || "取消订单成功")) : s.show(e.message || "取消订单失败，请稍后再试");
                        });
                    }
                });
                break;

              case "opt_remind_ship_order":
                this.$root.$logForm(d, 1), (0, r.orderRemindOpt)(p.shopOrderId).then(function(e) {
                    e.success ? s.show(e.message || "提醒商家发货成功") : s.show(e.message || "提醒失败，请稍后再试");
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

              case "opt_pintuan_pay_order":
              case "opt_order_detail":
                var c = p.isWaitPay ? p.payOrderId : p.shopOrderId;
                this.$parent.$navigate(a.default.orderDetail({
                    orderId: c
                }));
            }
        }
    }
};