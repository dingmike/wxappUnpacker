function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../common/utils/imgUrlTool")), o = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    return t.default = e, t;
}(require("../base/index")), r = e(require("../base/color")), i = o.fn.getImageSize;

exports.default = {
    data: function() {
        return {
            isShow: !0
        };
    },
    components: {
        color: r.default
    },
    onLoad: function() {},
    methods: {
        init: function(e) {
            var o = e.shopInfo, r = e.liveInfo;
            if (o && !r) {
                o.shopLogo = t.default.getGoodsRatioSuffix(o.shopLogo, 50, "1:1"), o.levelArr = new Array(o.level);
                var a = {
                    width: 0,
                    height: 0
                };
                o.tag && (a = i(o.tag)), this.setData(Object.assign({}, o, {
                    tagWidth: a.width,
                    tagHeight: a.height
                }));
            } else this.setData({
                isShow: !1
            });
        }
    }
};