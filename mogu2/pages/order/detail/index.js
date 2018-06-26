function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../common/m")), r = e(require("../../../common/base/createPage")), a = e(require("../../../components/toast/index")), o = e(require("../../../components/loading/index")), i = e(require("./module/parseData.js")), s = e(require("./module/parseStatus.js")), n = e(require("./module/parseLogistics.js")), d = e(require("./module/parseFootData.js")), l = e(require("./components/shopList/index")), c = e(require("../../../common/utils/cache.js")), u = require("../common/base.js"), p = require("../common/common.js"), h = e(require("../../../components/wall/index")), f = e(require("../../../common/service/url.js")), m = e(require("../../../components/cashier/index")), g = t.default.MWP, O = "", I = null, _ = "", w = !1;

exports.default = (0, r.default)({
    components: {
        shopList: l.default,
        toast: a.default,
        wall: h.default,
        loading: o.default,
        cashier: m.default
    },
    data: {
        hasWallInited: !1,
        isAjaxLoading: !0,
        marketType: "",
        shopList: null,
        orderStageList: null,
        shopOrderId: null,
        payOrderId: null,
        shopOrderIdEsc: null,
        isPintuan: null,
        isPintuanRed: null,
        statusList: null,
        logisticsList: null,
        discountList: null,
        cancelShow: null,
        deleteShow: null,
        footDataList: null,
        orderOperations: null,
        isChannel: !1,
        $wallPtMore: {
            link: "/pages/pintuanIndex/index",
            name: "大家都在拼",
            marginTop: 16,
            marginBottom: 0
        }
    },
    onLoad: function(e) {
        O = e.orderId || "";
    },
    onReady: function() {},
    wallInit: function(e) {
        this.data.hasWallInited || (e ? (this.$wall.setDataSource({
            source: "mwp_mait"
        }), this.$wall.initWall({
            pid: "88896"
        })) : this.$wall.initWall({
            cKey: "xcx-guess-like",
            pid: "53225"
        }));
    },
    reloadPage: function() {
        var e = this;
        this.setData({
            isAjaxLoading: !0
        }, function() {
            e.getOrderDetail();
        });
    },
    deleteOpt: function(e) {
        var t = this, r = this.data.shopOrderId, a = e.detail && e.detail.formId;
        this.$logForm(a, 1), wx.showModal({
            title: "",
            confirmColor: "#ff5777",
            content: "确定删除该订单吗？删除了的订单不可恢复",
            success: function(e) {
                if (e && e.confirm) return (0, u.orderDeleteOpt)(r).then(function(e) {
                    e.success ? (c.default.put(_, "deleteOpt"), t.$toast.show(e.message || "删除订单成功", 2e3, function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    })) : t.$toast.show(e.message || "删除订单失败，请稍后再试");
                });
            }
        });
    },
    copyToClipboard: function(e) {
        var t = this, r = e.currentTarget.dataset.codeId.toString();
        wx.setClipboardData ? wx.setClipboardData({
            data: r,
            success: function() {
                t.$toast.show("复制成功");
            },
            fail: function() {
                t.$toast.show("复制失败");
            }
        }) : this.$toast.show("复制失败");
    },
    cancelOpt: function(e) {
        var t = this, r = e.currentTarget.dataset, a = r.payorderid || r.shoporderid, o = e.detail && e.detail.formId;
        this.$logForm(o, 1), wx.showModal({
            title: "",
            confirmColor: "#ff5777",
            content: "这么好的宝贝，确定不要了吗？",
            success: function(e) {
                if (e && e.confirm) return (0, u.cancelOrderOpt)(a).then(function(e) {
                    e.success ? (c.default.put(_, "cancelOpt"), t.$toast.show(e.message || "取消订单成功", function() {
                        t.reloadPage();
                    })) : t.$toast.show(e.message || "取消订单失败，请稍后再试");
                });
            }
        });
    },
    goLogisticsDetail: function(e) {
        var t = e.currentTarget.dataset.orderid;
        this.$navigate(f.default.logisticsList({
            shopOrderId: t,
            orderId: t,
            type: "order"
        }));
    },
    orderRateOpt: function(e) {
        c.default.put(_, "orderRateOpt"), this.$redirect(f.default.rateAdd({
            orderId: e
        }));
    },
    orderAddRateOpt: function(e) {
        c.default.put(_, "orderAddRateOpt"), this.$redirect(f.default.rateAppend({
            orderId: e
        }));
    },
    pintuanDetail: function(e, t) {
        this.$navigate(f.default.pinshare({
            tuanId: e,
            itemId: t
        }));
    },
    pintuanRed: function(e, t) {
        this.$navigate(f.default.pintuanRed({
            tuanId: e,
            itemId: t
        }));
    },
    lotteryResult: function(e, t) {
        this.$navigate("/pages/pintuan/lotteryresult/index", {
            activityId: e,
            orderId: t
        });
    },
    operateClick: function(e) {
        var t = this, r = e.currentTarget.dataset, a = e.detail && e.detail.formId, o = r.operationname, i = r.footdatalist || {};
        switch (o) {
          case "opt_pay_order":
          case "opt_prepay_order":
          case "opt_tailpay_order":
            if (this.$root.$logForm(a, 1), w) return;
            w = !0, setTimeout(function() {
                w = !1;
            }, 3e3), this.$loading.show(), (0, u.payOrderOpt)(this.$cashier, i.payOrderId, this.$loading, {
                successCb: function() {
                    var e = this;
                    w = !1, c.default.put(_, "opt_pay_order"), this.$toast.show("支付成功", function() {
                        e.data.isChannel ? e.$navigate(f.default.pinshare({
                            tuanId: i.tuanId,
                            itemId: i.itemId
                        })) : e.$navigate(f.default.payresult({
                            payOrderId: i.payOrderId
                        }));
                    });
                }.bind(this),
                cancelCb: function() {
                    w = !1, this.$toast.show("您已取消支付", function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    });
                }.bind(this)
            });
            break;

          case "opt_cancel_order":
            (0, u.cancelOrderOpt)(i.payOrderId || i.shopOrderId);
            break;

          case "opt_delete_order":
            (0, u.orderDeleteOpt)(i.shopOrderId);
            break;

          case "opt_confirm_order":
          case "opt_confirm_use_virtual_order":
            this.$root.$logForm(a, 1);
            var s = r.ordertags.indexOf("BEAUTYCLINIC") >= 0;
            wx.showModal({
                title: "提示",
                confirmColor: "#ff5777",
                content: "请您在" + (s ? "享受服务时" : "收到货后") + "再点击“确定”，否则可能钱货两空",
                success: function(e) {
                    e.confirm && (0, u.orderConfirmOpt)(i.shopOrderId, i.shopOrderIdEsc).then(function(e) {
                        e.success ? t.$toast.show(e.message || (s ? "确认使用成功" : "确认收货成功"), function() {
                            c.default.put(_, "opt_confirm_order"), t.orderRateOpt(i.shopOrderIdEsc);
                        }) : t.$toast.show(e.message || "确认收货失败，请稍后再试");
                    });
                }
            });
            break;

          case "opt_rate_order":
            this.orderRateOpt(i.shopOrderIdEsc);
            break;

          case "opt_append_rate_order":
            this.orderAddRateOpt(i.shopOrderIdEsc);
            break;

          case "opt_show_delivery_order":
            this.$navigate(f.default.logisticsList({
                shopOrderId: i.shopOrderId,
                orderId: i.payOrderId,
                type: "order"
            }));
            break;

          case "opt_remind_ship_order":
            this.$root.$logForm(a, 1), (0, u.orderRemindOpt)(i.shopOrderId).then(function(e) {
                e.success ? t.$toast.show(e.message || "提醒商家发货成功") : t.$toast.show(e.message || "提醒失败，请稍后再试");
            });
            break;

          case "opt_pintuan_detail":
          case "opt_invite_pintuan":
            this.pintuanDetail(i.tuanId, i.itemId);
            break;

          case "opt_pintuan_detail_red":
          case "opt_invite_pintuan_red":
            this.pintuanRed(i.tuanId, i.itemId);
            break;

          case "opt_choujiang_detail":
            this.lotteryResult(i.activityId, i.shopOrderId);
            break;

          case "opt_delay_receive":
            this.$root.$logForm(a, 1), wx.showModal({
                title: "",
                confirmColor: "#ff5777",
                content: "延后3天确认收货，仅限延长一次",
                success: function(e) {
                    e && e.confirm && g.request("mwp.OrderManagement.delayReceivedByUserAction", "1", {
                        orderId: i.shopOrderId
                    }).then(g.filterResult).then(function() {
                        t.$toast.show("已成功延长收货3天"), t.reloadPage();
                    }).catch(function(e) {
                        t.$toast.show(e.message);
                    });
                }
            });
        }
    },
    phoneCall: function(e) {
        var t = e.currentTarget.dataset.phone;
        !!t && wx.makePhoneCall({
            phoneNumber: t
        });
    },
    getOrderDetail: function() {
        var e = this, t = {
            orderId: O
        };
        g.request("mwp.OrderManagement.buyerOrderDetail", "1", t).then(g.filterResult).then(function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = {};
            if (t.shopOrderList) {
                var a = t.shopOrderList[0];
                r.marketType = a.marketType;
                var o = (0, i.default)(t);
                r.shopList = o.shopList, r.orderStageList = o.orderStageList, r.shopOrderId = a.shopOrderId, 
                r.payOrderId = a.payOrderId, r.shopOrderIdEsc = a.shopOrderIdEsc, r.isPintuan = a.orderTags && -1 !== a.orderTags.indexOf("PT"), 
                r.isPintuanRed = a.orderTags && -1 !== a.orderTags.indexOf("PT_HB"), r.isTaxCompliance = a.orderTags && -1 !== a.orderTags.indexOf("taxCompliance"), 
                r.isChannel = a.orderTags.indexOf("PT") >= 0 && -1 == a.orderTags.indexOf("customPt"), 
                _ = r.isPintuan ? "PT_Detail_Operate" : "Order_Detail_Operate", e.wallInit(r.isPintuan), 
                r.hasWallInited = !0;
                var l = (0, s.default)(a.orderStatus, o.orderStageList, a.orderTags);
                if (l.statusTitle = a.orderViewStatus || l.statusTitle, r.orderTags = a.orderTags, 
                r.statusList = l, r.statusList.remainTime = a.remainTime, r.statusList.remainEndTime = Math.ceil(new Date().getTime() / 1e3) + a.remainTime, 
                r.statusList.remainTimeString = (0, p.transformRemainTime)(a.remainTime), t.shipDetail) {
                    var c = (0, n.default)(t.shipDetail.packageTrackInfos, t.shipDetail.receiverAddressInfo), u = {
                        shopOrderId: a.shopOrderId,
                        shopOrderIdEsc: a.shopOrderIdEsc,
                        buyerMobile: a.extraInfo && a.extraInfo.buyerMobile
                    };
                    r.logisticsList = Object.assign(c, u);
                }
                r.discountList = o.discountList;
                var h = t.payOrder, f = (0, d.default)(t);
                r.footDataList = Object.assign(f), r.orderOperations = h.payOrderOperations.concat(a.shopOrderOperations), 
                r.cancelShow = r.deleteShow = null;
                var m = !0, g = !1, O = void 0;
                try {
                    for (var I, w = r.orderOperations[Symbol.iterator](); !(m = (I = w.next()).done); m = !0) switch (I.value.operationName) {
                      case "opt_cancel_order":
                        r.cancelShow = !0;
                        break;

                      case "opt_delete_order":
                        r.deleteShow = !0;
                    }
                } catch (e) {
                    g = !0, O = e;
                } finally {
                    try {
                        !m && w.return && w.return();
                    } finally {
                        if (g) throw O;
                    }
                }
                r.virtualItemInfo = o.virtualItemInfo, r.isAjaxLoading = !1, e.setData(r, e.setTimeInterval.bind(e)), 
                e.$shopList.setOption({
                    shopList: o.shopList
                }), e.$loading.hide();
            }
        }).catch(function(t) {
            e.$loading.hide(), e.$toast.show(t.message);
        });
    },
    setTimeInterval: function() {
        var e = this;
        clearInterval(I);
        var t = this.data && this.data.statusList;
        t && t.remainTime && (t.prevTimeText || t.timeText) && (I = setInterval(function() {
            var r = t.remainEndTime - Math.ceil(new Date().getTime() / 1e3), a = (0, p.transformRemainTime)(r);
            e.setData && e.setData({
                "statusList.remainTimeString": a
            });
        }, 1e3));
    },
    onShow: function() {
        this.$loading.show(), this.reloadPage();
    },
    onHide: function() {
        clearInterval(I);
    },
    onUnload: function() {
        clearInterval(I);
    }
});