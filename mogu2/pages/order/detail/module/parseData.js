function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../../../../common/utils/dataProtect/index.js")), t = e(require("./freightStatus.js")), o = function(e, r) {
    return r = r && r.length > 0 ? r : "yyyy-MM-dd hh:mm:ss", e && Date.format(new Date(1e3 * e), r);
};

exports.default = function(e) {
    var i = [], a = null, n = null, d = e.payOrder.isWaitPay, s = r.default.get(e.payOrder, "payOrderPromotionInfo.modouInfo.modouUseCount"), p = r.default.get(e.payOrder, "payOrderPromotionInfo.payDiscountInfo.discountAmount"), u = e.payOrder.payChannel, m = e.orderStageInfo, f = void 0;
    if (r.default.get(e, "orderStageInfo.orderStageList") && m.orderStageList.length > 0) {
        var c = m.orderStageList, h = m.stageStatus, l = "", I = "";
        switch (h) {
          case "UN_PRE_PAY":
            l = "等待付款", I = "";
            break;

          case "WAITING_TAIL_PAY_OPEN":
            l = "(已付)", I = "";
            break;

          case "ORDER_CANCELLED_UNPREPAID":
            l = "未付款", I = "";
            break;

          case "UN_TAIL_PAY":
            l = "(已付)", I = "等待付款";
            break;

          case "TAIL_PAY_SUCCESS":
            l = "(已付)", I = "(已付)";
            break;

          case "ORDER_CANCELLED_PREPAID":
            l = "(已付)", I = "未付款";
        }
        f = {
            payGoodsPrice: (c[0].goodsPrice / 100).toFixed(2),
            tailGoodsPrice: (c[1].goodsPrice / 100).toFixed(2),
            payGoodsText: l,
            tailGoodsText: I,
            beginTime: o(c[1].beginTime, "MM月dd日 hh:mm:ss"),
            stageStatus: h
        };
    }
    var O = !0, _ = !1, y = void 0;
    try {
        for (var P, T = e.shopOrderList[Symbol.iterator](); !(O = (P = T.next()).done); O = !0) {
            var g = P.value, S = g.shopInfo || {}, v = "", E = "";
            S.shopIdEsc && (v = "1qfnyw" === S.shopIdEsc ? "javascript:;" : "//m.mogujie.com/x6/shop/" + S.shopIdEsc);
            var x = g.priceInfo.originalShipExpense;
            E = g.priceInfo.currentShipExpense ? g.shipExpressNameRemark : g.shopOrderPriceRemark;
            var A = g.orderTags || [], L = -1 !== A.indexOf("PT"), R = -1 !== A.indexOf("PT_HB"), k = -1 !== A.indexOf("taxCompliance"), b = -1 !== A.indexOf("freight");
            if (L && g.pintuanInfo) {
                var C = g.pintuanInfo || {};
                void 0 !== C.pintuanRemainTime && (g.remainTime = C.pintuanRemainTime), C.pintuanStatus && ("PIN_TUAN_AFTER_PAID" === C.pintuanStatus && (g.orderStatus = C.pintuanStatus + "&&" + C.remainNums), 
                (/PIN_TUAN_LOCKED|PIN_TUAN_FAILED_AFTER_LOCK|PIN_TUAN_SUCCESS_AFTER_LOCK/.test(C.pintuanStatus) && /ORDER_PAID/.test(g.orderStatus) || "ORDER_CLOSED" == g.orderStatus && "PIN_TUAN_FAILED" == C.pintuanStatus || "ORDER_CLOSED" == g.orderStatus && "PIN_TUAN_FAILED_AFTER_LOCK" == C.pintuanStatus) && (g.orderStatus = C.pintuanStatus));
            }
            var D = g.priceInfo.currentTariff, N = !1, F = [], U = "", w = !0, M = !1, Y = void 0;
            try {
                for (var G, j = g.itemOrders[Symbol.iterator](); !(w = (G = j.next()).done); w = !0) {
                    var K = G.value, W = "";
                    if (r.default.get(K, "itemPromotionInfo.redPacketMap")) {
                        var q = K.itemPromotionInfo.redPacketMap;
                        for (var B in q) U = B, W = q[B];
                    }
                    K.orderServiceMark && K.orderServiceMark.bondedGoods && (N = !0);
                    var H = "";
                    if (g.orderTags && g.orderTags.length > 0) {
                        var z = !0, J = !1, Q = void 0;
                        try {
                            for (var V, X = g.orderTags[Symbol.iterator](); !(z = (V = X.next()).done); z = !0) {
                                var Z = V.value;
                                "LOTTERY" === Z ? H = "抽奖订单" : "YS" === Z ? H = "预售" : "PT" === Z && (H = "");
                            }
                        } catch (e) {
                            J = !0, Q = e;
                        } finally {
                            try {
                                !z && X.return && X.return();
                            } finally {
                                if (J) throw Q;
                            }
                        }
                        g.orderTags.indexOf("PT") >= 0 && g.orderTags.indexOf("LOTTERY") >= 0 && (H = "抽奖团");
                    }
                    K.itemOrderOperations = !!K.itemOrderOperations && K.itemOrderOperations.map(function(e) {
                        var r = e.operationName;
                        return e.isRefundShow = [ "opt_create_complaint", "opt_create_refund", "opt_show_detail_refund", "opt_show_detail_complaint", "opt_show_detail_refund", "opt_show_detail_complaint", "opt_pintuan_detail" ].indexOf(r) >= 0, 
                        e;
                    }), F.push({
                        isPintuanRed: R,
                        marketType: g.marketType,
                        orderTag: H,
                        orderServiceMark: K.orderServiceMark || {},
                        itemOrderId: K.itemOrderId,
                        hasShippedOrClosed: K.hasShippedOrClosed,
                        formatedUddt: K.formatedUddt,
                        itemIdEsc: K.itemIdEsc,
                        itemOrderIdEsc: K.itemOrderIdEsc,
                        imgUrl: K.imgUrl,
                        title: K.title,
                        skuAttributes: K.skuAttributes,
                        price: (K.price / 100).toFixed(2),
                        nowPrice: (K.nowPrice / 100).toFixed(2),
                        number: K.number,
                        redPacketDesc: r.default.get(K, "itemPromotionInfo.redPacketDesc"),
                        redPacketText: U,
                        redPacketNum: !!W && (W / 100).toFixed(2),
                        itemOrderOperations: K.itemOrderOperations,
                        activityIdEsc: g.pintuanInfo && g.pintuanInfo.activityId || "",
                        tuanId: g.pintuanInfo && g.pintuanInfo.tuanId || ""
                    });
                }
            } catch (e) {
                M = !0, Y = e;
            } finally {
                try {
                    !w && j.return && j.return();
                } finally {
                    if (M) throw Y;
                }
            }
            var $ = g.priceInfo.currentShipExpense - g.priceInfo.originalShipExpense, ee = g.priceInfo.currentPrice - g.priceInfo.originalPrice, re = ee > 0 ? "+" : "-", te = $ > 0 ? "+" : "-", oe = Math.abs(ee) ? re + "￥" + (Math.abs(ee) / 100).toFixed(2) : "", ie = Math.abs($) ? te + "￥" + (Math.abs($) / 100).toFixed(2) : "", ae = void 0, ne = void 0;
            if (g.promotionDetailInfoList && g.promotionDetailInfoList.length > 0) {
                var de = !0, se = !1, pe = void 0;
                try {
                    for (var ue, me = g.promotionDetailInfoList[Symbol.iterator](); !(de = (ue = me.next()).done); de = !0) {
                        var fe = ue.value;
                        switch (fe.promoType) {
                          case "promo_type_shop":
                            ae = fe;
                            break;

                          case "promo_type_platform":
                            ne = fe;
                        }
                    }
                } catch (e) {
                    se = !0, pe = e;
                } finally {
                    try {
                        !de && me.return && me.return();
                    } finally {
                        if (se) throw pe;
                    }
                }
            }
            i.push({
                isTaxCompliance: k,
                isFreight: b,
                isWaitPay: d,
                freightStatus: g.freightStatus,
                freightStatusDto: t.default[g.freightStatus],
                sellerUserId: g.sellerUserId,
                sellerUserIdEsc: g.sellerUserIdEsc,
                shopOrderId: g.shopOrderId,
                shopIdEsc: S.shopIdEsc,
                shopId: S.shopId,
                hideShopLink: S.hideShopLink,
                shopLogoUrl: S.shopLogoUrl,
                shopName: S.shopName,
                titleLink: v,
                imLink: "",
                buyerItemOrderPrice: (g.buyerItemOrderPrice / 100).toFixed(2),
                redPacketText: U,
                shipRemark: E,
                originalShipExpense: (x / 100).toFixed(2),
                currentTariff: (D / 100).toFixed(2),
                isCurrentTariff: N,
                promoShopInfo: ae,
                promoPlatformInfo: ne,
                discountAmount: (p / 100).toFixed(2),
                modouUseCount: s,
                shareOrderIds: r.default.get(g, "shopOrderPromotionInfo.shareOrderIds"),
                priceChangedRemark: oe,
                expenseChangedRemark: ie,
                shopPrice: d ? (g.shopOrderPrice / 100).toFixed(2) : (g.buyerFinalPrice / 100).toFixed(2),
                shopPriceTitle: d ? "店铺合计" : "实付金额",
                created: o(g.created),
                payTime: o(g.payTime),
                shipTime: o(g.shipTime),
                receiveTime: o(g.receiveTime),
                buyerComment: g.buyerComment,
                productList: F,
                useAmount: (r.default.get(g, "shopOrderPromotionInfo.payReturnInfo.useAmount") / 100).toFixed(2)
            });
        }
    } catch (e) {
        _ = !0, y = e;
    } finally {
        try {
            !O && T.return && T.return();
        } finally {
            if (_) throw y;
        }
    }
    var ce = e.shopOrderList[0];
    if (ce.shopOrderOperations && ce.shopOrderOperations.length) {
        var he = [], le = [];
        ce.shopOrderOperations.forEach(function(e) {
            "opt_pintuan_detail" === e.operationName ? (e.isRefundShow = !0, he.push(e)) : le.push(e);
        }), ce.shopOrderOperations = le, he.length && ce.itemOrders.length && ce.itemOrders[0].itemOrderOperations.unshift(he[0]);
    }
    ce.itemOrders.length && ce.itemOrders[0].virtualItemInfo && (n = ce.itemOrders[0].virtualItemInfo);
    var Ie = r.default.get(ce, "shopOrderPromotionInfo.payReturnInfo.useAmount"), Oe = r.default.get(e.payOrder, "platformPromoAmount");
    return a = {
        isWaitPay: d,
        shopOrderId: ce.shopOrderId,
        promotionDesc: r.default.get(e.payOrder, "payOrderPromotionInfo.promotionDesc"),
        platformPromoAmount: (Oe / 100).toFixed(2),
        created: o(ce.created),
        payTime: o(ce.payTime),
        shipTime: o(ce.shipTime),
        receiveTime: o(ce.receiveTime),
        buyerComment: ce.buyerComment,
        useAmount: (Ie / 100).toFixed(2),
        payChannel: u
    }, {
        shopList: i,
        orderStageList: f,
        discountList: a,
        virtualItemInfo: n
    };
};