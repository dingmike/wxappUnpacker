function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

a(require("../../../common/m.js"));

var t = {
    name: "app",
    components: {
        wall: a(require("../../../components/wall/index_cube.js")).default
    },
    data: function() {
        return {
            name: "促销图墙",
            tabShow: !0,
            wallTml: "commonTml"
        };
    },
    methods: {
        mounted: function() {
            this.$vm.$wall.navHeightHock();
        },
        onLoad: function(a) {
            var t = !1;
            if (this.$root.$wrapper && this.$root.$wrapper.data) {
                var l = this.$root.$wrapper.data.isUp;
                void 0 === l && null === l || (t = l);
            }
            console.log("isup = " + t), this.$vm.$wall.setUp(t);
        },
        onReady: function() {
            this.$vm.$wall.tabBarHock(), this.handleWallData();
        },
        trim: function(a) {
            return a.replace(/(^\s*)|(\s*$)/g, "");
        },
        handleWallData: function() {
            var a = this.config;
            if (a) {
                var t = a.navStyle[0].wallTml;
                t && (console.log("wallTml = " + t), this.setData({
                    wallTml: t
                }));
                for (var l = 0; l < a.tabNav.length; l++) {
                    var e = a.tabNav[l];
                    e.name = e.navName, e.fcid = e.navId;
                    var n = e.navTopIcon;
                    n && this.trim(n).length > 0 ? e.hasIcon = !0 : e.hasIcon = !1;
                }
                var o = {}, s = {};
                if ("mait" === a.navStyle[0].ckey) {
                    o = a.tabNavMait;
                    for (var i = 0; i < o.length; i++) {
                        o[i].name = o[i].navName;
                        var r = o[i].navTopIcon;
                        r && this.trim(r).length > 0 ? o[i].hasIcon = !0 : o[i].hasIcon = !1;
                    }
                    s.pid = o[0].sourceKey, this.$vm.$wall.setDataSource({
                        source: "mwp_mait"
                    });
                    var v = a.formData.maitIconConfig;
                    v && "yes" === v[0].iconShow && this.$vm.$wall.setWallItemField({
                        leftTop: v[0].itemIcon
                    });
                } else o = a.tabNav, s.fcid = o[0].fcid, s.cKey = "xcx-cube";
                if (a.otherset && a.otherset.length) for (var m = 0; m < a.otherset.length; m++) {
                    var c = a.otherset[m];
                    c.key && (s[c.key] = c.xcxValue);
                }
                if (a.urlParam && a.urlParam[0] && a.urlParam[0].paramNames) for (var h = a.urlParam[0].paramNames.split(","), u = 0; u < h.length; u++) {
                    var p = h[u];
                    p && (s[p] = this.options[p]);
                }
                if (a.navCss && a.navCss[0] && a.navCss[0].navshow && "no" === a.navCss[0].navshow) this.setData({
                    tabShow: !1,
                    style: a.style[0]
                }), this.$vm.$wall.initWall(s); else {
                    this.setData({
                        tabShow: !0,
                        style: a.style[0]
                    });
                    var f = "horizontal", $ = "no", w = 0;
                    a.navCss && a.navCss[0] && a.navCss[0].navlayout && ($ = a.navCss[0].navtop, f = a.navCss[0].navlayout, 
                    w = a.navCss[0].lineitems), this.$vm.$wall.initNav({
                        scrollNavRpxTop: "yes" === $ ? 0 : 1,
                        navStyle: a.navStyle[0],
                        navType: f,
                        navData: o.length > 1 && o,
                        lineItems: "vertical" === f ? w : null
                    }), this.$vm.$wall.initWall(s);
                }
            }
        },
        scroll: function(a) {
            this.$vm.$wall.scrollNavEvent(a), this.$vm.$wall.scrollExposurePoint(), this.$vm.$wall.navHeightScrollHock();
        },
        lower: function(a) {
            this.$vm.$wall.wallScrollEvent(a);
        }
    }
};

exports.default = {
    componentOptions: t,
    renderComponentsFunc: function(a) {}
};