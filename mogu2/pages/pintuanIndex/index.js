function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        var o = [], i = !0, a = !1, r = void 0;
        try {
            for (var n, l = t[Symbol.iterator](); !(i = (n = l.next()).done) && (o.push(n.value), 
            !e || o.length !== e); i = !0) ;
        } catch (t) {
            a = !0, r = t;
        } finally {
            try {
                !i && l.return && l.return();
            } finally {
                if (a) throw r;
            }
        }
        return o;
    }
    return function(e, o) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, o);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), o = t(require("../../common/base/createPage")), i = t(require("../../common/utils/makeup")), a = t(require("../../components/meiliSwiper/index")), r = t(require("../../components/activeEntry/index")), n = t(require("../../components/wall/index_tabNav")), l = t(require("../../components/bottomNavBar/index")), s = t(require("components/ptBroadcast/index")), u = t(require("../../components/scrollGoods/index")), p = t(require("../../common/utils/cache"));

exports.default = (0, o.default)({
    components: {
        ptBroadcast: s.default,
        meiliSwiper: a.default,
        wall: n.default,
        bottomNavBar: l.default,
        categoryEntry: r.default,
        scrollGoods: u.default
    },
    data: {
        $ptBroadcast: {},
        $meiliSwiper: {
            makeupKey: "swiper",
            indicatorActiveColor: "#ff5777",
            boxBgColor: "none",
            boxHeight: "230rpx",
            boxPadding: 0,
            boxMargin: 0,
            swiperWidth: "100%",
            swiperHeight: "230rpx",
            swiperBoxShadow: "none",
            maxCount: 10,
            ptpC: "mod_pintuanIndex_banner"
        },
        $categoryEntry: {
            makeupKey: "top4x",
            itemWidth: "168rpx",
            itemHeight: "180rpx",
            boxMargin: "0 0 16rpx 0",
            ptpC: "mod_pintuanIndex_categoryEntry"
        },
        $scrollGoods: {
            makeupKey: "goods",
            type: 3,
            boxBgColor: "#ffffff",
            boxMargin: "0 0 16rpx 0",
            titleColor: "#333333",
            priceColor: "#fc3c64",
            minGoods: 0,
            maxGoods: 100,
            showDiscount: !1,
            showCountDown: !1,
            ptpC: "mod_pintuanIndex_scrollGoods"
        },
        $bottomNavBar: {
            makeupKey: "bottomBar"
        },
        shareTitle: "这里的商品只要1元，每天十万件好货更新给你！",
        isWxshop: void 0
    },
    onLoad: function(t) {
        var o = this;
        this.pageTitle = t.title || "", this.$bottomNavBar.initBottomNavBar(), this.$bottomNavBar.setData({
            isShowBottomBar: !0
        }), this.isWxshop(), this.$on("__makeup_done__", function(i, a, r) {
            if (r && a && a.config) {
                var n = a.config && a.config.list || [];
                n && n.length > 0 && n[0] && n[0].title && o.setData({
                    shareTitle: n[0].title
                });
            }
            if (r && a && a.wallList) {
                var l = a.wallList && a.wallList.list || [], s = [];
                if (l && l.length > 0) {
                    var u = !0, p = !1, d = void 0;
                    try {
                        for (var c, f = l.entries()[Symbol.iterator](); !(u = (c = f.next()).done); u = !0) {
                            var m = e(c.value, 2), h = (m[0], m[1]);
                            s.push({
                                name: h.cateName,
                                pid: h.pid
                            });
                        }
                    } catch (t) {
                        p = !0, d = t;
                    } finally {
                        try {
                            !u && f.return && f.return();
                        } finally {
                            if (p) throw d;
                        }
                    }
                    o.$wall.setDataSource({
                        source: "mwp_mait"
                    }), s && s.length > 1 && o.$wall.setWallNav({
                        scrollNavRpxTop: 0,
                        navData: s
                    }), "detail" == t.fromPage && (o.setData({
                        fromPage: "detail"
                    }), o.$wall.useRedirect = !0), o.$wall.initWall({
                        pid: s[0].pid
                    });
                }
            }
        });
    },
    onShow: function() {
        this._setPageTitle();
    },
    onReady: function() {
        new i.default(this, "82755"), this._setPageTitle();
    },
    isWxshop: function() {
        "蘑菇街女装" === p.default.get("appName") ? this.setData({
            isWxshop: !0
        }) : this.setData({
            isWxshop: !1
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: this.data.shareTitle,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    methods: {
        _setPageTitle: function() {
            var t = this.pageTitle ? decodeURIComponent(this.pageTitle) : "蘑菇街拼团";
            wx.setNavigationBarTitle({
                title: t
            });
        }
    }
});