function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("../../common/base/createPage")), t = e(require("../../components/wall/index_sortNav")), o = e(require("../../components/searchBar/index")), r = e(require("../../components/searchCoupon/index"));

exports.default = (0, a.default)({
    components: {
        searchBar: o.default,
        wall: t.default,
        searchCoupon: r.default
    },
    data: {
        $searchBar: {
            isFixed: !1
        }
    },
    onLoad: function(e) {
        var a = this, t = decodeURI(e.q || "") || "爱搜更美丽";
        wx.setNavigationBarTitle({
            title: t
        }), this.setParams = {
            cKey: "xcx-search",
            q: e.q || "衣服",
            _needLottery: "1",
            version: 11
        }, this.$wall.setWallNav({
            scrollNavRpxTop: 90
        }), "detail" === e.fromPage && (this.$wall.useRedirect = !0), this.$wall.initWall(this.setParams), 
        this.$wall.$on("wallResBack", function(e) {
            console.log("res", e), a.$searchCoupon.initSearchCoupon(e);
        });
    },
    onReady: function() {}
});