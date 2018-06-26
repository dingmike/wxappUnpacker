function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../common/base/createPage")), t = e(require("../../components/fastBuy/index"));

(0, a.default)({
    components: {
        fastBuy: t.default
    },
    data: {},
    onLoad: function(e) {
        var a = e.params || null, t = decodeURIComponent(a), n = JSON.parse(t), s = n && n.addressId;
        this.$fastBuy.init({
            type: "normal",
            noMask: !0,
            addressId: s || 0
        });
    }
});