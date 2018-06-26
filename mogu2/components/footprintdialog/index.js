function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = t(require("../end/index")), e = t(require("../empty/index")), o = t(require("../countdown/index")), i = t(require("../../common/m")).default.MWP;

exports.default = {
    data: function() {
        return {
            isShow: null,
            zIndex: 100,
            $empty: {
                type: 12,
                text: "你还没有足迹~"
            },
            $end: {
                placeholder: "正在加载~"
            },
            isEnd: !1,
            groups: []
        };
    },
    components: {
        empty: e.default,
        end: n.default,
        countdown: o.default
    },
    onLoad: function() {},
    onShow: function() {},
    getFootprintData: function() {
        var t = this;
        this.loading || (this.loading = !0, i.request("mwp.maybach.UserTrackActionlet", "1.0", {
            bizKey: "mainXcx",
            page: this.page++
        }).then(i.filterResult).then(function(n) {
            var e = n.itemMap, o = n.isEnd;
            t.itemMap = t.mergeItemMap(t.itemMap, e), t.isEnd = o;
            var i = t.groupFootprint(t.itemMap), a = [];
            i.forEach(function(t) {
                t.goods.forEach(function(t) {
                    a.push({
                        countdown: t.leftTime,
                        format: "dd天hh时mm分ss秒",
                        isHideZero: !0
                    });
                });
            }), t.$countdown.initList({
                countdownList: a
            }), t.setData({
                groups: i,
                isEnd: o
            }), t.loading = !1;
        }).catch(function(n) {
            console.log(n), t.loading = !1;
        }));
    },
    mergeItemMap: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return Object.keys(n).forEach(function(e) {
            t[e] ? t[e] = t[e].concat(n[e]) : t[e] = n[e];
        }), t;
    },
    groupFootprint: function() {
        var t = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = 0;
        return Object.keys(n).sort(function(n, e) {
            return t.getOriginDate(e) - t.getOriginDate(n);
        }).map(function(t) {
            return n[t].forEach(function(t) {
                t.index = e++;
            }), {
                date: t,
                goods: n[t]
            };
        });
    },
    getOriginDate: function(t) {
        return new Date().fromFormattedString(t, "yyyy年MM月dd日").getTime();
    },
    clearAll: function() {
        var t = this;
        this.loading || (this.loading = !0, i.request("mwp.maybach.DeleteAllActionlet", "1.0", {}).then(i.filterResult).then(function() {
            t.setData({
                groups: [],
                isEnd: !1
            }), t.loading = !1;
        }).catch(function(n) {
            console.log(n), t.loading = !1;
        }));
    },
    init: function(t) {
        this.$mask = t && t.$mask, this.page = 1, this.itemMap = {}, this.getFootprintData();
    },
    methods: {
        hideDialog: function() {
            var t = this;
            this.setData({
                isShow: !1
            }), setTimeout(function() {
                t.setData({
                    isShow: null
                });
            }, 300);
        },
        onInnerClick: function() {},
        showDialog: function() {
            this.$mask && this.$mask.show(), this.setData({
                isShow: !0
            });
        },
        getMore: function() {
            this.isEnd || this.getFootprintData();
        },
        onClean: function(t) {
            var n = this, e = t.detail.formId;
            e && this.$root.$logForm(e, 2), wx.showModal({
                title: "清空足迹",
                content: "你确定要清空足迹吗？",
                cancelColor: "#666666",
                confirmColor: "#ff5777",
                success: function(t) {
                    t.confirm && n.clearAll();
                }
            });
        }
    }
};