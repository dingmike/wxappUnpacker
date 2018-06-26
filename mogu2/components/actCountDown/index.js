function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = o(require("../countdown/index")), t = o(require("components/ruleModal/index"));

exports.default = {
    components: {
        countdown: n.default,
        ruleModal: t.default
    },
    data: function() {
        return {
            isShowCountdown: !1,
            countdownTips: "",
            countdownInfo: {}
        };
    },
    onLoad: function() {
        this.lazyData(), this.makeup();
    },
    initCountDown: function() {
        this.countdownInfo = [];
    },
    methods: {
        init: function(o) {
            this.$mask = this.$mask || o.$mask, this.initCountDown();
        },
        lazyData: function() {
            var o = this;
            this.$on("__lazy-data__", function(n, t, a) {
                if (a && o.data && o.data.pids && o.data.pids.length > 0 && t) {
                    var u = o.data.pids[0];
                    o.countdownInfo = t[u].list && t[u].list[0] || [];
                    var i = t[u] && t[u].context.currentTime, e = o.data.pids[1], d = e && t && t[e] && t[e].list && t[e].list[0] || [];
                    o._transData(d, i);
                }
            });
        },
        makeup: function() {
            var o = this;
            this.$on("__makeup_done__", function(n, t, a) {
                if (a && o.data && o.data.countdownMakeupKey && o.data.ruleMakeupKey && t) {
                    var u = o.data.countdownMakeupKey;
                    o.countdownInfo = t[u] && t[u].list && t[u].list[0] || {};
                    var i = t[u] && t[u].context.currentTime, e = o.data.ruleMakeupKey, d = t[e] && t[e].list && t[e].list[0] || {};
                    o._transData(d, i);
                }
            });
        },
        _transData: function(o, n) {
            var t = "", a = "", u = (this.countdownInfo.preDeadline ? this.countdownInfo.preDeadline : 0) - n, i = this.countdownInfo.deadline - n;
            if (u > 0 ? (t = u, a = this.countdownInfo.preCountdownTips) : u < 0 && i > 0 ? (t = i, 
            a = this.countdownInfo.countdownTips) : t = 0, t > 0) {
                this.$countdown.init({
                    format: "dd天hh小时mm分ss秒",
                    countdown: t
                }), this.$ruleModal.setData({
                    bgImage: o.ruleBgImage,
                    ruleImage: o.ruleImage
                });
                var e = this.setCountdownColorInfo(this.countdownInfo);
                this.setData({
                    countdownInfo: e,
                    isShowCountdown: !0,
                    countdownTips: a
                });
            } else this.setData({
                isShowCountdown: !1
            });
        },
        popRuleModal: function() {
            this.$ruleModal.show(), this.$mask && this.$mask.show();
        },
        setCountdownColorInfo: function(o) {
            var n = this.countdownInfo;
            return o.countdownBgColor && (n.countdownBgColor = o.countdownBgColor), o.countdownTipsColor && (n.countdownTipsColor = o.countdownTipsColor), 
            o.countdownColor && (n.countdownColor = o.countdownColor), o.actRuleColor && (n.actRuleColor = o.actRuleColor), 
            n;
        }
    }
};