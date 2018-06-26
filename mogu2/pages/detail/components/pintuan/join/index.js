function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../../../../components/countdown/index")), o = t(require("../../../../../common/utils/imgUrlTool")), r = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e.default = t, e;
}(require("../../base/index")), n = t(require("../../base/color")), a = r.fn.getFullUrl;

exports.default = {
    data: function() {
        return {};
    },
    components: {
        countdown0: e.default,
        countdown1: e.default,
        color: n.default
    },
    onLoad: function() {},
    getFormat: function(t) {
        return t < 60 ? "hh:mm:ss" : t < 3600 ? "hh:mm:ss" : t < 86400 ? "hh:mm:ss" : "dd:hh:mm:ss";
    },
    methods: {
        init: function(t) {
            var e = this;
            if (t.joinTuanList && t.joinTuanList.length > 0) {
                var r = t.joinTuanList.map(function(t, r) {
                    var n = t.time, a = t.avatar;
                    return e["$countdown" + r].init({
                        format: e.getFormat(n),
                        countdown: n
                    }), Object.assign({}, t, {
                        avatar: o.default.getGoodsRatioSuffix(a, 100, "1:1")
                    });
                });
                this.setData({
                    joinTuanList: r
                });
            }
        },
        onJoinClick: function(t) {
            var e = t.currentTarget.dataset.href;
            this.$root.$redirect(a(e, {
                liveParams: this.$root.query.liveParams,
                cparam: this.$root.query.cparam,
                fromPage: "detail",
                acm: this.$root.query.acm
            }));
        }
    }
};