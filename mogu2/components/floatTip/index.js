Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/m")).default.fn.sendMsg;

exports.default = {
    data: function() {
        return {
            scrollTop: 0,
            windowHeight: 0,
            scrollTopRange: 600,
            showFloatTip: null
        };
    },
    initFloatTip: function(t) {
        this.setWindowHeight(), this.$root.$logE("0x00000000", {
            acm: t.acm
        }), this.setData({
            info: t
        });
    },
    setWindowHeight: function() {
        var o = this;
        wx.getSystemInfo({
            success: function(t) {
                console.log(t), o.setData({
                    scrollTopRange: t.windowHeight
                });
            },
            fail: function(o) {
                console.log(o), t(o, {
                    _author: "changsheng",
                    threshold: 1
                });
            }
        });
    },
    methods: {
        handleShowHideTip: function(t) {
            var o = .5 * this.data.scrollTopRange, e = this.data.showFloatTip;
            t >= o && !e ? this.setData({
                showFloatTip: !0
            }) : t < o && e && this.setData({
                showFloatTip: !1
            });
        }
    }
};