function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../../../common/m")), a = t(require("../../../../common/utils/imgUrlTool")), n = e.default.MWP;

exports.default = {
    data: function() {
        return {
            $headingTitle: "推荐品牌",
            $headingTitleIcon: "",
            $headingHeight: "40rpx",
            $headingBgColor: "none",
            $headingColor: "#999999",
            $headingMargin: "30rpx 0 30rpx 0",
            $headingPadding: "",
            crownIcoWebp: "https://s10.mogucdn.com/mlcdn/c45406/170904_24j89k93f85513k9fd26kak6id406_24x18.png",
            bannerList: [],
            ptpC: ""
        };
    },
    onLoad: function(t) {
        var e = this;
        n.request("mwp.mclaren.BrandSaleListActionlet", "1.0", {
            appPlat: "xcx"
        }).then(function(t) {
            if (t && t.data && t.data.list && t.data.list.length > 0) {
                var a = t.data.list || [];
                e._setData(a);
            } else e.setData({
                bannerList: []
            });
        }).catch(function(t) {
            e.setData({
                bannerList: []
            }), console.error(t);
        });
    },
    methods: {
        _setData: function(t) {
            var e = a.default.getWidthSuffix("https://s10.mogucdn.com/mlcdn/c45406/170904_24j89k93f85513k9fd26kak6id406_24x18.png", 24), n = [], i = [];
            t.map(function(t) {
                t.pcEnter = t.pcEnter ? a.default.getNoResizeSuffix(t.pcEnter) : "", t.itemList && t.itemList.length > 0 && (t.itemList || []).map(function(t, e) {
                    n.push(t.acm), i.push(e), t.aftImg = t.image ? a.default.getGoodsRatioSuffix(t.image, 180, "1:1") : "";
                });
            }), this.$root.$logE("0x00000000", {
                modName: "____" + this.data.ptpC + "____",
                acms: n,
                indexs: i
            }), this.setData({
                bannerList: t,
                crownIcoWebp: e
            });
        }
    }
};