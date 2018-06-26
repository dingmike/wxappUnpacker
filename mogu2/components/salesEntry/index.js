function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
}, n = t(require("../../components/activeEntry/index")), i = t(require("../../components/activeEntry/fn"));

exports.default = {
    components: {
        activeEntry: n.default
    },
    data: function() {
        return {
            activeEntryList: [],
            collectFormId: !0,
            preMakeupKey: "activeEntry_",
            bgColor: "#ffe6ed",
            margin: 0,
            padding: 0,
            listPadding: "0 0 0 24rpx",
            ptpC: "",
            $activeEntry: {
                isActive: !0,
                boxBgColor: "none",
                boxHeight: "auto",
                boxMinHeight: "auto",
                boxPadding: 0,
                boxMargin: 0,
                $headingName: "heading_icon_line",
                $headingBgColor: "none",
                itemPadding: 0,
                itemBorderRadius: "6rpx",
                imageWidth: "100%",
                imageHeight: "100%",
                imageBorderRadius: "6rpx",
                titleIsShow: !1,
                descriptionIsShow: !1,
                minCount: 1,
                maxCount: 100
            }
        };
    },
    onLoad: function() {
        this.makeup();
    },
    onReady: function() {},
    methods: {
        makeup: function() {
            var t = this;
            this.$on("__makeup_done__", function(e, n, i) {
                i && n && t._activeEntry(n);
            });
        },
        _activeEntry: function(t) {
            for (var n = !1, a = 1, o = [], r = this.data.preMakeupKey || "activeEntry_", c = t[r + "config"] && t[r + "config"].list || [], d = i.default.arrayToObject(c); !n; ) {
                var s = r + a, u = d[s] || {};
                if (t[s] && t[s].list && t[s].list.length > 0) {
                    var g = i.default.activeEntryTansData({
                        data: t[s],
                        config: u
                    }), f = g.activeEntryItem || [], l = g.headingConfig || {};
                    o.push(e({}, l, {
                        list: f
                    }));
                }
                ++a > 20 && (n = !0);
            }
            this.setData({
                activeEntryList: o
            });
        }
    }
};