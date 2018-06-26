function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../common/base/createPage")), a = require("../service"), n = t(a), i = t(require("../../../components/loading/index.js")), o = t(require("../../../components/toast/index.js")), s = t(require("../../../components/end/index.js")), r = t(require("../components/balance/index.js")), d = t(require("../components/topBanner/index.js")), c = require("../constant"), l = require("../utils"), u = {
    1: "满返红包",
    2: "通用红包",
    3: "白付美专享",
    4: "支付宝专享",
    5: "实名专享"
};

(0, e.default)({
    components: {
        loading: i.default,
        toast: o.default,
        end: s.default,
        balance: r.default,
        topbanner: d.default
    },
    data: {
        hongbaoList: [],
        start: 0,
        isEnd: !1,
        $end: {},
        $balance: {},
        $topbanner: {},
        tabConfig: {},
        selectedTab: 0
    },
    onLoad: function(t) {
        var e = (0, l.getConfig)(t.appId);
        this.setData({
            tabConfig: e
        }), this.getTopBanners(), this.getBalanceLink(), this.getHongbaoList(0, "load");
    },
    tabClicked: function(t) {
        var e = t.currentTarget.dataset.tab;
        e !== this.data.selectedTab && (this.setData({
            selectedTab: e
        }), this.resetList(), this.getHongbaoList(0, "load"));
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: c.appTitle
        });
    },
    onPullDownRefresh: function() {
        this.getTopBanners(), this.getBalanceLink(), this.resetList(), this.getHongbaoList(0, "load", function() {
            wx.stopPullDownRefresh();
        });
    },
    onReachBottom: function() {
        var t = this, e = this.data, a = e.start;
        e.isEnd || (a += c.pageSize, this.getHongbaoList(a, "append", function() {
            t.setData({
                start: a
            });
        }));
    },
    resetList: function() {
        this.setData({
            start: 0,
            isEnd: !1
        });
    },
    formatTime: function(t) {
        return t && Date.format(new Date(1e3 * t), "yyyy.MM.dd hh:mm");
    },
    formatAmount: function(t) {
        return (t / 100).toFixed(2);
    },
    getTopBanners: function() {
        var t = this;
        n.default.getMaitResource(this.data.tabConfig.bannerPid).then(function(e) {
            e.list && e.list.length > 0 && t.$topbanner.setData({
                topBanners: e.list
            });
        }).catch(a.handleRequestError.bind(this));
    },
    getBalanceLink: function() {
        var t = this;
        n.default.getMaitResource(this.data.tabConfig.balancePid).then(function(e) {
            e.list && e.list.length > 0 && t.$balance.setData({
                maitResource: e.list[0]
            });
        }).catch(a.handleRequestError.bind(this));
    },
    getHongbaoList: function(t, e, i) {
        var o = this, s = this.data.tabConfig.tabs[this.data.selectedTab];
        console.log("selected tab info: ", s.text, s.merchantId), n.default.hongbaoList.call(this, {
            start: t,
            size: c.pageSize,
            merchantId: s.merchantId
        }).then(function(t) {
            console.log(t);
            var a = t.hongbaoList, n = o.data.$balance;
            if (n.amount = o.formatAmount(t.amount), a.length < c.pageSize && o.setData({
                isEnd: !0
            }), a = a.map(function(t) {
                var e = t.id, a = t.amount, n = t.originAmount, i = t.hongbaoType, s = t.now, r = t.startTime, d = t.endTime, c = t.status, l = t.canWithdraw, h = void 0, g = void 0, f = void 0, b = "", p = "", m = "", x = u[i], w = void 0, v = void 0, T = void 0, L = void 0, C = d - s;
                switch (r = o.formatTime(r), d = o.formatTime(d), b = "有效期：" + r + " － " + d, 0 != +n && 0 == +a ? (h = !0, 
                L = "icon-used") : C <= 0 ? (g = !0, L = "icon-expired") : f = !0, f ? (C <= 86400 && (p = "(仅剩1天)"), 
                1 == +l && (v = !0), 4 == +c && (w = !0), T = "valid") : T = "expired", a = o.formatAmount(a), 
                n = o.formatAmount(n), m = "" + a, i) {
                  case 3:
                    T = f ? "bfm" : "expired-bfm";
                    break;

                  case 4:
                    T = f ? "alipay" : "expired-alipay";
                    break;

                  case 5:
                    T = f ? "realname" : "expired-realname";
                    break;

                  default:
                    T = f ? 1 == +l ? "withdraw" : "valid" : 1 == +l ? "expired-withdraw" : "expired";
                }
                return {
                    id: e,
                    hongbaoClass: T,
                    iconClass: L,
                    amountText: m,
                    statusText: b,
                    typeText: x,
                    warnText: p,
                    isUsed: h,
                    isValid: f,
                    isExpired: g,
                    showActiveButton: w,
                    showWithdrawButton: v
                };
            }), "append" === e) {
                var s = o.data.hongbaoList;
                o.setData({
                    hongbaoList: s.concat(a),
                    $balance: n
                });
            } else o.setData({
                hongbaoList: a,
                $balance: n
            });
            i && i();
        }).catch(a.handleRequestError.bind(this));
    },
    withdraw: function(t) {
        var e = this, a = t.currentTarget.dataset.id;
        n.default.hongbaoWithdraw(a).then(function() {
            var t = e.data, n = t.hongbaoList, i = t.$balance;
            n = n.map(function(t) {
                if (+t.id == +a) {
                    var e = parseFloat(t.amountText);
                    i.amount = ((100 * i.amount - 100 * e) / 100).toFixed(2), t.hongbaoClass = "expired-withdraw", 
                    t.amountText = "0.00", t.isUsed = !0, t.isValid = !1, t.iconClass = "icon-used", 
                    t.showWithdrawButton = !1;
                }
                return t;
            }), e.setData({
                hongbaoList: n,
                $balance: i
            }), setTimeout(function() {
                wx.showModal({
                    title: "",
                    content: "恭喜提现成功 \r\n 请到 钱包-余额 查看",
                    showCancel: !1,
                    confirmText: "知道了"
                });
            }, 300);
        });
    },
    active: function(t) {
        var e = this.data.tabConfig, a = "/pages/act/index?pageName=realname/newsuccinctly";
        this.$logE("001021220", {
            client: "xcx"
        }), e.id === c.walletAppId ? this.$navigate(a, {
            redirect: "/pages/hongbao/list/index"
        }) : (t.currentTarget.dataset.appId = c.walletAppId, t.currentTarget.dataset.href = a + "&redirect=" + encodeURIComponent("/pages/hongbao/list/index") + "&appId=" + e.id, 
        t.currentTarget.dataset.fallback = "/pages/hongbao/list/index", this.$launch(t));
    }
});