Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/m")), r = t.default.MWP, n = t.default.MCE, o = t.default.fn.sendMsg;

exports.default = {
    send: function(e, n, o) {
        var i = {
            promsign: e,
            actId: n,
            _platform: "h5",
            rangeType: 1
        };
        return o && (i.itemId = o), new t.default.Promise(function(e, t) {
            r.request("mwp.ad_miniprograms.promSendService", 1, i).then(r.filterResult).then(function() {
                e();
            }, t);
        });
    },
    getInfo: function(e) {
        var n = e.itemId, o = e.promsign, i = e.actId, u = e.robotItemId, c = {
            promsign: o,
            actId: i,
            robotItemId: ""
        };
        return n && (c.itemId = n), u && 0 !== u && "" !== u && (c.robotItemId = u), r.request("mwp.ad_miniprograms.promItemInfoService", "1", c).then(r.filterResult).then(function(r) {
            var n = r.act, o = r.promItem;
            return new t.default.Promise(function(t, r) {
                if (n && n.result) if (o && o.discountPrice || 3 == e.actId) {
                    var i = !1;
                    -1 === n.status.code && (i = !0);
                    var u = n.result, c = u.cutPrice, s = u.startTime, a = u.endTime, d = u.leftNum, f = u.actId, m = o || {}, l = m.discountPrice, p = m.image, g = m.name, h = m.shopLogo, I = m.title;
                    t({
                        couponInfo: {
                            cutPrice: c,
                            startTime: s,
                            endTime: a,
                            hasSend: i,
                            isNew: !(!f || 2 !== f),
                            leftNum: d
                        },
                        itemInfo: 3 != e.actId ? {
                            discountPrice: l,
                            image: p,
                            name: g,
                            shopLogo: h,
                            title: I
                        } : {}
                    });
                } else r({
                    code: -1,
                    info: "获取商品信息出错"
                }); else r({
                    code: -1,
                    info: "获取优惠券信息出错"
                });
            });
        });
    },
    transferUrl: function(e) {
        return r.request("mwp.cpsunion.cpsTransferUrlActionlet", "1", {
            shortUrl: e
        }).then(function(r) {
            return r && r.data && "string" == typeof r.data ? r.data : (o(new Error("接口返回数据出错"), {
                _author: "suqiao",
                shortenUrl: e,
                msg: r.msg || ""
            }), t.default.Promise.reject("您的链接有误，请确认您链接的有效性"));
        }, function() {
            return o(new Error("接口错误"), {
                _author: "suqiao",
                shortenUrl: e
            }), t.default.Promise.reject("网络错误,请稍候再试");
        });
    },
    getActInfo: function(e) {
        return n.get({
            pid: e
        }).then(function(e) {
            return !!(e && e.list && e.list.length) && "1" === e.list[0].isOpen;
        }, function() {
            return !1;
        });
    },
    sendActCoupon: function(e) {
        return r.request("mwp.ad_miniprograms.couponDraw", 1, e).then(r.filterResult).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = e.redPocket, n = e.standardPrice, o = e.type, i = e.code, u = e.cutPrice;
            return 1001 === i && 3 !== o ? {
                redPocket: r,
                standardPrice: n,
                cutPrice: u,
                type: o
            } : 1002 === i ? t.default.Promise.reject("本群已经转发过了哦") : t.default.Promise.reject();
        }, function() {
            return t.default.Promise.reject("哎呀哈，就差一点");
        });
    },
    getActStyleInfo: function(t) {
        return r.request("mwp.ad_miniprograms.styleConfigService", "1", e({}, t)).then(r.filterResult);
    },
    traceBizLog: function(t) {
        return r.request("mwp.cpstrack.cpsDependencyTrackActionlet", "1", {
            cpsUserId: t.cpsUserId,
            itemId: t.itemId,
            bizType: t.bizType,
            refer: t.refer
        }).then(r.filterResult).catch(function(r) {
            o(new Error("业务打点异常"), e({
                _author: "shouhe"
            }, t, {
                msg: r.message
            }));
        });
    }
};