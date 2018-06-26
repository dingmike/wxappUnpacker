function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/m")), n = e(require("../../common/base/createPage")), o = e(require("../../components/imcall/index")), a = t.default.MCE;

exports.default = (0, n.default)({
    components: {
        imcall: o.default
    },
    data: {},
    onShow: function() {
        var e = this;
        a.get({
            pid: "98593"
        }).then(function(t) {
            e.$imcall.setImOpts({
                shopId: t.list[0].serviceId
            });
        }).catch(function() {
            e.$imcall.setImOpts({
                shopId: "14ejg"
            });
        });
    },
    onHide: function() {
        wx.navigateBack({
            delta: 1
        });
    }
});