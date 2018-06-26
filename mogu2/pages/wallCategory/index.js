function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = a(require("../../common/base/createPage")), t = a(require("../../components/wall/index_sortNav")), i = a(require("../../components/searchBar/index"));

exports.default = (0, e.default)({
    components: {
        searchBar: i.default,
        wall: t.default
    },
    data: {
        $searchBar: {
            isFixed: !1
        }
    },
    onLoad: function(a) {
        var e = decodeURI(a.title || "") || "爱逛更美丽";
        wx.setNavigationBarTitle({
            title: e
        }), this.$wall.showPaganiOther = !0, this.wallParams = {
            fcid: a.fcid,
            cKey: a.cKey || "xcx-cate",
            algoKey: a.algoKey || ""
        }, a.darwin_promotion && (this.wallParams.darwin_promotion = a.darwin_promotion), 
        a.fid && (this.wallParams.fid = a.fid), this.$wall.setWallNav({
            scrollNavRpxTop: 90
        }), this.$wall.initWall(this.wallParams);
    },
    onReady: function() {}
});