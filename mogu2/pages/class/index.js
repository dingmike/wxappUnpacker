function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/base/createPage")), o = e(require("../../common/utils/makeup")), a = e(require("../../components/loading/index")), i = e(require("../../components/meiliSwiper/index")), n = e(require("../../components/activeEntry/index")), s = e(require("../../components/searchBar/index")), l = e(require("components/categoryBar/index")), u = e(require("components/recommendShop/index")), r = e(require("./data"));

(0, t.default)({
    components: {
        loading: a.default,
        searchBar: s.default,
        meiliSwiper: i.default,
        activeEntryCategory: n.default,
        categoryBar: l.default,
        recommendShop: u.default
    },
    data: r.default,
    onLoad: function() {
        this.catePageTimeFlag = Date.now(), this.makeup();
    },
    onReady: function() {
        this.pageOnReady(!0, !1);
    },
    onShow: function() {
        var e = Date.now();
        this.pageTitle && wx.setNavigationBarTitle({
            title: decodeURIComponent(this.pageTitle)
        }), e - this.catePageTimeFlag > 3e5 && (this.catePageTimeFlag = e, this.setComponentsShow(!1), 
        this.pageOnReady(!1, !1));
    },
    onPullDownRefresh: function() {
        this.pageOnReady(!1, !0);
    },
    onShareAppMessage: function() {
        return {
            title: this.data.shareTitle,
            success: function() {},
            fail: function() {}
        };
    },
    onPageScroll: function() {
        this.$expose && this.$expose();
    },
    methods: {
        makeup: function() {
            var e = this;
            this.$on("__makeup_done__", function(t, o, a) {
                a && o && o.config && o.config.list && o.config.list.length > 0 ? (e.homePageInfo = o.config.list[0] || {}, 
                e._makeupCallback()) : e.setData({
                    defaultHeight: "auto"
                }), e.setComponentsShow(!0), e.stopPullDownRefresh(), e.catePageTimeFlag = a ? Date.now() : 0, 
                e.timer_2 = setTimeout(function() {
                    e.$loading.hide(), clearTimeout(e.timer_2);
                }, 600);
            });
        },
        _makeupCallback: function() {
            var e = this.homePageInfo;
            this.pageTitle = e.pageTitle || "精选分类", wx.setNavigationBarTitle({
                title: decodeURIComponent(this.pageTitle)
            }), this._setDataPageInfo();
        },
        _setDataPageInfo: function() {
            var e = this.homePageInfo;
            this.setData({
                defaultHeight: "auto",
                shareTitle: e.shareTitle
            });
        },
        pageOnReady: function(e, t) {
            var a = this;
            !e && this.__makeup__ && this.__makeup__.reload ? (console.log("________分类页makeup请求：reload"), 
            this.__makeup__.reload()) : (console.log("________分类页makeup请求：new"), this.__makeup__ = new o.default(this, "75156")), 
            t || this.$loading.show(), this.timer_1 = setTimeout(function() {
                a.$loading.hide(), a.setComponentsShow(!0), a.stopPullDownRefresh(), clearTimeout(a.timer_1);
            }, 6e3);
        },
        stopPullDownRefresh: function() {
            wx.stopPullDownRefresh();
        },
        setComponentsShow: function(e) {
            this.setData({
                isComponentsShow: e
            });
        }
    }
});