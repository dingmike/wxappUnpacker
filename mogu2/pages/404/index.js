function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/base/createPage")), a = e(require("../../components/empty/index")), n = e(require("../../common/service/url"));

(0, t.default)({
    components: {
        empty: a.default
    },
    data: {
        $empty: {
            button: "去看更多好货"
        }
    },
    onLoad: function() {
        var e = this;
        this.$empty.setData({
            callback: function() {
                e.$navigate(n.default.home());
            }
        });
    }
});