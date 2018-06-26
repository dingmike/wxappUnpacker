function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/base/createPage")), n = e(require("../../components/cartComponent/index")), o = e(require("../../components/wall/index")), a = e(require("../../common/utils/cache"));

(0, t.default)({
    components: {
        cartComponent: n.default,
        wall: o.default
    },
    data: {},
    onShow: function() {
        var e = this;
        this.$on("hide", function() {
            e.$wall.setData({
                isShow: !1
            });
        }), this.$cartComponent.setData({
            isShow: !0
        }), this.$cartComponent.init({
            type: "normal",
            firstCart: !0,
            noMask: !0,
            callback: function() {}
        });
    },
    onUnload: function() {
        a.default.remove("cart.listSkuMap"), a.default.remove("cart.skuMap"), a.default.remove("tick.recommend");
    }
});