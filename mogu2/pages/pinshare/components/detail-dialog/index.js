function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = t(require("../../../../common/m")), e = t(require("../../../../common/service/user.js")), n = t(require("../../../../common/utils/cache")), i = t(require("../modal/index")), o = t(require("../../../../components/countdown/index")), s = t(require("../../../../components/skudialog/index")), u = t(require("../../../../components/mask/index")), r = t(require("../../../../components/toast/index")), h = t(require("../../../../components/loading/index")), d = require("tuanClass.js"), l = t(require("../../../../common/live/index")), f = t(require("../../../../common/utils/imgUrlTool")), c = a.default.MWP;

exports.default = {
    components: {
        modal: i.default,
        countdown: o.default,
        skuDialog: s.default,
        mask: u.default,
        toast: r.default,
        loading: h.default,
        imgUrlTool: f.default
    },
    data: function() {
        return {
            tuanData: {},
            itemData: {},
            isShowRuleArea: !1,
            userInfo: {}
        };
    },
    onLoad: function(t) {
        this.options = t, this.ptp = t.ptp || "";
    },
    initDialog: function(t, a) {
        this.tuanInfo = t, this.FailMessage = "", this.tuanInfo.isGoodsEmpty = !1, this.tuanTypeValue = this.tuanInfo.tuanTypeValue, 
        this.isNewTuan = 1 === this.tuanTypeValue, this.activityId = this.tuanInfo.activityId, 
        this.itemId = this.tuanInfo.itemId, this.tuanData = this.operateData(this.tuanInfo), 
        this.itemData = {
            totalNum: this.tuanInfo.totalNum
        }, this.userInfo = this.initUsers(this.tuanInfo), this.setData({
            tuanInfo: this.tuanInfo,
            tuanData: this.tuanData,
            itemData: this.itemData,
            isShowRuleArea: a,
            userInfo: this.userInfo
        }), this.fetchSkuInfo(), this.$modal.initModal(this.tuanInfo);
    },
    operateData: function(t) {
        var a = this.initTuanClass(t)[t.tuanStatus + "_" + (t.isJoin ? "join" : "unJoin")]();
        return {
            proInfo: a.proInfo,
            isCount: a.isCount,
            butInfo: a.butInfo
        };
    },
    initTuanClass: function(t) {
        var a = {};
        switch (t.tuanTypeValue) {
          case 1:
            a = new d.NewTuan(t, this);
            break;

          case 6:
            a = new d.CouponTuan(t, this);
            break;

          case 10:
          case 11:
            a = new d.NewCouponTuan(t, this);
            break;

          case 3:
          case 8:
            a = new d.LotteryTuan(t, this);
            break;

          case 9:
            a = new d.LoopTuan(t, this);
            break;

          default:
            a = new d.NormalTuan(t, this);
        }
        return a;
    },
    fetchSkuInfo: function() {
        var t = this, a = {};
        a = 7 != this.tuanInfo.tuanTypeValue ? {
            actId: this.activityId,
            iid: this.itemId,
            channelId: "2012"
        } : {
            iid: this.itemId || ""
        }, c.request("mwp.detailskipmwp.skus.info", "v2", a).then(function(a) {
            if (a.ret == c.Code.Success) {
                var e = t.tuanInfo.tuanTypeValue, n = 0;
                t.tuanInfo.isNew || 3 == e || 8 == e || 5 == e || 6 == e ? n = 1 : t.tuanInfo.isLimit && (n = t.tuanInfo.limitNum), 
                t.$skuDialog.init({
                    skuInfo: a.data.data,
                    defaultImage: t.tuanInfo.itemInfo.pic,
                    context: t,
                    $mask: t.$mask,
                    $toast: t.$toast,
                    maxNumber: n,
                    minNumber: 1,
                    showLimitTips: !0
                });
            } else t.FailMessage = a.msg, t.tuanInfo.isGoodsEmpty = !0, t.tuanData = t.operateData(t.tuanInfo), 
            t.setData({
                tuanData: t.tuanData
            });
        });
    },
    confirmSku: function(t) {
        var a = this.tuanInfo.tuanTypeValue, e = this.$root.data.$pinshareInfo.extra, i = {};
        i = 7 != a ? {
            channel: "channel_pintuan",
            pinTuan: {
                isOwner: !1,
                isNew: this.tuanInfo.isNew,
                tuanId: this.tuanInfo.tuanId || "",
                tuanType: a,
                extra: e
            },
            marketType: "market_mogujie",
            activityId: this.activityId,
            activityType: t.outType || 4,
            shops: [ {
                skus: [ {
                    stockId: t.sku.stockId,
                    number: t.number,
                    ptp: this.ptp,
                    liveParams: l.default.decodeLiveParams(this.$root.query.liveParams)
                } ]
            } ],
            orderFrom: "detail"
        } : {
            orderFrom: "detail",
            shops: [ {
                skus: [ {
                    stockId: t.sku.stockId,
                    number: t.number || 1,
                    ptp: this.ptp || "",
                    liveParams: l.default.decodeLiveParams(this.$root.query.liveParams),
                    pinTuan: {
                        tuanId: this.tuanInfo.tuanId || "",
                        tuanType: a || 0,
                        extra: e
                    }
                } ]
            } ]
        };
        try {
            n.default.put("buy.buyParams", i);
        } catch (t) {}
        var o = t.sku, s = t.number;
        this.$root.$logE("016000112", {
            num: s,
            disprice: (o.nowprice / 100).toFixed(2),
            price: (o.price / 100).toFixed(2),
            stockId: o.stockId
        }), this.$skuDialog.hideSku(), this.$root.$navigate(l.default.getFullUrl("/pages/buy/index", {
            liveParams: this.$root.query.liveParams,
            cparam: this.$root.query.cparam
        }));
    },
    isNewTuanAndNewUser: function() {
        var t = this;
        if (this.tuanInfo.isNew) {
            if (!this.tuanInfo.newUser) return void this.$modal.show();
            this.FailMessage ? this.$toast.show(this.FailMessage) : t.$skuDialog.showSku({});
        } else this.FailMessage ? this.$toast.show(this.FailMessage) : t.$skuDialog.showSku({});
    },
    methods: {
        clickSKU: function() {
            var t = this, a = this.tuanInfo.tuanId;
            this.tuanInfo.isCaptain && "15" == this.tuanInfo.tuanTypeValue ? this.$root.$logE("016000541") : this.$root.$logE("016000152", {
                tuanId: a
            });
            var n = this;
            n.tuanInfo.isLogin ? n.isNewTuanAndNewUser() : (n.$loading.show(), e.default.refreshSign().then(function() {
                var a = t.options, e = a.tuanId, i = a.activityId, o = a.market, s = t.data.extra = decodeURIComponent(a.extra || "");
                t.extra = s;
                var u = {};
                console.log("unlogin", e, i, s), u = e ? {
                    tuanId: e,
                    platform: "WXXCX"
                } : i ? {
                    activityId: i,
                    market: o,
                    platform: "WXXCX"
                } : {
                    extra: s,
                    platform: "WXXCX"
                }, c.request("mwp.enzo.pinTuanInfo", "1", u).then(function(a) {
                    t.tuanInfo = a && a.data ? a.data : {}, t.tuanData = t.operateData(t.tuanInfo), 
                    t.setData({
                        tuanData: t.tuanData
                    }), t.isNewTuanAndNewUser();
                }).catch(function() {
                    t.$toast.show("网络异常，请稍后再试");
                }), n.$loading.hide();
            }).catch(function(t) {
                n.$loading.hide(), e.default.showUserError(t) || console.error(t.message);
            })), setTimeout(function() {
                n.$loading.hide();
            }, 6e3);
        },
        goodNavigate: function(t) {
            t.currentTarget.dataset.cparam = this.$root.query.cparam || "", t.currentTarget.dataset.acm = this.$root.query.acm || "", 
            this.$root.$navigate(t);
        },
        initUsers: function(t) {
            for (var a = t.users, e = t.totalNum, n = {}, i = 0, o = a.length; i < o; i++) a[i].avatar = f.default.getGoodsRatioSuffix(a[i].avatar, 400, "1:1");
            n = a;
            var s = t.remainNum;
            return {
                isFold: !0,
                totalNum: e,
                userInfoList: n = this.getRemainList(n, s),
                remainNum: s,
                isLoop: 9 == t.tuanTypeValue && e > 7
            };
        },
        getRemainList: function(t, a) {
            for (var e = {}, n = 0; n < a; n++) e.avatar = f.default.getGoodsRatioSuffix("https://s10.mogucdn.com/mlcdn/c45406/170704_4b1l3128173hl48cgi414h635b472_80x80.png", 400, "1:1"), 
            e.unJoin = !0, t.push(e);
            return t;
        },
        handleShowMore: function() {
            this.userInfo.isFold = !this.userInfo.isFold, this.setData({
                userInfo: this.userInfo
            });
        }
    }
};