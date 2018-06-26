function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../common/base/createPage")), o = t(require("../../common/utils/makeup")), a = t(require("../../common/utils/imgUrlTool")), i = t(require("../../components/wall/index")), n = t(require("../../components/bottomNavBar/index")), l = t(require("components/ptWallCount/index")), s = t(require("../../components/scrollGoods/index"));

(0, e.default)({
    components: {
        wall: i.default,
        bottomNavBar: n.default,
        ptWallCount: l.default,
        scrollGoods: s.default
    },
    data: {
        shareTitle: "约Ta一起来拼吧，每天十万件好货更新给你！",
        defaultHeight: "",
        image: "",
        $bottomNavBar: {
            makeupKey: "bottomBar"
        },
        $wallPtMore: {
            link: "/pages/pintuanIndex/index",
            name: "大家都在拼",
            marginTop: 16,
            marginBottom: 0
        },
        $ptWallCount: {
            makeupKey: "lotteryGoods"
        },
        $scrollGoods: {
            makeupKey: "goods",
            type: 3,
            boxBgColor: "#ffffff",
            boxMargin: "0 0 16rpx 0",
            titleColor: "#333333",
            priceColor: "#fc3c64",
            minGoods: 1,
            maxGoods: 100,
            showDiscount: !1,
            showCountDown: !1,
            ptpC: "mod_pintuanLottery_scrollGoods"
        }
    },
    onLoad: function(t) {
        var e = this;
        this.pageTitle = t.title || "", this.$bottomNavBar.initBottomNavBar(), this.$bottomNavBar.setData({
            isShowBottomBar: !0
        }), this.$on("__makeup_done__", function(o, i, n) {
            if (n && i && i.config) {
                var l = i.config && i.config.list && i.config.list[0] || {}, s = l.shareTitle || "约Ta一起来拼吧，每天十万件好货更新给你！", r = l.banner ? a.default.getWidthSuffix(l.banner, 750) : "", u = l.wallPid || "43991";
                e.setData({
                    shareTitle: s,
                    image: r,
                    defaultHeight: "auto"
                }), e.$wall.setDataSource({
                    source: "mwp_mait"
                }), "detail" == t.fromPage && (e.$wall.useRedirect = !0), e.$wall.initWall({
                    pid: u
                });
            }
        });
    },
    onShow: function() {
        this._setPageTitle();
    },
    onReady: function() {
        new o.default(this, "77645"), this._setPageTitle();
    },
    onShareAppMessage: function(t) {
        return {
            title: this.data.shareTitle,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    onReachBottom: function() {
        this.$wall.wallScrollEvent();
    },
    onPageScroll: function() {
        this.$wall.isSupportSelector && this.$wall.getInViewItems();
    },
    methods: {
        _setPageTitle: function() {
            var t = this.pageTitle ? decodeURIComponent(this.pageTitle) : "抽奖团";
            wx.setNavigationBarTitle({
                title: t
            });
        }
    }
});