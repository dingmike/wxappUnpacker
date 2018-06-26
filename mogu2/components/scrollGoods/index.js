function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../common/utils/imgUrlTool")), i = t(require("../countdown/index")), a = t(require("../../common/m")).default.MCE;

exports.default = {
    data: function() {
        return {
            pids: [],
            makeupKey: "",
            boxBgColor: "#ffffff",
            boxMargin: "0",
            $headingTitle: "",
            $headingTitleIcon: "",
            $headingHeight: "70rpx",
            $headingBgColor: "none",
            $headingMargin: 0,
            $headingPadding: "20rpx 0 0 0",
            $headingColor: "#666",
            $headingMoreText: "",
            $headingMoreTextColor: "",
            $headingMoreLink: "",
            $headingWxaMoreLink: "",
            $headingAppId: "",
            leftTimeDes: "本场仅剩",
            titleColor: "#333333",
            priceColor: "rgba(252, 60, 100, .8)",
            minGoods: 4,
            maxGoods: 100,
            type: 2,
            showDiscount: !0,
            showCountDown: !0,
            list: [],
            centerClass: "none",
            ptpC: ""
        };
    },
    components: {
        countdown: i.default
    },
    onLoad: function() {
        this.makeup(), this.lazyData();
    },
    methods: {
        init: function(t, e) {
            e = !!e, this.mce(t, e);
        },
        idtourl: function(t) {
            if (t) return 1 + (2 * t + 56).toString(36);
        },
        switchType: function(t, e) {
            switch (t) {
              case 1:
                this.transData(e);
                break;

              case 2:
                this.transDataSpike(e);
                break;

              case 3:
                this.transDataGroup(e);
                break;

              case 4:
                this.transDataQuick(e);
            }
        },
        mce: function(t, e) {
            var i = this;
            a.get({
                pid: t
            }, !e).then(function(t) {
                if (t && t.list && t.list.length > 0) {
                    var e = t.list;
                    i.switchType(i.data.type, e);
                }
            }).catch(function(t) {
                i.setData({
                    list: []
                }), console.error("scrollGoods组件请求数据失败" + t);
            });
        },
        makeup: function() {
            var t = this;
            this.$on("__makeup_done__", function(e, i, a) {
                if (a && t.data && t.data.makeupKey && i && i[t.data.makeupKey]) {
                    var n = i[t.data.makeupKey].list || [], o = i[t.data.makeupKey].info || {};
                    t.switchType(t.data.type, n), t.setHeading(o);
                }
            });
        },
        lazyData: function() {
            var t = this;
            this.$on("__lazy-data__", function(e, i, a) {
                if (a && t.data && t.data.pids && t.data.pids.length > 0 && i) {
                    var n = t.data.pids[0];
                    if (i && i[n] && i[n].list && i[n].list.length > 0) {
                        var o = i[n].list || [];
                        t.switchType(t.data.type, o);
                    }
                }
            });
        },
        transDataSpike: function(t) {
            var e = this, i = parseInt(new Date().getTime() / 1e3, 10), a = t.filter(function(t, e, a) {
                return parseInt(t.effectETime) >= i && parseInt(t.effectSTime) <= i;
            });
            if (a && a.length > 0) {
                var n = a[0].effectETime - i;
                a.map(function(t) {
                    if (t.item_id && t.secKillId) {
                        var i = "/pages/detail/pages/seckill/index?itemId=" + t.item_id + "&activityId=" + e.idtourl(t.secKillId);
                        t.item_xcx_url_backup = i;
                    }
                    t.price = t.killPrice || "";
                }), this.transData(a, n);
            }
        },
        transDataGroup: function(t) {
            t.map(function(t) {
                t.price = t.discountPrice || "";
            }), this.transData(t);
        },
        transDataQuick: function(t) {
            if (t && t[0] && t[0].list && t[0].list.length > 0) {
                var e = t[0] || {}, i = e.time || 0, a = e.list || [];
                a.map(function(t) {
                    t.price = t.salePrice || "", t.image = t.img || "", t.item_xcx_url = t.listUrl || "";
                }), this.setData({
                    $headingTitle: e.title,
                    leftTimeDes: e.viceTitle,
                    $headingMoreText: e.moreTitle || "",
                    $headingMoreLink: e.moreLink || ""
                }), this.transData(a, i);
            }
        },
        transData: function(t, i) {
            i && this.$countdown.init({
                format: "hh:mm:ss",
                countdown: i
            });
            var a = parseInt(this.data.minGoods), n = parseInt(this.data.maxGoods);
            if (t.length >= a) {
                var o = [], r = [], s = [];
                (s = t.slice(0, n)).map(function(t, i) {
                    t.suffix_img = e.default.getGoodsRatioSuffix(t.image, 160, "1:1"), t.acm && o.push(t.acm), 
                    r.push(i);
                });
                var l = "none";
                s.length <= 4 && (l = "center"), o.length > 0 && this.$root.$logE("0x00000000", {
                    modName: "____" + this.data.ptpC + "____",
                    acms: o,
                    indexs: r
                }), this.setData({
                    list: s,
                    centerClass: l
                });
            } else this.setData({
                list: []
            });
        },
        setHeading: function(t) {
            if (t && t.title) {
                var e = t || {}, i = {};
                e.title && (i.$headingTitle = e.title), e.titleColor && (i.$headingColor = e.titleColor), 
                e.titleIcon && (i.$headingTitleIcon = e.titleIcon), e.moreTitle && (i.$headingMoreText = e.moreTitle), 
                e.moreLink && (i.$headingMoreLink = e.moreLink), e.moreColor && (i.$headingMoreTextColor = e.moreColor), 
                e.wxaMoreLink && (i.$headingWxaMoreLink = e.wxaMoreLink), e.wxaMoreAppId && (i.$headingAppId = e.wxaMoreAppId), 
                this.setData(i);
            }
        }
    }
};