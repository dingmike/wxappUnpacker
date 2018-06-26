function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a = t(require("../../../common/m.js")), i = t(require("../../../common/base/createPage")), n = t(require("../common/parseData/parseData.js")), r = t(require("./components/orderCard/index")), s = t(require("../../../components/loading/index")), o = t(require("../../../components/toast/index")), d = t(require("../../../components/empty/index")), u = t(require("../../../components/wall/index")), l = t(require("../../../components/end/index")), c = t(require("../../../common/utils/cache")), h = t(require("../../../common/utils/imgUrlTool")), g = t(require("../../../components/cashier/index")), f = a.default.MWP, p = a.default.MCE;

(0, i.default)({
    components: {
        wall: u.default,
        orderCard: r.default,
        toast: o.default,
        empty: d.default,
        end: l.default,
        loading: s.default,
        cashier: g.default
    },
    data: {
        isAjaxLoading: !0,
        scrollTop: 0,
        isEnd: !1,
        page: 1,
        tipShow: !1,
        tabOrderStatus: "all",
        marketType: "market_mogujie",
        orderList: [],
        remainTimeObj: null,
        hasWallInited: !1,
        tabTextList: [ {
            text: "全部",
            status: "all"
        }, {
            text: "待付款",
            status: "created"
        }, {
            text: "已付款",
            status: "unshipped"
        }, {
            text: "待收货",
            status: "unreceived"
        }, {
            text: "待评价",
            status: "received_and_completed"
        }, {
            text: "售后",
            status: "refund_orders"
        } ],
        tabCount: [],
        tipText: "",
        bannerInfo: null
    },
    onLoad: function(t) {
        var e = this;
        this.setData({
            tabOrderStatus: t.orderStatus || "all"
        }, function() {
            e.getOrderLits(), e.getTopText();
        });
    },
    wallInit: function() {
        this.data.hasWallInited || this.$wall.initWall({
            cKey: "xcx-order-guess"
        });
    },
    onReady: function() {
        var t = this;
        this.$orderCard.$on("showMore", function(a, i) {
            var n = "orderList[" + a + "].shopList[" + i + "]isShowMore";
            t.setData(e({}, n, !0));
        }), this.$orderCard.$on("reloadPage", function() {
            t.setData({
                orderList: [],
                isEnd: !1,
                page: 1
            }, function() {
                t.getOrderLits(), t.getTopText();
            });
        }.bind(this));
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
        f.request("mwp.OrderManagement.buyerOrderList", "1", a).then(f.filterResult).then(function() {
            var a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e.renderOrderList(a, t);
        }).catch(function(t) {
            e.$loading.hide(), e.$toast.show(t.message);
        });
    },
    renderOrderList: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = this.data.orderList.slice(0);
        i = a ? i.concat((0, n.default)(e)) : (0, n.default)(e);
        var r = e.countInfo || {}, s = [ r.unpaidOrderCount, r.waitShippedOrderCount, r.waitReceivedOrderCount, r.waitingRateOrderCount ], o = ++this.data.page, d = e.isEnd;
        this.wallInit(), this.setData({
            isEnd: d,
            page: o,
            orderList: i,
            tabCount: s,
            hasWallInited: !0,
            isAjaxLoading: !1
        }, function() {
            t.$loading.hide();
        });
    },
    onShow: function() {
        var t = this;
        if (c.default.getAndRemove("Order_Detail_Operate") || c.default.getAndRemove("PT_Detail_Operate")) {
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
    clearTip: function() {
        this.setData({
            tipShow: !1
        });
    },
    triggerTabChoose: function(t) {
        var e = this;
        this.$loading.show();
        var a = t.currentTarget.dataset;
        this.$logE("WEB_order_tab", {
            tabName: a.text
        }), this.setData({
            isAjaxLoading: !0,
            isEnd: !1,
            page: 1,
            tabOrderStatus: a.status,
            orderList: []
        }, function() {
            e.getOrderLits();
        });
    },
    getTopText: function() {
        var t = this, e = [ "80461", "87523" ];
        p.multiget({
            pids: e.join(",")
        }).then(function(e) {
            t.renderBanner(e[87523]);
            var a = e[80461];
            if (a.list && a.list.length > 0) {
                var i = a.list[0];
                t.topText = i.topText, t.topText ? t.setData({
                    tipText: t.topText,
                    tipShow: !0
                }) : t.setData({
                    tipShow: !1
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    renderBanner: function(t) {
        if (t.list && t.list.length > 0) {
            var e = t.list[0];
            if (e && e.banner) {
                var a = /\_(\d+)x(\d+)\./, i = e.banner.match(a);
                i[0] && i[1] && i[2] && (e.height = Math.round(750 * i[2] / i[1]) + "rpx"), e.banner = h.default.getWidthSuffix(e.banner, 750);
            }
            this.setData({
                bannerInfo: e
            });
        }
    },
    handleBanner: function(t) {
        var e = t.currentTarget.dataset;
        e.link && this.$navigate(e.link);
    }
});