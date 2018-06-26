function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = t(require("../../components/coupon/index")), e = t(require("../../../../components/imcall/index"));

exports.default = {
    components: {
        couponList: s.default,
        imCall: e.default
    },
    data: function() {
        return {
            shops: [],
            $couponList: {},
            showModifyNumberGroup: {},
            lockAdd: !1,
            lockSub: !1
        };
    },
    onLoad: function() {
        this.params = this.$parent.data.nextReqData;
    },
    methods: {
        InputNumCallback: function(t, s, e, a, o) {
            var i = this, r = void 0, n = void 0, u = this.$parent.dp;
            this.data.lockSub || 0 != t && (t > a || (this.setData({
                lockSub: !0
            }), r = u.reQueryString({
                shopKey: e,
                skuId: s,
                number: t
            }), n = JSON.stringify({
                createOrderRequestStr: JSON.stringify(r),
                marketType: "market_mogujie"
            }), this.$emit("update", {
                requeryDataStr: n,
                setLock: function() {
                    i.setData({
                        lockSub: !1
                    });
                },
                callback: function() {
                    i.setData({
                        lockSub: !1
                    }), u.reQueryString({
                        shopKey: e,
                        skuId: s,
                        number: o
                    });
                }
            })));
        },
        triggerNumInput: function(t) {
            var s = this, e = t.target, a = e.id, o = e.dataset.shop, i = e.dataset.number, r = e.dataset.stock;
            this.$parent.$goodsNumDialog.show(i, {
                stock: r,
                ok: function(t) {
                    s.InputNumCallback(t, a, o, r, i);
                }
            });
        },
        setShopOpt: function(t) {
            var s = [];
            t.shops.forEach(function(t) {
                s.push(t.shopIdEsc);
            }), this.$imCall.setImOpts({
                shopIds: s
            }), this.setData(t);
        },
        delegate: function(t) {
            var s = t.target.dataset.type;
            "function" == typeof this[s] && this[s](t);
        },
        someDelegate: function(t) {
            var s = t.target.dataset.handler;
            "function" == typeof this[s] && this[s](t);
        },
        formDelegate: function(t) {
            var s = t.target.dataset.handler;
            "function" == typeof this[s] && this[s](t);
        },
        formSubmitHandler: function(t) {
            var s = t.detail.formId;
            this.$root.$logForm(s, 1), this.delegate(t.detail);
        },
        showModifyNumber: function(t) {
            var s = t.target.id, e = t.target.dataset.shop, a = this.data.shops, o = this.data && this.data.showModifyNumberGroup || {};
            a.map(function(t) {
                var a = t.skuGroupList || [];
                t.shopKey == e && a.map(function(t) {
                    t.skuIdEsc == s && (o[s] = !0);
                });
            }), this.setData({
                shops: a,
                showModifyNumberGroup: o
            });
        },
        callClickSub: function(t) {
            var s = t.target, e = s.id, a = s.dataset.shop, o = s.dataset.number, i = s.dataset.stock;
            this.$root.$logE("016010002"), this.InputNumCallback(--o, e, a, i, o);
        },
        callClickAdd: function(t) {
            var s = t.target, e = s.id, a = s.dataset.shop, o = s.dataset.number, i = s.dataset.stock;
            this.$root.$logE("016010002"), this.InputNumCallback(++o, e, a, i, o);
        },
        callClickShopSale: function(t) {
            var s = this.data.shops, e = t.target.dataset.shop, a = t.target.dataset.promotionKey, o = [];
            s.map(function(t) {
                t.shopKey == e && (o = t.promotionList);
            }), o.length <= 1 || (this.$couponList.setData({
                title: "请选择优惠券",
                shopKey: e,
                list: o,
                isExpressList: !1,
                activeKey: a,
                showList: !0
            }), this.setData({
                showList: !0
            }));
        },
        callClickExpress: function(t) {
            var s = this.data.shops, e = t.target.dataset.shop, a = t.target.dataset.expressCode, o = [];
            s.map(function(t) {
                t.shopKey == e && t.logisticsList && t.logisticsList.length > 1 && t.logisticsList.map(function(t) {
                    o.push({
                        promotionKey: t.expressCode,
                        promotionDesc: t.expressName
                    });
                });
            }), 0 != o.length && (this.$couponList.setData({
                title: "请选择快递",
                shopKey: e,
                list: o,
                isExpressList: !0,
                activeKey: a,
                showList: !0
            }), this.setData({
                showList: !0
            }));
        },
        chooseCouponItem: function(t) {
            var s = t.target.id, e = void 0, a = void 0, o = this.$couponList.data.shopKey, i = t.target.dataset.activeKey, r = "logisticsCode" == t.target.dataset.cat ? "logisticsCode" : "promotionKey", n = {
                shopKey: o
            }, u = this.$parent.dp;
            n[r] = s, e = u.reQueryString(n), a = JSON.stringify({
                createOrderRequestStr: JSON.stringify(e),
                marketType: "market_mogujie"
            }), this.$emit("update", {
                requeryDataStr: a,
                callback: function() {
                    n[r] = i, u.reQueryString(n);
                }
            }), this.$couponList.setData({
                showList: !1,
                isExpressList: null
            });
        },
        callClickTaxCompliance: function(t) {
            var s = this, e = t.target.dataset.shopkey, a = this.$parent.data.shopTaxMap;
            a[e] || (a[e] = !0, this.setData({
                shopTaxMap: a
            }, function() {
                setTimeout(function() {
                    a[e] = !1, s.setData({
                        shopTaxMap: a
                    });
                }, 4e3);
            }));
        }
    }
};