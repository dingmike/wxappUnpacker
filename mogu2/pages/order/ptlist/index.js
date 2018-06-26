function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../common/m.js")), a = t(require("../../../common/base/createPage")), i = t(require("../../../common/service/url")), s = t(require("../common/parseData/parseData.js")), n = t(require("./components/orderCard/index")), o = t(require("../../../components/toast/index")), r = t(require("../../../components/empty/index")), d = t(require("../../../components/loading/index")), u = t(require("../../../common/utils/cache")), l = t(require("../../../components/cashier/index")), c = e.default.MWP, h = e.default.MCE;

(0, a.default)({
    components: {
        orderCard: n.default,
        toast: o.default,
        empty: r.default,
        loading: d.default,
        cashier: l.default
    },
    data: {
        isAjaxLoading: !0,
        wallList: [],
        scrollTop: 0,
        isEnd: !1,
        page: 1,
        tipShow: !1,
        tabOrderStatus: "all",
        marketType: "market_mogujie",
        orderList: [],
        tabTextList: [ {
            text: "全部",
            status: "all"
        }, {
            text: "待付款",
            status: "notPay"
        }, {
            text: "拼团中",
            status: "tuaning"
        }, {
            text: "拼团成功",
            status: "tuanSuccess"
        }, {
            text: "拼团失败",
            status: "tuanFailed"
        } ],
        $wallPtMore: {
            link: "/pages/pintuanIndex/index",
            name: "大家都在拼",
            marginTop: 16,
            marginBottom: 0
        },
        tipText: ""
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            tabOrderStatus: t.orderStatus || "all"
        }, function() {
            e.getOrderLits(), e.getTopText();
        }), this.$empty.setData({
            callback: function() {
                this.$navigate(i.default.pintuanIndex());
            }.bind(this)
        }), this.getPTWallList();
    },
    onReady: function() {
        var t = this;
        this.$orderCard.$on("reloadPage", function(e) {
            t.setData({
                orderList: [],
                isEnd: !1,
                page: 1,
                tabOrderStatus: e
            }, function() {
                t.getOrderLits(), t.getTopText();
            });
        }.bind(this, "all"));
    },
    clearTip: function() {
        this.setData({
            tipShow: !1
        });
    },
    PtListScrollEvent: function() {
        var t = this;
        this.data.isAjaxLoading || this.data.isEnd || this.setData({
            isAjaxLoading: !0
        }, function() {
            t.getOrderLits(!0);
        });
    },
    getOrderLits: function(t) {
        var e = this, a = {
            status: this.data.tabOrderStatus,
            page: this.data.page || 1,
            pageSize: 10,
            marketType: this.data.marketType
        };
        c.request("mwp.enzo.pinTuanOrderList", "1", a).then(c.filterResult).then(function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e.renderOrderList(a, t);
        }).catch(function(t) {
            e.$loading.hide(), e.$toast.show(t.message);
        });
    },
    renderOrderList: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments[1], i = this.data.orderList.slice(0);
        i = a ? i.concat((0, s.default)(e)) : (0, s.default)(e);
        var n = ++this.data.page, o = e.isEnd;
        this.setData({
            isEnd: o,
            page: n,
            orderList: i,
            isAjaxLoading: !1
        }, function() {
            t.$loading.hide();
        });
    },
    onShow: function() {
        var t = this;
        if (u.default.getAndRemove("PT_Detail_Operate")) {
            this.$loading.show();
            var e = {
                isEnd: !1,
                isAjaxLoading: !0,
                page: 1,
                scrollTop: 0
            };
            this.setData(e, function() {
                t.getOrderLits(), t.getTopText();
            });
        }
    },
    getPTWallList: function() {
        var t = this;
        h.get({
            pid: "43991",
            page: 1,
            pageSize: 24
        }, !0).then(function(e) {
            t.setData({
                wallList: e.list || []
            });
        }).catch(function(e) {
            t.$toast.show(e.message);
        });
    },
    triggerTabChoose: function(t) {
        var e = this;
        this.$loading.show();
        var a = t.currentTarget.dataset;
        this.$logE("WEB_order_tab", {
            tabName: a.text
        }), this.setData({
            isEnd: !1,
            isAjaxLoading: !0,
            page: 1,
            tabOrderStatus: a.status,
            orderList: []
        }, function() {
            e.getOrderLits();
        });
    },
    getTopText: function(t) {
        var e = this;
        this.pid = t || "81474", h.get({
            pid: this.pid
        }, !0).then(function(t) {
            if (t.list && t.list.length > 0) {
                var a = t.list[0];
                e.topText = a.topText, e.topText ? e.setData({
                    tipText: e.topText,
                    tipShow: !0
                }) : e.setData({
                    tipShow: !1
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    otherClick: function() {
        this.$root.$navigate("/pages/act/index?pageName=wfptyhq/fcldehby");
    }
});