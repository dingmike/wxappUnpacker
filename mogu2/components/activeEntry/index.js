Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(t) {
    for (var i = 1; i < arguments.length; i++) {
        var a = arguments[i];
        for (var e in a) Object.prototype.hasOwnProperty.call(a, e) && (t[e] = a[e]);
    }
    return t;
}, i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./fn"));

exports.default = {
    data: function() {
        return {
            $headingName: "heading_more",
            $headingTitle: "",
            $headingTitleIcon: "",
            $headingHeight: "50rpx",
            $headingBgColor: "none",
            $headingMargin: "0 0 20rpx 0",
            $headingPadding: 0,
            $headingColor: "",
            $headingFontWeight: "normal",
            $headingFontSize: "28rpx",
            $headingMoreText: "更多",
            $headingMoreTextColor: "#999",
            $headingMoreLink: "",
            $headingWxaMoreLink: "",
            $headingAppId: "",
            $headingCanLaunch: !0,
            canLaunch: !0,
            list: [],
            isActive: !1,
            collectFormId: !0,
            formType: 2,
            boxBgColor: "#fff",
            boxBgImage: "",
            boxHeight: "auto",
            boxMinHeight: "310rpx",
            boxPadding: "20rpx 0 0 0",
            boxMargin: "16rpx 0 0 0",
            justifyContent: "flex-start",
            listClassName: "flex f-fw-w f-jc-fs",
            listMargin: 0,
            listPadding: "10rpx 0 0 0",
            itemWidth: "",
            itemHeight: "",
            itemPadding: 0,
            itemMargin: "0 0 30rpx 16rpx",
            itemBoxShadow: "none",
            itemBorderRadius: 0,
            itemBgColor: "",
            imageWidth: "120rpx",
            imageHeight: "120rpx",
            imageMargin: "0 auto",
            imageBorderRadius: 0,
            titleIsShow: !0,
            titleWidth: "100%",
            titleHeight: "40rpx",
            titleTextAlign: "center",
            titleFontSize: "28rpx",
            titleFontWight: "normal",
            titleTop: "134rpx",
            titleLeft: 0,
            descriptionIsShow: !1,
            descriptionWidth: "200rpx",
            descriptionHeight: "34rpx",
            descriptionTextAlign: "left",
            descriptionFontSize: "24rpx",
            descriptionTop: "58rpx",
            descriptionLeft: "24rpx",
            minCount: 4,
            maxCount: 100,
            ptpC: "",
            modId: 10003
        };
    },
    onLoad: function() {
        this.lazyData(), this.makeup();
    },
    onReady: function() {
        var t = i.default.changeListClassName(this.data.justifyContent);
        this.setData({
            listClassName: t
        });
    },
    methods: {
        formSubmitHandler: function(t) {
            var i = t.detail.formId, a = this.data.formType || 2;
            console.log("________formId", i), console.log("________form场景", a), this.$root.$logForm(i, a);
        },
        cancelBubbleHandler: function() {},
        init: function(t, i) {
            var a = t && t.pids || [];
            i = !!i, a && a.length > 0 && this.mce(a, i);
        },
        setActiveEntryData: function(t) {
            this._transData(t);
        },
        lazyData: function() {
            var t = this;
            this.$on("__lazy-data__", function(i, a, e) {
                if (e && t.data && t.data.pids && t.data.pids.length > 0 && a) {
                    var n = t.data.pids[0], o = n && a && a[n] || {};
                    t._transData(o);
                }
            });
        },
        makeup: function() {
            var t = this;
            this.$on("__makeup_done__", function(i, a, e) {
                if (e && t.data && t.data.makeupKey && a && a[t.data.makeupKey]) {
                    var n = a[t.data.makeupKey] || {};
                    t._transData(n);
                }
            });
        },
        mce: function(t, i) {
            var a = this;
            if (t && t.length > 0) {
                this.setData({
                    list: []
                });
                var e = t.join(","), n = t[0];
                this.$root.$mce_multiget({
                    pids: e
                }, !i).then(function(t) {
                    var i = n && t && t[n] || {};
                    a._transData(i), console.log("________activeEntry请求（multiget）" + e + "成功：", t);
                }).catch(function(t) {
                    console.log("________activeEntry请求（multiget）" + e + "失败：", t);
                });
            } else console.log("________activeEntry请求（multiget）pids不能为空！");
        },
        mceGet: function(t, i) {
            var a = this;
            t && t.pid ? (this.setData({
                list: []
            }), this.$root.$mce_get(t, !i).then(function(i) {
                a._transData(i || {}), console.log("________activeEntry请求（get）" + t.pid + "成功：", i);
            }).catch(function(i) {
                console.log("________activeEntry请求（get）" + t.pid + "失败：", i);
            })) : console.log("________activeEntry请求（get）pid不能为空！");
        },
        _transData: function(a) {
            var e = this.data.minCount, n = this.data.maxCount, o = this.$root && this.$root.$canLaunch && this.$root.$canLaunch() || !1;
            if (a && a.list && a.list.length >= e) {
                var r = i.default.activeEntryTansData({
                    data: a,
                    minCount: e,
                    maxCount: n
                }), s = r.activeEntryItem || [], d = r.headingConfig || {};
                this.setData(t({
                    list: s
                }, d, {
                    canLaunch: o,
                    $headingCanLaunch: o
                }));
            }
        }
    }
};