Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../../../common/utils/imgUrlTool"));

exports.default = {
    data: function() {
        return {};
    },
    components: {},
    onLoad: function() {},
    methods: {
        init: function(t) {
            var o = t.sizeMeasureImg ? e.default.getGoodsRatioSuffix(t.sizeMeasureImg, 750) : "";
            this.setData({
                sizeMeasureImg: o
            });
        }
    }
};