function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../../../common/m")), a = t(require("../detail/index")), n = t(require("../detail-dialog/index")), i = t(require("../rule/index")), o = require("../../../../common/utils/cpcutil"), r = t(require("../../../../components/gamePop/index")), u = e.default.MCE, s = e.default.MWP, c = e.default.fn.sendMsg;

exports.default = {
    components: {
        detail: a.default,
        dialog: n.default,
        rule: i.default,
        gamePop: r.default
    },
    data: function() {
        return {
            flagTuanInfo: !1,
            isShowRuleArea: !1
        };
    },
    onLoad: function(t) {
        this.acm = t.acm, this.cparam = t.cparam, this.tuanId = t.tuanId;
    },
    initPinshareInfo: function(t) {
        var e = this, a = t.tuanId, n = t.activityId, i = t.market, o = this.data.extra = decodeURIComponent(t.extra || "");
        this.extra = o;
        var r = {};
        console.log(a, n, o), r = a ? {
            tuanId: a,
            platform: "WXXCX"
        } : n ? {
            activityId: n,
            market: i,
            platform: "WXXCX"
        } : {
            extra: o,
            platform: "WXXCX"
        }, s.request("mwp.enzo.pinTuanInfo", "1", r).then(function(a) {
            if (a.ret == s.Code.Success) {
                var n = a && a.data ? a.data : {};
                console.log(n), e.$root.$logE("016000257", {
                    businessId: n.activityId || ""
                }), e.tuanInfo = n, e.itemInfo = n.itemInfo, e.price = e.itemInfo.price, e.itemId = n.itemId;
                var i = n.tuanTypeValue, o = 1 === i || 3 === i;
                e.initCpcParams(), e.setData({
                    flagTuanInfo: !0
                });
                var r = n.isJoin;
                e.$root.setData({
                    joinInfo: {
                        isJoin: r,
                        isLowPrice: o
                    },
                    tuanInfo: n
                }), r ? e.$root.initJoinInfo() : e.$root.initUnJoinInfo();
                e.$rule.initRule(n), e.setData({
                    isShowRuleArea: !0
                }), e.$detail.initDetail(n, r), e.$dialog.initDialog(n, !0), e.captainUserId = n.captainUserId, 
                e._fu = t._fu || "", e._mgjuuid = t._mgjuuid || "", e._mgjuuid && e._fu && e.captainUserId && e.shareGetIntegral();
                var c = wx.getStorageSync("mgj.user");
                e.uid = c && c.userInfo && c.userInfo.uid || "", e._mgjuuid && e.uid && e._fu && e.uid !== e._fu && u.get({
                    pid: 109616
                }).then(function(t) {
                    if (t.list && t.list.length > 0) {
                        var a = t.list[0], n = a.bg, i = a.btnColor, o = a.btnText, r = a.relationKey || "";
                        r && e.newGetCoupon(n, i, o, r);
                    }
                }).catch(function(t) {
                    console.log(t);
                }), e.$root.setData({
                    tuanInfo: n
                });
            }
        }).catch(function(t) {
            console.error(t);
        });
    },
    shareGetIntegral: function() {
        var t = {
            itemId: this.itemId,
            cpsUserId: this.captainUserId,
            bizType: 5,
            refer: "/pages/pinshare/index"
        };
        s.request("mwp.cpstrack.cpsDependencyTrackActionlet", "1", t).then(function() {
            console.log("cps打点成功了");
        });
    },
    newGetCoupon: function(t, e, a, n) {
        var i = this;
        s.request("mwp.diana.customStep", "3", {
            relationKey: n,
            busiType: "popWinLottery",
            rangeFactor: this.price,
            shareUserIdUrl: this._fu
        }).then(s.filterResult).then(function(n) {
            var o = {
                data: n
            }, r = Object.assign(o, {
                className: "white game-pop-share",
                bg: t,
                btnType: 1,
                btnColor: e,
                btnText: a
            });
            i.$gamePop.render(r), i.$gamePop.open();
        }).catch(function(t) {
            console.log(t);
        });
    },
    initCpcParams: function() {
        var t = this;
        this.cparam && !this.hasCparamLogged && (0, o.requestCparam)({
            itemId: this.itemId,
            cparam: this.cparam,
            acm: this.acm,
            businessStyle: "pintuan",
            custom: {
                tuanType: this.tuanInfo.tuanTypeValue,
                tuanId: this.tuanId
            }
        }).then(function(e) {
            "success" === e.result && (t.hasCparamLogged = !0);
        }).catch(function(t) {
            c(t, {
                _author: "changsheng",
                threshold: 1
            });
        });
    }
};