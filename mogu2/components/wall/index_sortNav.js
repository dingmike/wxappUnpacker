Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("./index")), t = {
    setWallNav: function(a) {
        this.userNavObj = a || {};
    },
    initWallNav: function() {
        var a = this;
        a.defPriceFilter = [ {
            min: "0",
            max: "50",
            percent: 0
        }, {
            min: "50",
            max: "80",
            percent: 0
        }, {
            min: "80",
            max: "200",
            percent: 0
        } ], a.min = "", a.max = "", a.tabOnClass = "item_on", a.userNavObj = a.userNavObj || {}, 
        (a.userNavObj.scrollNavRpxTop || 0 === a.userNavObj.scrollNavRpxTop) && (a.scrollNavRpxTop = a.userNavObj.scrollNavRpxTop), 
        a.navData = a.userNavObj.navData || !1, !1 !== a.scrollNavRpxTop && (a.scrollNavPxTop = a.scrollNavRpxTop / 750 * a.sysInfo.windowWidth, 
        "ios" === a.sysInfo.platform && (a.scrollNavStickyClass = "wall_nav_top_sticky")), 
        0 === a.scrollNavPxTop && (a.scrollNavFixedClass = "nav_fixed");
    },
    scrollReLoadAjax: function() {
        var a = this;
        a.setWallParam({
            page: 1
        }), a.resetWallParams();
        var t = !1 === a.scrollNavRpxTop ? "false" : "scrollIntoViewId";
        a.pushData({
            scrollIntoViewId: t
        }), setTimeout(function() {
            a.setData({
                scrollIntoViewId: "middleNameFixBug"
            });
        }, 100), a.isAllowAjax();
    },
    firstBackNavInit: function(a) {
        var t = this, e = a.sortFilter, s = a.priceFilter || t.defPriceFilter;
        if (e && e.length > 1) {
            for (var r = 0; r < e.length; r++) {
                var l = e[r];
                l.sortKey === a.param.sort ? l.onClass = t.tabOnClass : l.onClass = "";
            }
            t.navData = {
                sortFilter: e,
                priceFilter: s,
                priceTabOnClass: "",
                priceMin: t.min,
                priceMax: t.max
            };
        }
    },
    scrollNavEvent: function(a) {
        var t = this, e = a.detail;
        if (t.scrollNavPxTop && t.isAndroidPlat) {
            var s = "";
            s = e.scrollTop > t.scrollNavPxTop ? "nav_fixed" : "", t.scrollNavFixedClass !== s && (t.scrollNavFixedClass = s, 
            t.pushData());
        }
        t.isSupportSelector && t.getInViewItems();
    },
    sortTab: function(a) {
        for (var t = this, e = a.currentTarget.dataset, s = t.navData.sortFilter, r = 0; r < s.length; r++) {
            var l = s[r];
            l.sortKey === e.sort ? l.onClass = t.tabOnClass : l.onClass = "";
        }
        t.navData.priceTabOnClass = "", t.setWallParam({
            sort: e.sort
        }), t.scrollReLoadAjax();
    },
    priceOpenTab: function() {
        var a = this;
        a.navData.priceTabOnClass = "" === a.navData.priceTabOnClass ? a.tabOnClass : "", 
        a.pushData();
    },
    priceSubmitTab: function(a) {
        var t = this, e = a.currentTarget.dataset;
        e.min && (t.min = e.min), e.max && (t.max = e.max), t.navData.priceTabOnClass = "", 
        t.navData.priceMin = t.min, t.navData.priceMax = t.max, t.setWallParam({
            minPrice: t.min,
            maxPrice: t.max
        }), t.scrollReLoadAjax();
    },
    priceInputChange: function(a) {
        var t = this, e = a.currentTarget.dataset, s = a.detail.value;
        isNaN(s) && (s = ""), t[e.type] = s;
    }
};

exports.default = {
    components: a.default.components,
    initComSetting: a.default.initComSetting,
    data: a.default.data,
    methods: Object.assign({}, a.default.methods, t),
    onReady: a.default.onReady
};