function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function e(a, e) {
    if (!(a instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (a[n] = t[n]);
    }
    return a;
}, n = function() {
    function a(a, e) {
        for (var t = 0; t < e.length; t++) {
            var n = e[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(a, n.key, n);
        }
    }
    return function(e, t, n) {
        return t && a(e.prototype, t), n && a(e, n), e;
    };
}(), r = a(require("../../../common/m")), s = a(require("../config")), o = r.default.MWP, c = s.default.appId || "wxca3957e5474b3670", p = s.default.scenetype || "mgjXcx", u = function(a, e) {
    getCurrentPages()[0].$logE && getCurrentPages()[0].$logE(a, e);
}, i = function() {
    function a() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e(this, a), this.payId = t.payId || null, this.modou = t.modou || 0, this.platform = t.platform || "mgj", 
        this.params = t;
    }
    return n(a, [ {
        key: "exec",
        value: function() {
            var a = this;
            this.payId && (this.platform = this.platform || "mgj", o.request("mwp.pay_cashier.mlsXcxWechatPay", 1, {
                payId: this.payId,
                modouUse: this.modouUse || 0,
                appId: c,
                scenetype: p
            }).then(function(e) {
                if ("SUCCESS" === e.ret) {
                    if (e.data.weChatToken) a.openWeChatPay(e.data.weChatToken); else if (e.data.pf_async && e.data.pf_async.apiName) {
                        var t = 0, n = e.data.pf_async.asyncParams.maxQueryLoop || 10, r = e.data.pf_async.asyncParams.queryDelay || 1e3;
                        !function s() {
                            o.request(e.data.pf_async.apiName, 1, {
                                queryParams: e.data.pf_async.asyncParams.params.queryParams
                            }).then(function(e) {
                                e.data.hasResult && e.data.asyncData ? a.openWeChatPay(e.data.asyncData.weChatToken) : ++t <= n ? setTimeout(function() {
                                    s();
                                }, r) : a.params.failCb && a.params.failCb();
                            });
                        }();
                    }
                } else a.params.failCb && a.params.failCb();
            }));
        }
    }, {
        key: "openWeChatPay",
        value: function(a) {
            var e = this, n = t({}, a, {
                success: function() {
                    u("001010006", {
                        payMethod: "weChatPay",
                        payId: e.payId,
                        prepayId: a.package.split("=")[1]
                    }), e.params.successCb && e.params.successCb();
                },
                fail: function(a) {
                    "requestPayment:fail cancel" === a.errMsg ? (u("001010016", {
                        payId: e.payId,
                        payMethod: "weChatPay"
                    }), e.params.cancelCb && e.params.cancelCb()) : (u("001010007", {
                        payId: e.payId,
                        payMethod: "weChatPay",
                        ErrorMessage: a.errMsg
                    }), e.params.failCb && e.params.failCb());
                },
                complete: function(a) {
                    "requestPayment:cancel" === a.errMsg && (u("001010016", {
                        payId: e.payId,
                        payMethod: "weChatPay"
                    }), e.params.cancelCb && e.params.cancelCb());
                }
            });
            wx.requestPayment(n);
        }
    } ]), a;
}();

exports.default = i;