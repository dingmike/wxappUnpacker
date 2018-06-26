function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = t(require("../../../../common/utils/imgUrlTool")), e = t(require("../../../../common/m")).default.MWP;

exports.default = {
    data: function() {
        return {
            isShow: !1,
            avatar: "",
            nick: "",
            number: 2
        };
    },
    onLoad: function() {},
    onReady: function() {
        var t = this;
        this.interval = null, e.request("mwp.enzo.pinTuanTips", "1", {}).then(function(e) {
            if (e && e.data && e.data.length > 0) {
                var n = 0, o = 0, r = e.data, i = r.length;
                t.interval = setInterval(function() {
                    if (o % 2 == 0 && n < i) {
                        var e = Math.round(9 * Math.random() + 1);
                        t.setData({
                            isShow: !0,
                            avatar: a.default.getGoodsRatioSuffix(r[n].avatar || "", 60, "1:1"),
                            nick: r[n].nick || "",
                            number: e || 2
                        }), n++;
                    } else t.setData({
                        isShow: !1
                    });
                    ++o >= 2 * i && (clearInterval(t.interval), t.setData({
                        isShow: !1
                    }));
                }, 5e3);
            }
        }).catch(function(t) {});
    },
    onUnload: function() {
        clearInterval(this.interval);
    },
    methods: {}
};