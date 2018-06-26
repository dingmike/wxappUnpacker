Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.orderRemind = exports.deleteOrder = exports.cancelOrder = exports.orderConfirm = void 0;

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/m")).default.MWP;

exports.orderConfirm = function(r) {
    return e.request("mwp.OrderManagement.confirmReceivedbyUserAction", "1", {
        orderId: r.orderId,
        marketType: "market_mogujie"
    }).then(e.filterResult).then(function(e) {
        return {
            success: !0,
            response: e
        };
    }).catch(function(e) {
        return {
            success: !1,
            message: e.message
        };
    });
}, exports.cancelOrder = function(r) {
    return e.request("mwp.OrderManagement.closeOrderAction", "1", {
        orderId: r.orderId,
        marketType: "market_mogujie"
    }).then(e.filterResult).then(function(e) {
        return {
            success: !0,
            response: e
        };
    }).catch(function(e) {
        return {
            success: !1,
            message: e.message
        };
    });
}, exports.deleteOrder = function(r) {
    return e.request("mwp.OrderManagement.deleteCanceledOrderAction", "1", {
        orderId: r.orderId,
        marketType: "market_mogujie"
    }).then(e.filterResult).then(function(e) {
        return {
            success: !0,
            response: e
        };
    }).catch(function(e) {
        return {
            success: !1,
            message: e.message
        };
    });
}, exports.orderRemind = function(r) {
    return e.request("mwp.OrderManagement.tipShipAction", "1", {
        orderId: r.orderid,
        marketType: "market_mogujie"
    }).then(e.filterResult).then(function(e) {
        return {
            success: !0,
            response: e
        };
    }).catch(function(e) {
        return {
            success: !1,
            message: e.message
        };
    });
};