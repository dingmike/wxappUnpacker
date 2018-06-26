Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../components/countdown/index"));

exports.default = {
    data: function() {
        return {};
    },
    components: {
        countdown: t.default
    },
    onLoad: function() {},
    methods: {
        init: function(t) {
            var n = t.topCountdown;
            n && (this.$countdown.init({
                format: "dd天hh时mm分ss秒",
                countdown: n.countdown
            }), this.setData(n));
        }
    }
};