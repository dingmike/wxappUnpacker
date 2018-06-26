function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = t(require("../../common/page")), s = t(require("../../../../common/m")), e = t(require("../../../../common/utils/debug")), n = s.default.MWP;

exports.default = (0, o.default)({
    pageName: "seckill",
    path: "/pages/detail/pages/seckill/index",
    prefix: "detail",
    getExtraItemDataFunc: function(t, o) {
        var s = this;
        return this.$root.$mwp("mwp.ares.ms.stocks", "1", {
            secKillId: o
        }).then(n.filterResult).catch(function(t) {
            if ("FAIL_BIZ_1028" === t.code) return s.$toast.show(t.message), {
                secKillInfo: {
                    status: 0
                }
            };
        });
    },
    dataProcess: function(t) {
        e.default.log(t);
        var o = void 0, s = void 0;
        if (t[0].status && 1001 === t[0].status.code && (o = t[0].result), t[1] && (s = t[1]), 
        s && o) {
            s.login && (o.userInfo.isLogin = s.login), o.seckillInfo.status = s.secKillInfo.status, 
            2 == o.seckillInfo.status && s.secKillInfo.countDownEnd ? o.seckillInfo.countdown = s.secKillInfo.countDownEnd : s.secKillInfo.countDown && (o.seckillInfo.countdown = s.secKillInfo.countDown);
            var n = {};
            s.skuInfo && s.skuInfo.sku.forEach(function(t) {
                n[t.stockId] = t.stock;
            }), o.skuInfo && o.skuInfo.skus.map(function(t) {
                t.stock = n.hasOwnProperty(t.stockId) ? n[t.stockId] : t.stock;
            }), s.secKillInfo.totalSurplus && (o.skuInfo.totalStock = s.secKillInfo.totalSurplus);
        }
        return t[0].result = o || null, t[0];
    },
    afterModuleRenderFunc: function(t) {
        var o = t.seckillInfo.status, s = 0 === o || 1 === o ? "186" : "130";
        this.$emit("$quickbar.bottom", s);
    }
});