Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(e) {
    if (!e) return [];
    var r = e.payOrder, t = e.shopOrderList[0], o = t ? t.itemOrders[0] : {}, a = e.payOrder.isWaitPay, i = r.payOrderOperations.concat(t.shopOrderOperations), d = i.filter(function(e) {
        return "opt_rate_completed" !== e.operationName && "opt_show_delivery_order" !== e.operationName && "opt_cancel_order" !== e.operationName && "opt_delete_order" !== e.operationName && "opt_rate_score" !== e.operationName && "opt_rate_share" !== e.operationName;
    });
    if (t.orderViewStatus) for (var p = 0; p < i.length; p++) if ("opt_show_delivery_order" == i[p].operationName) {
        d.unshift(i[p]);
        break;
    }
    return {
        isWaitPay: a,
        operationsList: d,
        orderOperations: i,
        shopOrderId: t && t.shopOrderId,
        shopOrderIdEsc: t && t.shopOrderIdEsc,
        payOrderId: r && r.payOrderId,
        itemId: o.itemIdEsc,
        payOrderIdEsc: r && r.payOrderIdEsc,
        payOrderPrice: a ? (r.buyerFinalPrice / 100).toFixed(2) : (t.buyerFinalPrice / 100).toFixed(2),
        tuanId: t.pintuanInfo && t.pintuanInfo.tuanId || "",
        activityId: t.pintuanInfo && t.pintuanInfo.activityId || ""
    };
};