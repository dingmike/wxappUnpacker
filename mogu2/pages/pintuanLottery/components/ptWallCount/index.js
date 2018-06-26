function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function t(t, a) {
        var e = [], n = !0, i = !1, o = void 0;
        try {
            for (var s, r = t[Symbol.iterator](); !(n = (s = r.next()).done) && (e.push(s.value), 
            !a || e.length !== a); n = !0) ;
        } catch (t) {
            i = !0, o = t;
        } finally {
            try {
                !n && r.return && r.return();
            } finally {
                if (i) throw o;
            }
        }
        return e;
    }
    return function(a, e) {
        if (Array.isArray(a)) return a;
        if (Symbol.iterator in Object(a)) return t(a, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = t(require("../../../../components/countdown/index")), n = t(require("../../../../common/utils/imgUrlTool")), i = t(require("../../../../common/m.js")).default.MCE;

exports.default = {
    components: {
        countdown: e.default,
        navData: []
    },
    data: function() {
        return {
            wallList: []
        };
    },
    onLoad: function() {
        this.wallLists = [], this.lazyData(), this.makeup();
    },
    lazyData: function() {
        var t = this;
        this.$on("__lazy-data__", function(a, e, n) {
            var i = t.data && t.data.pids && t.data.pids[0] || "";
            if (n && i && e && e[i] && e[i].list && e[i].list.length > 0) {
                var o = e[i].list || [];
                t.setTab(o);
            }
        });
    },
    makeup: function() {
        var t = this;
        this.$on("__makeup_done__", function(a, e, n) {
            var i = t.data.makeupKey;
            if (n && e && e[i] && e[i].list && e[i].list.length > 0) {
                var o = e[i].list || [];
                t.setTab(o);
            }
        });
    },
    setTab: function(t) {
        var e = t || [], n = [];
        if (e && e.length > 0) {
            var i = !0, o = !1, s = void 0;
            try {
                for (var r, l = e.entries()[Symbol.iterator](); !(i = (r = l.next()).done); i = !0) {
                    var u = a(r.value, 2), f = (u[0], u[1]);
                    n.push({
                        name: f.cateName,
                        pid: f.pid
                    });
                }
            } catch (t) {
                o = !0, s = t;
            } finally {
                try {
                    !i && l.return && l.return();
                } finally {
                    if (o) throw s;
                }
            }
            n[0].onClass = "tab_on", this.wallNavData = n, n && n.length > 1 && this.setData({
                navData: n
            }), this.setWall(n[0].pid);
        }
    },
    setTabHighlight: function(t) {
        for (var a = 0; a < this.wallNavData.length; a++) this.wallNavData[a].onClass = a == t ? "tab_on" : "";
        this.setData({
            navData: this.wallNavData
        });
    },
    setWall: function(t) {
        this.wallLists[t] ? this.setData({
            wallList: this.wallLists[t]
        }) : this.getGoodsInfo(t);
    },
    getGoodsInfo: function(t) {
        var a = this;
        i.get({
            pid: t
        }).then(function(e) {
            var i = e.list || [];
            if (i && i.length > 0) {
                for (var o = "", s = e.context.currentTime, r = [], l = "", u = 0, f = i.length; u < f; u++) (l = i[u]).image && (l.image = n.default.getGoodsRatioSuffix(l.image, 200, "1:1")), 
                l.effectETime ? (o = l.effectETime - s, r.push({
                    format: "d天hh:mm:ss",
                    countdown: o
                })) : r.push({
                    format: "d天hh:mm:ss",
                    countdown: 0
                });
                a.$countdown.initList({
                    countdownList: r
                }), a.wallLists[t] = i, a.setData({
                    wallList: i
                });
            }
        }).catch(function(t) {
            console.error(t.message);
        });
    },
    methods: {
        sortTab: function(t) {
            var a = t.currentTarget.dataset, e = a.pid, n = a.tabIndex;
            this.setWall(e), this.setTabHighlight(n);
        }
    }
};