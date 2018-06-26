Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../base/color")), t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../base/index")).getMergedShopRecommend;

exports.default = {
    components: {
        color: e.default
    },
    methods: {
        init: function(e) {
            var r = e.shopRecommend, o = t(r);
            this.setData({
                itemList: o
            });
        }
    }
};