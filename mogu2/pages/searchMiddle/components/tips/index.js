Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            tipsData: {},
            isShowTipsWrap: !1,
            windowHeight: 1e3
        };
    },
    setTipsData: function(t, e) {
        this.setData({
            tipsData: t,
            isShowTipsWrap: e
        });
    }
};