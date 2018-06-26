function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = e(require("../../../common/base/createPage")), t = e(require("./wrapper"));

exports.default = function(e) {
    return (0, r.default)({
        components: {
            wrapper: t.default
        },
        onLoad: function() {
            this.isFirst = !0, this.$wrapper.setPageConfig(e);
        },
        onShow: function() {
            this.isFirst ? this.isFirst = !1 : this.$wrapper.$emit("pageRefresh");
        },
        onShareAppMessage: function() {
            return this.$wrapper.getShareAppMessage();
        }
    });
};