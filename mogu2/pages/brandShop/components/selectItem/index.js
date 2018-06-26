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
            boxMargin: "16rpx 0 0 0",
            boxBgColor: "#ffffff",
            titleColor: "#363636",
            desColor: "#666666",
            minGoods: 0,
            maxGoods: 100,
            $headingTitle: "甄选爆款",
            $headingSubTitle: "SELECTED ITEMS",
            ptpC: "",
            modId: 10012
        };
    },
    onLoad: function() {},
    methods: {
        init: function(t) {
            this._transData(t);
        },
        _idtourl: function(t) {
            if (t) return 1 + (2 * t + 56).toString(36);
        },
        _transData: function(e) {
            var i = this, a = parseInt(this.data.minGoods), o = parseInt(this.data.maxGoods), s = e && e.nowTime ? e.nowTime : parseInt(new Date().getTime() / 1e3, 10);
            if (e && e.list && e.list.length >= a) {
                var n = [];
                (n = (e.list || []).slice(0, o) || []).map(function(e, a) {
                    e.suffix_img = t.default.getGoodsRatioSuffix(e.image, 284, "1:1"), e._tradeItemId = e.tradeItemId ? i._idtourl(e.tradeItemId) : "", 
                    e.startTime > s ? e.saleStatus = 1 : e.endTime < s ? e.saleStatus = 3 : e.saleStatus = 2;
                }), this.setData({
                    list: n
                });
            } else this.setData({
                list: []
            });
        }
    }
};