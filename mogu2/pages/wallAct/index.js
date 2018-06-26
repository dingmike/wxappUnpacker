function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../common/m")), o = t(require("../../common/base/createPage")), n = t(require("../../common/utils/imgUrlTool")), a = t(require("../../components/wall/index_tabNav")), i = t(require("../../components/getCoupon/index")), s = t(require("../../components/toast/index")), u = t(require("../../components/actCountDown/index")), r = t(require("../../components/mask/index")), c = e.default.MCE;

exports.default = (0, o.default)({
    components: {
        wall: a.default,
        getCoupon: i.default,
        toast: s.default,
        actCountDown: u.default,
        mask: r.default
    },
    data: {},
    initCount: function() {
        var t = this;
        this.$actCountDown.init({
            $mask: this.$mask
        });
        var e = [ "55895", "56023" ];
        c.multiget({
            pids: e.join(",")
        }).then(function(o) {
            var n = e[0];
            t.$actCountDown.countdownInfo = n && o && o[n] && o[n].list && o[n].list[0] || [];
            var a = "", i = "", s = o[n] && o[n].context.currentTime, u = (t.$actCountDown.countdownInfo.preDeadline ? t.$actCountDown.countdownInfo.preDeadline : 0) - s, r = t.$actCountDown.countdownInfo.deadline - s;
            u > 0 ? (a = u, i = t.$actCountDown.countdownInfo.preCountdownTips) : u < 0 && r > 0 ? (a = r, 
            i = t.$actCountDown.countdownInfo.countdownTips) : (a = 1, i = t.$actCountDown.countdownInfo.countdownTips), 
            t.$actCountDown.$countdown.init({
                format: "dd天hh小时mm分ss秒",
                countdown: a
            });
            var c = e[1], l = c && o && o[c] && o[c].list && o[c].list[0] || [];
            t.$actCountDown.$ruleModal.setData({
                bgImage: l.ruleBgImage,
                ruleImage: l.ruleImage
            }), t.$actCountDown.countdownInfo = Object.assign(t.$actCountDown.countdownInfo, t.cubeinfo), 
            t.$actCountDown.setData({
                countdownInfo: t.$actCountDown.countdownInfo,
                isShowCountdown: !0,
                countdownTips: i
            });
        });
    },
    handlePageRes: function(t) {
        var e = !1;
        if (t.pageInfo && t.pageInfo.title) {
            var o = t.pageInfo.title;
            this.shareTitle = t.pageInfo.desc || t.pageInfo.title, wx.setNavigationBarTitle({
                title: o
            });
        }
        if (t.pageInfo && t.pageInfo.moduleList && t.pageInfo.moduleList.length) {
            for (var a = {}, i = !1, s = !1, u = !1, r = 0, c = !1, l = 0, d = t.pageInfo.moduleList, m = 0; m < d.length; m++) {
                var f = d[m], p = f.systemModuleId + "";
                "654" === p && (a = f.schema.formData), "505013" === p && (i = f.schema.formData), 
                e || "505033" !== p || (s = f.schema.formData), "612941" === p && (e = !0, s = f.schema.formData);
            }
            if (i && i.count && i.coupon && (u = i.count[0], c = i.coupon[0], u && u.show && (r = 82, 
            this.cubeinfo = {
                countdownBgColor: u.bgC,
                countdownTipsColor: u.titleC,
                countdownColor: u.countC,
                actRuleColor: u.ruleC
            }, this.initCount()), c && c.show && (l = 190, this.$getCoupon.setCoupon({
                $toast: this.$toast,
                pid: c.pid,
                img: c.img
            }))), a && s) {
                var h = {};
                i && i.banner && i.banner[0] && i.banner[0].img ? ((h = i.banner[0]).height = parseInt(7.5 * h._img.scale), 
                h.img = n.default.getDefSuffix(h.img)) : h.height = 0;
                for (var g = 0; g < s.tabNav.length; g++) {
                    var w = s.tabNav[g];
                    w.name = w.navName, w.fcid = w.navId;
                }
                var v = {}, C = {};
                if ("mait" === s.navStyle[0].ckey) {
                    v = s.tabNavMait;
                    for (var D = 0; D < v.length; D++) v[D].name = v[D].navName;
                    C.pid = v[0].sourceKey, e && (C.appPlat = "sapp"), this.$wall.setDataSource({
                        source: "mwp_mait"
                    });
                } else v = s.tabNav, C.fcid = v[0].fcid, C.cKey = "xcx-cube";
                if (s.otherset && s.otherset.length) for (var I = 0; I < s.otherset.length; I++) {
                    var $ = s.otherset[I];
                    $.key && (C[$.key] = $.value);
                }
                if (s.urlParam && s.urlParam[0] && s.urlParam[0].paramNames) for (var x = s.urlParam[0].paramNames.split(","), b = 0; b < x.length; b++) {
                    var y = x[b];
                    y && (C[y] = this.options[y]);
                }
                this.setData({
                    bgData: a,
                    tbData: i,
                    coupon: c,
                    count: u,
                    navStyle: s.navStyle[0],
                    itemStyle: s.style[0],
                    isPt: e
                }), v = v.length > 1 && v, this.$wall.setWallNav({
                    scrollNavRpxTop: h.height + r + l,
                    navData: v
                }), this.$wall.initWall(C);
            }
        }
    },
    onLoad: function(t) {
        var o = this;
        o.isPre = "test" === t.env, o.options = t, o.isPre && o.setData({
            preFlag: !0
        });
        var n = t.pageName || "wxxcx01";
        n.indexOf("%") >= 0 && (n = decodeURIComponent(n));
        var a = "";
        a = o.isPre ? "https://act.mogujie.com/xcxpre/" + n + ".json" : "https://act.mogujie.com/" + n + ".json", 
        e.default.requestManager.sendRequest({
            url: a,
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                o.handlePageRes(t.data);
            }
        });
    },
    onShareAppMessage: function() {
        var t = "", e = "";
        return this.isPre && (t = "/pages/home/index", e = "【预发】"), {
            title: e + (this.shareTitle || "蘑菇街，女装购购购~"),
            path: t
        };
    },
    onReady: function() {}
});