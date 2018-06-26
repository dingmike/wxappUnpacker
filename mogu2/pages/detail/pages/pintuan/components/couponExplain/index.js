Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            titleIcon: "https://s10.mogucdn.com/mlcdn/c45406/170721_7g554je394838jgbl7cb146k05j6k_160x32.png"
        };
    },
    components: {},
    onLoad: function() {},
    methods: {
        init: function(t) {
            var e = t.pintuanInfo;
            if (e) {
                var n = 1e3 * e.startTime, o = 1e3 * e.endTime, a = new Date(n).toFormattedString("yyyy年M月d日hh:mm:ss") + " - " + new Date(o).toFormattedString("yyyy年M月d日hh:mm:ss");
                this.setData({
                    tuanType: e.tuanType,
                    timeString: a
                });
            }
        }
    }
};