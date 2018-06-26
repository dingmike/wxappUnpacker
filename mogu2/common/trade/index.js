function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var n = e[a];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, a, n) {
        return a && t(e.prototype, a), n && t(e, n), e;
    };
}(), n = t(require("../m.js")), i = t(require("../service/user")), r = t(require("../utils/cache")), o = t(require("../config")), s = n.default.MWP, u = n.default.fn, c = u.sendMsg, p = u.pick, l = o.default.Trade, h = l && l.sourceMarket || "weixin", d = l && l.marketType || "market_mogujie", $ = function() {
    function t(a, n, i, r) {
        var o = this;
        e(this, t), this.$toast = a, this.$loading = n, this.options = i || {}, this.$root = r, 
        this.$root && this.$root.$getOptions().then(function(t) {
            o.options = Object.assign({}, t, i);
        });
    }
    return a(t, null, [ {
        key: "getPromotionType",
        value: function() {
            return {
                Normal: 1,
                NormalPintuan: 4,
                PinTuan: 2,
                Rush: 3,
                JiaJiaGou: 5,
                TuanGou: 6,
                ShopKill: 7,
                Channel: 8,
                Live: 9
            };
        }
    } ]), a(t, [ {
        key: "addCart",
        value: function(t, e) {
            var a = this;
            return this.options = Object.assign({}, this.options, e), new n.default.Promise(function(e, n) {
                a._addCartRquest(t, !1, e, n);
            });
        }
    }, {
        key: "buy",
        value: function(t, e) {
            var a = this;
            return this.options = Object.assign({}, this.options, e), new n.default.Promise(function(e, n) {
                if (a.options.isPresale) return a.$toast && a.$toast.show("小程序暂不支持预售，请移步蘑菇街App下单哟"), 
                void (a.$root.$wrapper && a.$root.$wrapper.$emit("$toast.show", "小程序暂不支持预售，请移步蘑菇街App下单哟"));
                var i = a._getBuyParams(t, a.options, a.$root);
                a._buyRequest(i, e, n);
            });
        }
    }, {
        key: "_addCartRquest",
        value: function(t, e, a, n) {
            var i = this, r = t.sku, o = t.number, u = r.stockId, c = r.nowprice, p = this.options.liveParams || "", l = this.$root && this.$root.ptpData || {}, $ = l.ptp_url || this.options.ptp || "", y = l.ptp_cnt || this.options.ptpCnt || "", f = {
                liveParams: p && JSON.stringify(p) || "",
                ptpCnt: y
            };
            this.$loading && this.$loading.show(), this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.show"), 
            s.request("mwp.CartWeb.unifiedAddCart", "2", {
                stockId: u,
                number: o,
                price: c,
                ptp: $,
                extensions: JSON.stringify(f),
                marketType: d,
                sourceMarket: h,
                force: e
            }).then(s.filterResult).then(function(r) {
                r.overMax && !e ? i._showCartCheck(t, a, n) : (i.$toast && i.$toast.show("加入购物车成功"), 
                i.$root.$wrapper && i.$root.$wrapper.$emit("$toast.show", "加入购物车成功"), a({
                    result: "success"
                })), i.$loading && i.$loading.hide(), i.$root.$wrapper && i.$root.$wrapper.$emit("$loading.hide");
            }).catch(function(t) {
                i.$loading && i.$loading.hide(), i.$root.$wrapper && i.$root.$wrapper.$emit("$loading.hide"), 
                i.handleRequestError(t), a({
                    result: "error"
                });
            });
        }
    }, {
        key: "_showCartCheck",
        value: function(t, e, a) {
            var n = this;
            wx.showModal({
                title: "购物车空间不足",
                content: "你的购物车商品已满200件",
                cancelColor: "#666666",
                confirmColor: "#FF5777",
                cancelText: "取消",
                confirmText: "继续加购",
                success: function(i) {
                    i.confirm ? n._addCartRquest(t, !0, e, a) : i.cancel && e({
                        result: "cancel"
                    });
                },
                fail: function(t) {
                    n.$toast && n.$toast.show(t.message), n.$root.$wrapper && n.$root.$wrapper.$emit("$toast.show", t.message), 
                    e({
                        result: "error"
                    });
                }
            });
        }
    }, {
        key: "handleRequestError",
        value: function(t) {
            console.log(t), c(t, {
                _author: "changsheng",
                threshold: 1
            }), i.default.showUserError(t) || (this.$toast && this.$toast.show(t.message), this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", t.message));
        }
    }, {
        key: "_getBuyParams",
        value: function(e, a, n) {
            var i = a.type, r = e.sku.stockId, o = e.installment, s = e.number, u = a.liveParams, c = a.orderFrom || "detail", l = a.isNew, $ = a.tuanId, y = a.activityId, f = a.tuanType, m = a.hasQualification, v = a.channelInfo, g = n && n.ptpData || {}, w = g.ptp_url || a.ptp || "", k = g.ptp_cnt || a.ptpCnt || "", b = w, T = e.outType || a.outType, _ = t.getPromotionType(), P = {
                shops: [ {
                    skus: [ {
                        stockId: r,
                        number: s,
                        ptp: b,
                        ptpCnt: k,
                        liveParams: u
                    } ]
                } ],
                orderFrom: c,
                marketType: d,
                sourceMarket: h
            };
            switch (i) {
              case _.NormalPintuan:
                P = {
                    shops: [ {
                        skus: [ {
                            stockId: r,
                            number: s,
                            ptp: b,
                            ptpCnt: k,
                            liveParams: u,
                            pinTuan: {
                                tuanType: f
                            }
                        } ]
                    } ],
                    orderFrom: c,
                    marketType: d,
                    sourceMarket: h
                }, Object.assign(P);
                break;

              case _.PinTuan:
                Object.assign(P, {
                    pinTuan: {
                        isOwner: !$,
                        isNew: l,
                        tuanId: $,
                        tuanType: f,
                        hasQualification: m
                    },
                    activityId: y,
                    activityType: T || 4,
                    channel: "channel_pintuan"
                });
                break;

              case _.Rush:
                Object.assign(P, {
                    activityId: y,
                    activityType: 1,
                    channel: "channel_kuaiqiang"
                });
                break;

              case _.JiaJiaGou:
                Object.assign(P, {
                    channel: "channel_jiajiagou",
                    activityType: 7,
                    activityId: y
                });
                break;

              case _.TuanGou:
                Object.assign(P, {
                    channel: "channel_brand",
                    activityType: 8,
                    activityId: y
                });
                break;

              case _.ShopKill:
                Object.assign(P, {
                    channel: "channel_shop_seckill",
                    activityType: 10,
                    activityId: y
                });
                break;

              case _.Live:
                Object.assign(P, {
                    channel: "channel_live_sale",
                    activityType: 11,
                    activityId: y
                });
                break;

              case _.Channel:
                Object.assign(P, p(v, [ "channel", "activityId", "activityType" ]));
            }
            return e.installmentNum && o && (P.repayStageReqDTO = {
                payway: "repayStage",
                perPrice: o.perPrice,
                num: o.num,
                fee: o.fee,
                chosen: !0
            }), P;
        }
    }, {
        key: "_buyRequest",
        value: function(t, e) {
            r.default.put("buy.buyParams", t), e({
                result: "success"
            });
        }
    } ]), t;
}();

exports.default = $;