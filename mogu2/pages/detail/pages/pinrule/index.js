function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../common/m")), a = e(require("../../../../common/base/createPage")), n = e(require("../../../../components/loading/index")), i = t.default.fn.sendMsg;

exports.default = (0, a.default)({
    components: {
        loading: n.default
    },
    data: {},
    onLoad: function() {
        this.$loading.show(), wx.showNavigationBarLoading();
    },
    onReady: function() {
        this.getRulesData();
    },
    getRulesData: function() {
        var e = this;
        this.$root.$mce_get({
            pid: 56867
        }).then(function(t) {
            if (t.list && t.list.length > 0) {
                var a = t.list;
                e.setRulesData(a);
            }
            e.$loading.hide(), wx.hideNavigationBarLoading();
        }).catch(function(t) {
            console.log(t), i(t, {
                _author: "changsheng",
                threshold: 1
            }), e.$loading.hide(), wx.hideNavigationBarLoading();
        });
    },
    setRulesData: function(e) {
        this.setData({
            rules: e.map(function(e) {
                return {
                    title: e.title,
                    desc: e.desc.split("##")
                };
            })
        });
    }
});