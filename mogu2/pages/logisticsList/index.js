function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/m")), s = e(require("../../components/loading/index")), a = e(require("../../components/toast/index")), r = e(require("../../common/base/createPage")), i = e(require("../../components/steps/index")), n = t.default.MWP;

(0, r.default)({
    components: {
        loading: s.default,
        toast: a.default,
        steps: i.default
    },
    data: {
        packageGroupVOList: [],
        current: 0,
        scrollLeft: 0,
        scrollTop: 0
    },
    onLoad: function(e) {
        var t = this;
        this.$loading.show();
        var s = "", a = "", r = {};
        switch (e.type) {
          case "refund":
            s = "mwp.TradeRefundWeb.refundLog", a = 1, r = {
                itemOrderId: e.orderId
            };
            break;

          case "order":
            s = "mwp.TradeConsignWeb.packageDetail", a = 1, r = {
                shopOrderId: e.shopOrderId
            };
        }
        n.request(s, a, r).then(n.filterResult).then(function(s) {
            t.$loading.hide();
            var a = {};
            switch (e.type) {
              case "refund":
                a = t.parseRefundData(s);
                break;

              case "order":
                a = t.parseOrderData(s);
            }
            a && (t.$steps.setData(a.logisticsList), t.setData({
                expressName: a.expressName,
                expressId: a.expressId
            }));
        }).catch(function(e) {
            t.$toast.show(e.message, 1500), t.$loading.hide();
        });
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: "物流信息"
        });
    },
    methods: {
        switchTab: function(e) {
            var t = this.data, s = t.packageGroupVOList, a = t.current, r = t.tabWidth, i = e.currentTarget.dataset.index;
            a != i && (this.setData({
                current: i,
                scrollLeft: parseInt(r.replace("rpx", "")) * i / 2,
                scrollTop: 0
            }), this.parsePackageData(s[i]));
        },
        phoneCall: function(e) {
            var t = e.currentTarget.dataset.phone;
            !!t && wx.makePhoneCall({
                phoneNumber: t
            });
        },
        parseRefundData: function(e) {
            if (e && e.refundSellerShipDTO) {
                var t = e.refundSellerShipDTO;
                return {
                    expressName: t.expressName,
                    expressId: t.expressId,
                    logisticsList: this.parseStepListData(e.logisticsDeliverySimpleDetailDTOs, "details", "nodeTime")
                };
            }
        },
        parseOrderData: function(e) {
            for (var t = e.packageGroupVOList || [], s = t.length, a = 750 / (s > 5 ? 5 : s) + "rpx", r = 0; r < s; r++) t[r].packageName = "包裹" + (r + 1);
            this.setData({
                tabWidth: a,
                packageGroupVOList: t
            }), this.parsePackageData(t[this.data.current]);
        },
        parsePackageData: function(e) {
            if (e) {
                var t = e.consignLogisticsGroupVOList, s = e.packageTrackInfoVOList[0];
                if (!s || !s.expressId || !t) return this.$steps.setData({
                    stepsList: [],
                    current: 0
                }), void this.setData({
                    consignItem: null,
                    expressId: "",
                    expressName: "",
                    expressPhone: ""
                });
                var a = 0, r = "", i = s.deliveryNodeDetailVOList, n = {
                    stepsList: [],
                    current: 0
                };
                i && i.length ? n = this.parseStepListData(i, "details", "nodeTime") : s.expressId && "其它" !== s.expressName && (n = {
                    stepsList: [ {
                        stepDesc: "卖家已通知快递公司（" + s.expressName + "）揽件，等待快递公司揽件中",
                        stepTitle: this.formatTime(s.created)
                    } ],
                    current: 0
                });
                for (var o = 0; o < t.length; o++) {
                    var p = t[o].consignItemVO;
                    0 == o && (r = p.imgUrl), a += p.number;
                }
                this.$steps.setData(n), this.setData({
                    consignItem: {
                        total: a,
                        image: r
                    },
                    expressId: s.expressId,
                    expressName: s.expressName,
                    expressPhone: s.expressPhone
                });
            }
        },
        parseStepListData: function(e, t, s) {
            e.sort(function(e, t) {
                return t[s] - e[s];
            });
            var a = [], r = this;
            return e.forEach(function(e) {
                a.push({
                    stepDesc: e[t],
                    stepTitle: r.formatTime(e[s])
                });
            }), {
                stepsList: a,
                current: 0
            };
        },
        formatTime: function(e) {
            return e && Date.format(new Date(1e3 * e), "yyyy.MM.dd hh:mm:ss");
        }
    }
});