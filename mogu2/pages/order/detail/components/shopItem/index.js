function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../../common/service/url.js")), a = e(require("../../../../../common/utils/cache.js"));

exports.default = {
    name: "shopItem",
    data: function() {
        return {
            isRefundLink: !0,
            isShowRedPacket: !1,
            redPacketNum: void 0
        };
    },
    onLoad: function() {},
    onReady: function() {},
    methods: {
        gotoDetail: function(e) {
            var a = e.currentTarget.dataset, i = a.itemname || {}, r = a.ischannel;
            if ("market_mogujie" === i.marketType) {
                var d = i.tuanId, n = i.itemIdEsc, u = i.activityIdEsc, o = this.$root.$navigate;
                o(i.isPintuanRed ? t.default.pintuanRed({
                    activityId: u,
                    itemId: n
                }) : d && r ? t.default.pintuanDetail({
                    itemId: n,
                    activityId: u
                }) : t.default.detail({
                    itemId: n
                }));
            }
        },
        operateClick: function(e) {
            var i = e.currentTarget.dataset, r = i.operationname, d = i.itemname && i.itemname.itemOrderId, n = i.itemname && i.itemname.tuanId, u = i.itemname && i.itemname.itemIdEsc, o = this.$root.$navigate, c = this.$root.$redirect, s = n ? "PT_Detail_Operate" : "Order_Detail_Operate";
            switch (r) {
              case "opt_create_complaint":
              case "opt_show_detail_complaint":
                t.default.refundApplyDetail ? (a.default.put(s, "opt_refund"), c(t.default.refundApplyDetail({
                    orderId: d
                }))) : (e.currentTarget.dataset.href = "/pages/refund/applydetail/index?orderId=" + d, 
                this.$root.$launch(e));
                break;

              case "opt_create_refund":
              case "opt_show_detail_refund":
                t.default.refundIM ? (a.default.put(s, "opt_refund"), c(t.default.refundIM({
                    orderId: d
                }))) : (e.currentTarget.dataset.href = "/pages/refund/im/index?orderId=" + d, this.$root.$launch(e));
                break;

              case "opt_pintuan_detail":
                o(t.default.pinshare({
                    tuanId: n,
                    itemId: u
                }));
                break;

              case "opt_pintuan_detail_red":
              case "opt_invite_pintuan_red":
                o(t.default.pintuanRed({
                    tuanId: n,
                    itemId: u
                }));
            }
            return !1;
        }
    }
};