function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../components/base/color")), i = e(require("../../../../../../common/utils/imgUrlTool"));

exports.default = {
    data: function() {
        return {};
    },
    components: {
        color: t.default
    },
    onLoad: function() {},
    methods: {
        init: function(e) {
            var t = e.sizeHelperInfo || {}, o = t.height && parseFloat(t.height).toFixed(1), a = t.weight && parseFloat(t.weight).toFixed(1), r = t.chest && parseFloat(t.chest).toFixed(1), s = t.waist && parseFloat(t.waist).toFixed(1), n = t.hipline && parseFloat(t.hipline).toFixed(1), l = e.itemId || "", d = t.avatar ? i.default.getGoodsRatioSuffix(t.avatar, 80, "1:1") : "";
            this.setData({
                sizeHelperInfo: t,
                avatar: d,
                itemId: l,
                height: o,
                weight: a,
                chest: r,
                waist: s,
                hipline: n
            });
        }
    }
};