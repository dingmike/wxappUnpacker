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
            topList: [],
            bottomList: [],
            ptpC: "",
            modId: 10008
        };
    },
    onLoad: function() {
        this.lazyData(), this.makeup();
    },
    onReady: function() {},
    methods: {
        lazyData: function() {
            var t = this;
            this.$on("__lazy-data__", function(a, i, n) {
                var o = t.data && t.data.pids && t.data.pids[0] || "", s = t.data && t.data.pids && t.data.pids[1] || "", e = [], d = [];
                n && o && i && i[o] && i[o].list && i[o].list.length > 0 && (e = i[o].list || []), 
                n && s && i && i[s] && i[s].list && i[s].list.length > 0 && (d = i[s].list || []), 
                t._transData(e, d);
            });
        },
        makeup: function() {
            var t = this;
            this.$on("__makeup_done__", function(a, i, n) {
                var o = t.data && t.data.topMakeupKey || "", s = t.data && t.data.bottomMakeupKey || "", e = [], d = [];
                n && o && i && i[o] && i[o].list && i[o].list.length > 0 && (e = i[o].list || []), 
                n && s && i && i[s] && i[s].list && i[s].list.length > 0 && (d = i[s].list || []), 
                t._transData(e, d);
            });
        },
        _transData: function(a, i) {
            a.map(function(a) {
                a.tinyImg_1 = a.tinyImg_1 ? t.default.getGoodsRatioSuffix(a.tinyImg_1, 54, "1:1") : "";
            }), i.map(function(a) {
                a.tinyImg_1 = a.tinyImg_1 ? t.default.getGoodsRatioSuffix(a.tinyImg_1, 54, "1:1") : "";
            }), this.setData({
                topList: a,
                bottomList: i
            });
        }
    }
};