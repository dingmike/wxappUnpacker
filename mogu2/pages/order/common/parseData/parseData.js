function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("./orderStatus.js")), t = require("../common.js"), a = e(require("../../../../common/utils/imgUrlTool.js")), i = function(e) {
    return e && Date.format(new Date(1e3 * e), "MM.dd");
};

exports.default = function(e) {
    if (!e || !e.buyerOrderList) return [];
    var o = e.buyerOrderList, n = [];
    for (var d in o) !function(e) {
        var d = o[e], s = [], u = d.payOrder, p = d.shopOrderList[0], _ = !0, m = !1, O = void 0;
        try {
            for (var c, I = d.shopOrderList[Symbol.iterator](); !(_ = (c = I.next()).done); _ = !0) {
                var f = c.value, l = f.orderTags || [], S = -1 !== l.indexOf("PT"), y = S && -1 !== l.indexOf("LOTTERY");
                if (S && f.pintuanInfo) {
                    var T = f.pintuanInfo || {};
                    void 0 !== T.pintuanRemainTime && (f.remainTime = T.pintuanRemainTime);
                    var h = [ "tuan_cancle", "tuan_notPay", "tuan_tuaning", "tuan_waitPay", "tuan_lotterying", "tuan_coupon", "tuan_prize", "tuan_notLottery", "tuan_tuanSuccess", "tuan_tuanFailed" ];
                    T.pintuanStatus && (/tuan_tuaning|PIN_TUAN_AFTER_PAID/.test(T.pintuanStatus) ? f.orderStatus = T.pintuanStatus + "&&" + T.remainNums : h.indexOf(T.pintuanStatus) >= 0 ? f.orderStatus = T.pintuanStatus : (/PIN_TUAN_AFTER_PAID|PIN_TUAN_LOCKED|PIN_TUAN_FAILED_AFTER_LOCK|PIN_TUAN_SUCCESS_AFTER_LOCK/.test(T.pintuanStatus) && /ORDER_PAID/.test(f.orderStatus) || "ORDER_CLOSED" == f.orderStatus && "PIN_TUAN_FAILED_AFTER_LOCK" == T.pintuanStatus || "ORDER_CLOSED" == f.orderStatus && "PIN_TUAN_FAILED" == T.pintuanStatus) && (f.orderStatus = T.pintuanStatus));
                }
                var g = [], P = !0, E = !1, v = void 0;
                try {
                    for (var L, R = f.itemOrders[Symbol.iterator](); !(P = (L = R.next()).done); P = !0) {
                        var A = L.value, D = S ? y ? "抽奖团" : "拼团" : "", N = !!A.itemOrderOperations && A.itemOrderOperations.length > 0 && A.itemOrderOperations.map(function(e) {
                            var r = e.operationName;
                            return e.isRefundShow = "opt_show_detail_refund" === r || "opt_show_detail_complaint" === r || "opt_pintuan_detail" === r, 
                            e;
                        });
                        g.push({
                            orderTag: D,
                            itemOrderId: A.itemOrderId,
                            itemIdEsc: A.itemIdEsc,
                            itemOrderIdEsc: A.itemOrderIdEsc,
                            imgUrl: a.default.getWidthSuffix(A.imgUrl, 144),
                            title: A.title,
                            skuAttributes: A.skuAttributes,
                            price: (A.price / 100).toFixed(2),
                            nowPrice: (A.nowPrice / 100).toFixed(2),
                            number: A.number,
                            redPacketDesc: A.itemPromotionInfo && A.itemPromotionInfo.redPacketDesc,
                            itemOrderOperations: N
                        });
                    }
                } catch (e) {
                    E = !0, v = e;
                } finally {
                    try {
                        !P && R.return && R.return();
                    } finally {
                        if (E) throw v;
                    }
                }
                s.push({
                    isShowMore: !1,
                    payOrderId: u && u.payOrderId,
                    isWaitPay: u && u.isWaitPay,
                    shopOrderId: f.shopOrderId,
                    shopOrderIdEsc: f.shopOrderIdEsc,
                    shopName: f.shopInfo && f.shopInfo.shopName,
                    productLength: f.itemOrders.length,
                    productList: g,
                    marketType: f.marketType,
                    outId: f.extraInfo && f.extraInfo.outId || ""
                });
            }
        } catch (e) {
            m = !0, O = e;
        } finally {
            try {
                !_ && I.return && I.return();
            } finally {
                if (m) throw O;
            }
        }
        var x = void 0;
        if (d.orderStageInfo && d.orderStageInfo.orderStageList && d.orderStageInfo.orderStageList.length > 0) {
            var w = d.orderStageInfo.orderStageList;
            x = {
                payBeginTime: i(w[0].beginTime),
                payEndTime: i(w[0].endTime),
                payGoodsPrice: (w[0].goodsPrice / 100).toFixed(2),
                tailBeginTime: i(w[1].beginTime),
                tailEndTime: i(w[1].endTime),
                tailGoodsPrice: (w[1].goodsPrice / 100).toFixed(2),
                stageStatus: d.orderStageInfo.stageStatus
            };
        }
        var F = d.shopOrderList[0] || {}, C = u.isWaitPay ? u.payOrderOperations : p.shopOrderOperations, b = p.remainTime > 0 ? p.remainTime : 0, U = p.orderViewStatus ? p.orderViewStatus : (0, 
        r.default)(p.orderStatus, x, p.orderTags), k = /opt_delay_receive|opt_show_delivery_order|opt_pintuan_detail|opt_cancel_order|opt_remind_ship_order/, W = [];
        C.length > 0 && C.map(function(e) {
            var r = e.operationName;
            e.isWhite = k.test(r), u.isWaitPay ? "opt_pay_order" !== r && "opt_prepay_order" !== r && "opt_tailpay_order" !== r && "opt_cancel_order" !== r && "opt_pintuan_pay_order" !== r || W.push(e) : "opt_delete_order" !== r && "opt_rate_completed" !== r && "opt_rate_score" !== r && "opt_rate_share" !== r && W.push(e);
        }), W.sort(function(e) {
            return k.test(e.operationName) ? -1 : 1;
        });
        var M = p.orderTags.indexOf("PT") >= 0 && -1 == p.orderTags.indexOf("customPt"), j = -1 !== p.orderTags.indexOf("PT_HB"), K = !/ORDER_CANCELLED|ORDER_CLOSED|tuan_tuanSuccess|tuan_tuanFailed|tuan_waitPay/.test(p.orderStatus);
        n.push({
            isPintuanRed: j,
            sortOrderOperations: W,
            isChannel: M,
            payOrderId: u && u.payOrderId,
            payOrderIdEsc: u && u.payOrderIdEsc,
            isWaitPay: u && u.isWaitPay,
            payOrderPrice: ((u && u.payOrderPrice) / 100).toFixed(2),
            orderOperations: C,
            shopOrderId: p && p.shopOrderId,
            shopOrderIdEsc: p && p.shopOrderIdEsc,
            orderStatus: p && p.orderStatus,
            orderStatusDesc: U,
            orderTags: p && p.orderTags,
            isShowLottery: p.orderTags.indexOf("LOTTERY") >= 0,
            remainTime: b,
            remainTimeString: (0, t.transformRemainTime)(b),
            isShowRemainTime: b && K,
            shopOrderPriceRemark: p && p.shopOrderPriceRemark,
            orderStageList: x,
            shopList: s,
            tuanId: F.pintuanInfo && F.pintuanInfo.tuanId || "",
            activityId: F.pintuanInfo && F.pintuanInfo.activityId || "",
            itemId: F.itemOrders && F.itemOrders[0] && F.itemOrders[0].itemId || "",
            itemIdEsc: F.itemOrders && F.itemOrders[0] && F.itemOrders[0].itemIdEsc || ""
        });
    }(d);
    return n;
};