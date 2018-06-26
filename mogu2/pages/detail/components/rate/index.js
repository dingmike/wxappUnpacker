function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../../../common/utils/imgUrlTool")), a = t(require("../base/color"));

exports.default = {
    data: function() {
        return {};
    },
    components: {
        color: a.default
    },
    onLoad: function() {},
    methods: {
        init: function(t, a) {
            var o = a.itemId, i = t.rateInfo;
            t.rateInfo && t.rateInfo.list && t.rateInfo.list.length > 0 && (t.rateInfo.list = t.rateInfo.list.slice(0, 1), 
            t.rateInfo.list.forEach(function(t, a) {
                t.images && t.images.length > 0 && (i.list[a].images = t.images.map(function(t) {
                    return e.default.getGoodsRatioSuffix(t, 140, "1:1");
                })), i.list[a].created = new Date(1e3 * t.created).toFormattedString("yyyy-MM-dd"), 
                i.list[a].user.avatar = e.default.getGoodsRatioSuffix(t.user.avatar, 50, "1:1");
            }), this.setData(Object.assign({}, i, {
                itemId: o
            })));
        }
    }
};