function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../../common/m.js")), o = t(require("../../../components/wall/index_cube.js")), a = {
    name: "app",
    components: {
        wall: (0, e.default.fn.merge)({}, o.default, {
            methods: {
                parseExposeData: function() {
                    var t = this.getExposeExtInfo();
                    if (t && t.param && t.wallParams) {
                        var e = this.exposeExtInfo.param.fcid, o = this.exposeExtInfo.param.ptpPartC, a = this.exposeExtInfo.wallParams.q, l = {
                            tableName: "",
                            fcid: e || "",
                            q: a || "",
                            mt_id: "",
                            tabName: ""
                        }, n = this.$parent.getExtPosInfo();
                        return l.tableName = n.title ? n.title : "", l.tabName = n.title ? n.title : "", 
                        l.mt_id = n.mt_id ? n.mt_id : "", {
                            fcid: e,
                            ptpPartC: o,
                            properties: l
                        };
                    }
                    return null;
                },
                linkClick: function(t) {
                    var e = this, o = t.currentTarget.dataset;
                    if (o.link) {
                        var a = {}, l = e.$parent.getExtPosInfo();
                        a.mt_id = l.mt_id, a.fcid = l.fcid, o.acm && (a.acm = o.acm), o.ptpC && (a.ptpC = o.ptpC), 
                        o.logIndex && (a.logIndex = o.logIndex), o.logMod && (a.logMod = o.logMod), o.logBtype && (a.logBtype = o.logBtype), 
                        e.useRedirect || "detail" === e.$root.query.fromPage ? (t.currentTarget.dataset.fromPage = e.$root.query.fromPage, 
                        e.$root.$redirect(o.link, a)) : e.$root.$navigate(o.link, a);
                    }
                }
            }
        })
    },
    data: function() {
        return {
            name: "catewall"
        };
    },
    extPosInfo: {
        mt_id: "",
        title: "",
        cKey: "",
        fcid: ""
    },
    methods: {
        getExtPosInfo: function() {
            return this.extPosInfo;
        },
        setExtPosInfo: function(t) {
            this.extPosInfo = t;
        },
        onLoad: function(t) {
            console.dir("on load");
        },
        onReady: function() {
            this.$vm.$wall.tabBarHock();
        },
        onGlobal: function() {
            var t = this.getGlobal().__tab_click_index__, e = this.getGlobal().__tab_click_pid__, o = this.getGlobal().__tab_click_options__;
            console.log("global tab data:", t, o, e), this.setExtPosInfo({
                index: t,
                mt_id: e || "",
                title: o.title || "",
                cKey: o.cKey || "",
                fcid: o.fcid || ""
            }), this.handleWallData();
        },
        handleWallData: function() {
            var t = this.getExtPosInfo();
            console.log(t);
            var e = this.config.wallParams[0].cKey, o = this.config.wallParams[0].top;
            console.log("config ckey -> " + e + ", top = " + o), t.cKey && t.cKey.length > 0 && (e = t.cKey), 
            console.log("wall ckey -> " + e), this.$vm.$wall.initWall({
                cKey: e && e.length > 0 ? e : "xcx-cate",
                fcid: t.fcid
            }), t.index && parseInt(t.index, 10) > 0 && this.setScrollInfo({
                scrollTop: o
            });
        },
        scroll: function(t) {
            this.$vm.$wall.scrollExposurePoint();
        },
        lower: function(t) {
            this.$vm.$wall.wallScrollEvent(t);
        }
    }
};

exports.default = {
    componentOptions: a,
    renderComponentsFunc: function(t) {}
};