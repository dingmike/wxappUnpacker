(0, function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/base/createPage")).default)({
    data: {},
    onLoad: function(e) {
        var n = "/pages/shop/newBrandShop/index", a = [];
        if (e) for (var r in e) a.push(r + "=" + e[r]);
        a.length && (n = n + "?" + a.join("&")), this.$redirect(n, {}, !0);
    }
});