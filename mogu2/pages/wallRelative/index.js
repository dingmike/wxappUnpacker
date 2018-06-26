function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/m")), i = e(require("../../common/base/createPage")), a = e(require("../../common/utils/imgUrlTool")), o = e(require("../../components/wall/index")), r = t.default.MWP;

exports.default = (0, i.default)({
    components: {
        wall: o.default
    },
    data: {},
    onLoad: function(e) {
        var t = this;
        wx.setNavigationBarTitle({
            title: "相似商品"
        }), t.setParams = {
            cKey: "xcx-similarity",
            iid: e.iid || "1kb5k78",
            pid: e.pid || "8872",
            itemType: e.itemType || ""
        }, r.request("mwp.pagani.tradeItemInfoActionlet", "1", {
            itemType: t.setParams.itemType,
            itemId: t.setParams.iid,
            channel: "XCX"
        }).then(r.filterResult).then(function(e) {
            if (e.tradeItemId) {
                var i = e;
                i.img = a.default.getGoodsRatioSuffix(i.img, 250, "1:1"), t.setData({
                    topGoods: i
                });
            }
        }), this.$wall.initWall(this.setParams);
    },
    onReady: function() {}
});