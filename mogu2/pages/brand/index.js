function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var i = e(require("../../common/base/createPage")), t = e(require("../../common/utils/imgUrlTool")), o = e(require("../../common/utils/makeup")), n = e(require("../../components/loading/index")), a = e(require("../../components/topTabBar/index")), r = e(require("../../components/meiliSwiper/index")), l = e(require("../../components/activeEntry/index")), d = e(require("../../components/scrollGoods/index")), p = e(require("components/brandsBanner/index")), s = e(require("../../components/wall/index"));

(0, i.default)({
    components: {
        loading: n.default,
        topTabBar: a.default,
        meiliSwiper: r.default,
        activeEntry: l.default,
        activeEntryBrand: l.default,
        scrollGoods: d.default,
        meiliSwiperTop: r.default,
        meiliSwiperMiddle: r.default,
        brandsBanner: p.default,
        wall: s.default
    },
    data: {
        shareTitle: "约Ta一起来拼吧，每天十万件好货更新给你！",
        wallTitle: "精选商品",
        suffixImage: "",
        brandShopTitle: "",
        defaultHeight: "",
        $topTabBar: {
            ptpC: "mod_brand_topTabBar"
        },
        $meiliSwiper: {
            makeupKey: "swiper",
            indicatorActiveColor: "#ff5777",
            boxBgColor: "none",
            boxHeight: "280rpx",
            boxPadding: 0,
            boxMargin: 0,
            swiperWidth: "100%",
            swiperHeight: "280rpx",
            swiperBoxShadow: "none",
            maxCount: 10,
            ptpC: "mod_brand_meiliSwiper"
        },
        $meiliSwiperTop: {
            makeupKey: "swiperTop",
            indicatorActiveColor: "#ff5777",
            boxBgColor: "none",
            boxHeight: "200rpx",
            boxPadding: 0,
            boxMargin: "16rpx 0 0 0",
            swiperWidth: "100%",
            swiperHeight: "200rpx",
            swiperBoxShadow: "none",
            maxCount: 10,
            ptpC: "mod_brand_meiliSwiperTop"
        },
        $meiliSwiperMiddle: {
            makeupKey: "swiperMiddle",
            indicatorActiveColor: "#ff5777",
            boxBgColor: "none",
            boxHeight: "200rpx",
            boxPadding: 0,
            boxMargin: "16rpx 0 0 0",
            swiperWidth: "100%",
            swiperHeight: "200rpx",
            swiperBoxShadow: "none",
            maxCount: 10,
            ptpC: "mod_brand_meiliSwiperMiddle"
        },
        $activeEntry: {
            makeupKey: "top3x",
            boxHeight: "430rpx",
            boxMinHeight: "430rpx",
            boxPadding: "28rpx 0 0 0",
            boxMargin: 0,
            justifyContent: "space-between",
            listPadding: "0 24rpx 0 24rpx",
            itemWidth: "226rpx",
            itemHeight: "376rpx",
            itemMargin: "0 0 26rpx 0",
            itemBorderRadius: 0,
            imageWidth: "100%",
            imageHeight: "100%",
            imageBorderRadius: 0,
            titleIsShow: !0,
            titleWidth: "100%",
            titleHeight: "46rpx",
            titleTextAlign: "center",
            titleFontSize: "32rpx",
            titleFontWight: "bold",
            titleTop: "20rpx",
            titleLeft: 0,
            descriptionIsShow: !0,
            descriptionWidth: "100%",
            descriptionHeight: "34rpx",
            descriptionTextAlign: "center",
            descriptionFontSize: "24rpx",
            descriptionTop: "66rpx",
            descriptionLeft: 0,
            minCount: 3,
            maxCount: 3,
            ptpC: "mod_brand_activeEntry"
        },
        $scrollGoods: {
            makeupKey: "goods",
            type: 3,
            boxBgColor: "#ffffff",
            boxMargin: "16rpx 0 0 0",
            titleColor: "#333333",
            priceColor: "rgba(119, 0, 0, .8)",
            minGoods: 0,
            maxGoods: 100,
            $headingMargin: 0,
            $headingMoreText: "更多",
            showDiscount: !0,
            showCountDown: !1,
            ptpC: "mod_brand_scrollGoods"
        },
        $brandsBanner: {
            ptpC: "mod_brand_brandsBanner"
        },
        $headingTitleIcon: "",
        $headingHeight: "",
        $headingBgColor: "none",
        $headingColor: "#999999",
        $headingMargin: "30rpx 0 12rpx 0",
        $headingPadding: "",
        wallPriceColor: "#9A0000"
    },
    methods: {
        makeup: function() {
            var e = this;
            this.$on("__makeup_done__", function(i, o, n) {
                if (n && o && o.config && o.config && o.config.list && o.config.list.length > 0) {
                    var a = o.config.list[0] || {};
                    a.suffixImage = a.pingpaiImage ? t.default.getWidthSuffix(a.pingpaiImage, 750) : "", 
                    e.setPageInfo(a);
                } else e.setData({
                    defaultHeight: "auto"
                });
                if (n && o && o.wallList && o.wallList.list && o.wallList.list.length > 0) {
                    var r = o.wallList, l = r.info, d = (r.list, l.cKey || "xcx-cate"), p = l.fcid || "";
                    e.$wall.initWall({
                        cKey: d,
                        fcid: p
                    }), e.$topTabBar.init({
                        info: r.info,
                        list: r.list
                    }), e.setData({
                        wallPriceColor: r.info.titleColor || "#9A0000"
                    });
                }
                e.timer_1 = setTimeout(function() {
                    e.$loading.hide(), clearTimeout(e.timer_1);
                }, 600);
            });
        },
        setPageInfo: function(e) {
            this.setData({
                defaultHeight: "auto",
                shareTitle: e.shareTitle,
                wallTitle: e.wallTitle,
                suffixImage: e.suffixImage,
                brandShopTitle: e.brandShopTitle
            });
        },
        _setPageTitle: function() {
            var e = this.pageTitle ? decodeURIComponent(this.pageTitle) : "品牌特卖";
            wx.setNavigationBarTitle({
                title: e
            });
        }
    },
    onLoad: function(e) {
        this.pageTitle = e.title || "", this.$loading.show(), this.makeup();
    },
    onShow: function() {
        this._setPageTitle();
    },
    onReady: function() {
        this._setPageTitle(), new o.default(this, "75132");
    },
    onReachBottom: function() {
        this.$wall.wallScrollEvent();
    },
    onPageScroll: function() {
        this.$wall.isSupportSelector && this.$wall.getInViewItems();
    },
    onShareAppMessage: function(e) {
        return {
            title: this.data.shareTitle,
            success: function(e) {},
            fail: function(e) {}
        };
    }
});