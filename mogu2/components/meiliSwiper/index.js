Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var o = arguments[i];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/utils/imgUrlTool"));

exports.default = {
    data: function() {
        return {
            list: [],
            makeupKey: "",
            indicatorDots: !0,
            indicatorColor: "#fff",
            indicatorActiveColor: "#ff4422",
            autoplay: !0,
            interval: 5e3,
            duration: 400,
            circular: !0,
            boxBgColor: "none",
            boxHeight: "230rpx",
            boxPadding: 0,
            boxMargin: 0,
            swiperWidth: "750rpx",
            swiperHeight: "230rpx",
            swiperBoxShadow: "none",
            itemBorderRadius: "",
            maxCount: 10,
            ptpC: "",
            modId: 10001
        };
    },
    onLoad: function() {
        this.lazyData(), this.makeup();
    },
    onReady: function() {},
    methods: {
        makeup: function() {
            var t = this;
            this.$on("__makeup_done__", function(i, o, a) {
                var e = t.data && t.data.makeupKey || "", n = e ? e + "_config" : "";
                if (a && e && o && o[e]) {
                    var r = o[e].list || [], s = o[e].info || {}, l = o[n] && o[n].list && o[n].list[0] || {};
                    t._transData(r, s, l);
                }
            });
        },
        lazyData: function() {
            var t = this;
            this.$on("__lazy-data__", function(i, o, a) {
                if (a && t.data && t.data.pids && t.data.pids.length > 0 && o) {
                    var e = t.data.pids[0] || "", n = e && o && o[e] && o[e].list || [];
                    t._transData(n);
                }
            });
        },
        mceGet: function(t, i) {
            var o = this;
            t && t.pid ? (this.setData({
                list: []
            }), this.$root.$mce_get(t, !i).then(function(i) {
                var a = i.list || [], e = i.info || {};
                console.log(i), o._transData(a, e), console.log("________swiper请求（get）" + t.pid + "成功：", i);
            }).catch(function(i) {
                console.log("________swiper请求（get）" + t.pid + "失败：", i);
            })) : console.log("________swiper请求（get）pid不能为空！");
        },
        _transData: function(o, a, e) {
            var n = this.data.maxCount, r = {};
            o && o.length > 0 && ((o = o.slice(0, n)).map(function(t) {
                t.suffixImage = t.image ? i.default.getWidthSuffix(t.image, 750) : "";
            }), a && e && (r = this._setComponentConfig(a, e)), this.setData(t({
                list: o
            }, r)));
        },
        _setComponentConfig: function(t, i) {
            var o = {};
            i = this._deleteEmptyValue(i), Object.assign(t, i);
            var a = function() {
                var i = "", a = "";
                if (1 === arguments.length) i = arguments[0], a = arguments[0]; else {
                    if (!(arguments.length >= 2)) return;
                    i = arguments[0], a = arguments[1];
                }
                void 0 !== t[i] && null !== t[i] && "" !== t[i] && (o[a] = t[i]);
            };
            return t && (a("boxBgColor"), a("boxHeight"), a("boxPadding"), a("boxMargin"), a("swiperWidth"), 
            a("swiperHeight"), a("swiperBoxShadow"), a("itemBorderRadius"), a("indicatorColor"), 
            a("indicatorActiveColor")), o;
        },
        _deleteEmptyValue: function(t) {
            var i = {};
            for (var o in t) t[o] && "" !== t[o] && (i[o] = t[o]);
            return i;
        }
    }
};