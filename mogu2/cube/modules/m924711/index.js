function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = a(require("../../../common/m.js")), e = (a(require("../../../common/base/createPage.js")), 
a(require("../../../components/loading/index.js"))), i = a(require("../../../components/toast/index.js")), o = a(require("./components/seckill/index.js")), n = a(require("./components/tabNavigation/index.js")), s = a(require("./components/roomList/index.js")), r = a(require("./components/dataService/dataService.js")), c = a(require("./components/skinDataManager/index.js")), d = a(require("../../../common/service/user.js")), l = (t.default.MWP, 
{
    components: {
        Loading: e.default,
        toast: i.default,
        seckill: o.default,
        tabNavigation: n.default,
        roomList: s.default
    },
    data: function() {
        return {
            showLoadingErrorView: !1,
            showList: !1,
            minListHeight: 0
        };
    },
    methods: {
        onLoad: function(a) {
            c.default.downloadSkinData(), this.loadDefaultSettings();
            var t = a.targetTabId;
            void 0 != t && (this.$vm.$tabNavigation.selectedTabItemId = t), this.addUserLoginListener(), 
            this.getHeaderDataWithLoadingType("LOADING_TYPE_INIT");
        },
        loadDefaultSettings: function() {
            var a = this;
            this.tabNavTopSpace = Number.MAX_VALUE, this.$vm.$tabNavigation.setSelectedTabChangeCallback(function(t) {
                a.tabNavSelectedTabChanged(t);
            });
        },
        tabNavSelectedTabChanged: function(a) {
            this.$vm.$roomList.initWithTabId(a.id), this.$vm.$roomList.getInitialData();
        },
        addUserLoginListener: function() {
            var a = this;
            d.default.$on("login", function() {
                a.getHeaderDataWithLoadingType("LOADING_TYPE_INIT");
            });
        },
        onReady: function() {
            this.applySkin();
            var a = this;
            wx.getSystemInfo({
                success: function(t) {
                    var e = 750 / t.windowWidth, i = t.windowHeight * e - 90 - 90;
                    a.pxToRpxRatio = e, a.setData({
                        minListHeight: i
                    });
                }
            });
        },
        applySkin: function() {
            this.skinData = c.default.getSkinData(), this.skinData && this.setData({
                skinData: this.skinData
            });
        },
        onShow: function() {
            this.startCalculateTabNavTopSpaceTimer();
        },
        startCalculateTabNavTopSpaceTimer: function() {
            var a = this;
            this.stopCalculateTabNavTopSpaceTimer(), this.tabNavTopSpaceCalculateTimer = setInterval(function() {
                a.calculateTabNavTopSpace();
            }, 1e3);
        },
        stopCalculateTabNavTopSpaceTimer: function() {
            this.tabNavTopSpaceCalculateTimer && (clearInterval(this.tabNavTopSpaceCalculateTimer), 
            this.tabNavTopSpaceCalculateTimer = void 0);
        },
        calculateTabNavTopSpace: function() {
            if (wx.createSelectorQuery) {
                var a = this;
                wx.createSelectorQuery().select("#LIVE-LIST-TAB-NAVIGATION").boundingClientRect(function(t) {
                    if (t) {
                        var e = 90 / (a.pxToRpxRatio ? a.pxToRpxRatio : 1);
                        a.tabNavTopSpace = t.top + (a.pageScrollTop ? a.pageScrollTop : 0) - e;
                    }
                }).exec();
            }
        },
        onHide: function() {
            this.stopCalculateTabNavTopSpaceTimer();
        },
        getHeaderDataWithLoadingType: function(a) {
            var t = this;
            this.isLoadingData || (this.isLoadingData = !0, this.stopCalculateTabNavTopSpaceTimer(), 
            this.showLoadingViewForLoadingType(a), r.default.getHeaderData(function(e, i) {
                t.isLoadingData = !1, t.hideLoadingViewForLoadingType(a), e ? (t.data.showLoadingErrorView = !1, 
                t.data.showList = !0, t.setUpSeckill(e.seckill), t.setUpTabNav(e.tabs)) : (i && i.message && i.message.length > 0 && t.$vm.$toast.show(i.message), 
                t.data.showLoadingErrorView = !0, t.data.showList = !1), t.setData({
                    showLoadingErrorView: t.data.showLoadingErrorView,
                    showList: t.data.showList
                }), t.startCalculateTabNavTopSpaceTimer();
            }));
        },
        showLoadingViewForLoadingType: function(a) {
            "LOADING_TYPE_INIT" === a && this.$vm.$Loading.show();
        },
        hideLoadingViewForLoadingType: function(a) {
            "LOADING_TYPE_INIT" === a && this.$vm.$Loading.hide(), "LOADING_TYPE_REFRESH" === a && wx.stopPullDownRefresh();
        },
        setUpSeckill: function(a) {
            this.$vm.$seckill.setSeckillData(a);
        },
        setUpTabNav: function(a) {
            this.$vm.$tabNavigation.setNavData(a);
        },
        onPullDownRefresh: function() {
            this.isLoadingData || this.getHeaderDataWithLoadingType("LOADING_TYPE_REFRESH");
        },
        onReachBottom: function() {
            this.$vm.$roomList.getMoreData();
        },
        onPageScroll: function(a) {
            var t = a.scrollTop;
            this.data.showList && (this.pageScrollTop = t, this.$expose && this.$expose(), this.fixTabNavIfNeeded(t));
        },
        fixTabNavIfNeeded: function(a) {
            var t = !1;
            a > this.tabNavTopSpace && (t = !0), this.fixTabNav != t && (this.fixTabNav = t, 
            this.$vm.$tabNavigation.setTabNavFixed(this.fixTabNav));
        }
    }
});

exports.default = {
    componentOptions: l,
    renderComponentsFunc: function(a) {}
};