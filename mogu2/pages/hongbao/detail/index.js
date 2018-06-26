function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../common/base/createPage")), n = require("../service"), a = t(n), o = t(require("../../../components/loading/index.js")), i = t(require("../../../components/toast/index.js")), r = require("../constant"), u = {
    1: "获得",
    2: "花费",
    3: "提现",
    4: "收回"
}, s = {
    1: 20101,
    2: 19919,
    3: 35593,
    4: 72967,
    5: 89581
}, l = {
    1: "满返红包",
    2: "支付红包",
    3: "白付美专享支付红包",
    4: "支付宝专享支付红包",
    5: "实名专享支付红包"
};

(0, e.default)({
    components: {
        loading: o.default,
        toast: i.default
    },
    data: {
        hongbaoDetailInfo: {},
        useDetails: [],
        ruleType: l[1],
        ruleInfo: ""
    },
    onLoad: function(t) {
        var e = t.id;
        this.getDetailData(e);
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: r.appTitle
        });
    },
    getDetailData: function(t) {
        var e = this;
        a.default.hongbaoDetail.call(this, t).then(function(t) {
            var n = t.hongbao, a = t.useDetails, o = n.hongbaoType;
            n.startTime = e.formatTime(n.startTime), n.endTime = e.formatTime(n.endTime), n.amount = e.formatAmount(n.amount), 
            n.originAmount = e.formatAmount(n.originAmount), a = a.map(function(t) {
                return {
                    type: t.type,
                    action: u[t.type] || "",
                    amount: e.formatAmount(t.amount),
                    comment: t.comment
                };
            }), e.setData({
                hongbaoDetailInfo: n,
                useDetails: a,
                ruleType: l[o]
            }), e.getRuleInfo(o);
        }).catch(n.handleRequestError.bind(this));
    },
    formatTime: function(t) {
        return t && Date.format(new Date(1e3 * t), "yyyy.MM.dd hh:mm:ss");
    },
    formatAmount: function(t) {
        return t && (t / 100).toFixed(2);
    },
    getRuleInfo: function(t) {
        var e = this;
        a.default.getMaitResource(s[t]).then(function(t) {
            var n = "";
            t.list && t.list.length > 0 && (n = t.list[0].rule.replace(/<p>/g, "").replace(/<\/p>/g, "\r\n")), 
            e.setData({
                ruleInfo: n
            });
        }).catch(n.handleRequestError.bind(this));
    }
});