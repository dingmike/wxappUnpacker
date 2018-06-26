function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function e(e, a) {
        for (var s = 0; s < a.length; s++) {
            var n = a[s];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(a, s, n) {
        return s && e(a.prototype, s), n && e(a, n), a;
    };
}(), s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../m.js")), n = s.default.MWP, r = s.default.Promise, t = {
    mgj: "wxca3957e5474b3670",
    mls: "wx8122ed29755c69c2"
}, o = {
    mgj: "mgjXcx",
    mls: "mlsXcx"
}, c = function() {
    function s() {
        var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e(this, s), this.payId = a.payId || null, this.modou = a.modou || 0, this.platform = a.platform || "mgj";
    }
    return a(s, [ {
        key: "exec",
        value: function() {
            var e = this, a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {};
            return new r(function(r, c) {
                if (a.payId && (e.payId = a.payId), a.modou && (e.modou = a.modou), !e.payId) return e.sendResponse({
                    code: "1204",
                    success: !1,
                    from: "mgj",
                    msg: "payId is required!",
                    detail: "payId is required!"
                }, "success", r, s);
                n.request("mwp.pay_cashier.mlsXcxWechatPay", 1, {
                    payId: e.payId,
                    appId: t[e.platform],
                    scenetype: o[e.platform],
                    modou: e.modou
                }).then(function(a) {
                    if ("SUCCESS" !== a.ret) return e.sendResponse(e.handlerMoguError(a), "success", r, s);
                    e.handleResponse(a, function(n, t) {
                        if (n) return e.sendResponse(n, "error", c, s);
                        if (t.code && !t.success) return e.sendResponse(t, "success", r, s);
                        var o = a.data.pf_async ? t.data.asyncData.weChatToken : t.data.weChatToken, u = null;
                        try {
                            u = getCurrentPages()[0].$logE;
                        } catch (n) {}
                        wx.requestPayment(e.mixin(o, {
                            success: function(a) {
                                u && u("000000243", {
                                    payId: e.payId,
                                    prepayId: o.package.split("=")[1]
                                }, {
                                    force: !0
                                }), e.sendResponse({
                                    code: "2101",
                                    success: !0,
                                    from: "wx",
                                    msg: "支付成功",
                                    detail: a
                                }, "success", r, s);
                            },
                            fail: function(a) {
                                e.sendResponse(e.handleWxError(a), "success", r, s);
                            },
                            complete: function(a) {
                                if ("requestPayment:cancel" === a.errMsg) return e.sendResponse({
                                    code: "2201",
                                    success: !1,
                                    from: "wx",
                                    msg: "调用支付失败，用户取消支付",
                                    detail: {
                                        errMsg: "requestPayment:fail cancel"
                                    }
                                }, "success", r, s);
                            }
                        }));
                    });
                }).catch(function(a) {
                    return e.sendResponse(a, "error", c, s);
                });
            });
        }
    }, {
        key: "handleResponse",
        value: function(e, a) {
            function s() {
                n.request(c, 1, {
                    queryParams: e.data.pf_async.asyncParams.params.queryParams
                }).then(function(n) {
                    try {
                        if (n.data.hasResult) return a(void 0, n);
                        if (t >= e.data.pf_async.asyncParams.maxQueryLoop || Date.now() - o >= e.data.pf_async.asyncParams.maxQueryDelay) return a(void 0, {
                            code: "1201",
                            success: !1,
                            from: "mgj",
                            msg: "达到重试限制条件",
                            detail: {}
                        });
                    } catch (e) {
                        return a(void 0, {
                            code: "1202",
                            success: !1,
                            from: "mgj",
                            msg: "轮询过程错误",
                            detail: e
                        });
                    }
                    t++, setTimeout(function() {
                        s.apply(r);
                    }, e.data.pf_async.asyncParams.queryDelay);
                }).catch(function(e) {
                    return a(e, void 0);
                });
            }
            var r = this, t = 0, o = Date.now();
            if (!e.data.pf_async) return a(void 0, e);
            var c = e.data.pf_async.apiName;
            s.apply(r);
        }
    }, {
        key: "sendResponse",
        value: function(e, a, s, n) {
            s(e), "success" === a ? n(void 0, e) : n(e, void 0);
        }
    }, {
        key: "handleWxError",
        value: function(e) {
            var a = null;
            try {
                a = e.errMsg.split("requestPayment:fail")[1].replace(/^\s*|\s*$/g, "");
            } catch (e) {}
            var s = {
                cancel: {
                    text: "用户取消支付",
                    code: "01"
                },
                "no permission": {
                    text: "无权限",
                    code: "02"
                }
            };
            return {
                code: s[a] && s[a].text ? "22" + s[a].code : "22xx",
                success: !1,
                from: "wx",
                msg: "调用支付失败 " + (s[a] && s[a].text || a),
                detail: e
            };
        }
    }, {
        key: "handlerMoguError",
        value: function(e) {
            return {
                code: "12xx",
                success: !1,
                from: "mgj",
                msg: e.msg,
                detail: {
                    code: e.ret,
                    api: e.api
                }
            };
        }
    }, {
        key: "mixin",
        value: function(e, a) {
            for (var s in e) e.hasOwnProperty(s) && (a[s] = e[s]);
            return a;
        }
    } ]), s;
}();

exports.default = c;