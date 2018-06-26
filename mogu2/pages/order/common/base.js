Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.orderDeleteOpt = exports.cancelOrderOpt = exports.orderRemindOpt = exports.orderConfirmOpt = exports.payOrderOpt = void 0;

var e = Object.assign || function(e) {
    for (var r = 1; r < arguments.length; r++) {
        var t = arguments[r];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/m")), t = require("./action.js"), n = r.default.MWP;

exports.payOrderOpt = function(r, t, s, o) {
    return n.request("mwp.TradeWebBuy.createPayActionlet", "1", {
        payOrderId: t,
        marketType: "market_mogujie"
    }).then(n.filterResult).then(function(t) {
        !!s && s.hide();
        var n = t.payId;
        return n ? (r.show(e({}, o, {
            payId: n,
            stagingNum: t.repayStageResDTO && t.repayStageResDTO.num
        })), Promise.resolve({
            success: !0
        })) : Promise.resolve({
            success: !1
        });
    }).catch(function(e) {
        return !!s && s.hide(), {
            message: e.message,
            success: !1
        };
    });
}, exports.orderConfirmOpt = function(e) {
    return (0, t.orderConfirm)({
        orderId: e
    }).then(function(e) {
        return e;
    }).catch(function(e) {
        return {
            message: e.message,
            success: !1
        };
    });
}, exports.orderRemindOpt = function(e) {
    return (0, t.orderRemind)({
        orderid: e
    }).then(function(e) {
        return e;
    }).catch(function(e) {
        return {
            message: e.message,
            success: !1
        };
    });
}, exports.cancelOrderOpt = function(e) {
    return (0, t.cancelOrder)({
        orderId: e
    }).then(function(e) {
        return e;
    }).catch(function(e) {
        return {
            message: e.message,
            success: !1
        };
    });
}, exports.orderDeleteOpt = function(e) {
    return (0, t.deleteOrder)({
        orderId: e
    }).then(function(e) {
        return e;
    }).catch(function(e) {
        return {
            message: e.message,
            success: !1
        };
    });
};