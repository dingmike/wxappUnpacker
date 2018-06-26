function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = function() {
    function t(t, e) {
        var a = [], i = !0, r = !1, n = void 0;
        try {
            for (var o, s = t[Symbol.iterator](); !(i = (o = s.next()).done) && (a.push(o.value), 
            !e || a.length !== e); i = !0) ;
        } catch (t) {
            r = !0, n = t;
        } finally {
            try {
                !i && s.return && s.return();
            } finally {
                if (r) throw n;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), a = t(require("../../common/base/createPage")), i = require("../../common/utils/lazyData"), r = t(require("../../common/utils/imgUrlTool")), n = t(require("../../components/wall/index_tabNav")), o = t(require("../../components/bottomNavBar/index")), s = t(require("../../components/redPacket/index")), l = t(require("../../common/utils/cache")), u = [ "54056" ];

(0, a.default)({
    components: {
        wall: n.default,
        bottomNavBar: o.default,
        redPacket: s.default
    },
    data: {
        shareTitle: "约Ta一起来拼吧，每天十万件好货更新给你！",
        image: "",
        $bottomNavBar: {
            pids: [ "57077" ]
        },
        isWxshop: void 0
    },
    onShow: function() {
        this.showGame && "1" === this.showGame && this.$redPacket.render({
            pid: 74118
        }), this._setPageTitle();
    },
    onLoad: function(t) {
        var a = this, i = t.pid ? u.concat([ t.pid ]) : u;
        this.setData({
            pids: i
        }), this.showGame = t.showGame, this.pageTitle = t.title || "", this.$bottomNavBar.initBottomNavBar(), 
        this.$on("__lazy-data__", function(i, n) {
            var o = a.data.pids[0], s = o && n && n[o] && n[o].list || [];
            s && s.length > 0 && s[0] && s[0].title && a.setData({
                shareTitle: s[0].title
            });
            var l = a.data.pids[1], u = l && n && n[l] && n[l].list || [], d = [], c = 0;
            if (u && u[0] && u[0].image && (a.setData({
                image: r.default.getWidthSuffix(u[0].image, 750)
            }), c = 230), u && u.length > 0) {
                var h = !0, m = !1, f = void 0;
                try {
                    for (var p, v = u.entries()[Symbol.iterator](); !(h = (p = v.next()).done); h = !0) {
                        var g = e(p.value, 2), w = (g[0], g[1]);
                        d.push({
                            name: w.cateName,
                            pid: w.pid
                        });
                    }
                } catch (t) {
                    m = !0, f = t;
                } finally {
                    try {
                        !h && v.return && v.return();
                    } finally {
                        if (m) throw f;
                    }
                }
                a.$wall.setDataSource({
                    source: "mwp_mait"
                }), d && d.length > 1 && a.$wall.setWallNav({
                    scrollNavRpxTop: c,
                    navData: d
                }), "detail" == t.fromPage && (a.$wall.useRedirect = !0), a.$wall.initWall({
                    pid: d[0].pid
                });
            }
        });
    },
    onReady: function() {
        new i.LazyData().init(this, !0), this._setPageTitle();
    },
    isWxshop: function() {
        "蘑菇街女装" === l.default.get("appName") ? this.setData({
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