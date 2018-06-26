Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./index")), a = {
    tabBarHock: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.__hasKilled || t.setScrollInfo({
                    scrollBoxHeight: a.windowHeight,
                    lowerThreshold: 1500
                });
            }
        }), setTimeout(function() {
            t.__hasKilled || wx.getSystemInfo({
                success: function(a) {
                    t.__hasKilled || t.setScrollInfo({
                        scrollBoxHeight: a.windowHeight,
                        lowerThreshold: 1500
                    });
                }
            });
        }, 300), setTimeout(function() {
            t.__hasKilled || wx.getSystemInfo({
                success: function(a) {
                    t.__hasKilled || t.setScrollInfo({
                        scrollBoxHeight: a.windowHeight,
                        lowerThreshold: 1500
                    });
                }
            });
        }, 800);
    },
    scrollExposurePoint: function() {
        this.isSupportSelector && this.getInViewItems();
    },
    setWallNav: function(t) {
        this.userNavObj = Object.assign({}, this.userNavObj, t);
    },
    navDefaultData: function() {
        return [ {
            sortKey: "pop",
            name: "综合",
            onClass: "tab_on"
        }, {
            sortKey: "sell",
            name: "销量"
        }, {
            sortKey: "new",
            name: "新品"
        } ];
    },
    navDefaultStyle: function(t) {
        return {
            nbg: "#ffffff",
            nl: "red",
            nt: "#555",
            bl: !1 === t ? null : "5rpx solid red"
        };
    },
    initNav: function(t) {
        t.navType && "horizontal" !== t.navType ? "vertical" === t.navType ? this.initVerticalNav(t) : this.initDefaultNav(t) : this.initHorizontalNav(t);
    },
    getNavStyle: function(t) {
        return t.navStyle ? Object.assign({}, t.navStyle, {
            bl: !1 === t.navHasBottom ? null : "5rpx solid " + t.navStyle.nl
        }) : this.navDefaultStyle(t.navHasBottom);
    },
    initDefaultNav: function(t) {
        this.setWallNav({
            scrollNavRpxTop: t.scrollNavRpxTop,
            isGetScrollTop: !!t.isGetScrollTop && t.isGetScrollTop,
            navData: t.navData && t.navData.length > 0 ? t.navData : this.navDefaultData()
        }), this.setData({
            navType: "default"
        });
    },
    initHorizontalNav: function(t) {
        this.setWallNav({
            scrollNavRpxTop: t.scrollNavRpxTop,
            isGetScrollTop: !!t.isGetScrollTop && t.isGetScrollTop,
            navData: t.navData && t.navData.length > 0 ? t.navData : this.navDefaultData()
        }), this.setData({
            navType: "horizontal",
            navStyle: this.getNavStyle(t)
        });
    },
    initVerticalNav: function(t) {
        var a = 4;
        t.lineItems > 0 && (a = t.lineItems);
        var s = t.navData.length, l = Math.ceil(s / a);
        console.log("显示的行数 -> " + l);
        for (var e = 0; e < s; e++) t.navData[e].index = e, t.navData[e].onClass = 0 === e ? "tab_on" : "";
        for (var i = [], o = 0; o < l; o++) (o + 1) * a > s ? i.push(t.navData.splice(0, t.navData.length)) : i.push(t.navData.splice(0, a));
        this.setWallNav({
            scrollNavRpxTop: t.scrollNavRpxTop,
            isGetScrollTop: !!t.isGetScrollTop && t.isGetScrollTop,
            navData: i
        }), this.setData({
            navType: "vertical",
            navBgHeight: 80 * l,
            tabHeight: 100 / a,
            navStyle: this.getNavStyle(t)
        });
    },
    initWallNav: function() {
        if (this.userNavObj = this.userNavObj || {}, (this.userNavObj.scrollNavRpxTop || 0 === this.userNavObj.scrollNavRpxTop) && (this.scrollNavRpxTop = this.userNavObj.scrollNavRpxTop), 
        this.navData = this.userNavObj.navData || !1, this.isGetScrollTop = this.userNavObj.isGetScrollTop, 
        this.tabOnClass = "tab_on", this.navData) {
            for (var t = 0, a = 0; a < this.navData.length; a++) this.navData[a].onClass && 0 !== this.navData[a].onClass.length || t++;
            t === this.navData.length && (this.navData[0].onClass = this.tabOnClass);
        }
        !1 !== this.scrollNavRpxTop && this.sysInfo && (this.scrollNavPxTop = this.scrollNavRpxTop / 750 * this.sysInfo.windowWidth, 
        "ios" === this.sysInfo.platform && (this.scrollNavStickyClass = "wall_nav_top_sticky")), 
        0 === this.scrollNavPxTop && (this.scrollNavFixedClass = "nav_fixed");
    },
    setUp: function(t) {
        this.isUp = t;
    },
    navHeightHock: function() {
        var t = this;
        setTimeout(function() {
            t.__hasKilled || t.initNavHeight();
        }, 600);
    },
    navHeightScrollHock: function() {
        var t = this;
        clearTimeout(this.__scrollTimeoutKey), this.__scrollTimeoutKey = setTimeout(function() {
            t.__hasKilled || t.initNavHeight();
        }, 200);
    },
    initNavHeight: function() {
        var t = this;
        if (wx.createSelectorQuery) {
            var a = wx.createSelectorQuery();
            a.select("#wall_nav_box").boundingClientRect(), t.isUp ? a.selectViewport().scrollOffset() : a.select(".wrapper-scroll-view").scrollOffset(), 
            a.exec(function(a) {
                if (a[0] && a[1]) {
                    var s = a[0].top || 0;
                    if (s += a[1].scrollTop || 0, t.__hasKilled) return;
                    t.__lastScrollNavRpxTop !== s && (t.setWallNav({
                        scrollNavRpxTop: s,
                        isGetScrollTop: !0
                    }), t.initWallNav(), t.__lastScrollNavRpxTop = s);
                }
            });
        }
    },
    sortVerticalTab: function(t) {
        for (var a = t.currentTarget.dataset, s = this.navData, l = 0; l < s.length; l++) for (var e = 0; e < s[l].length; e++) s[l][e].index === parseInt(a.tabIndex, 10) ? s[l][e].onClass = "tab_on" : s[l][e].onClass = "";
        this.reloadByNavClick(t, this.resetParams);
    },
    sortTab: function(t) {
        for (var a = t.currentTarget.dataset, s = this.navData, l = 0; l < s.length; l++) {
            var e = s[l];
            l === parseInt(a.tabIndex, 10) ? e.onClass = this.tabOnClass : e.onClass = "";
        }
        this.reloadByNavClick(t, this.resetParams);
    },
    reloadByNavClick: function(t, a) {
        a(t), this.scrollReLoadAjax();
    },
    resetParams: function(t) {
        var a = t.currentTarget.dataset;
        this.setWallParam({
            pid: a.pid || "",
            fcid: a.fcid || ""
        });
    },
    scrollNavEvent: function(t) {
        var a = this, s = t.detail;
        if (a.isGetScrollTop && a.isAndroidPlat) {
            var l = "";
            l = s.scrollTop > a.scrollNavRpxTop ? "nav_fixed" : "", a.scrollNavFixedClass !== l && (a.scrollNavFixedClass = l, 
            a.pushData());
        }
    },
    reloadWallData: function(t) {
        this.setWallParam({
            cKey: t.cKey || "xcx_cube",
            pid: t.pid || "",
            fcid: t.fcid || ""
        }), this.scrollReLoadAjax();
    },
    scrollReLoadAjax: function() {
        var t = this;
        this.setWallParam({
            page: 1
        }), this.resetWallParams(), this.pushData();
        var a = !1 === this.scrollNavRpxTop ? "false" : "scrollIntoViewId";
        this.setScrollInfo({
            scrollIntoView: a
        }), setTimeout(function() {
            t.__hasKilled || t.setScrollInfo({
                scrollIntoView: a
            });
        }, 100), this.isAllowAjax();
    }
};

exports.default = {
    components: t.default.components,
    initComSetting: t.default.initComSetting,
    data: t.default.data,
    methods: Object.assign({}, t.default.methods, a),
    onReady: t.default.onReady
};