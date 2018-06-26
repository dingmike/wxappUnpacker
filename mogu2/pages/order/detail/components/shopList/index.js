function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../shopItem/index")), n = t(require("../../../../../components/imcall/index"));

exports.default = {
    name: "shopList",
    components: {
        shopItem: e.default,
        imcall: n.default
    },
    data: function() {
        return {
            taxId: ""
        };
    },
    onLoad: function() {},
    onReady: function() {},
    methods: {
        setOption: function(t) {
            if (t.shopList) {
                var e = t.shopList.map(function(t) {
                    return t.shopIdEsc;
                });
                this.$imcall.setImOpts({
                    shopIds: e
                });
            }
        },
        doRefundSubsidy: function(t) {
            var e = t.currentTarget.dataset;
            this.$root.$navigate("/pages/insurance/freight/index?orderId=" + e.shoporderid);
        },
        showTaxTips: function(t) {
            var e = this, n = t.currentTarget.dataset;
            n.istaxcompliance && !this.data.taxId && this.setData({
                taxId: n.shoporderid
            }, function() {
                setTimeout(function() {
                    e.setData({
                        taxId: ""
                    });
                }, 3e3);
            });
        }
    }
};