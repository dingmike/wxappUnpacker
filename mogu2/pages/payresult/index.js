function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/m.js")), n = e(require("../../components/loading/index.js")), o = e(require("../../components/toast/index")), a = e(require("../../common/base/createPage")), r = e(require("../../components/wall/index")), i = e(require("../../common/utils/imgUrlTool")), s = e(require("./components/totalMount/index.js")), l = e(require("./components/scratch/index")), d = e(require("../../common/utils/cache")), u = e(require("../../components/imcall/index")), c = t.default.MWP, h = t.default.MCE;

(0, a.default)({
    components: {
        toast: o.default,
        loading: n.default,
        wall: r.default,
        totalMount: s.default,
        scratch: l.default,
        imcall: u.default
    },
    data: {
        orderId: "",
        orderUrl: "",
        payPrice: "",
        shipInfo: {},
        redPacketPrice: "",
        itemOrderList: [],
        leftItem: 0,
        showMore: !1,
        showRecommend: "100065" !== c.AppKey,
        bannerImg: "",
        showBanner: !1,
        bannerLink: "",
        imBannerInfo: null,
        array: [ {
            message: "foo"
        }, {
            message: "bar"
        } ]
    },
    onShow: function() {},
    onLoad: function(e) {
        var t = this, n = {}, o = e.payOrderId || "";
        n.payOrderId = o, this.$loading.show(), c.request("mwp.TradeWebBuy.paySuccessActionlet", "1", n).then(c.filterResult).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e.jiajiagouInfo && e.jiajiagouInfo.toShow && t.getJiajiagouInfo(o);
            for (var n = e.itemOrderListInfo && e.itemOrderListInfo.itemOrderList || [], a = 0; a < n.length; a++) {
                var r = n[a], s = r.imgUrl, l = r.nowPrice;
                n[a].httpsImg = i.default.getWidthSuffix(s, 112), n[a].nowPrice = (l / 100).toFixed(2);
            }
            var u = n.length > 1 ? "orderList" : "orderDetail", c = !1;
            "蘑菇街女装" === d.default.get("appName") && (c = !0), t.setData({
                showBanner: c,
                guaguaShowInfo: e.guaguaShowInfo,
                shopOrderIds: e.shopOrderIds || [],
                orderId: e.payOrderId + "",
                orderUrl: u,
                payPrice: (e.actualPayAmount + "") / 100,
                redPacketPrice: (e.payRedPacketAmount + "") / 100,
                shipInfo: e.shipInfo || {},
                itemOrderList: n,
                leftItem: n.length - 4
            }, function() {
                t.$loading.hide();
                var n = e.bannerInfo && e.bannerInfo.resourceId || "";
                t.getMaitInfo(n), t.data.showRecommend && t.initWall();
            });
        }).catch(function(e) {
            t.$loading.hide(), t.$toast.show(e.message);
        });
    },
    getMaitInfo: function(e) {
        var t = this;
        if (this.data.showBanner) {
            var n = this.data, o = n.guaguaShowInfo, a = n.shopOrderIds, r = n.orderId, i = [], s = "";
            i.push("99455"), e && i.push(e), o && o.lotteryCode && (s = "95964", i.push(s)), 
            i.length && h.multiget({
                pids: i.join(",")
            }).then(function() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = e && n[e] && n[e].list || [];
                i.length > 0 && t.setData({
                    bannerImg: i[0].miniImage,
                    bannerLink: i[0].miniLink
                });
                var l = n[99455] && n[99455].list || [];
                l.length > 0 && (t.setData({
                    imBannerInfo: l[0]
                }, function() {
                    t.$expose && t.$expose();
                }), t.$imcall.setImOpts({
                    shopId: l[0].shopId
                }));
                var d = s && n[s] && n[s].list || [];
                d.length > 0 && o.lotteryCode === d[0].lotteryCode && t.$scratch.init({
                    orderId: r,
                    shopOrderIds: a,
                    lottery: d[0]
                });
            });
        }
    },
    getJiajiagouInfo: function(e) {
        var t = this;
        c.request("mwp.aston.getAccumulation", "1", {
            orderId: e
        }).then(c.filterResult).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            t.$totalMount.init(e);
        });
    },
    bannerFunc: function(e) {
        var t = e.currentTarget.dataset.link;
        !!t && this.$navigate(t);
    },
    initWall: function() {
        this.$wall.initWall({
            cKey: "xcx-pay"
        });
    },
    onReachBottom: function() {
        this.$wall.wallScrollEvent();
    },
    onPageScroll: function() {
        this.$wall.isSupportSelector && this.$wall.getInViewItems();
    },
    doShowMore: function() {
        this.setData({
            showMore: !0
        });
    }
});