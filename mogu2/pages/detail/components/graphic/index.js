function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../common/utils/imgUrlTool")), i = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../base/index")), r = e(require("../base/color")), a = i.fn.getImageSize;

exports.default = {
    data: function() {
        return {};
    },
    components: {
        color: r.default
    },
    methods: {
        init: function(e) {
            var i = this, r = e.detailInfo;
            if (r) {
                var n = r;
                this.originImageList = [], n.detailImage && n.detailImage.length > 0 && n.detailImage.forEach(function(e, n) {
                    e.list && e.list.length > 0 && (r.detailImage[n].list = e.list.map(function(e, r) {
                        var o = t.default.getWidthSuffix(e, 750), u = a(o), l = 750 * u.height / u.width, s = (n + 1) * (r + 1) - 1;
                        return i.originImageList.push(o), {
                            img: o,
                            width: 750,
                            height: l,
                            index: s
                        };
                    }));
                }), this.setData(r);
            }
        },
        previewImage: function(e) {
            var t = e.currentTarget.dataset.src;
            wx.previewImage({
                current: t,
                urls: this.originImageList
            });
        }
    }
};