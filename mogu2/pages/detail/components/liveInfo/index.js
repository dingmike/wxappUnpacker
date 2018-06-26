Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../../common/utils/imgUrlTool"));

exports.default = {
    data: function() {
        return {};
    },
    onLoad: function() {},
    methods: {
        init: function(t) {
            var o = t.liveInfo;
            o && (o.liveAnchorInfos && o.liveAnchorInfos.map(function(t) {
                return t.avatar = e.default.getGoodsRatioSuffix(t.avatar, 50, "1:1"), t;
            }), this.setData(o));
        },
        showBigImage: function() {
            var e = this.data.licenseImage;
            e && wx.previewImage({
                urls: [ e ]
            });
        }
    }
};