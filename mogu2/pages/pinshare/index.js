function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = t(require("../../common/m")), n = t(require("../../common/base/createPage")), e = t(require("../../common/utils/makeup")), o = t(require("./data")), a = t(require("./components/pinshareInfo/index")), s = t(require("../../components/wall/index")), u = t(require("../../components/quickNavigation/index")), l = t(require("../../components/activeEntry/index")), r = t(require("../../common/live/index")), h = t(require("../../components/redPacket/index")), c = t(require("../../components/getCoupon/index")), p = t(require("../../components/toast/index")), f = t(require("../../components/salesEntry/index")), d = t(require("../../components/floatTip/index")), g = t(require("../../common/utils/cache")), m = i.default.MCE;

exports.default = (0, n.default)({
    components: {
        pinshareInfo: a.default,
        wall: s.default,
        quickNavigation: u.default,
        activeEntry: l.default,
        activeEntryCategory: l.default,
        salesEntry: f.default,
        getCoupon: c.default,
        toast: p.default,
        redPacket: h.default,
        floatTip: d.default
    },
    data: o.default,
    onLoad: function(t) {
        var i = this;
        this.pageOptions = t, this.optionsReady = this.$getOptions().then(function(t) {
            i.pageOptions = t;
        }), this.$quickNavigation.init({
            bottom: 48
        }), this.diffPram = {
            pidPinGoods: 65817
        }, this.shareMessageTitle = "", this.isWxshop(), this.makeup();
    },
    onReady: function() {
        var t = this;
        console.log("onready"), this.optionsReady = this.$getOptions().then(function(i) {
            t.initPintuan(), t.initWall(), t.initLive();
            var n = new e.default(t, "78015");
            console.log(n), console.log("111", i._mgjuuid), t._mgjuuid = i._mgjuuid || "", t._mgjuuid && t.$redPacket.render({
                pid: 79582
            });
        });
    },
    onShow: function() {
        this.data.tuanInfo.tuanId && (console.log("onshow tuanInfo"), this.initPintuan());
    },
    onPageScroll: function(t) {
        var i = this, n = t.scrollTop;
        setTimeout(function() {
            i.$floatTip.handleShowHideTip(n);
        }, 100);
    },
    isWxshop: function() {
        "蘑菇街女装" === g.default.get("appName") ? this.setData({
            isWxshop: !0
        }) : this.setData({
            isWxshop: !1
        });
    },
    makeup: function() {
        var t = this;
        this.$on("__makeup_done__", function(i, n, e) {
            e && n && n.config && n.config.list && n.config.list.length > 0 && (t.homePageInfo = n.config.list[0] || {}, 
            t.floatTipInfo = n.floatTip.list[0] || {}, t.wallConfig = n.wall.list[0] || {}, 
            t._makeupCallback());
        });
    },
    _makeupCallback: function() {
        var t = this.homePageInfo;
        this._setDataPageInfo(), this._setDataCoupon(), this.initFloat(t), this.initQiangWall();
    },
    _setDataPageInfo: function() {
        var t = this.homePageInfo, i = t.pinTuanShareTitle;
        this.shareMessageTitle = t.shareMessageTitle || "", this.setData({
            pinTuanShareTitle: i,
            showCoupon: "1" === t.showCoupon,
            showActiveEntry: "1" === t.showActiveEntry,
            showTopBanner: "1" === t.showTopBanner
        });
    },
    _setDataCoupon: function() {
        var t = this.homePageInfo;
        "1" === t.showCoupon && t.couponPid && this.$getCoupon.setCoupon({
            $toast: this.$toast,
            pid: t.couponPid || "56251",
            img: t.couponImg || "https://s10.mogucdn.com/mlcdn/c45406/170705_8d3e11jji0b36icl8c36469fhh1dc_750x180.gif"
        });
    },
    initPintuan: function() {
        this.$pinshareInfo.initPinshareInfo(this.pageOptions);
    },
    initWall: function() {
        var t = this, i = {
            pid: this.diffPram.pidPinGoods,
            page: 1,
            pageSize: 3
        };
        m.get(i).then(function(i) {
            t.setData({
                wallList: i.list || []
            });
        }).catch(function(i) {
            t.$toast.show(i.message);
        });
    },
    initUnJoinInfo: function() {
        this.setData({
            wallTitle: "猜你喜欢",
            ptpC: "pinshare_isUnJoin"
        }), this.$activeEntry.setData({
            ptpC: "pinshare_isUnJoin"
        }), this.$activeEntryCategory.setData({
            ptpC: "pinshare_isUnJoin"
        });
    },
    initJoinInfo: function() {
        this.setData({
            ptpC: "pinshare_isJoin"
        });
    },
    initQiangWall: function() {
        var t = this.wallConfig, i = t.sourceId || "97311", n = t.btnText || "立即购买", e = t.cutPriceText || "促销价", o = {
            buttonText: n,
            buttonBg: "#FF5777",
            imgH: "480",
            size: "size_3x4",
            tagColor: "#FFBC49",
            buttonColor: "#FFFFFF",
            nameColor: "#333",
            showSale: "true" == t.isShow,
            rbShow: "org",
            tagText: e,
            styleColor: "#333"
        };
        this.setData({
            itemStyle: o
        }), this.$wall.setDataSource({
            source: "mwp_mait"
        }), this.$wall.initWall({
            pid: i
        });
    },
    initLive: function() {
        this.pageOptions && this.pageOptions.liveParams && this.setData({
            isShowReturn: !0
        });
    },
    initFloat: function(t) {
        1 == t.showFloatTip && this.$floatTip.initFloatTip(this.floatTipInfo);
    },
    onShareAppMessage: function() {
        var t = "", i = this.data.tuanInfo, n = i.itemInfo, e = this.pageOptions, o = i.activityId || "";
        return t = i.isJoin ? "我" + n.price + "元拼了" + n.title + "，快来拼团吧" : n.price + "元一起拼" + n.title, 
        e.businessId || (e.businessId = o), {
            title: this.shareMessageTitle + t,
            path: this.getFullUrl(this.$root.route, e),
            success: function() {},
            eventParams: {
                businessId: o
            },
            fail: function() {}
        };
    },
    onPullDownRefresh: function() {
        var t = this;
        this.initPintuan(), this.timer_1 = setTimeout(function() {
            wx.stopPullDownRefresh(), clearTimeout(t.timer_1);
        }, 500);
    },
    onReachBottom: function() {
        this.$wall.wallScrollEvent();
    },
    methods: {
        canUseShare: function() {
            this.$root.$logE("016000151", {}), wx.canIUse && wx.canIUse("button.open-type.share") ? console.log("分享成功") : this.$pinshareInfo.$dialog.$toast.show("请点击右上角分享", function() {}, 500);
        },
        formSubmitHandler: function(t) {
            var i = t.detail.formId;
            this.$logForm(i, 2);
        },
        returnToLive: function() {
            var t = this;
            this.optionsReady.then(function() {
                r.default.returnToLive(t.pageOptions.liveParams, t.$navigate.bind(t));
            });
        },
        getFullUrl: function(t) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!t) return null;
            t = t.split("?").slice(0, 2).join("?");
            var n = [];
            Object.keys(i).forEach(function(t) {
                i[t] && n.push(t + "=" + i[t]);
            });
            var e = "";
            return n && n.length > 0 && (e = t.indexOf("?") > -1 ? "&" : "?"), "" + t + e + n.join("&");
        }
    }
});