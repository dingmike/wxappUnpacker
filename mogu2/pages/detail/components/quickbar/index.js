function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../shareDialog/index")), i = t(require("../base/color")), a = t(require("../../../../components/imcall/index"));

exports.default = {
    data: function() {
        return {
            bottom: 130,
            shareImage: "https://s3.mogucdn.com/mlcdn/c45406/171227_02j2ddeg1f4g338j30j3gla220229_116x116.png",
            webImImage: "https://s10.mogucdn.com/mlcdn/c45406/171224_4k76eke6258g7i80gff727lk7l0c6_116x116.png",
            isShareShow: !0,
            isWebImTipsShow: null,
            zIndex: 98
        };
    },
    components: {
        shareDialog: e.default,
        color: i.default,
        imCall: a.default
    },
    onLoad: function() {
        var t = this;
        this.$root.$wrapper && this.$root.$wrapper.$on("$quickbar.bottom", function(e) {
            t.setData({
                bottom: e || t.data.bottom
            });
        }), this.$root.$wrapper && this.$root.$wrapper.$on("$shareDialog.zIndex", function(e) {
            t.setData({
                zIndex: e
            });
        });
    },
    methods: {
        init: function(t, e, i) {
            var a = i.jcubeOptions, o = void 0 === a ? [ {} ] : a, s = o && o.length > 0 && o[0] || {}, n = t.shareInfo || {}, r = n.isNeedShareIntegral, h = (n.shareIntegralInfo || {}).shareIcon;
            r && h && this.setData({
                shareIcon: h
            }), this.$root.$logE("016000399", {
                status: r ? 0 : 1
            }), this.isNeedShareIntegral = r, this.initShare(t.shareInfo, s.isShareHide), this.initWebIm(t, e, s);
        },
        initMceData: function(t) {
            var e = {};
            Object.keys(t).forEach(function(i) {
                var a = t[i] && t[i].list, o = a && a.length > 0 && a;
                e[i] = o;
            });
            var i = e.shareTemplate, a = e.default;
            a = a && a[0], this.setData(a), this.$shareDialog.setShareInfo({
                iconConfig: a,
                shareTemplate: i
            });
        },
        initShare: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
            this.setData({
                isShareShow: !e && wx.canIUse && wx.canIUse("button.open-type.share")
            }), this.$shareDialog.init(t);
        },
        initWebIm: function(t, e, i) {
            var a = this, o = t.shopInfo, s = t.topImages, n = t.itemInfo, r = t.addCartLottery, h = e.itemId, d = e.activityId, c = i.path;
            c = c.indexOf("?") >= 0 ? c + "&itemId=" + h + (d ? "&activityId=" + d : "") : c + "?itemId=" + h + (d ? "&activityId=" + d : "");
            var I = {
                shopId: o.shopId,
                userId: o.userId,
                goodsId: h,
                fromType: i.fromType || "",
                activityId: d || "",
                channelId: i.channelId || "",
                img: s[0],
                path: c,
                title: n.title
            }, m = wx.getStorageSync("footbar.date"), u = r && r.addCartTip && r.addCartTip.image && (m.date !== new Date().toFormattedString("yyyy-MM-dd") || parseInt(m.times) >= 1);
            this.$imCall.setImOpts(I), this.setData({
                webIm: I
            }), I && !u && wx.getStorage({
                key: "quickNavigation.webImTipsHide",
                success: function(t) {
                    t.data || a.initWebImTips();
                },
                fail: function() {
                    a.initWebImTips();
                }
            });
        },
        initWebImTips: function() {
            var t = this;
            setTimeout(function() {
                t.showWebImTips();
            }, 2e3), setTimeout(function() {
                t.hideWebImTips();
            }, 7e3);
        },
        showWebImTips: function() {
            this.setData({
                isWebImTipsShow: !0
            });
        },
        hideWebImTips: function() {
            var t = this;
            this.setData({
                isWebImTipsShow: !1
            }), setTimeout(function() {
                t.setData({
                    isWebImTipsShow: null
                });
            }, 400);
        },
        onImClick: function() {
            wx.setStorage({
                key: "quickNavigation.webImTipsHide",
                data: !0
            });
        },
        showActionSheet: function() {
            this.$root.$logE("000000045", {
                status: this.isNeedShareIntegral ? 0 : 1
            }), this.$shareDialog.showShareDialog();
        }
    }
};