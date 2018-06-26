Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../../common/utils/imgUrlTool"));

exports.default = {
    data: function() {
        return {};
    },
    components: {},
    onLoad: function() {},
    formatTimeStamp: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "dd hh:mm:ss", a = ((t = Math.abs(t)) - t % 86400) / 86400, n = ((t %= 86400) - t % 3600) / 3600, s = ((t %= 3600) - t % 60) / 60, r = ((t %= 60) - t % 1) / 1;
        t %= 1;
        var i = (e = e.toLowerCase()).match(/([a-z])(\1)*/gi);
        -1 === i.indexOf("d") && -1 === i.indexOf("dd") && (n += 24 * a), -1 === i.indexOf("h") && -1 === i.indexOf("hh") && (s += 60 * n), 
        -1 === i.indexOf("m") && -1 === i.indexOf("mm") && (r += 60 * s);
        var o = {
            dd: a > 9 ? a : "0" + a,
            hh: n > 9 ? n : "0" + n,
            mm: s > 9 ? s : "0" + s,
            ss: r > 9 ? r : "0" + r,
            d: a,
            h: n,
            m: s,
            s: r
        };
        return e.replace(/([a-z])(\1)*/gi, function(t) {
            return o[t];
        });
    },
    getFormatTime: function(t) {
        var e = "";
        return e = t < 60 ? "s秒前" : t < 3600 ? "m分s秒前" : t < 86400 ? "h小时mm分s秒前" : "d天h小时m分s秒前", 
        this.formatTimeStamp(t, e);
    },
    methods: {
        init: function(e) {
            var a = this;
            if (e.successTuan && e.successTuan.length > 0) {
                var n = e.successTuan.map(function(e) {
                    e.time = a.getFormatTime(e.time);
                    var n = e.avatar;
                    return Object.assign({}, e, {
                        avatar: t.default.getGoodsRatioSuffix(n, 100, "1:1")
                    });
                }), s = e.successTuanNum || 0;
                this.setData({
                    successTuan: n,
                    successTuanNum: s
                });
            }
        },
        showSku: function() {
            this.$root.$wrapper && this.$root.$wrapper.$emit("$bottomBar.bannerClickHandler");
        }
    }
};