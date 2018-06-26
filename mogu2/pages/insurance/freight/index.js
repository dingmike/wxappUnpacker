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
        var a = arguments[e];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
    }
    return t;
}, a = t(require("../../../components/loading/index")), s = t(require("../../../components/toast/index")), i = t(require("../../../common/base/createPage")), r = require("../service"), o = t(r), n = require("./constant");

exports.default = (0, i.default)({
    components: {
        loading: a.default,
        toast: s.default
    },
    onLoad: function(t) {
        var e = this;
        this.data.options = t, o.default.getMaitResource(n.faqMaitId).then(function(t) {
            e.faqList = e.parseFAQList(t.list), e.setData({
                faqList: e.faqList
            });
        });
    },
    onShow: function() {
        var t = this, e = this.data.options, a = e.orderId, s = e.refundId;
        o.default.getFreightDetail.call(this, {
            orderId: Number(a) || "",
            refundId: Number(s) || "",
            platformType: 1
        }).then(function(e) {
            console.log(e), t.setData(t.parseData(e)), o.default.freightAllowReApplyClaim.call(t, {
                orderId: Number(a) || "",
                refundId: Number(e.refundId || s) || "",
                platformType: 1
            }).then(function(e) {
                console.log(e), t.setData({
                    showReApply: e
                });
            }).catch(r.errorHandler.bind(t));
        }).catch(r.errorHandler.bind(this));
    },
    methods: {
        parseFAQList: function(t) {
            return t = t.map(function(t) {
                return t.answer = t.answer.replace(/\\n/g, "\n"), e({}, t, {
                    fold: "true"
                });
            });
        },
        parseData: function(t) {
            if (!t) return {
                data: {
                    policyStatus: ""
                }
            };
            var e = t.policyStatus, a = t.claimStatus, s = t.reApply, i = t.applyTime;
            t.claimsStart = this.formatTime(i), t.claimsStartText = s ? "补贴重新申请中" : "补贴申请中";
            var r = t.claimAmount ? t.claimAmount / 100 : 0;
            if (t.claimAmount = r.toFixed(2), t.showStatus = !0, 1 === e || 3 === e || 6 === e) switch (t.showStatus = !1, 
            a) {
              case 0:
                t.statusText = "理赔申请中", t.showTimeline = !0, t.claimsEndText = "预计到账时间", t.claimsEnd = this.formatTime(t.estimatedTime), 
                t.showAmount = !0;
                break;

              case 2:
                t.showTimeline = !0, t.claimsEndText = "已到账", t.claimsEnd = this.formatTime(t.actualTime), 
                1 === t.compensateType ? t.claimsEndText += "，请前往“微信钱包”查看" : 0 === t.compensateType && (t.claimsEndText += "，请前往“服务号 [蘑菇街服务中心] - 领钱 - 订单物流 - 我的钱包”查看"), 
                t.showAmount = !0;
                break;

              case 3:
                t.showTimeline = !0, t.claimsEndText = t.refusedReason, t.claimsEnd = this.formatTime(t.refuseTime);
                break;

              default:
                t.showTimeline = !1, 1 === e && (t.statusText = "退货可享运费补贴", t.showStatus = !0);
            } else 5 === e ? (t.statusText = "对不起，该服务已失效", t.failed = !0) : 0 === e ? (t.statusText = "对不起，您暂时无法享受此服务", 
            t.failed = !0) : (t.showStatus = !1, t.statusText = "未投保");
            return {
                data: t
            };
        },
        formatTime: function(t) {
            return t && Date.format(new Date(1e3 * t), "yyyy-MM-dd hh:mm:ss");
        },
        accordion: function(t) {
            var e = t.currentTarget.dataset.index, a = this.faqList;
            "true" === a[e].fold ? a[e].fold = "" : a[e].fold = "true", this.setData({
                faqList: a
            });
        },
        completeLogistics: function() {
            var t = this, e = this.data.options, a = e.orderId, s = e.refundId;
            s || (s = this.data.data.refundId), wx.showModal({
                content: "仅能补填一次物流单号",
                confirmColor: "#ff5777",
                success: function(e) {
                    e.confirm && t.$redirect(n.logisticsUrl + "?orderId=" + a + "&shopOrderId=" + a + "&refundId=" + s);
                }
            });
        }
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: n.pageTitle
        });
    }
});