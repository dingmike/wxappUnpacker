Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {};
    },
    onLoad: function() {},
    methods: {
        init: function(e) {
            var t = e.pintuanInfo.progressDTO || {}, r = t.progress, o = t.leftNum, n = t.openAwardNum, s = parseFloat(r) / 100 * 686;
            this.setData({
                progressDTO: t,
                width: 0 === s ? "0" : s + "rpx",
                leftNum: o,
                openAwardNum: n
            });
        }
    }
};