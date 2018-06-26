function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../common/base/createPage")), o = t(require("../../common/m")), n = t(require("./common/util")), a = t(require("./common/request")), i = t(require("../../components/loading/index")), r = t(require("../../components/toast/index")), s = t(require("../../common/service/url")), c = require("../../mixins/cps"), d = o.default.fn.sendMsg;

(0, e.default)({
    components: {
        loading: i.default,
        toast: r.default
    },
    data: {
        instruction: [ "点击“立即领取”按钮领取优惠券，在支付时减免。", "本优惠券为私密发放，具有时效性（限时减免）。", "本优惠券只针对特定商品生效。", "一张优惠券只能使用一次，用完即失效。" ],
        rules: [ "如遇该商品参与其他活动等原因，可能会导致优惠券无法使用，请以最终支付金额为准。", "如遇作弊刷券等行为，取消资格，必要时追究法律责任。", "本优惠券由商家设置，售后与正常交易保持一致。" ],
        itemInfo: {
            title: "",
            originalPrice: 0,
            itemImage: "",
            shopIcon: "",
            shopName: ""
        },
        couponInfo: {
            cutPrice: 0,
            couponId: 0,
            startTime: 0,
            endTime: 0,
            hasSend: !1
        },
        styleConfig: {
            backgroupImage: "https://s10.mogucdn.com/mlcdn/c45406/171109_6j8b912cha05d7aff0ii9h225hh9i_702x100.png",
            newUserBackgroupImage: "https://s10.mogucdn.com/mlcdn/c45406/171109_44g272il66decgb4ghl9db2il3e1h_702x100.png",
            couponImage: "https://s10.mogucdn.com/mlcdn/c45406/171120_1fjek8fd6d1gjfj0dgl710hil881b_285x46.png",
            newUserCouponImage: "https://s10.mogucdn.com/mlcdn/c45406/171120_6a54delaaj253h08cg6j05b2h77b3_285x46.png",
            couponColor: "#fff",
            newUserCouponColor: "#fff",
            sendButtonColor: "#FFF15C",
            sendButtonColorDeep: "#FFF15C",
            sendTextColor: "#333333",
            haveSentButtonColor: "#E5E5E5",
            haveSentTextColor: "#666666",
            itemImageTag: "",
            itemPriceTag: "https://s10.mogucdn.com/mlcdn/c45406/170521_6b285d05hfkdkgek752208f4kcc88_90x42.png",
            sendSuccessImage: "https://s10.mogucdn.com/mlcdn/c45406/171114_3gk3h922eh14hf7ifa031cbf1616e_702x100.png",
            shareImage: "https://s10.mogucdn.com/mlcdn/c45406/171101_1e245cdgahdkaji0beda8e87b839i_502x134.png"
        },
        promsign: "",
        robotItemId: "",
        itemId: 0,
        userId: 0,
        actorUserId: 0,
        cpsTrace: "",
        roomId: 0,
        gid: 0,
        actId: 1,
        ifShowDialog: !1,
        isLoading: !0,
        isShowAct: !1,
        isShowActDialog: !1,
        isHideShopIcon: !1,
        rewardInfo: {},
        customImage: "",
        cparam: null
    },
    onLoad: function() {
        var t = this;
        a.default.getActInfo(79452).then(function(e) {
            return t.setData({
                isShowAct: e
            }), e && wx.showShareMenu && (wx.showShareMenu({
                withShareTicket: !0
            }), t.setData({
                instruction: [ "活动时间：2017年11月1日-2017年11月9日", "活动规则：转发到群福利共分4层，包含1元无门槛红包、49-5元全平台券、10元无门槛红包、50元无门槛红包。用户通过点击分享按钮，依次将相同商品页面分享到不同微信群，即有机会获得对应阶层福利红包。", "使用方式：用户可在优惠券有效期内2017.11.10日至2017.11.12日，在对应平台上使用，红包与优惠券可以叠加使用。", "最终解释权归蘑菇街官方所有" ]
            })), t.$getOptions();
        }).then(function(e) {
            var o = e.itemId, n = e.promsign, i = e.robotItemId, r = e._shortQuery, s = e.actorUserId, u = e.roomId, m = e.customImage, f = e.actId, h = e._uni_asso, g = e._uni_gid, l = e._uni_uid, I = e._uni_cpsFrom, p = e.cparam, _ = e.bizType, w = e.shareUserId;
            i && t.setData({
                robotItemId: i
            });
            try {
                n = decodeURIComponent(n);
            } catch (t) {}
            if (t.$loading.show(), _ && w) {
                var v = t.parseQuery(t.query), y = {
                    bizType: _,
                    cpsUserId: w,
                    itemId: o,
                    refer: t.route + "?" + v
                };
                a.default.traceBizLog(y).catch(function(t) {
                    console.warn(t.message);
                });
            }
            if (o && n || n && 3 == f) {
                var D = "_uni_asso=" + h + "&_uni_gid=" + g + "&_uni_uid=" + l + (I ? "&_uni_cpsFrom=" + I : "");
                t.setData({
                    itemId: o || 0,
                    promsign: n,
                    actorUserId: s || 0,
                    roomId: u || 0,
                    actId: f || t.data.actId,
                    customImage: decodeURIComponent(m),
                    isHideShopIcon: 3 == f,
                    cpsTrace: D,
                    cparam: p || !1
                }), t.getInfo();
            } else r ? a.default.transferUrl(r).then(function(e) {
                var o = {};
                e.split("&").forEach(function(t) {
                    var e = t.split("=");
                    o[e[0]] = e[1];
                }), (0, c.checkCPS)(o);
                var n = o.itemId, a = o.promsign, i = o.actorUserId, r = o.roomId, s = o.customImage, u = o.actId, m = o._uni_asso, f = o._uni_gid, h = o._uni_uid, g = o._uni_cpsFrom, l = o.cparam, I = "_uni_asso=" + m + "&_uni_gid=" + f + "&_uni_uid=" + h + (g ? "&_uni_cpsFrom=" + g : "");
                return t.setData({
                    itemId: n || 0,
                    promsign: a,
                    actorUserId: i || 0,
                    roomId: r || 0,
                    actId: u || t.data.actId,
                    customImage: decodeURIComponent(s),
                    isHideShopIcon: 3 == u,
                    cpsTrace: I,
                    cparam: l || !1
                }), n && a || d(new Error("不存在itemId或promsign"), {
                    _author: "suqiao",
                    originUrl: e
                }), t.getInfo();
            }, function(e) {
                t.errorModal(e);
            }).then(function() {
                t.$loading.hide();
            }) : (t.$loading.hide(), t.errorModal("页面链接错误，请确认您链接的有效性"));
            t.computed();
        }, function(e) {
            console.log(e.message), t.errorModal("网络错误");
        }), a.default.getActStyleInfo().then(function(e) {
            e.styleConfig = t.formatStyleData(e.styleConfig), t.setData({
                styleConfig: e.styleConfig
            });
        }).catch(function() {});
    },
    formatStyleData: function(t) {
        for (var e = Object.keys(this.data.styleConfig), o = {}, n = 0; n < e.length; n++) {
            var a = t[e[n]];
            "" != a && (o[e[n]] = a);
        }
        return Object.assign({}, this.data.styleConfig, o);
    },
    errorModal: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "网络错误";
        this.showModal({
            content: e,
            showCancel: !1,
            confirmText: "前往首页",
            success: function(e) {
                e && t.redirectToIndex(0);
            }
        });
    },
    parseQuery: function(t) {
        var e = [];
        return Object.keys(t).map(function(o) {
            e.push(o + "=" + t[o]);
        }), e.join("&");
    },
    onShareAppMessage: function() {
        var t = this, e = this.data.isShowAct;
        return {
            title: "内部专享优惠券",
            success: function() {
                var o = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).shareTickets, n = void 0 === o ? [] : o;
                e && wx.getShareInfo ? wx.getShareInfo({
                    shareTicket: n[0],
                    complete: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        e.encryptedData ? t.sendActCoupon(e) : t.$toast.show("此活动只可转发到群哦");
                    }
                }) : t.$toast.show("分享成功");
            }
        };
    },
    submitSend: function(t) {
        var e = t.detail.formId;
        this.$logForm(e, 1), this.send();
    },
    sendActCoupon: function(t) {
        var e = this, o = this.data, n = o.itemId, i = o.promsign, r = {
            encryptedData: t.encryptedData,
            iv: t.iv,
            tradeItemId: n,
            promsign: i
        };
        a.default.sendActCoupon(r).then(function(t) {
            var o = t.cutPrice, n = t.redPocket, a = t.standardPrice, i = t.type;
            e.setData({
                isShowActDialog: !0,
                rewardInfo: {
                    info: 1 === i ? "红包" : "满" + parseInt(a / 100) + "元减",
                    specialPrice: 1 === i ? parseInt(n / 100) + "元" : parseInt(o / 100) + "元",
                    tailInfo: 1 === i ? "" : "优惠券",
                    placeInfo: 1 === i ? "红包" : "优惠券"
                }
            });
        }, function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "哎呀，就差一点";
            e.$toast.show(t);
        });
    },
    send: function() {
        var t = this, e = this.data, o = e.promsign, i = e.actId, r = e.itemId, s = e.isLoading, c = e.couponInfo, d = c.isNew, u = c.hasSend;
        if (d && (i = 2), !s) {
            if (u) return this.redirectToDetail(), !1;
            this.$loading.show(), a.default.send(o, i, r).then(function() {
                t.updateDialogStatus(!0), t.setData({
                    couponInfo: Object.assign({}, t.data.couponInfo, {
                        hasSend: !0
                    })
                }), t.computed();
            }, function(e) {
                if (-301 === e.code) t.redirectToDetail(); else {
                    var o = n.default.getErrorInfo(e.code) || "请求出错";
                    e.payload && e.payload.msg && (o = e.payload.msg), t.showModal({
                        content: o,
                        showCancel: !1
                    });
                }
            }).then(function() {
                return t.$loading.hide();
            });
        }
    },
    updateDialogStatus: function(t) {
        this.setData({
            ifShowDialog: t
        });
    },
    hideDialog: function() {
        this.updateDialogStatus(!1);
    },
    hideActDialog: function() {
        this.setData({
            isShowActDialog: !1
        });
    },
    formatPrice: function(t, e) {
        return e ? parseFloat(t / 100).toFixed(2) : parseInt(t / 100);
    },
    computed: function() {
        var t = this.data, e = t.itemInfo, o = t.couponInfo, a = t.screenWidth, i = o.cutPrice, r = o.startTime, s = o.endTime, c = o.hasSend, d = o.leftNum, u = e.originalPrice, m = c ? "您已领取" : 0 === d ? "已抢完" : "点击领取";
        this.setData({
            couponInfo: Object.assign({}, o, {
                cutPriceFormat: this.formatPrice(i),
                startDate: n.default.format(new Date(1e3 * r), "yyyy.MM.dd"),
                endDate: n.default.format(new Date(1e3 * s), "yyyy.MM.dd"),
                buttonContent: m
            }),
            itemInfo: Object.assign({}, e, {
                originalPriceFormat: this.formatPrice(u, !0),
                afterCut: u < i ? this.formatPrice(u, !0) : this.formatPrice(u - i, !0)
            }),
            shareHeight: .8 * a
        });
    },
    blank: function() {},
    getInfo: function() {
        var t = this, e = this.data, o = e.itemId, i = e.promsign, r = e.actId, s = e.robotItemId, c = e.customImage;
        return a.default.getInfo({
            itemId: o,
            promsign: i,
            actId: r,
            robotItemId: s
        }).then(function(e) {
            var o = e.couponInfo, a = e.itemInfo, i = o.cutPrice, s = o.startTime, d = o.endTime, u = o.hasSend, m = o.isNew, f = o.leftNum, h = a.discountPrice, g = a.image, l = a.name, I = a.shopLogo, p = a.title, _ = {};
            _ = 3 == r ? {
                itemImage: c
            } : {
                title: p,
                shopIcon: n.default.formatCdn(I),
                originalPrice: h,
                itemImage: n.default.formatCdn(g),
                shopName: l
            }, t.setData({
                isLoading: !1,
                couponInfo: Object.assign({}, t.data.couponInfo, {
                    cutPrice: i,
                    startTime: s,
                    endTime: d,
                    hasSend: u,
                    isNew: m,
                    leftNum: f
                }),
                itemInfo: Object.assign({}, t.data.itemInfo, _)
            }), t.computed();
        }).then(function() {}, function(e) {
            var o = e.info || "请求出错";
            t.$toast.show(o), t.redirectToIndex();
        }).then(function() {
            t.$loading.hide();
        });
    },
    redirectToDetail: function() {
        var t = this.data, e = t.actorUserId, o = t.roomId, n = t.actId, a = t.cpsTrace, i = t.cparam, r = t.itemId;
        3 == n ? wx.navigateToMiniProgram({
            appId: "wx21c17841db9593cd",
            path: "/pages/live/index?actorUserId=" + e + "&roomId=" + o + "&" + a
        }) : i ? this.$navigate(s.default.detail({
            itemId: r,
            cparam: i
        })) : this.$navigate(s.default.detail({
            itemId: r
        }));
    },
    redirectToIndex: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3;
        setTimeout(function() {
            t.$navigate(s.default.home());
        }, e);
    },
    shareClick: function() {
        wx.canIUse && wx.canIUse("button.open-type.share") || this.$toast.show("请点击右上角分享");
    },
    showModal: function(t) {
        var e = {
            title: "",
            content: "",
            confirmColor: "#ff5777"
        };
        wx.showModal(Object.assign({}, e, t));
    }
});