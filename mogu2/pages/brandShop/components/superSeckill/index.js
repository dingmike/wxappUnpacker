Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../common/utils/imgUrlTool"));

exports.default = {
    data: function() {
        return {
            list: [],
            salePercent: "",
            boxMargin: "16rpx 0 0 0",
            boxBgColor: "#ffffff",
            titleColor: "#202020",
            desColor: "#999999",
            $headingTitle: "超级秒杀",
            $headingSubTitle: "SUPER SECKILL",
            minGoods: 0,
            maxGoods: 100,
            indicatorDots: !0,
            indicatorColor: "#c8c8c8",
            indicatorActiveColor: "#9f0b0b",
            autoplay: !0,
            interval: 5e3,
            duration: 400,
            circular: !0,
            ptpC: "",
            modId: 10011
        };
    },
    onLoad: function() {},
    methods: {
        init: function(t) {
            this.transData(t);
        },
        idtourl: function(t) {
            if (t) return 1 + (2 * t + 56).toString(36);
        },
        transData: function(e) {
            var i = this, a = parseInt(this.data.minGoods), s = parseInt(this.data.maxGoods), o = e && e.nowTime ? e.nowTime : parseInt(new Date().getTime() / 1e3, 10);
            if (e && e.list && e.list.length >= a) {
                var l = [];
                (l = (e.list || []).slice(0, s) || []).map(function(e, a) {
                    var s = e.tradeItemId ? i.idtourl(e.tradeItemId) : "", l = e.secKillId ? i.idtourl(e.secKillId) : "";
                    "number" == typeof e.tradeItemId && (s = i.idtourl(e.tradeItemId)), "number" == typeof e.secKillId && (l = i.idtourl(e.secKillId));
                    var n = "/pages/detail/pages/seckill/index?itemId=" + s + "&activityId=" + l;
                    e.item_xcx_url_backup = n, console.log("_______秒杀链接：", n, "number" == typeof e.tradeItemId), 
                    e.suffix_img = t.default.getGoodsRatioSuffix(e.image, 284, "1:1"), e.saleEmptyImg = t.default.getGoodsRatioSuffix("https://s10.mogucdn.com/mlcdn/c45406/170915_4klk93e82g5eidli8h74b1ic395bd_170x170.png", 284, "1:1"), 
                    e.discountPrice > 1 ? e.leftTips = t.default.getWidthSuffix("https://s10.mogucdn.com/mlcdn/c45406/170912_897eh3i49da92219868jlkl0gk39l_56x62.png", 55) : e.leftTips = t.default.getWidthSuffix("https://s10.mogucdn.com/mlcdn/c45406/170912_1l6gcl20g4661j6ikii3agddibc37_56x62.png", 55);
                    var r = !1;
                    e.startTime > o ? (e.startTimeDate = new Date(1e3 * e.startTime).getMonth() + 1 + "月" + new Date(1e3 * e.startTime).getDate() + "日 " + new Date(1e3 * e.startTime).getHours() + ":" + (new Date(1e3 * e.startTime).getMinutes() < 10 ? "0" + new Date(1e3 * e.startTime).getMinutes() : new Date(1e3 * e.startTime).getMinutes()), 
                    e.timeIco = t.default.getGoodsRatioSuffix("https://s10.mogucdn.com/mlcdn/c45406/170912_3ai3j0h69iab4k2b5hcglk3k63g17_40x42.png", 28, "1:1"), 
                    e.saleStatus = 1, e.salePercent = 0, r = !1) : e.endTime < o ? (e.saleStatus = 3, 
                    r = !0) : (e.saleStatus = 2, r = !0), r && (0 == e.itemSale ? e.salePercent = 0 : 0 == e.stock ? e.salePercent = 100 : e.salePercent = parseInt(e.itemSale) / (parseInt(e.stock) + parseInt(e.itemSale)) * 100 || 0);
                }), this.setData({
                    list: l
                });
            } else this.setData({
                list: []
            });
        }
    }
};