Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("./index")), s = {
    setWallNav: function(a) {
        this.userNavObj = a || {};
    },
    initWallNav: function() {
        var a = this;
        a.tabOnClass = "tab_on", a.userNavObj = a.userNavObj || {}, (a.userNavObj.scrollNavRpxTop || 0 === a.userNavObj.scrollNavRpxTop) && (a.scrollNavRpxTop = a.userNavObj.scrollNavRpxTop), 
        a.navData = a.userNavObj.navData || !1, a.navData && (a.navData[0].onClass = a.tabOnClass), 
        !1 !== a.scrollNavRpxTop && (a.scrollNavPxTop = a.scrollNavRpxTop / 750 * a.sysInfo.windowWidth, 
        "ios" === a.sysInfo.platform && (a.scrollNavStickyClass = "wall_nav_top_sticky")), 
        0 === a.scrollNavPxTop && (a.scrollNavFixedClass = "nav_fixed");
    },
    scrollNavEvent: function(a) {
        var s = this, l = a.detail;
        if (s.scrollNavPxTop && s.isAndroidPlat) {
            var t = "";
            t = l.scrollTop > s.scrollNavPxTop ? "nav_fixed" : "", s.scrollNavFixedClass !== t && (s.scrollNavFixedClass = t, 
            s.pushData());
        }
        s.isSupportSelector && s.getInViewItems();
    },
    scrollReLoadAjax: function() {
        var a = this;
        a.setWallParam({
            page: 1
        }), a.resetWallParams();
        var s = !1 === a.scrollNavRpxTop ? "false" : "scrollIntoViewId";
        a.pushData({
            scrollIntoViewId: s
        }), setTimeout(function() {
            a.setData({
                scrollIntoViewId: "middleNameFixBug"
            });
        }, 100), a.isAllowAjax();
    },
    sortTab: function(a) {
        for (var s = this, l = a.currentTarget.dataset, t = s.navData, o = 0; o < t.length; o++) {
            var e = t[o];
            o === parseInt(l.tabIndex, 10) ? e.onClass = s.tabOnClass : e.onClass = "";
        }
        s.setWallParam({
            pid: l.pid || "",
            fcid: l.fcid || ""
        }), s.scrollReLoadAjax();
    }
};

exports.default = {
    components: a.default.components,
    initComSetting: a.default.initComSetting,
    data: a.default.data,
    methods: Object.assign({}, a.default.methods, s),
    onReady: a.default.onReady
};