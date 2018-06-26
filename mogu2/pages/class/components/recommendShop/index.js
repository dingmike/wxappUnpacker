function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = e(require("../../../../common/utils/imgUrlTool")), t = e(require("../../../../components/end/index")), o = e(require("../../../../components/meiliSwiper/index"));

exports.default = {
    components: {
        end: t.default,
        meiliSwiperMiddle: o.default
    },
    data: function() {
        return {
            $headingName: "heading_more",
            $headingTitle: "",
            $headingTitleIcon: "",
            $headingHeight: "60rpx",
            $headingBgColor: "none",
            $headingMargin: 0,
            $headingPadding: 0,
            $headingColor: "",
            $headingMoreText: "更多",
            $headingMoreTextColor: "#999",
            $headingMoreLink: "",
            $headingWxaMoreLink: "",
            $headingAppId: "",
            list: [],
            ptpC: "",
            $meiliSwiperMiddle: {
                makeupKey: "swiperMiddle",
                indicatorActiveColor: "#ff5777",
                boxBgColor: "none",
                boxHeight: "200rpx",
                boxPadding: 0,
                boxMargin: 0,
                swiperWidth: "100%",
                swiperHeight: "200rpx",
                swiperBoxShadow: "none",
                maxCount: 10,
                ptpC: "mod_class_meiliSwiperMiddle"
            },
            $end: {
                placeholder: "没有更多了~",
                isEnd: !0
            },
            shopModId: 10009,
            goodsModId: 10010
        };
    },
    onLoad: function() {
        this.makeup();
    },
    onReady: function() {},
    methods: {
        init: function(e) {
            this._request(e);
        },
        _request: function(e) {
            var i = this;
            e && e.pid && this.$root.$mce_get(e, !0).then(function(e) {
                i._transData(e);
            }).catch(function() {
                i.setData({
                    list: []
                });
            });
        },
        makeup: function() {
            var e = this;
            this.$on("__makeup_done__", function(i, t, o) {
                var n = e.data && e.data.makeupKey || "";
                if (o && n && t && t[n] && t[n].list && t[n].list.length > 0) {
                    var a = t[n] || {};
                    e._transData(a);
                } else e.setData({
                    list: []
                });
            });
        },
        _transData: function(e) {
            if (e && e.info && e.info.title) {
                var t = {}, o = e.info;
                o.title && (t.$headingTitle = o.title), o.titleColor && (t.$headingColor = o.titleColor), 
                o.titleIcon && (t.$headingTitleIcon = o.titleIcon), o.moreTitle && (t.$headingMoreText = o.moreTitle), 
                o.moreLink && (t.$headingMoreLink = o.moreLink), o.moreColor && (t.$headingMoreTextColor = o.moreColor), 
                o.wxaMoreLink && (t.$headingWxaMoreLink = o.wxaMoreLink), o.wxaMoreAppId && (t.$headingAppId = o.wxaMoreAppId), 
                this.setData(t);
            }
            if (e && e.list && e.list.length > 0) {
                var n = e.list || [];
                n.map(function(e) {
                    e.shopLogoSuffix = e.shopLogo ? i.default.getWidthSuffix(e.shopLogo, 96) : "", e && e.list && e.list.length > 0 && e.list.map(function(t, o) {
                        e.list[o].imageSuffix = t.image ? i.default.getGoodsRatioSuffix(t.image, 320, "1:1") : "";
                    });
                }), this.setData({
                    list: n
                });
            } else this.setData({
                list: []
            });
        }
    }
};