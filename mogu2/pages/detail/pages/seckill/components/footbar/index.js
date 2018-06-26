function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = t(require("../../../../../../components/skudialog/index")), e = t(require("../../../../../../components/countdown/index")), s = t(require("../../../../components/footshop/index")), o = t(require("../../../../../../common/m")), r = function(t) {
    if (t && t.__esModule) return t;
    var i = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (i[e] = t[e]);
    return i.default = t, i;
}(require("../../../../components/base/index")), a = t(require("../../../../../../common/service/url")), n = t(require("../../../../../../common/pay/index")), d = t(require("../../../../components/base/color")), u = t(require("../sliderVerify/index")), l = r.handleRequestError, h = o.default.MWP;

exports.default = {
    data: function() {
        return {};
    },
    components: {
        skuDialog: i.default,
        countdown: e.default,
        footshop: s.default,
        color: d.default,
        sliderverify: u.default
    },
    onLoad: function() {
        this.$on("confirmSku", this.confirmSku);
    },
    init: function(t, i) {
        var e = this;
        this.itemId = i.itemId, this.activityId = i.activityId, this.ptp = i.ptp;
        var s = t.shopInfo, o = t.seckillInfo, r = o.status, a = o.startTime, n = o.countdown, d = s.shopId;
        this.startTime = a, this.status = r;
        var u = this.getButtonStatus(r);
        this.secKillId = o.secKillId || t.secKillId, this.choose = {}, this.$skuDialog.init({
            skuInfo: t.skuInfo,
            defaultImage: t.topImages[0],
            sizeHelper: t.sizeHelper,
            itemId: this.itemId,
            activityId: this.activityId,
            context: this,
            maxNumber: 1
        }), this.$countdown.init({
            format: "hh:mm:ss",
            countdown: n
        }), this.$footshop.init({
            shopId: d
        }), this.setData({
            status: r,
            buttonStatus: u,
            shopId: d
        }), this.$root.$wrapper.$on("$bottomBar.bannerClickHandler", this.callMoreSkuClick.bind(this)), 
        this.$sliderverify.$on("valid-success", function(t) {
            e.buyNow(e.choose, t);
        });
    },
    initMceData: function(t) {
        var i = t.default && t.default.list, e = i && i.length > 0 && i[0];
        this.$sliderverify.init(e);
    },
    getButtonStatus: function(t) {
        var i = this.startTime, e = {
            disabled: !1,
            text: "",
            tips: ""
        };
        switch (t) {
          case 0:
            e = {
                disabled: !0,
                text: "即将开始",
                tips: i ? new Date(1e3 * i).toFormattedString("M月d日 hh:mm:ss") + " 开始秒杀" : ""
            }, this.isDisabled = !0, this.needLoading = !1;
            break;

          case 1:
            e = {
                disabled: !1,
                text: this.isValidLoading ? "刷新中..." : "即将开抢 点击刷新",
                tips: "距离秒杀开始还有"
            }, this.isDisabled = !0, this.needLoading = !0;
            break;

          case 2:
            e = {
                disabled: !1,
                text: "立即秒杀",
                tips: ""
            }, this.isDisabled = !1, this.needLoading = !1;
            break;

          case 3:
          default:
            e = {
                disabled: !0,
                text: "秒杀结束"
            }, this.isDisabled = !0, this.needLoading = !1;
        }
        return e;
    },
    refreshValid: function() {
        var t = this;
        this.isValidLoading || (this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.show"), 
        this.isValidLoading = !0, this.setData({
            buttonStatus: this.getButtonStatus(this.status)
        }), this.$root.$mwp("mwp.ares.ms.valid", "1", {
            secKillId: this.secKillId
        }).then(h.filterResult).then(function(i) {
            var e = i.status;
            if (e !== t.status) {
                t.status = e, t.setData({
                    status: e,
                    buttonStatus: t.getButtonStatus(e)
                });
                var s = 0 === e || 1 === e ? "186" : "130";
                t.$root.$wrapper && t.$root.$wrapper.$emit("$quickbar.bottom", s);
            }
            2 === e ? (t.msSign = i.msSign, t.serverTime = i.serverTime, t.isDisabled = !1, 
            t.showSku()) : (3 === e && t.$countdown.init({
                format: "hh:mm:ss",
                countdown: 0
            }), t.$root.$wrapper && t.$root.$wrapper.$emit("$toast.show", i.message)), t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide"), 
            t.isValidLoading = !1, t.setData({
                buttonStatus: t.getButtonStatus(e)
            });
        }).catch(function(i) {
            t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide"), l.bind(t, i)(), t.isValidLoading = !1, 
            t.setData({
                buttonStatus: t.getButtonStatus(t.status)
            });
        }));
    },
    confirmSku: function(t) {
        this.choose = t, this.confirmProcess(t);
    },
    confirmProcess: function(t) {
        var i = this, e = t.sku, s = t.number;
        this.$root.$logE("016000112", {
            num: s,
            disprice: (e.nowprice / 100).toFixed(2),
            price: (e.price / 100).toFixed(2),
            stockId: e.stockId
        }), this.hideSku(), setTimeout(function() {
            i.showSlider();
        }, 400);
    },
    showSlider: function() {
        this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.show"), this.$sliderverify.showSlider();
    },
    buyNow: function(t, i) {
        var e = this;
        if (!this.isBuyLoading) {
            this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.show"), this.isBuyLoading = !0;
            var s = t.sku, o = {
                secKillId: this.secKillId,
                stockId: s.stockId,
                msSign: this.msSign,
                serverTime: this.serverTime,
                probkey: i,
                ptp: this.ptp,
                orderFrom: "detail",
                ptpCnt: this.$root.ptpData.ptp_cnt
            };
            this.$root.$mwp("mwp.ares.ms.buynow", "1", o).then(h.filterResult).then(function(t) {
                e.buyProcess(t), e.$root.$wrapper && e.$root.$wrapper.$emit("$loading.hide"), e.isBuyLoading = !1;
            }).catch(function(t) {
                "FAIL_BIZ_1009" === t.code && e.$parent.$address.onAddressClick(), e.$root.$wrapper && e.$root.$wrapper.$emit("$loading.hide"), 
                l.bind(e, t)(), e.isBuyLoading = !1;
            });
        }
    },
    buyProcess: function(t) {
        var i = t.payId;
        if (i) {
            var e = new n.default({
                payId: i,
                platform: "mgj"
            });
            this.callPay(e);
        } else this.$root.$redirect(a.default.orderList({
            orderStatus: "all"
        }));
    },
    callPay: function(t) {
        var i = this;
        t.exec().then(function(e) {
            i.$root.$wrapper && i.$root.$wrapper.$emit("$loading.hide"), e.success && "2101" == e.code ? i.$root.$redirect(a.default.orderList({
                orderStatus: "all"
            })) : "2201" == e.code ? i.$root.$redirect(a.default.orderList({
                orderStatus: "all"
            })) : wx.showModal({
                title: "支付失败",
                content: "支付失败了，是否要重新支付？",
                cancelText: "放弃支付",
                confirmText: "重新支付",
                confirmColor: "#FB4747",
                success: function(e) {
                    e.confirm ? i.callPay(t) : i.$root.$redirect(a.default.orderList({
                        orderStatus: "all"
                    }));
                }
            });
        }).catch(function(t) {
            i.$root.$wrapper && i.$root.$wrapper.$emit("$loading.hide"), console.log(t);
        });
    },
    methods: {
        onBuyClick: function(t) {
            var i = t.detail.formId;
            this.$root.$logForm(i, 2), !this.needLoading && this.isDisabled || this.refreshValid();
        },
        callMoreSkuClick: function() {
            2 === this.status ? this.refreshValid() : this.showSku();
        },
        showSku: function() {
            this.$sliderverify.getInitialData(), this.$skuDialog.showSku({
                isDisabled: this.isDisabled
            });
        },
        hideSku: function() {
            this.$skuDialog.hideSku();
        }
    }
};